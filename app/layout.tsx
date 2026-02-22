// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar'; // Add this import
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { AuthProvider } from '@/contexts/AuthContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import BootstrapClient from '@/components/BootstrapClient';
import PixelProvider from '@/app/PixelProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JavaNet ICT Solutions Ltd - ...Engineering Intelligent Digital Solutions',
  description: 'Customizable Computer-Based Testing (CBT) and Live Classroom Solutions for Educational Institutions. One-time deployment fee, no monthly subscriptions.',
  keywords: 'edtech, cbt testing, virtual classroom, e-learning, school management, online examination',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ChatbotProvider>
            <AnnouncementBar /> {/* Add this line - it will appear above Navbar */}
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
            <Chatbot />
            <BootstrapClient />
            <PixelProvider />
          </ChatbotProvider>
        </AuthProvider>
      </body>
    </html>
  );
}