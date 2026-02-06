import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Search,
  Brain,
  FileCheck,
  Users,
  Shield,
  Sparkles,
  CheckCircle,
  MapPin,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Our AI scans 500+ government schemes to find the ones that match your profile perfectly.",
    },
    {
      icon: Brain,
      title: "AI Eligibility Engine",
      description: "Get instant eligibility scores with detailed criteria matching and confidence levels.",
    },
    {
      icon: FileCheck,
      title: "Easy Applications",
      description: "Apply to multiple schemes with auto-filled forms and document management.",
    },
    {
      icon: MapPin,
      title: "Office Locator",
      description: "Find nearby government offices with directions and appointment scheduling.",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Enter your details like age, income, location, and occupation. We keep your data secure.",
    },
    {
      step: 2,
      title: "AI Analyzes Eligibility",
      description: "Our engine matches your profile against eligibility rules of 500+ schemes instantly.",
    },
    {
      step: 3,
      title: "Get Recommendations",
      description: "Receive a ranked list of schemes you're eligible for with match percentages.",
    },
    {
      step: 4,
      title: "Apply & Track",
      description: "Submit applications directly and track their status in real-time.",
    },
  ];

  const stats = [
    { value: "500+", label: "Government Schemes" },
    { value: "10M+", label: "Citizens Helped" },
    { value: "95%", label: "Accuracy Rate" },
    { value: "24/7", label: "AI Assistance" },
  ];

  const testimonials = [
    {
      quote: "I discovered a pension scheme I never knew I was eligible for. The application process was seamless.",
      name: "Ramesh Kumar",
      role: "Senior Citizen, Delhi",
      avatar: "RK",
    },
    {
      quote: "As an NGO, this platform helps us assist 10x more beneficiaries with scheme applications.",
      name: "Priya Sharma",
      role: "NGO Coordinator",
      avatar: "PS",
    },
    {
      quote: "The AI eligibility checker saved me hours of research. Highly recommend for students.",
      name: "Amit Singh",
      role: "Student, Maharashtra",
      avatar: "AS",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient opacity-95" />
        <div className="absolute inset-0 bg-pattern" />
        
        <div className="relative section-container py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <Badge variant="secondary" className="mb-6 gap-1.5 bg-white/10 text-white border-white/20">
                <Sparkles className="h-3 w-3" />
                AI-Powered Government Benefits
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Discover Benefits
                <br />
                <span className="text-accent">You Deserve</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Benefits GPS uses AI to match you with government welfare schemes 
                you're eligible for. Find, apply, and track—all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/eligibility-check">
                  <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                    Check My Eligibility
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/schemes">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                    Browse All Schemes
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-white/70">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">100% Secure</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">10M+ Users</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Award className="h-5 w-5" />
                  <span className="text-sm">Govt. Verified</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden lg:block animate-slide-up delay-200">
              <img
                src={heroIllustration}
                alt="Benefits GPS AI Platform"
                className="w-full rounded-2xl shadow-floating"
              />
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 100V50C240 0 480 0 720 25C960 50 1200 75 1440 50V100H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background relative -mt-1">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge variant="category" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Benefits GPS?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform simplifies the complex world of government welfare schemes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-interactive p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge variant="category" className="mb-4">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Benefits GPS Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to discover and apply for government benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-border">
                    <ChevronRight className="absolute -right-3 -top-2.5 h-6 w-6 text-accent" />
                  </div>
                )}
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-glow">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg" className="group">
                Get Started Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <Badge variant="category" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Millions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Benefits GPS has helped citizens across India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="card-elevated p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-warning"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="relative section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Discover Your Benefits?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join millions of citizens who have found government schemes they're eligible for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/eligibility-check">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Check Eligibility Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
