
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  LineChart, 
  Zap, 
  CheckCircle, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Auto-sync UPI Transactions",
      description: "Connect your UPI wallets once and let us automatically track and categorize all transactions."
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Real-time Insights",
      description: "View interactive charts and analytics to understand where your money goes, as it happens."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Secure & Private",
      description: "Bank-level encryption ensures your financial data stays protected and private."
    }
  ];
  
  const testimonials = [
    {
      name: "Rahul M.",
      role: "Product Manager",
      comment: "I was spending way too much without realizing it. This app helped me save ₹15,000 in just 3 months!",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    {
      name: "Priya S.",
      role: "Designer",
      comment: "The automatic categorization is spot on! I finally understand my spending patterns without any effort.",
      avatar: "https://i.pravatar.cc/100?img=5"
    },
    {
      name: "Aditya K.",
      role: "Student",
      comment: "Perfect for managing my college expenses. The budget alerts have saved me from overspending countless times.",
      avatar: "https://i.pravatar.cc/100?img=3"
    }
  ];
  
  const trustedBy = [
    "Google Pay",
    "PhonePe",
    "Paytm",
    "Amazon Pay",
    "BHIM UPI"
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                UPI Guardian
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">Features</a>
              <a href="#demo" className="text-foreground/70 hover:text-foreground transition-colors">Demo</a>
              <a href="#testimonials" className="text-foreground/70 hover:text-foreground transition-colors">Testimonials</a>
              <Link to="/auth">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
            
            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-3 animate-fade-in">
              <a 
                href="#features" 
                className="block px-2 py-2 rounded-md hover:bg-accent/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#demo" 
                className="block px-2 py-2 rounded-md hover:bg-accent/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </a>
              <a 
                href="#testimonials" 
                className="block px-2 py-2 rounded-md hover:bg-accent/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <div className="pt-2 space-y-2">
                <Link to="/auth" className="block">
                  <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Button>
                </Link>
                <Link to="/auth" className="block">
                  <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              className="flex-1 md:pr-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Track. Analyze. Save.
                </span>
                <br /> 
                Your UPI Expenses, Smarter.
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8">
                The smart expense tracker designed for Indian UPI users. See where your money goes, set budgets, and save more - all automatically.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="#demo">
                  <Button size="lg" variant="outline">
                    See Demo
                  </Button>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <CheckCircle className="text-primary h-5 w-5 mr-2" />
                <span className="text-sm text-foreground/70">No credit card required</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full aspect-[4/3] bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-1 backdrop-blur-sm bg-card/40 border border-white/10 rounded-2xl overflow-hidden shadow-inner">
                  {/* App dashboard mockup */}
                  <img 
                    src="https://placehold.co/600x400/3B82F6/FFFFFF/png?text=UPI+Guardian+App&font=montserrat" 
                    alt="UPI Guardian App Dashboard"
                    className="w-full h-full object-cover rounded-2xl opacity-90"
                  />
                </div>
                
                {/* Floating elements for visual appeal */}
                <div className="absolute top-5 right-5 h-12 w-28 bg-white/20 backdrop-blur-md rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 h-16 w-64 bg-white/20 backdrop-blur-md rounded-lg animate-pulse delay-300"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-16 -right-16 h-64 w-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -bottom-20 -left-20 h-80 w-80 bg-accent/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <a href="#features">
              <ChevronDown className="h-8 w-8 text-primary/80" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground/60">Seamlessly connects with</h2>
          </div>
          <div className="flex justify-center flex-wrap gap-8 md:gap-16">
            {trustedBy.map((service, idx) => (
              <motion.div 
                key={idx}
                className="text-xl font-medium text-foreground/80 hover:text-primary transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {service}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose UPI Guardian?
            </motion.h2>
            <motion.p 
              className="text-xl text-foreground/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The most powerful and intuitive expense tracker built specifically for Indian UPI users
            </motion.p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="feature-card p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors hover:shadow-md"
                variants={fadeInUp}
              >
                <div className="mb-5 p-3 rounded-xl bg-primary/10 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section id="demo" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See How Easy It Is</h2>
              <p className="text-xl text-foreground/80 mb-6">
                With just a few taps, set up your account, connect your UPI apps, and start tracking your expenses automatically.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Quick sign-up with Google or email",
                  "Sync with PhonePe, GPay, and other UPI apps",
                  "Automatic categorization of transactions",
                  "Create custom budgets with smart alerts"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth">
                <Button size="lg">
                  Try It Now
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative bg-card overflow-hidden rounded-xl border shadow-lg aspect-video">
                {/* Here you would ideally add a GIF or video demo */}
                <img 
                  src="https://placehold.co/800x450/3B82F6/FFFFFF/png?text=App+Demo&font=montserrat" 
                  alt="UPI Guardian App Demo"
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                  <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary transition-colors">
                    <div className="h-0 w-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Join thousands of happy users who've transformed how they manage their UPI expenses
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full p-6 bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80 italic">"{testimonial.comment}"</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, starIdx) => (
                      <svg 
                        key={starIdx} 
                        className="h-5 w-5 text-primary" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your UPI Expenses?</h2>
            <p className="text-xl mb-8">Join thousands of users who have already transformed their financial habits.</p>
            <Link to="/auth">
              <Button size="lg" className="mb-4 px-8">
                Get Started Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <p className="text-foreground/60">No credit card required. Free to get started.</p>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-12 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">UPI Guardian</h3>
              <p className="text-foreground/70 mb-4">Your smart financial companion for UPI transactions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-foreground/70 hover:text-primary">Features</a></li>
                <li><a href="#demo" className="text-foreground/70 hover:text-primary">Demo</a></li>
                <li><a href="#testimonials" className="text-foreground/70 hover:text-primary">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-foreground/70">support@upiguardian.com</li>
                <li className="text-foreground/70">+91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 mb-4 md:mb-0">© 2023 UPI Guardian. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.055 10.055 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link to="/auth">
          <Button className="shadow-lg animate-bounce">
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
