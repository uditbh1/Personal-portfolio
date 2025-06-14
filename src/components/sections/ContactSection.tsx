
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactDetails } from "@/data/portfolioData";
import { Mail, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Placeholder submit handler
  async function onSubmit(data: ContactFormValues) {
    // In a real app, you'd send this data to a backend API
    console.log("Form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset(); // Reset form after submission
  }

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-12 text-center">
          Get In Touch
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg rounded-lg bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-accent mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${contactDetails.email}`} className="text-foreground hover:text-primary transition-colors">
                    {contactDetails.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-accent mr-4" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="text-foreground hover:text-primary transition-colors">
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Social Media</p>
                <div className="flex space-x-3">
                  {contactDetails.socials.map((social) => (
                    <Button key={social.name} variant="outline" size="icon" asChild>
                      <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                        <social.icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground pt-4">
                Feel free to reach out via email, phone, or connect with me on social media. I&apos;m always open to discussing new projects, creative ideas, or opportunities.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-background" />
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
                          <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." rows={5} {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full shadow-md" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
