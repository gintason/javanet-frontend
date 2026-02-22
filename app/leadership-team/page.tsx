"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const LeadershipTeamPage = () => {
  const team = [
    {
      name: "Ginta Peterson",
      role: "Chief Executive Officer",
      roleColor: "text-primary",
      gradient: "rgba(65, 88, 208, 0.3), rgba(200, 80, 192, 0.3), rgba(255, 204, 112, 0.3)",
      shadow: "rgba(65, 88, 208, 0.3)",
      image: "/images/team/team1.png",
      bio: "Visionary leader with 10+ years in software development and strategic business growth across Africa."
    },
    {
      name: "Chinedu Chaz",
      role: "Chief Technology Officer",
      roleColor: "text-success",
      gradient: "rgba(17, 153, 142, 0.3), rgba(56, 239, 125, 0.3)",
      shadow: "rgba(17, 153, 142, 0.3)",
      image: "/images/team/team2.png",
      bio: "Tech innovator specializing in full-stack development, AI, and scalable software architecture with 15+ experience."
    },
    {
      name: "Abubakar Ibrahim",
      role: "Head of Operations",
      roleColor: "text-warning",
      gradient: "rgba(250, 139, 255, 0.3), rgba(43, 210, 255, 0.3), rgba(43, 255, 136, 0.3)",
      shadow: "rgba(250, 139, 255, 0.3)",
      image: "/images/team/team3.png",
      bio: "Expert in project delivery with deep understanding of local market needs and business challenges."
    }
  ];

  return (
    <div className="leadership-team-page">
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
                Our Leadership Team
              </h1>
              <p className="lead text-white-80">
                Meet the experts behind JavaNet ICT Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-6 py-md-8">
        <div className="container">
          <style jsx>{`
            @keyframes softPulse {
              0%, 100% {
                opacity: 0.2;
                transform: translate(-50%, -50%) scale(1);
              }
              50% {
                opacity: 0.3;
                transform: translate(-50%, -50%) scale(1.05);
              }
            }
          `}</style>
          
          <div className="row g-5">
            {team.map((member, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card border-0 shadow-sm hover-lift">
                  <div className="card-body p-4 text-center">
                    <div className="position-relative mb-4">
                      {/* Animated colored background circle */}
                      <div className="position-absolute top-50 start-50 translate-middle" style={{ 
                        width: '180px', 
                        height: '180px', 
                        background: `radial-gradient(circle at 30% 30%, ${member.gradient})`,
                        borderRadius: '50%',
                        filter: 'blur(5px)',
                        animation: 'softPulse 4s ease-in-out infinite',
                        animationDelay: `${index * 0.5}s`,
                        zIndex: 1
                      }}></div>
                      
                      {/* Image container */}
                      <div className="rounded-circle overflow-hidden mx-auto position-relative" style={{ 
                        width: '150px', 
                        height: '150px',
                        border: '3px solid white',
                        boxShadow: `0 15px 35px ${member.shadow}`,
                        zIndex: 2
                      }}>
                        <Image 
                          src={member.image}
                          alt={member.name}
                          width={150}
                          height={150}
                          className="object-fit-cover"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                    <h4 className="text-dark mb-2">{member.name}</h4>
                    <p className={`${member.roleColor} mb-3`}>{member.role}</p>
                    <p className="text-muted small mb-4">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-6 py-md-8 bg-light">
        <div className="container">
          <div className="card border-0 shadow-5 bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-5 p-md-7 text-center">
              <h2 className="display-6 fw-bold text-white mb-3">
                Join Our Team
              </h2>
              <p className="lead text-white-80 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                We're always looking for talented individuals to join our growing team
              </p>
              <Link href="#" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
                <i className="bi bi-briefcase me-2"></i>
                View Careers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipTeamPage;