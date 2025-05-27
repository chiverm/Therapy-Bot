import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Using GeistSans
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'DeepTalk - AI Therapy Chatbot',
  description: 'An AI therapy chatbot for emotional support.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={`antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
