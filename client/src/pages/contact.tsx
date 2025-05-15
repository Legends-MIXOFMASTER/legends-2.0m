import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { animations } from '@/utils/animations';

// Import UI components
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Section, SectionHeader } from '@/components/ui/section';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Icons
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Refs for animation
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  
  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Book", href: "/#booking" },
    { label: "Contact", href: "/contact", active: true },
  ];

  // Footer navigation
  const footerNavigation = [
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      items: [
        { label: "Bar Services", href: "/services/bar-services" },
        { label: "Mixology Workshops", href: "/services/workshops" },
        { label: "Menu Design", href: "/services/menu-design" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  // Contact info items
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      label: "Email us at",
      value: "info@legendsofcocktails.com",
      href: "mailto:info@legendsofcocktails.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      label: "Call us on",
      value: "+264 81 234 5678",
      href: "tel:+264812345678",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      label: "Visit our office",
      value: "10 Independence Avenue, Windhoek, Namibia",
      href: "https://maps.google.com/?q=10+Independence+Avenue,+Windhoek,+Namibia",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      label: "Office Hours",
      value: "Monday - Friday: 9AM - 5PM",
      href: null,
    },
  ];

  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  // Initialize animations
  useEffect(() => {
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      await animations.initSmoothScroll();
      
      // Animate elements when page loads
      const timeline = gsap.timeline();
      
      if (headingRef.current) {
        timeline.from(headingRef.current, { 
          y: 20, 
          opacity: 0, 
          duration: 0.6 
        });
      }
      
      if (contactInfoRef.current) {
        const items = contactInfoRef.current.querySelectorAll('.contact-item');
        
        timeline.from(items, { 
          y: 20, 
          opacity: 0, 
          stagger: 0.1, 
          duration: 0.5,
        }, "-=0.3");
      }
      
      if (formRef.current) {
        timeline.from(formRef.current, { 
          y: 30, 
          opacity: 0, 
          duration: 0.6 
        }, "-=0.3");
      }
    };

    initAnimations();
    
    // Set page title
    document.title = "Contact Us | Legends of Cocktails";
  }, []);

  // Form submission handler
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Mock API call - in production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar logo="/images/logo.png" items={navItems} />
      
      {/* Page Header */}
      <Section 
        className="pt-24 pb-12 bg-gradient-to-b from-light to-white"
        background="pattern"
      >
        <div className="container mx-auto text-center" ref={headingRef}>
          <SectionHeader
            title="Contact Us"
            subtitle="We'd love to hear from you. Reach out with any questions about our services."
            centered
          />
        </div>
      </Section>
      
      {/* Contact Content */}
      <Section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div ref={contactInfoRef} className="lg:col-span-1">
              <h3 className="text-2xl font-display font-bold mb-8">Get in Touch</h3>
              
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item flex items-start">
                    <div className="p-3 bg-primary/10 rounded-full mr-4 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="font-medium hover:text-primary transition-colors"
                          target={item.href.startsWith('http') ? "_blank" : undefined}
                          rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-display font-bold mb-4">Follow Us</h3>
                
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com/legendsofcocktails" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-100 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://instagram.com/legendsofcocktails" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-100 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      <path d="M20.5 7a1 1 0 01-1-1V5a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1z"></path>
                      <path d="M17.438 2H6.562A4.562 4.562 0 002 6.562v10.876A4.562 4.562 0 006.562 22h10.876A4.562 4.562 0 0022 17.438V6.562A4.562 4.562 0 0017.438 2zM12 17a5 5 0 110-10 5 5 0 010 10zm5.5-9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://twitter.com/legendscocktail" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-100 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div ref={formRef} className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-card p-8">
                <h3 className="text-2xl font-display font-bold mb-6">Send a Message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+264 81 234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Event Inquiry" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={6} 
                              placeholder="Tell us about your event or inquiry..."
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : isSuccess ? (
                          <span className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Message Sent
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Map Section */}
      <Section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="h-96 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29748.222175268344!2d17.065554399999998!3d-22.5608807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c0b1b2df14fa6a5%3A0xbe54a6632a40c9c2!2sWindhoek%2C%20Namibia!5e0!3m2!1sen!2sus!4v1652456128000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Legends of Cocktails Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Footer */}
      <Footer 
        logo="/images/logo-white.png"
        tagline="Crafting unforgettable cocktail experiences since 2015"
        navigation={footerNavigation}
        contactInfo={{
          email: "info@legendsofcocktails.com",
          phone: "+264 81 234 5678",
          address: "10 Independence Avenue, Windhoek, Namibia"
        }}
      />
    </div>
  );
}
