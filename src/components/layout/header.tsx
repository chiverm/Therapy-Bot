import Link from 'next/link';
import { MessageSquareText } from 'lucide-react';

export function AppHeader() {
  return (
    <header
      className="py-4 px-6 shadow-md bg-card text-card-foreground sticky top-0 z-50 border-b border-border"
      style={{ height: 'var(--header-height)' }} // Use CSS variable for height
    >
      <div className="container mx-auto flex items-center gap-3 h-full">
        <MessageSquareText className="h-7 w-7 text-primary" /> {/* Using Lucide icon */}
        <Link href="/" className="text-2xl font-semibold text-foreground hover:text-primary transition-colors">
          DeepTalk
        </Link>
      </div>
    </header>
  );
}
