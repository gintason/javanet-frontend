"use client";

//

import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const TechStackPage = () => {
  const technologies = [
    {
      icon: "bi bi-filetype-py",
      bgColor: "bg-primary",
      title: "Python/Django",
      description: "Backend & API Development"
    },
    {
      icon: "bi bi-filetype-jsx",
      bgColor: "bg-info",
      title: "React/Next.js",
      description: "Modern Web Apps"
    },
    {
      icon: "bi bi-phone",
      bgColor: "bg-success",
      title: "React Native",
      description: "Mobile App Development"
    },
    {
      icon: "bi bi-wordpress",
      bgColor: "bg-warning",
      title: "WordPress",
      description: "CMS & E-commerce"
    },
    {
      icon: "bi bi-database",
      bgColor: "bg-purple",
      title: "PostgreSQL",
      description: "Database Management"
    },
    {
      icon: "bi bi-cloud-arrow-up",
      bgColor: "bg-danger",
      title: "RENDER/AWS",
      description: "Cloud Infrastructure"
    },
    {
      icon: "bi bi-megaphone",
      bgColor: "bg-teal",
      title: "Digital Marketing",
      description: "SEO, Ads, Social Media"
    },
    {
      icon: "bi bi-graph-up-arrow",
      bgColor: "bg-pink",
      title: "Analytics",
      description: "Real-Time Insights"
    }
  ];

  return (
    <div className="tech-stack-page">
      {/* Hero Section */}
      <section className="position-relative overflow-hidden bg-dark text-white py-6 py-md-8">
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-black" style={{ opacity: 0.3 }}></div>
        </div>
        
        <div className="container position-relative z-2 py-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <Link href="/about" className="text-white-80 text-decoration-none mb-4 d-inline-block">
                <i className="bi bi-arrow-left me-2"></i>
                Back to About Us
              </Link>
              <h1 className="display-4 fw-bold text-white mb-4">
                Our Technology Stack
              </h1>
              <p className="lead text-white-80">
                We leverage cutting-edge technologies to build robust, scalable, and future-proof solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-6 py-md-8">
        <div className="container">
          <div className="row g-4">
            {technologies.map((tech, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div className="card border-0 shadow-sm hover-scale text-center p-4">
                  <div className={`${tech.bgColor} bg-opacity-10 rounded-3 p-3 mb-3 mx-auto`} style={{ width: 'fit-content' }}>
                    <i className={`${tech.icon} fs-1 text-${tech.bgColor.replace('bg-', '')}`}></i>
                  </div>
                  <h5 className="text-dark mb-2">{tech.title}</h5>
                  <p className="text-muted small mb-0">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 py-md-8 bg-light">
        <div className="container">
          <div className="card border-0 shadow-5 bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-5 p-md-7 text-center">
              <h2 className="display-6 fw-bold text-white mb-3">
                Ready to Build With Us?
              </h2>
              <p className="lead text-white-80 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                Let's discuss how our tech stack can bring your project to life
              </p>
              <Link href="/contact" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
                <i className="bi bi-chat-dots me-2"></i>
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechStackPage;