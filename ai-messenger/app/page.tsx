import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, Send, Users, Image, Search, DivideIcon as LucideIcon, Clock, Settings } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 md:px-6 border-b">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <span className="font-bold text-xl">MessengerX</span>
          </div>
          <div className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
          <div>
            <Button asChild>
              <Link href="/chat">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect with friends and colleagues <span className="text-primary">instantly</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A beautiful, intuitive messaging platform designed for seamless communication across all your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8">
                <Link href="/chat">
                  Start Messaging
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link href="#">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section id="features" className="py-16 bg-muted/50 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose MessengerX</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Designed with your needs in mind, our messaging platform offers features that make staying connected effortless.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Feature 
                icon={Send}
                title="Real-time Messaging"
                description="Send and receive messages instantly with read receipts and typing indicators."
              />
              <Feature 
                icon={Users}
                title="Group Conversations"
                description="Create group chats for teams, projects, or friends to collaborate efficiently."
              />
              <Feature 
                icon={Image}
                title="Media Sharing"
                description="Share photos, documents, and files easily with drag-and-drop functionality."
              />
              <Feature 
                icon={Search}
                title="Powerful Search"
                description="Find any message, file, or conversation with our advanced search capabilities."
              />
              <Feature 
                icon={Clock}
                title="Message History"
                description="Access your complete conversation history anytime, from any device."
              />
              <Feature 
                icon={Settings}
                title="Customization"
                description="Personalize your chat experience with themes, notifications, and preferences."
              />
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users already enjoying our messaging platform. Sign up today and experience the difference.
            </p>
            <Button asChild size="lg" className="px-8">
              <Link href="/chat">
                Start Messaging Now
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <MessageSquare className="h-5 w-5" />
              <span className="font-bold">MessengerX</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help
              </Link>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © 2025 MessengerX. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}