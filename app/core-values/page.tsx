"use client";

import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const CoreValuesPage = () => {
  const values = [
    {
      icon: "bi bi-lightbulb",
      bgColor: "bg-primary",
      title: "Innovation",
      description: "We continuously explore emerging technologies to create solutions that anticipate and meet the evolving needs of our clients."
    },
    {
      icon: "bi bi-shield-check",
      bgColor: "bg-success",
      title: "Versatility",
      description: "We don't limit ourselves. Whatever software you need—mobile, web, WordPress, or marketing—we deliver."
    },
    {
      icon: "bi bi-people",
      bgColor: "bg-warning",
      title: "Client Success",
      description: "We measure our success by the success of our clients, providing exceptional support and ensuring their objectives are achieved."
    },
    {
      icon: "bi bi-gear",
      bgColor: "bg-info",
      title: "Excellence",
      description: "We strive for perfection in every project, delivering quality solutions that exceed expectations and stand the test of time."
    },
    {
      icon: "bi bi-globe",
      bgColor: "bg-purple",
      title: "Impact",
      description: "We're committed to creating technology that makes a meaningful difference in businesses and contributes to Nigeria's digital economy."
    },
    {
      icon: "bi bi-graph-up-arrow",
      bgColor: "bg-danger",
      title: "Continuous Growth",
      description: "We foster a learning culture, encouraging innovation and professional development to stay at the forefront of technology."
    }
  ];

  return (
    <div className="core-values-page">
      {/* Hero Section */}
      <section className="position-relative overflow-hidden bg-gradient-primary py-6 py-md-8">
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary" style={{ opacity: 0.1 }}></div>
        </div>
        
        <div className="container position-relative z-2 py-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <Link href="/About" className="text-white-80 text-decoration-none mb-4 d-inline-block">
                <i className="bi bi-arrow-left me-2"></i>
                Back to About Us
              </Link>
              <h1 className="display-4 fw-bold text-white mb-4">
                Our Core Values
              </h1>
              <p className="lead text-white-80">
                The principles that guide our culture and drive our commitment to excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-6 py-md-8">
        <div className="container">
          <div className="row g-4">
            {values.map((value, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card border-0 shadow-sm h-100 hover-lift">
                  <div className="card-body p-5">
                    <div className={`${value.bgColor} text-white rounded-3 p-3 mb-4 d-inline-block`}>
                      <i className={`${value.icon} fs-2`}></i>
                    </div>
                    <h4 className="text-dark mb-3">{value.title}</h4>
                    <p className="text-muted mb-0">{value.description}</p>
                  </div>
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
                Values That Matter
              </h2>
              <p className="lead text-white-80 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                Experience the difference our values make in every project
              </p>
              <Link href="/contact" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
                <i className="bi bi-chat-dots me-2"></i>
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoreValuesPage;