# JavaNet EdTech Suite - Next.js Frontend

## Project Overview

Frontend for JavaNet EdTech Suite - A white-label, customizable education technology platform with one-time deployment fees.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Bootstrap 5 + Custom CSS
- **HTTP Client:** Axios
- **State Management:** React Hooks + Context API
- **Authentication:** JWT (with Django backend)

## Project Structure

frontend/
├── src/
│ ├── app/ # Next.js 13+ app router
│ │ ├── page.tsx # Homepage
│ │ ├── layout.tsx # Root layout
│ │ ├── solutions/ # Solutions pages
│ │ ├── customization/ # Customization page
│ │ ├── demo/ # Demo simulator page
│ │ ├── proposal/ # Proposal generator
│ │ ├── About/ # About Us Page
│ │ ├── contact/ # Contact page
│ │ ├── login/ # Login page
│ │ └── register/ # Registration page
│ ├── components/ # Reusable components
│ │ ├── Navbar.tsx
│ │ ├── Footer.tsx
│ │ ├── Chatbot.tsx # JN Assistant
│ │ ├── FeatureCard.tsx
│ │ ├── TestimonialCard.tsx
│ │ ├── HeroSection.tsx
│ │ ├── PlatformPreview.tsx
│ │ ├── ProposalForm.tsx
│ │ └── DemoSimulator.tsx
│ ├── hooks/ # Custom React hooks
│ │ ├── useAuth.ts
│ │ ├── useApi.ts
│ │ ├── useCurrency.ts
│ │ └── useChatbot.ts
│ ├── utils/ # Utility functions
│ │ ├── api.ts # Axios instance
│ │ ├── constants.ts
│ │ └── helpers.ts
│ ├── types/ # TypeScript types
│ │ └── index.ts
│ └── styles/ # CSS styles
│ └── globals.css
├── .env.local # Environment variables
├── package.json
└── README.md

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Django backend running on `http://localhost:8080`

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd frontend

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your settings

Environment Variables

NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Features Implemented

1. Authentication System
   JWT-based authentication with token refresh

Login/Register pages

Protected routes (when implemented)

User profile management

2. AI Features Integration
   JN Assistant Chatbot: AI-powered customer support

Proposal Generator: Custom proposals with one-time deployment fees

Demo Simulator: Interactive platform preview

3. Platform Modules
   CBT Testing System: Computer-based testing features

Live Classroom Platform: Interactive virtual classrooms

Customization Options: White-label branding

4. Business Logic
   Currency detection (NGN/USD)

One-time fee calculation (₦5-10M Africa, $10K International)

Proposal generation with custom quotes

5. Responsive Design
   Mobile-first approach

Bootstrap 5 components

Custom CSS with CSS variables

API Integration
The frontend connects to these Django backend endpoints:

Authentication: /api/auth/

Chatbot: /api/chat/send/

Proposals: /api/proposals/generate/

Demo Simulator: /api/demo/platform/

Features: /api/features/

Testimonials: /api/testimonials/

Currency Detection: /api/currency/detect/

Deployment

Deployment Options
Vercel (Recommended for Next.js)

AWS Amplify

Netlify

Self-hosted with Node.js

Development Notes
TypeScript Configuration
All components are written in TypeScript with strict type checking. The types are defined in src/types/index.ts based on Django serializers.

Styling Approach
Bootstrap 5 for base components and grid system

Custom CSS in globals.css for project-specific styles

CSS variables for consistent theming

State Management
React hooks for local state

Context API for global state (Auth)

Custom hooks for API calls and business logic

Error Handling
Global error handling with Axios interceptors

User-friendly error messages

Loading states for all async operations

Project Status
✅ Completed:

All page components

All feature components

Authentication system

API integration hooks

TypeScript types

Responsive design

🚀 Ready for:

Connecting to Django backend

Testing API endpoints

Custom styling adjustments

Deployment

Contact
For support or questions:

Email: info@javanetict.com

Phone: +234 703 067 3089

Website: www.javanetict.com

text

## **Summary**

I have now created **ALL** the frontend components and pages according to your exact project structure. Here's what's been completed:

### **✅ Complete Frontend Structure:**

1. **Utility Files** (`utils/`) - API, constants, helpers
2. **Custom Hooks** (`hooks/`) - Auth, API, Currency, Chatbot
3. **TypeScript Types** (`types/`) - Based on your Django models
4. **Global Styles** (`styles/`) - Bootstrap 5 + custom CSS
5. **Layout Components** - Navbar, Footer, Layout, Auth Context
6. **Feature Components** - All 9 components as specified
7. **Page Components** - All 7 pages as specified
8. **README Documentation** - Complete setup guide

### **✅ Key Features Implemented:**

- **Authentication System** with JWT
- **AI Chatbot** integration (JN Assistant)
- **Proposal Generator** with one-time fee calculation
- **Demo Simulator** with interactive preview
- **Currency Detection** (NGN/USD)
- **Responsive Design** with Bootstrap 5
- **TypeScript** for type safety
- **API Integration** with your Django endpoints

### **🚀 Ready for Next Steps:**

1. **Install dependencies:** Run `npm install` in your frontend folder
2. **Set environment variables:** Create `.env.local` with API URL
3. **Start Django backend:** Ensure it's running on `http://localhost:8080`
4. **Start Next.js:** Run `npm run dev`
5. **Test integration:** Verify all API endpoints work

Your frontend is now 100% ready to connect with your Django backend! All you need to do is install dependencies and run the development server.
