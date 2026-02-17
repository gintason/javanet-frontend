'use client';

import React, { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useCurrency } from '@/hooks/useCurrency';
import { COUNTRIES } from '@/utils/constants';
import { ProposalResponse } from '@/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProposalForm: React.FC = () => {
  const { currencyInfo } = useCurrency();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    phone: '',
    country: 'Nigeria',
    needs_ctb: true,
    needs_live_classes: false,
    estimated_students: 100,
    estimated_teachers: 10,
    preferred_colors: '',
    has_logo: false,
  });

  const { execute: generateProposal, loading, data: proposalData, error } = useApi<ProposalResponse>(
    'api/proposals/generate/',
    'POST'
  );

  // Function to generate and download PDF
  const generateAndDownloadPDF = async () => {
    if (!proposalData) return;
    
    try {
      // First try to use Django backend for PDF generation
      await downloadPDFFromDjango();
    } catch (error) {
      console.warn('Django PDF generation failed, falling back to client-side:', error);
      // Fallback to client-side PDF generation
      await downloadPDFClientSide();
    }
  };


 const downloadPDFFromDjango = async () => {
  try {
    // Prepare the data exactly as Django expects
    const requestData = {
      proposal_id: proposalData?.proposal_id, // Only send if it exists
      name: formData.name,
      email: formData.email,
      institution: formData.institution,
      phone: formData.phone || '',
      country: formData.country,
      needs_ctb: formData.needs_ctb,
      needs_live_classes: formData.needs_live_classes,
      estimated_students: formData.estimated_students,
      estimated_teachers: formData.estimated_teachers,
      preferred_colors: formData.preferred_colors,
      has_logo: formData.has_logo,
      deployment_fee: {
        amount: proposalData?.deployment_fee?.amount || calculateEstimate(),
      }
    };

    // Remove proposal_id if it doesn't exist (to avoid Date.now() string)
    if (!requestData.proposal_id) {
      delete requestData.proposal_id;
    }

    console.log('📤 Sending PDF request to Django:', {
      url: 'https://www.javanetict.com/api/proposals/generate-pdf/',
      data: requestData
    });

    // Use absolute URL to avoid Next.js routing issues
    // CRITICAL: NO 'Accept' header!
    const response = await fetch('https://www.javanetict.com/api/proposals/generate-pdf/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // NO 'Accept' header here - this was causing the error!
      },
      body: JSON.stringify(requestData),
    });

    // Check if response is actually a PDF
    const contentType = response.headers.get('content-type');
    console.log('📥 Django Response:', {
      status: response.status,
      statusText: response.statusText,
      contentType: contentType,
      ok: response.ok
    });

    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 404) {
        throw new Error('PDF endpoint not found (404). Check Django server on port 8080.');
      } else if (response.status === 500) {
        throw new Error('Django server error (500). Check Django logs.');
      }
      
      // For error responses
      let errorText = '';
      try {
        errorText = await response.text();
        console.error('❌ PDF generation error response:', errorText.substring(0, 300));
      } catch (e) {
        console.error('❌ Could not read error response:', e);
      }
      
      let errorMessage = `Failed to generate PDF: ${response.status} ${response.statusText}`;
      
      // Try to parse as JSON
      if (errorText && errorText.trim().startsWith('{')) {
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorText.substring(0, 200);
        } catch {
          if (errorText.length < 500) {
            errorMessage = errorText;
          }
        }
      } else if (errorText && errorText.length < 500) {
        errorMessage = errorText;
      }
      
      throw new Error(errorMessage);
    }

    // Verify content type is PDF
    if (!contentType || !contentType.includes('application/pdf')) {
      console.warn('⚠️ Response is not a PDF. Content-Type:', contentType);
      
      // Try to read as text
      try {
        const textResponse = await response.text();
        console.log('Response preview:', textResponse.substring(0, 200));
        
        if (textResponse.includes('<!DOCTYPE html>')) {
          throw new Error('Received HTML page instead of PDF.');
        } else if (textResponse.includes('"status":"error"')) {
          // It's a JSON error from Django
          try {
            const errorData = JSON.parse(textResponse);
            throw new Error(errorData.message || 'Django returned JSON error');
          } catch {
            throw new Error('Django returned error: ' + textResponse.substring(0, 100));
          }
        }
      } catch (e) {
        console.error('Could not read response as text:', e);
      }
      
      throw new Error('Server did not return a PDF. Got: ' + contentType);
    }

    // Create blob from response
    const blob = await response.blob();
    
    // Verify blob size
    if (blob.size < 1000) {
      console.warn('PDF blob seems too small:', blob.size, 'bytes');
      
      // Try to read the blob as text
      try {
        const smallText = await blob.text();
        console.log('Small blob content:', smallText.substring(0, 200));
        
        if (smallText.includes('"status":"error"')) {
          // It's a JSON error
          const errorData = JSON.parse(smallText);
          throw new Error(errorData.message || 'Django error in PDF');
        }
      } catch (e) {
        // Ignore text reading errors
      }
      
      throw new Error('Generated PDF file is too small or invalid');
    }

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proposal_${proposalData?.proposal_id || 'TEMP'}_${formData.institution.replace(/\s+/g, '_')}.pdf`;
    
    console.log('✅ PDF generated successfully via Django. Size:', blob.size, 'bytes');
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);

  } catch (error) {
    // TypeScript-safe error handling
    if (error instanceof Error) {
      console.error('❌ PDF generation failed:', error.message);
      
      // Network errors
      if (error.message.includes('Failed to fetch') || 
          error.message.includes('NetworkError') ||
          error.message.includes('Network request failed')) {
        throw new Error('Cannot connect to Django server. Please ensure Django is running on port 8080.');
      }
      
      throw error;
    } else if (typeof error === 'string') {
      console.error('❌ PDF generation failed:', error);
      throw new Error(error);
    } else {
      console.error('❌ PDF generation failed with unknown error:', error);
      throw new Error('Unknown error occurred during PDF generation');
    }
  }
};

 // Client-side PDF generation (fallback) with multi-page support
const downloadPDFClientSide = async () => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);
    
    // Create a hidden div for PDF generation
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'fixed';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.width = `${pageWidth}mm`;
    pdfContainer.style.backgroundColor = '#ffffff';
    pdfContainer.style.padding = `${margin}mm`;
    pdfContainer.style.fontFamily = "'Times New Roman', Times, serif";
    pdfContainer.style.lineHeight = '1.6';
    pdfContainer.style.boxSizing = 'border-box';
    
    // Format the date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Use proposalData.data for all fields
    const data = proposalData?.data || formData;
    const needs_ctb = proposalData?.data.needs_ctb ?? formData.needs_ctb;
    const needs_live_classes = proposalData?.data.needs_live_classes ?? formData.needs_live_classes;
    const estimated_students = proposalData?.data.estimated_students ?? formData.estimated_students;
    const estimated_teachers = proposalData?.data.estimated_teachers ?? formData.estimated_teachers;
    const deploymentFeeAmount = proposalData?.deployment_fee?.amount || calculateEstimate();

    // Create HTML content with better spacing control
    pdfContainer.innerHTML = `
      <div id="proposal-pdf-content" style="font-size: 11pt; max-width: ${contentWidth}mm;">
        <!-- Letterhead with Logo -->
        <div style="
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 2px solid #0d6efd;
          min-height: 100px;
        ">
          <!-- Company Logo -->
          <div style="flex: 0 0 auto; margin-right: 20px;">
            <img 
              src="/images/logo/paperlogo.png" 
              alt="JAVANET ICT SOLUTIONS Logo" 
              style="
                width: 100px;
                height: 100px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                object-fit: contain;
              " 
              onerror="this.style.display='none'"
            />
          </div>
          
          <!-- Company Info -->
          <div style="flex: 1;">
            <h1 style="
              color: #0d6efd;
              margin: 0 0 6px 0;
              font-size: 22px;
              font-weight: bold;
              line-height: 1.2;
            ">
              JAVANET ICT SOLUTIONS
            </h1>
            <p style="
              color: #333;
              margin: 0 0 4px 0;
              font-size: 14px;
              font-weight: bold;
              line-height: 1.3;
            ">
              Professional E-Learning Platform Deployment
            </p>
            <p style="
              color: #666;
              margin: 0;
              font-size: 10px;
              line-height: 1.4;
            ">
              <strong>Address:</strong> House 26, T.O.S Benson Crescent, Utako, Abuja, Nigeria<br>
              <strong>Phone:</strong> +234 703 067 3089<br>
              <strong>Email:</strong> info@javanetict.com<br>
              <strong>Website:</strong> www.javanetict.com
            </p>
          </div>
          
          <!-- Proposal ID Badge -->
          <div style="
            flex: 0 0 auto;
            background: #f8f9fa;
            padding: 10px 15px;
            border-radius: 6px;
            border: 1px solid #dee2e6;
            text-align: center;
            min-width: 120px;
            margin-left: 15px;
          ">
            <div style="font-size: 10px; color: #666; margin-bottom: 4px; font-weight: bold;">PROPOSAL ID</div>
            <div style="font-size: 16px; font-weight: bold; color: #0d6efd; margin: 4px 0;">#${proposalData?.proposal_id || 'TEMP'}</div>
            <div style="font-size: 10px; color: #666; margin-top: 4px;">${formattedDate}</div>
          </div>
        </div>

        <!-- Recipient Info -->
        <div style="margin-bottom: 25px; background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #0d6efd;">
          <h3 style="color: #333; margin-bottom: 10px; font-size: 14px; font-weight: bold;">TO:</h3>
          <p style="margin: 0; font-size: 12px; line-height: 1.5;">
            <strong style="color: #0d6efd;">${data.name}</strong><br>
            ${data.institution}<br>
            ${data.country}<br>
            <strong>Email:</strong> ${data.email}<br>
            <strong>Phone:</strong> ${data.phone || 'Not provided'}
          </p>
        </div>

        <!-- Title -->
        <div style="text-align: center; margin: 25px 0;">
          <h2 style="
            color: #0d6efd;
            margin: 0 0 10px 0;
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            line-height: 1.3;
          ">
            CUSTOM E-LEARNING PLATFORM<br>DEPLOYMENT PROPOSAL
          </h2>
          <div style="
            width: 120px;
            height: 3px;
            background: linear-gradient(90deg, #0d6efd, #198754);
            margin: 0 auto;
            border-radius: 2px;
          "></div>
        </div>

        <!-- Executive Summary -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333; margin-bottom: 10px; font-size: 15px; font-weight: bold; border-bottom: 1px solid #dee2e6; padding-bottom: 6px;">
            1. EXECUTIVE SUMMARY
          </h3>
          <p style="margin: 0; font-size: 11px; line-height: 1.6; text-align: justify;">
            This formal proposal outlines the comprehensive one-time deployment package for a customized 
            e-learning platform tailored specifically for <strong>${data.institution}</strong> located in 
            <strong>${data.country}</strong>. The proposed solution is designed to support approximately 
            <strong>${estimated_students}</strong> students and <strong>${estimated_teachers}</strong> 
            teachers, providing a scalable and robust digital learning environment.
            ${needs_ctb ? 'Computer-Based Testing (CBT) module' : ''}
            ${needs_ctb && needs_live_classes ? ' and ' : ''}
            ${needs_live_classes ? 'Live Interactive Classroom module' : ''}.
          </p>
        </div>

        <!-- Deployment Fee Highlight -->
        <div style="
          background: linear-gradient(135deg, #e7f1ff 0%, #d4e6ff 100%);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 30px;
          border: 2px solid #0d6efd;
        ">
          <h3 style="color: #198754; margin-bottom: 10px; font-size: 16px; font-weight: bold;">
            ONE-TIME DEPLOYMENT FEE
          </h3>
          <h1 style="color: #198754; margin: 15px 0; font-size: 28px; font-weight: bold; line-height: 1.2;">
            ${deploymentFeeAmount}
          </h1>
          <div style="display: flex; justify-content: center; gap: 15px; margin-top: 15px; flex-wrap: wrap;">
            <div style="font-size: 11px; color: #666; background: white; padding: 6px 12px; border-radius: 20px; border: 1px solid #dee2e6;">
              <strong style="color: #198754;">✓</strong> No Monthly Fees
            </div>
            <div style="font-size: 11px; color: #666; background: white; padding: 6px 12px; border-radius: 20px; border: 1px solid #dee2e6;">
              <strong style="color: #198754;">✓</strong> Complete Ownership
            </div>
            <div style="font-size: 11px; color: #666; background: white; padding: 6px 12px; border-radius: 20px; border: 1px solid #dee2e6;">
              <strong style="color: #198754;">✓</strong> Source Code Included
            </div>
          </div>
        </div>

        <!-- Modules Section -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 15px; font-size: 15px; font-weight: bold; border-bottom: 1px solid #dee2e6; padding-bottom: 6px;">
            2. PLATFORM MODULES INCLUDED
          </h3>
          
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${needs_ctb ? `
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-weight: bold; font-size: 14px;">
                    CBT
                  </div>
                  <h4 style="color: #0d6efd; margin: 0; font-size: 15px; font-weight: bold;">Computer-Based Testing System</h4>
                </div>
                <ul style="margin: 0; padding-left: 20px; font-size: 11px; color: #555; line-height: 1.6;">
                  <li>Advanced question bank management system with import/export capabilities</li>
                  <li>Automated grading and instant score calculation with detailed analytics</li>
                  <li>Real-time anti-cheat monitoring and proctoring features</li>
                  <li>Comprehensive analytics dashboard with performance metrics</li>
                  <li>Multi-format question support (MCQ, Essay, True/False, etc.)</li>
                  <li>Instant results generation and feedback delivery</li>
                </ul>
              </div>
            ` : ''}
            
            ${needs_live_classes ? `
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; margin-top: ${needs_ctb ? '0' : '0'}">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #198754 0%, #157347 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-weight: bold; font-size: 14px;">
                    LC
                  </div>
                  <h4 style="color: #198754; margin: 0; font-size: 15px; font-weight: bold;">Live Interactive Classroom</h4>
                </div>
                <ul style="margin: 0; padding-left: 20px; font-size: 11px; color: #555; line-height: 1.6;">
                  <li>HD video conferencing with virtual whiteboard and annotation tools</li>
                  <li>Screen sharing, file sharing, and collaborative document editing</li>
                  <li>Automatic session recording with cloud storage and playback</li>
                  <li>Breakout rooms for group activities and discussions</li>
                  <li>Interactive polls, quizzes, and real-time feedback collection</li>
                  <li>Comprehensive attendance tracking and participation reports</li>
                </ul>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Scope of Work - Made more compact -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin-bottom: 15px; font-size: 15px; font-weight: bold; border-bottom: 1px solid #dee2e6; padding-bottom: 6px;">
            3. SCOPE OF DEPLOYMENT
          </h3>
          <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
            <div style="display: flex; align-items: flex-start; background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #0d6efd;">
              <div style="margin-right: 10px; color: #0d6efd; font-weight: bold; font-size: 16px;">✓</div>
              <div>
                <strong style="font-size: 12px; color: #333;">Custom Branding</strong>
                <p style="margin: 4px 0 0 0; font-size: 10px; color: #666;">Full platform customization with institution's colors, logo, and branding</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #0d6efd;">
              <div style="margin-right: 10px; color: #0d6efd; font-weight: bold; font-size: 16px;">✓</div>
              <div>
                <strong style="font-size: 12px; color: #333;">Complete Source Code</strong>
                <p style="margin: 4px 0 0 0; font-size: 10px; color: #666;">Full source code transfer and complete platform ownership rights</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #0d6efd;">
              <div style="margin-right: 10px; color: #0d6efd; font-weight: bold; font-size: 16px;">✓</div>
              <div>
                <strong style="font-size: 12px; color: #333;">Full Installation</strong>
                <p style="margin: 4px 0 0 0; font-size: 10px; color: #666;">Complete installation, configuration, and deployment on your servers</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #0d6efd;">
              <div style="margin-right: 10px; color: #0d6efd; font-weight: bold; font-size: 16px;">✓</div>
              <div>
                <strong style="font-size: 12px; color: #333;">Comprehensive Training</strong>
                <p style="margin: 4px 0 0 0; font-size: 10px; color: #666;">Administrator, teacher, and technical staff training sessions</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #0d6efd;">
              <div style="margin-right: 10px; color: #0d6efd; font-weight: bold; font-size: 16px;">✓</div>
              <div>
                <strong style="font-size: 12px; color: #333;">Technical Support</strong>
                <p style="margin: 4px 0 0 0; font-size: 10px; color: #666;">One year of comprehensive technical support and maintenance</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #0d6efd;">
              <div style="margin-right: 10px; color: #0d6efd; font-weight: bold; font-size: 16px;">✓</div>
              <div>
                <strong style="font-size: 12px; color: #333;">System Updates</strong>
                <p style="margin: 4px 0 0 0; font-size: 10px; color: #666;">Lifetime access to system updates and security patches</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer - Made more compact -->
        <div style="
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
        ">
          <div style="text-align: left; flex: 1; min-width: 180px;">
            <p style="margin: 0 0 4px 0; color: #0d6efd; font-weight: bold; font-size: 12px;">
              JAVANET ICT SOLUTIONS
            </p>
            <p style="margin: 0; color: #666; font-size: 9px; line-height: 1.3;">
              Building Digital Learning Ecosystems<br>
              Transforming Education Through Technology
            </p>
          </div>
          
          <div style="text-align: center; flex: 1; min-width: 180px;">
            <p style="margin: 0 0 8px 0; color: #333; font-size: 11px; font-weight: bold;">
              PROPOSAL VALIDITY
            </p>
            <div style="background: #f8f9fa; padding: 8px; border-radius: 6px; border: 1px solid #dee2e6;">
              <p style="margin: 0; color: #198754; font-size: 11px; font-weight: bold;">
                30 DAYS FROM ISSUE DATE
              </p>
              <p style="margin: 4px 0 0 0; color: #666; font-size: 9px;">
                Issue Date: ${formattedDate}
              </p>
            </div>
          </div>
          
         <div style="text-align: right; flex: 1; min-width: 180px;">
          <p style="margin: 0 0 12px 0; color: #333; font-size: 11px; font-weight: bold;">
            AUTHORIZED SIGNATURE
          </p>
          <div style="width: 130px; margin-left: auto; padding-top: 8px;">
            {/* Replace with your signature image */}
            <img 
              src="/images/signature.png" 
              alt="Signature" 
              style="
                width: 120px;
                height: 40px;
                object-fit: contain;
                margin-bottom: 4px;
              " 
              onerror="this.style.display='none'"
            />
            <p style="margin: 4px 0 0 0; color: #666; font-size: 9px;">
              CEO, JAVANET ICT SOLUTIONS LTD.
            </p>
          </div>
        </div>
        </div>

        <!-- Page Number -->
        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 9px;">
          Page 1 of 1 • Generated on ${formattedDate} • Proposal ID: #${proposalData?.proposal_id || 'TEMP'}
        </div>
      </div>
    `;

    document.body.appendChild(pdfContainer);

    try {
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: pdfContainer.offsetWidth,
        height: pdfContainer.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded
          const images = clonedDoc.querySelectorAll('img');
          images.forEach(img => {
            if (!img.complete) {
              img.onload = () => {};
            }
          });
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - (2 * margin);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Check if content fits on one page
      if (imgHeight > pageHeight - (2 * margin)) {
        console.warn('Content too long for one page, attempting multi-page...');
        // For multi-page support, we'd need to split the content
        // For now, scale to fit
        const scaleFactor = (pageHeight - (2 * margin)) / imgHeight;
        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = imgHeight * scaleFactor;
        
        pdf.addImage(imgData, 'PNG', margin, margin, scaledWidth, scaledHeight);
      } else {
        // Content fits on one page
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      }
      
      // Save the PDF
      pdf.save(`Proposal_${proposalData?.proposal_id || 'TEMP'}_${data.institution.replace(/\s+/g, '_')}.pdf`);
      
      console.log('PDF generated successfully via client-side');
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again or contact support.');
    } finally {
      document.body.removeChild(pdfContainer);
    }
  } catch (err) {
    console.error('PDF generation failed:', err);
    alert('Failed to generate PDF. Please try again.');
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      await generateProposal(formData);
    } catch (err) {
      console.error('Proposal generation failed:', err);
      // Error is already displayed by useApi hook
    }
  };

  // Calculate estimated deployment fee
  const calculateEstimate = () => {
    const isAfrican = ['nigeria', 'ghana', 'kenya', 'south africa'].includes(formData.country.toLowerCase());
    
    if (isAfrican) {
      let base = 5000000; // ₦5 million
      if (formData.needs_ctb && formData.needs_live_classes) base += 2000000;
      if (formData.estimated_students > 1000) base += 2000000;
      else if (formData.estimated_students > 500) base += 1000000;
      
      return `₦${base.toLocaleString('en-NG')}`;
    } else {
      let base = 10000; // $10,000
      if (formData.needs_ctb && formData.needs_live_classes) base += 3000;
      return `$${base.toLocaleString('en-US')}`;
    }
  };

  return (
    <div className="row">
      {/* Form Column */}
      <div className="col-lg-7">
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <i className="bi bi-file-text me-2"></i>
              Generate Custom Proposal
            </h4>
            <p className="mb-0 small">One-time deployment fee • No monthly subscriptions</p>
          </div>
          
          <div className="card-body p-4">
            {proposalData ? (
              /* Success Message */
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="bi bi-check-circle text-success display-1"></i>
                </div>
                <h3 className="mb-3">Proposal Generated Successfully!</h3>
                <p className="text-muted mb-4">
                  Your custom proposal with one-time deployment fee has been generated.
                </p>
                
                {/* Proposal Details */}
                <div className="card border-success mb-4">
                  <div className="card-body">
                    <h5 className="text-success">
                      <i className="bi bi-cash-coin me-2"></i>
                      Deployment Fee: {proposalData.deployment_fee.amount}
                    </h5>
                    <p className="mb-2">
                      <strong>Institution:</strong> {proposalData.data.institution}
                    </p>
                    <p className="mb-2">
                      <strong>Location:</strong> {proposalData.data.country}
                    </p>
                    <p className="mb-0">
                      <strong>Proposal ID:</strong> #{proposalData.proposal_id}
                    </p>
                  </div>
                </div>
                
                <div className="d-flex gap-3 justify-content-center">
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Create Another Proposal
                  </button>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={generateAndDownloadPDF}
                    disabled={!proposalData}
                  >
                    <i className="bi bi-download me-2"></i>
                    Download PDF Proposal
                  </button>
                </div>
                
                <div className="mt-4 text-muted small">
                  <p className="mb-1">
                    <i className="bi bi-info-circle me-2"></i>
                    The PDF will include our professional letterhead with company logo.
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-clock me-2"></i>
                    Proposal is valid for 30 days from today.
                  </p>
                </div>

                {/* Debug Info - Remove in production */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-3 bg-light rounded">
                    <small className="text-muted">
                      <strong>Debug Info:</strong> Proposal ID: {proposalData.proposal_id}
                    </small>
                  </div>
                )}
              </div>
            ) : (
              /* Proposal Form */
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="row mb-4">
                  <h5 className="text-primary mb-3">
                    <i className="bi bi-person me-2"></i>
                    Contact Information
                  </h5>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Institution Name *</label>
                    <input
                      type="text"
                      name="institution"
                      className="form-control"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Country *</label>
                    <select
                      name="country"
                      className="form-select"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Platform Requirements */}
                <div className="row mb-4">
                  <h5 className="text-primary mb-3">
                    <i className="bi bi-gear me-2"></i>
                    Platform Requirements
                  </h5>
                  
                  <div className="col-12 mb-3">
                    <label className="form-label fw-bold">Select Modules</label>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="needs_ctb"
                            checked={formData.needs_ctb}
                            onChange={handleChange}
                            id="ctbCheck"
                          />
                          <label className="form-check-label fw-bold" htmlFor="ctbCheck">
                            <i className="bi bi-laptop text-primary me-2"></i>
                            Computer-Based Testing (CBT)
                          </label>
                          <p className="text-muted small mb-0">
                            Automated exams, grading, analytics
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="needs_live_classes"
                            checked={formData.needs_live_classes}
                            onChange={handleChange}
                            id="liveCheck"
                          />
                          <label className="form-check-label fw-bold" htmlFor="liveCheck">
                            <i className="bi bi-camera-video text-success me-2"></i>
                            Live Interactive Classroom
                          </label>
                          <p className="text-muted small mb-0">
                            Virtual classes, whiteboard, recording
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">
                      Estimated Number of Students
                    </label>
                    <input
                      type="number"
                      name="estimated_students"
                      className="form-control"
                      value={formData.estimated_students}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">
                      Estimated Number of Teachers
                    </label>
                    <input
                      type="number"
                      name="estimated_teachers"
                      className="form-control"
                      value={formData.estimated_teachers}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                </div>

                {/* Branding Preferences */}
                <div className="row mb-4">
                  <h5 className="text-primary mb-3">
                    <i className="bi bi-palette me-2"></i>
                    Branding Preferences
                  </h5>
                  
                  <div className="col-12 mb-3">
                    <label className="form-label fw-bold">Preferred Brand Colors</label>
                    <input
                      type="text"
                      name="preferred_colors"
                      className="form-control"
                      value={formData.preferred_colors}
                      onChange={handleChange}
                      placeholder="e.g., Blue and Green, or enter hex codes #1A237E #00C853"
                    />
                    <small className="text-muted">
                      Leave blank for our default color scheme
                    </small>
                  </div>
                  
                  <div className="col-12 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="has_logo"
                        checked={formData.has_logo}
                        onChange={handleChange}
                        id="logoCheck"
                      />
                      <label className="form-check-label fw-bold" htmlFor="logoCheck">
                        We have a logo for platform branding
                      </label>
                    </div>
                  </div>
                </div>

                {/* Price Estimate */}
                <div className="card bg-light border-0 mb-4">
                  <div className="card-body">
                    <h6 className="text-primary mb-2">
                      <i className="bi bi-calculator me-2"></i>
                      Estimated One-Time Deployment Fee
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="text-success mb-0">{calculateEstimate()}</h4>
                        <small className="text-muted">
                          Based on {formData.country} • {formData.needs_ctb && formData.needs_live_classes ? 'Both modules' : formData.needs_ctb ? 'CBT only' : 'Live classes only'}
                        </small>
                      </div>
                      <div className="text-end">
                        <small className="text-muted d-block">No monthly fees</small>
                        <small className="text-muted">One-time payment</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Generating Proposal...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-file-text me-2"></i>
                        Generate Custom Proposal
                      </>
                    )}
                  </button>
                </div>
                
                {/* Info Note */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Your information is secure. We'll contact you within 24 hours.
                  </small>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Information */}
      <div className="col-lg-5">
        <div className="sticky-top" style={{ top: '20px' }}>
          {/* Pricing Info */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-cash-coin me-2"></i>
                One-Time Fee Only
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>No monthly subscriptions</strong>
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>No hidden fees</strong>
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Complete ownership</strong>
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Full source code access</strong>
                </li>
                <li>
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Lifetime updates</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* What's Included */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-box-seam me-2"></i>
                What's Included
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-primary">
                  <i className="bi bi-laptop me-2"></i>
                  CBT System Includes:
                </h6>
                <ul className="small mb-0">
                  <li>Question bank management</li>
                  <li>Automated grading system</li>
                  <li>Anti-cheat monitoring</li>
                  <li>Detailed analytics dashboard</li>
                </ul>
              </div>
              
              <div>
                <h6 className="text-success">
                  <i className="bi bi-camera-video me-2"></i>
                  Live Classroom Includes:
                </h6>
                <ul className="small mb-0">
                  <li>Virtual whiteboard</li>
                  <li>Screen sharing</li>
                  <li>Session recording</li>
                  <li>Breakout rooms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="text-primary mb-3">Need Help?</h5>
              <div className="mb-3">
                <a href="mailto:info@javanetict.com" className="btn btn-outline-primary w-100 mb-2">
                  <i className="bi bi-envelope me-2"></i>
                  info@javanetict.com
                </a>
                <a href="tel:+2347030673089" className="btn btn-outline-success w-100">
                  <i className="bi bi-telephone me-2"></i>
                  +234 703 067 3089
                </a>
              </div>
              <p className="text-muted small mb-0">
                Average response time: 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalForm;