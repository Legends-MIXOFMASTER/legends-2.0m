import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Conditionally import animations - these will be optional
let gsap: any;
let ScrollTrigger: any;

// UI Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { bookingsApi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { animations } from "@/utils/animations";

// Icons
import { Calendar, Users, Clock, Briefcase, GraduationCap, Calendar as CalendarIcon, CheckCircle } from "lucide-react";

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  date: z.string().min(1, { message: "Please select a date" }),
  service: z.string().min(1, { message: "Please select a service" }),
  details: z.string().min(10, { message: "Please provide more details about your request" }),
  guests: z.string().optional(),
  experience: z.string().optional(),
  program: z.string().optional(),
  company: z.string().optional(),
  goals: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function BookingSection() {
  const [activeTab, setActiveTab] = useState("hol");
  const { toast } = useToast();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  
  // Refs for animation elements
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Initialize animations (if available)
  useEffect(() => {
    // Try to load GSAP dynamically
    const initAnimations = async () => {
      try {
        // Attempt to dynamically import GSAP - will fail gracefully if not installed
        const gsapModule = await import('gsap').catch(() => null);
        const scrollTriggerModule = await import('gsap/ScrollTrigger').catch(() => null);
        
        if (gsapModule && scrollTriggerModule) {
          gsap = gsapModule.gsap;
          ScrollTrigger = scrollTriggerModule.ScrollTrigger;
          
          // Register ScrollTrigger plugin
          gsap.registerPlugin(ScrollTrigger);
          
          // Animate the booking section when it comes into view
          if (sectionRef.current && headingRef.current && descriptionRef.current && tabsRef.current) {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              }
            });
            
            timeline
              .from(headingRef.current, { y: 30, opacity: 0, duration: 0.6 })
              .from(descriptionRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
              .from(tabsRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
              .from(formRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");
          }
        } else {
          console.log('GSAP animations not available - using static layout');
        }
      } catch (error) {
        console.log('Animation libraries not available - using static layout');
      }
    };
    
    initAnimations();
    
    // Cleanup
    return () => {
      if (ScrollTrigger?.getAll) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);  // Run once on mount

  const holForm = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: user?.fullName || "",
      email: user?.email || "",
      phone: "", // No phone in User type, left empty
      date: "",
      service: "",
      details: "",
      guests: "",
    },
  });

  const locForm = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: user?.fullName || "",
      email: user?.email || "",
      phone: "", // No phone in User type, left empty
      date: "",
      service: "",
      details: "",
      company: "",
    },
  });

  const nbmForm = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: user?.fullName || "",
      email: user?.email || "",
      phone: "", // No phone in User type, left empty
      date: "",
      service: "",
      details: "",
      experience: "",
      program: "",
      goals: "",
    },
  });

  // Effect to update form values when user data changes
  useEffect(() => {
    if (user && isAuthenticated) {
      // Update all forms with user data when authenticated
      holForm.setValue('name', user.fullName || '');
      holForm.setValue('email', user.email || '');
      
      locForm.setValue('name', user.fullName || '');
      locForm.setValue('email', user.email || '');
      
      nbmForm.setValue('name', user.fullName || '');
      nbmForm.setValue('email', user.email || '');
    }
  }, [user, isAuthenticated, holForm, locForm, nbmForm]);

  // Function to determine which form to use based on active tab
  const getActiveForm = () => {
    switch(activeTab) {
      case "hol": return holForm;
      case "loc": return locForm;
      case "nbm": return nbmForm;
      default: return holForm;
    }
  };
  
  // Get service options based on brand
  const getServiceOptions = (brand: string) => {
    switch(brand) {
      case "hol":
        return [
          { value: "bar-services", label: "Mobile Bar Services" },
          { value: "cocktail-catering", label: "Cocktail Catering" },
          { value: "corporate-events", label: "Corporate Events" },
          { value: "private-parties", label: "Private Parties" },
        ];
      case "loc":
        return [
          { value: "mixology-workshops", label: "Mixology Workshops" },
          { value: "menu-design", label: "Menu Design & Development" },
          { value: "bar-consulting", label: "Bar Consulting" },
          { value: "product-launch", label: "Product Launch Events" },
        ];
      case "nbm":
        return [
          { value: "bartender-training", label: "Bartender Training" },
          { value: "certification", label: "Certification Programs" },
          { value: "corporate-training", label: "Corporate Training" },
          { value: "hospitality-education", label: "Hospitality Education" },
        ];
      default:
        return [];
    }
  };
  
  // Use React Query mutation for booking submission
  const bookingMutation = useMutation<any, Error, { values: BookingFormValues; brand: string }>({  
    mutationFn: async (data: { values: BookingFormValues; brand: string }) => {
      const bookingData = {
        ...data.values,
        brand: data.brand,
        type: data.brand === "hol" ? "event" : data.brand === "loc" ? "service" : "training",
        // Include user ID if authenticated
        userId: isAuthenticated && user ? user.id : undefined,
      };
      
      try {
        return await bookingsApi.createBooking(bookingData);
      } catch (error) {
        console.error('Error creating booking:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to create booking');
      }
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Booking submitted!",
        description: "We will contact you shortly to confirm your booking.",
      });
      
      // Reset the appropriate form
      const { brand } = variables;
      if (brand === "hol") holForm.reset();
      if (brand === "loc") locForm.reset();
      if (brand === "nbm") nbmForm.reset();
    },
    onError: (error: any) => {
      // Extract error message from the error object
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'There was a problem submitting your booking.';
      
      toast({
        title: "Booking Failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Booking error:", error);
    }
  });
  
  const onSubmit = async (values: BookingFormValues, brand: string) => {
    bookingMutation.mutate({ values, brand });
  };

  return (
    <section 
      id="booking" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-light to-white"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 
          ref={headingRef}
          className="text-4xl font-display font-bold text-center mb-6 text-primary">
          Book Your Experience
        </h2>
        <p 
          ref={descriptionRef}
          className="text-xl text-center text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Ready to elevate your event or enhance your skills? Choose your desired service below and let us craft an unforgettable experience tailored just for you.
        </p>
          
          {/* Authentication Status Indicator */}
          {!authLoading && (
            <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
              {isAuthenticated ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Logged in as {user?.username}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  <span>Not logged in - Create an account to save your bookings</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Booking Tabs */}
        <div ref={tabsRef} className="mb-12">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-3 mb-8 h-14">
              <TabsTrigger 
                value="hol"
                className="text-base data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                House of Legends
              </TabsTrigger>
              <TabsTrigger 
                value="loc"
                className="text-base data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Legends of Cocktails
              </TabsTrigger>
              <TabsTrigger 
                value="nbm"
                className="text-base data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Namibia Bartending
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* House of Legends Form */}
        <TabsContent value="hol" className="mt-0">
          <Form {...holForm}>
            <form onSubmit={holForm.handleSubmit((values) => onSubmit(values, "hol"))} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={holForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={holForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={holForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={holForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={holForm.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Required</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="signature-cocktails">Signature Cocktail Experiences</SelectItem>
                          <SelectItem value="pre-mixed">Pre-Mixed Cocktails & Batches</SelectItem>
                          <SelectItem value="guest-bartender">Guest Bartender & Brand Collaboration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={holForm.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={holForm.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Details</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-hover text-white py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                  disabled={holForm.formState.isSubmitting}
                >
                  {holForm.formState.isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Now
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        {/* Legends of Cocktails Form */}
        <TabsContent value="loc" className="mt-0">
          <Form {...locForm}>
            <form onSubmit={locForm.handleSubmit((values) => onSubmit(values, "loc"))} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={locForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={locForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={locForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={locForm.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Venue Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={locForm.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Required</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mobile-bar">Mobile Bar Setup & Staffing</SelectItem>
                          <SelectItem value="consulting">Beverage & Menu Consulting</SelectItem>
                          <SelectItem value="staff-training">Onsite Staff Training</SelectItem>
                          <SelectItem value="equipment">Equipment Supply & Setup</SelectItem>
                          <SelectItem value="freelancer">Register as Freelancer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={locForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={locForm.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-accent hover:bg-accent-hover text-white py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                  disabled={locForm.formState.isSubmitting}
                >
                  {locForm.formState.isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Briefcase className="mr-2 h-5 w-5" />
                      Request Consultation
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        {/* Namibian Bar Masters Form */}
        <TabsContent value="nbm" className="mt-0">
          <Form {...nbmForm}>
            <form onSubmit={nbmForm.handleSubmit((values) => onSubmit(values, "nbm"))} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={nbmForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={nbmForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={nbmForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={nbmForm.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No experience</SelectItem>
                          <SelectItem value="0-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={nbmForm.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Interest</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="training">Bartender Training & Certification</SelectItem>
                          <SelectItem value="monthly">Monthly Classes</SelectItem>
                          <SelectItem value="lodge">Lodge & Hotel Training Package</SelectItem>
                          <SelectItem value="database">Join Bartenders Database</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={nbmForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={nbmForm.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Goals</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary-hover text-white py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                  disabled={nbmForm.formState.isSubmitting}
                >
                  {nbmForm.formState.isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        {bookingMutation.status === 'pending' && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-card border border-gray-100">
              <div className="flex flex-col items-center pt-6">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-6">
                  <Spinner className="text-primary h-10 w-10" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Submitting your booking...</h3>
                <p className="text-neutral-500 text-center">Please wait while we process your request.</p>
              </div>
            </div>
          </div>
        )}
        
        {bookingMutation.status === 'success' && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-card border border-gray-100">
              <div className="flex flex-col items-center pt-6">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-6">
                  <CheckCircle className="text-green-600 h-10 w-10" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Booking Submitted!</h3>
                <p className="text-neutral-500 text-center mb-6">Thank you for your booking. We'll be in touch with you shortly.</p>
                <Button onClick={() => bookingMutation.reset()} className="px-8">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {!authLoading && (
          <div className="mt-10 text-center">
            <div ref={formRef} className="bg-white rounded-xl shadow-card p-10 mb-12 transition-all duration-300 inline-block">
              <p className="text-accent font-medium">
                {isAuthenticated 
                  ? "Your booking will be associated with your account for easy tracking."
                  : "Create an account or login to track your bookings and get personalized service."}
              </p>
              {!isAuthenticated && (
                <Button variant="outline" asChild className="mt-4 border-accent text-accent hover:bg-accent hover:text-white">
                  <a href="/login">Sign In / Register</a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
