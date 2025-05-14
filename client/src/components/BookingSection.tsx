import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

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

  const holForm = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      service: "",
      details: "",
      guests: "",
    },
  });

  const locForm = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      service: "",
      details: "",
      company: "",
    },
  });

  const nbmForm = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      service: "",
      details: "",
      experience: "",
      program: "",
      goals: "",
    },
  });

  const onSubmit = async (values: BookingFormValues, brand: string) => {
    try {
      await apiRequest("POST", "/api/bookings", {
        ...values,
        brand,
        type: brand === "hol" ? "event" : brand === "loc" ? "service" : "training",
      });
      
      toast({
        title: "Booking submitted!",
        description: "We will contact you shortly to confirm your booking.",
      });
      
      // Reset the form
      if (brand === "hol") holForm.reset();
      if (brand === "loc") locForm.reset();
      if (brand === "nbm") nbmForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="book-now" className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Book Our Services</h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto">
            Fill out the form below to book our services or request more information.
          </p>
        </div>

        {/* Booking Tabs */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-wrap border-b">
            <button 
              className={`px-6 py-4 font-medium border-b-2 focus:outline-none ${
                activeTab === "hol" 
                  ? "text-primary border-primary" 
                  : "text-neutral border-transparent hover:text-primary hover:border-primary/30"
              }`} 
              onClick={() => setActiveTab("hol")}
            >
              House of Legends
            </button>
            <button 
              className={`px-6 py-4 font-medium border-b-2 focus:outline-none ${
                activeTab === "loc" 
                  ? "text-primary border-primary" 
                  : "text-neutral border-transparent hover:text-primary hover:border-primary/30"
              }`} 
              onClick={() => setActiveTab("loc")}
            >
              Legends of Cocktails
            </button>
            <button 
              className={`px-6 py-4 font-medium border-b-2 focus:outline-none ${
                activeTab === "nbm" 
                  ? "text-primary border-primary" 
                  : "text-neutral border-transparent hover:text-primary hover:border-primary/30"
              }`} 
              onClick={() => setActiveTab("nbm")}
            >
              Namibian Bar Masters
            </button>
          </div>

          {/* House of Legends Form */}
          <div className={`p-8 ${activeTab === "hol" ? "block" : "hidden"}`}>
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
                    className="bg-primary hover:bg-opacity-90 text-white py-6 px-8"
                    disabled={holForm.formState.isSubmitting}
                  >
                    {holForm.formState.isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Legends of Cocktails Form */}
          <div className={`p-8 ${activeTab === "loc" ? "block" : "hidden"}`}>
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
                    className="bg-accent hover:bg-opacity-90 text-white py-6 px-8"
                    disabled={locForm.formState.isSubmitting}
                  >
                    {locForm.formState.isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Namibian Bar Masters Form */}
          <div className={`p-8 ${activeTab === "nbm" ? "block" : "hidden"}`}>
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
                    className="bg-secondary hover:bg-opacity-90 text-white py-6 px-8"
                    disabled={nbmForm.formState.isSubmitting}
                  >
                    {nbmForm.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
