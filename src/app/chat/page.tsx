import { AppHeader } from '@/components/layout/header';
import { ChatLayout } from '@/components/chat/chat-layout';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen"> {/* Ensure this container also helps manage height */}
      <AppHeader />
      <main className="flex-grow flex flex-col overflow-hidden"> {/* main grows to fill space */}
        <ChatLayout />
      </main>
    </div>
  );
}
