'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';

const TermsOfService = () => {
  return (
    <div className="bg-light min-vh-100 pt-5">
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-5 fw-bold mb-3">Terms of Service</h1>
              <p className="lead mb-0">
                Last Updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <Row>
         <Col lg={10} className="offset-lg-1">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                {/* Introduction */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">1. Introduction</h2>
                  <p>
                    Welcome to JavaNet EdTech Suite ("Platform", "Service", "we", "our", "us"). These Terms of Service 
                    ("Terms") govern your access to and use of our educational technology platform, including our 
                    computer-based testing (CBT) system, virtual classroom, and school management tools.
                  </p>
                  <p>
                    By accessing or using our Platform, you agree to be bound by these Terms. If you disagree with any 
                    part of these Terms, you may not access the Platform.
                  </p>
                </div>

                {/* Definitions */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">2. Definitions</h2>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>"Platform"</strong> refers to the JavaNet EdTech Suite software and services.
                    </li>
                    <li className="mb-2">
                      <strong>"Client"</strong> refers to educational institutions, schools, universities, training 
                      centers, or organizations that purchase our services.
                    </li>
                    <li className="mb-2">
                      <strong>"End Users"</strong> refers to students, teachers, administrators, and other individuals 
                      who use the Platform through a Client's account.
                    </li>
                    <li className="mb-2">
                      <strong>"Content"</strong> refers to educational materials, test questions, videos, documents, 
                      and other data uploaded to the Platform.
                    </li>
                    <li>
                      <strong>"License"</strong> refers to the one-time license fee granting access to the Platform.
                    </li>
                  </ul>
                </div>

                {/* Account Registration */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">3. Account Registration</h2>
                  <p>
                    To access our Platform, you must register an account. You agree to:
                  </p>
                  <ul>
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>

                {/* License and Fees */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">4. License and Fees</h2>
                  <h3 className="h5 mb-3">4.1 One-Time License Fee</h3>
                  <p>
                    Our Platform is offered under a one-time license fee model:
                  </p>
                  <ul>
                    <li>
                      <strong>Africa Pricing:</strong> ₦5,000,000 – ₦7,500,000 (based on modules selected)
                    </li>
                    <li>
                      <strong>International Pricing:</strong> $10,000 – $25,000 (based on modules selected)
                    </li>
                    <li>No monthly subscription fees</li>
                    <li>License includes initial setup and customization</li>
                  </ul>

                  <h3 className="h5 mt-4 mb-3">4.2 Payment Terms</h3>
                  <ul>
                    <li>50% deposit upon signing agreement</li>
                    <li>50% balance upon deployment completion</li>
                    <li>All fees are non-refundable once development begins</li>
                  </ul>

                  <h3 className="h5 mt-4 mb-3">4.3 License Scope</h3>
                  <p>
                    The license grants you the right to use the Platform for your institution's educational purposes. 
                    The license does not include:
                  </p>
                  <ul>
                    <li>Resale or redistribution rights</li>
                    <li>Source code access</li>
                    <li>Transfer to third parties without our written consent</li>
                  </ul>
                </div>

                {/* Service Delivery */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">5. Service Delivery</h2>
                  <h3 className="h5 mb-3">5.1 Implementation Timeline</h3>
                  <ul>
                    <li>Standard implementation: 4 weeks from project commencement</li>
                    <li>Custom development may require additional time</li>
                    <li>Delays caused by Client may extend timeline</li>
                  </ul>

                  <h3 className="h5 mt-4 mb-3">5.2 Customization</h3>
                  <p>
                    We provide customized branding including:
                  </p>
                  <ul>
                    <li>School/Institution logo integration</li>
                    <li>Custom color scheme and branding</li>
                    <li>Domain name setup (yourdomain.learning)</li>
                    <li>Terminology customization</li>
                  </ul>
                </div>

                {/* User Responsibilities */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">6. User Responsibilities</h2>
                  <p>As a Client or End User, you agree not to:</p>
                  <ul>
                    <li>Use the Platform for any illegal or unauthorized purpose</li>
                    <li>Upload inappropriate, offensive, or copyrighted content without permission</li>
                    <li>Attempt to hack, disrupt, or reverse-engineer the Platform</li>
                    <li>Share login credentials with unauthorized users</li>
                    <li>Use automated systems to access the Platform</li>
                  </ul>
                </div>

                {/* Intellectual Property */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">7. Intellectual Property</h2>
                  <h3 className="h5 mb-3">7.1 Our Rights</h3>
                  <p>
                    JavaNet ICT retains all rights, title, and interest in the Platform, including all software, 
                    trademarks, logos, and documentation.
                  </p>

                  <h3 className="h5 mt-4 mb-3">7.2 Your Content</h3>
                  <p>
                    You retain ownership of content you upload. You grant us a license to host, store, and display 
                    your content solely for providing the Service.
                  </p>
                </div>

                {/* Data and Privacy */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">8. Data and Privacy</h2>
                  <p>
                    We handle personal data in accordance with our 
                    <Link href="/privacy" className="text-primary mx-1">Privacy Policy</Link>
                    and applicable data protection laws.
                  </p>
                  <ul>
                    <li>We implement reasonable security measures</li>
                    <li>We do not sell your data to third parties</li>
                    <li>Data is stored securely on our servers</li>
                    <li>You are responsible for obtaining consent from End Users</li>
                  </ul>
                </div>

                {/* Support and Maintenance */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">9. Support and Maintenance</h2>
                  <h3 className="h5 mb-3">9.1 Included Support</h3>
                  <ul>
                    <li>30 days free technical support post-deployment</li>
                    <li>Email support: support@javanetict.com</li>
                    <li>WhatsApp support: +2347030673089</li>
                  </ul>

                  <h3 className="h5 mt-4 mb-3">9.2 Extended Support (Optional)</h3>
                  <p>
                    Extended support packages are available for:
                  </p>
                  <ul>
                    <li>Ongoing technical support</li>
                    <li>Software updates and upgrades</li>
                    <li>Additional training sessions</li>
                  </ul>
                </div>

                {/* Limitation of Liability */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">10. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, JavaNet ICT shall not be liable for:
                  </p>
                  <ul>
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>Loss of data, profits, or business opportunities</li>
                    <li>Service interruptions beyond our reasonable control</li>
                    <li>Damages exceeding the amount paid for the license</li>
                  </ul>
                </div>

                {/* Termination */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">11. Termination</h2>
                  <p>
                    We may terminate or suspend your account if you breach these Terms. Upon termination:
                  </p>
                  <ul>
                    <li>Your right to use the Platform ceases immediately</li>
                    <li>We may delete your data after 30 days</li>
                    <li>Outstanding payments remain due</li>
                  </ul>
                </div>

                {/* Governing Law */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">12. Governing Law</h2>
                  <p>
                    These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any disputes shall 
                    be resolved through arbitration in Lagos, Nigeria.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">13. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify you of significant changes 
                    via email or platform notification. Continued use constitutes acceptance of modified Terms.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="mt-5 p-4 bg-light rounded">
                  <h3 className="h5 text-primary mb-3">Contact Us</h3>
                  <p className="mb-2">
                    If you have questions about these Terms, please contact us:
                  </p>
                  <ul className="list-unstyled">
                    <li>📧 Email: legal@javanetict.com</li>
                    <li>📞 Phone: +2349128688164</li>
                    <li>📱 WhatsApp: +2347030673089</li>
                    <li>🏢 Address: Lagos, Nigeria</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TermsOfService;