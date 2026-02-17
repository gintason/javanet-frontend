'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <div className="bg-light min-vh-100 pt-5">
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-5 fw-bold mb-3">Privacy Policy</h1>
              <p className="lead mb-0">
                Protecting your data is our priority. Last Updated: {new Date().toLocaleDateString('en-US', { 
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
                    JavaNet ICT ("we", "our", "us") operates the JavaNet EdTech Suite platform. We are committed to 
                    protecting your privacy and handling your data transparently. This Privacy Policy explains how we 
                    collect, use, disclose, and safeguard your information when you use our educational technology platform.
                  </p>
                  <p>
                    By using our Platform, you consent to the data practices described in this policy.
                  </p>
                </div>

                {/* Information We Collect */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">2. Information We Collect</h2>
                  
                  <h3 className="h5 mb-3">2.1 Information You Provide</h3>
                  <ul>
                    <li>
                      <strong>Account Information:</strong> Name, email, phone number, institution details
                    </li>
                    <li>
                      <strong>Student Information:</strong> Student names, ID numbers, academic records
                    </li>
                    <li>
                      <strong>Teacher/Staff Information:</strong> Qualifications, subjects taught, contact details
                    </li>
                    <li>
                      <strong>Educational Content:</strong> Course materials, test questions, assignments
                    </li>
                    <li>
                      <strong>Payment Information:</strong> Billing details (processed securely by payment processors)
                    </li>
                  </ul>

                  <h3 className="h5 mt-4 mb-3">2.2 Automatically Collected Information</h3>
                  <ul>
                    <li>
                      <strong>Usage Data:</strong> Login times, feature usage, session duration
                    </li>
                    <li>
                      <strong>Technical Data:</strong> IP address, browser type, device information
                    </li>
                    <li>
                      <strong>Performance Data:</strong> Platform performance metrics, error logs
                    </li>
                  </ul>
                </div>

                {/* How We Use Your Information */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">3. How We Use Your Information</h2>
                  <p>We use collected information for:</p>
                  <ul>
                    <li>Providing and maintaining the Platform</li>
                    <li>Personalizing user experience</li>
                    <li>Processing transactions and sending invoices</li>
                    <li>Sending important notifications about the Platform</li>
                    <li>Improving our services and developing new features</li>
                    <li>Monitoring platform usage and security</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </div>

                {/* Legal Basis for Processing */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">4. Legal Basis for Processing (GDPR)</h2>
                  <p>For users in the European Economic Area, we process data based on:</p>
                  <ul>
                    <li>
                      <strong>Contractual Necessity:</strong> To provide services under our agreement
                    </li>
                    <li>
                      <strong>Legitimate Interests:</strong> Platform security, fraud prevention, service improvement
                    </li>
                    <li>
                      <strong>Consent:</strong> For optional features and marketing communications
                    </li>
                    <li>
                      <strong>Legal Obligations:</strong> Compliance with applicable laws
                    </li>
                  </ul>
                </div>

                {/* Data Sharing and Disclosure */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">5. Data Sharing and Disclosure</h2>
                  
                  <h3 className="h5 mb-3">5.1 When We Share Data</h3>
                  <p>We may share information with:</p>
                  <ul>
                    <li>
                      <strong>Service Providers:</strong> Hosting, payment processing, email delivery
                    </li>
                    <li>
                      <strong>Educational Institutions:</strong> Student data with respective schools
                    </li>
                    <li>
                      <strong>Legal Authorities:</strong> When required by law or to protect rights
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In case of merger or acquisition
                    </li>
                  </ul>

                  <h3 className="h5 mt-4 mb-3">5.2 What We Never Do</h3>
                  <ul>
                    <li>We do not sell your personal data to third parties</li>
                    <li>We do not use your data for unrelated advertising</li>
                    <li>We do not share student data with unauthorized parties</li>
                  </ul>
                </div>

                {/* Data Security */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">6. Data Security</h2>
                  <p>We implement appropriate security measures including:</p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Regular security training for our team</li>
                    <li>Incident response and breach notification procedures</li>
                  </ul>
                  <p className="mt-3">
                    However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                  </p>
                </div>

                {/* Data Retention */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">7. Data Retention</h2>
                  <p>We retain personal data only as long as necessary:</p>
                  <ul>
                    <li>
                      <strong>Active Accounts:</strong> Retained while account is active
                    </li>
                    <li>
                      <strong>Inactive Accounts:</strong> Deleted after 2 years of inactivity
                    </li>
                    <li>
                      <strong>Student Records:</strong> Retained as required by educational regulations
                    </li>
                    <li>
                      <strong>Financial Records:</strong> Retained for 7 years for tax purposes
                    </li>
                  </ul>
                </div>

                {/* Your Data Rights */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">8. Your Data Rights</h2>
                  <p>Depending on your location, you may have rights including:</p>
                  
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="card h-100 border-light">
                        <div className="card-body">
                          <h5 className="card-title text-primary">Access & Portability</h5>
                          <p className="card-text">
                            Right to access your data and receive it in a portable format.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="card h-100 border-light">
                        <div className="card-body">
                          <h5 className="card-title text-primary">Correction</h5>
                          <p className="card-text">
                            Right to correct inaccurate or incomplete personal data.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mt-3">
                      <div className="card h-100 border-light">
                        <div className="card-body">
                          <h5 className="card-title text-primary">Deletion</h5>
                          <p className="card-text">
                            Right to request deletion of your personal data ("right to be forgotten").
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6 mt-3">
                      <div className="card h-100 border-light">
                        <div className="card-body">
                          <h5 className="card-title text-primary">Restriction & Objection</h5>
                          <p className="card-text">
                            Right to restrict processing or object to certain data processing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4">
                    To exercise these rights, contact us at privacy@javanetict.com. We will respond within 30 days.
                  </p>
                </div>

                {/* Children's Privacy */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">9. Children's Privacy</h2>
                  <p>
                    Our Platform is designed for educational institutions. Student data is collected and processed 
                    by educational institutions under their privacy policies. We act as a data processor for such data.
                  </p>
                  <p>
                    Educational institutions are responsible for obtaining necessary parental consent for students 
                    under applicable age limits in their jurisdiction.
                  </p>
                </div>

                {/* International Data Transfers */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">10. International Data Transfers</h2>
                  <p>
                    We primarily store data on servers in Nigeria. If we transfer data internationally, we ensure 
                    appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.
                  </p>
                </div>

                {/* Cookies and Tracking */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">11. Cookies and Tracking Technologies</h2>
                  <p>We use cookies and similar technologies for:</p>
                  <ul>
                    <li>
                      <strong>Essential Cookies:</strong> Required for platform functionality
                    </li>
                    <li>
                      <strong>Performance Cookies:</strong> Analyzing platform usage
                    </li>
                    <li>
                      <strong>Functional Cookies:</strong> Remembering preferences
                    </li>
                  </ul>
                  <p className="mt-3">
                    You can control cookies through your browser settings. Note that disabling cookies may affect 
                    platform functionality.
                  </p>
                </div>

                {/* Changes to This Policy */}
                <div className="mb-5">
                  <h2 className="h4 text-primary mb-3">12. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy periodically. We will notify you of significant changes by:
                  </p>
                  <ul>
                    <li>Email notification to account administrators</li>
                    <li>Platform notification upon login</li>
                    <li>Updating the "Last Updated" date</li>
                  </ul>
                  <p className="mt-3">
                    Continued use of the Platform after changes constitutes acceptance of the updated policy.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="mt-5 p-4 bg-light rounded">
                  <h3 className="h5 text-primary mb-3">Contact Our Privacy Team</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-primary">Data Protection Officer</h6>
                      <ul className="list-unstyled">
                        <li>📧 Email: dpo@javanetict.com</li>
                        <li>📞 Phone: +2349128688164</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-primary">General Privacy Inquiries</h6>
                      <ul className="list-unstyled">
                        <li>📧 Email: privacy@javanetict.com</li>
                        <li>📱 WhatsApp: +2347030673089</li>
                        <li>🏢 Address: Lagos, Nigeria</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded">
                    <h6 className="text-primary mb-2">Supervisory Authority</h6>
                    <p className="mb-2">
                      If you have concerns about our data processing, you have the right to lodge a complaint 
                      with your local data protection authority.
                    </p>
                    <p className="mb-0">
                      For Nigerian users: National Information Technology Development Agency (NITDA)
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer Notice */}
      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <p className="mb-0">
                JavaNet ICT is committed to protecting your privacy and complying with global data protection 
                regulations including GDPR, CCPA, and NDPR.
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Link href="/terms" className="text-white text-decoration-none me-3">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-white text-decoration-none">
                Contact Us
              </Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;