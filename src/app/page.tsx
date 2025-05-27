import { AppHeader } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { MessageSquareHeart } from 'lucide-react';
import Link from 'next/link';

export default function InteractiveHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl w-full bg-card p-10 rounded-xl shadow-2xl border border-border">
          <MessageSquareHeart size={72} className="mx-auto text-primary mb-8" />
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Welcome to DeepTalk
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Your AI companion for empathetic emotional support. DeepTalk is here to listen, understand, and offer supportive responses designed to help you explore your thoughts and feelings in a safe, private, and non-judgmental space.
          </p>
          <p className="text-md text-muted-foreground mb-12">
            Our conversations aim to gently guide you using principles inspired by Cognitive Behavioral Therapy (CBT), encouraging reflection and self-awareness.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
            <Link href="/chat">Start Chatting</Link>
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Remember, DeepTalk is not a replacement for professional therapy. If you are in crisis, please seek help from a qualified professional.
        </p>
      </main>
      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border">
        &copy; {new Date().getFullYear()} DeepTalk. Your privacy is respected. No chat data is stored.
      </footer>
    </div>
  );
}
