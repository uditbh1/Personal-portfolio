"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactDetails } from "@/data/portfolioData";
import { 
  Mail, 
  Phone, 
  Send, 
  Sparkles, 
  Check, 
  Copy, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  MessageSquare,
  ArrowUpRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const TOPIC_PRESETS = [
  { 
    id: "fulltime", 
    label: "💼 Full-Time Role", 
    prompt: "Hi Udit, I came across your portfolio and would like to discuss an engineering opportunity with our team..." 
  },
  { 
    id: "collaboration", 
    label: "🚀 Project Collab", 
    prompt: "Hi Udit, I'm reaching out to explore collaborating on an innovative web/AI project..." 
  },
  { 
    id: "contract", 
    label: "🛠️ Freelance / Contract", 
    prompt: "Hi Udit, we have a development project and are looking for engineering expertise..." 
  },
  { 
    id: "general", 
    label: "☕ Quick Chat", 
    prompt: "Hi Udit, I would love to connect and chat about modern web development..." 
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [londonTime, setLondonTime] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    const updateLondonTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setLondonTime(timeString);
      } catch {
        setLondonTime("GMT/BST");
      }
    };

    updateLondonTime();
    const timer = setInterval(updateLondonTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
      toast({
        title: "Email Copied!",
        description: `${text} copied to clipboard.`,
      });
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
      toast({
        title: "Phone Copied!",
        description: `${text} copied to clipboard.`,
      });
    }
  };

  const handleSelectTopic = (topic: typeof TOPIC_PRESETS[number]) => {
    if (selectedTopic === topic.id) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic.id);
      const currentMessage = form.getValues("message");
      if (!currentMessage || TOPIC_PRESETS.some((t) => t.prompt === currentMessage)) {
        form.setValue("message", topic.prompt, { shouldValidate: true });
      }
    }
  };

  async function onSubmit(data: ContactFormValues) {
    setErrorMessage(null);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setErrorMessage(null);
        toast({
          title: "Message Dispatched!",
          description: "Thank you for reaching out. I will get back to you shortly.",
        });
        form.reset();
        setSelectedTopic(null);
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        const errorText = result.error || "Email service not configured.";
        setErrorMessage(errorText);
        toast({
          title: "Message Failed",
          description: errorText,
          variant: "destructive",
        });
      }
    } catch (error) {
      const fallbackErr = "Connection error. Please click below to send via your mail client.";
      setErrorMessage(fallbackErr);
      toast({
        title: "Connection Error",
        description: fallbackErr,
        variant: "destructive",
      });
    }
  }

  return (
    <section 
      id="contact" 
      className="py-28 bg-secondary/20 relative overflow-hidden w-full max-w-full border-t border-border/30 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Dynamic ambient background glow orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
          y: [0, -15, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -bottom-20 left-1/4 w-[500px] h-[350px] bg-[#6F8090]/15 dark:bg-[#00B3B3]/15 blur-[140px] pointer-events-none -z-10" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, -20, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute top-10 right-1/4 w-[400px] h-[300px] bg-primary/10 blur-[130px] pointer-events-none -z-10" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Header with Framer Motion scroll entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest liquid-glass-subtle text-[#6F8090] dark:text-[#00B3B3] border border-border/40 mb-3.5 shadow-sm cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Direct Transmission</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-black font-headline uppercase tracking-tight text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Available for full-time software engineering roles, high-impact consulting, and innovative technical collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
          {/* Left Column: Direct Channels & Live Status */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 rounded-2xl liquid-glass p-6 sm:p-8 border border-border/40 space-y-6 shadow-xl relative overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6F8090] via-primary/50 to-[#6F8090] dark:to-[#00B3B3]" />

            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold font-headline text-foreground">
                  Direct Channels
                </h3>
                <span className="text-[11px] font-mono text-[#6F8090] dark:text-[#00B3B3] px-2 py-0.5 rounded-md bg-[#6F8090]/10 dark:bg-[#00B3B3]/10">
                  Verified
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Click to copy address or dial directly.
              </p>
            </div>

            {/* Email Card with Interactive Copy */}
            <motion.div 
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-3.5 rounded-xl liquid-glass-subtle border border-border/40 hover:border-[#6F8090] dark:hover:border-[#00B3B3] transition-colors group"
            >
              <div className="flex items-center min-w-0 mr-2">
                <div className="p-2 rounded-lg bg-[#6F8090]/10 dark:bg-[#00B3B3]/10 text-[#6F8090] dark:text-[#00B3B3] mr-3 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="text-foreground hover:text-[#6F8090] dark:hover:text-[#00B3B3] transition-colors text-xs sm:text-sm font-semibold break-all"
                  >
                    {contactDetails.email}
                  </a>
                </div>
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2.5 text-xs shrink-0 rounded-lg hover:bg-primary/20 text-[#6F8090] dark:text-[#00B3B3] transition-all"
                onClick={() => handleCopy(contactDetails.email, "email")}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copiedEmail ? (
                    <motion.span
                      key="copied"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1 text-emerald-500 font-bold"
                    >
                      <Check className="w-3.5 h-3.5" /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Phone Card with Interactive Copy */}
            <motion.div 
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-3.5 rounded-xl liquid-glass-subtle border border-border/40 hover:border-[#6F8090] dark:hover:border-[#00B3B3] transition-colors group"
            >
              <div className="flex items-center min-w-0 mr-2">
                <div className="p-2 rounded-lg bg-[#6F8090]/10 dark:bg-[#00B3B3]/10 text-[#6F8090] dark:text-[#00B3B3] mr-3 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                    className="text-foreground hover:text-[#6F8090] dark:hover:text-[#00B3B3] transition-colors text-xs sm:text-sm font-semibold break-words"
                  >
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2.5 text-xs shrink-0 rounded-lg hover:bg-primary/20 text-[#6F8090] dark:text-[#00B3B3] transition-all"
                onClick={() => handleCopy(contactDetails.phone, "phone")}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copiedPhone ? (
                    <motion.span
                      key="copied"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1 text-emerald-500 font-bold"
                    >
                      <Check className="w-3.5 h-3.5" /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Location & Timezone Live Status */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-3.5 rounded-xl liquid-glass-subtle border border-border/40 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#6F8090] dark:text-[#00B3B3]" />
                  <span>London, United Kingdom</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground bg-neutral-100 dark:bg-white/5 px-2 py-0.5 rounded">
                  GMT / BST
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-border/20">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Local Time</span>
                </div>
                <span className="font-mono font-bold text-foreground tracking-wide text-xs">
                  {londonTime || "00:00:00"}
                </span>
              </div>
            </motion.div>

            {/* Social Channels with Spring Physics */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Profiles & Repositories
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {contactDetails.socials.map((social) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl liquid-glass-subtle border border-border/50 text-foreground/80 hover:bg-[#6F8090]/15 hover:border-[#6F8090] hover:text-[#6F8090] dark:hover:bg-[#00B3B3]/15 dark:hover:border-[#00B3B3] dark:hover:text-[#00B3B3] transition-all duration-200 group shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <social.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 shrink-0" />
                        <span className="text-xs font-semibold">{social.name}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Response Frequency Status */}
            <div className="pt-2 flex items-center gap-2.5 text-xs text-muted-foreground border-t border-border/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for hire • Guaranteed response within 24 hours</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form with Framer Motion */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 rounded-2xl liquid-glass p-6 sm:p-8 border border-border/40 shadow-xl relative overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#6F8090] dark:via-[#00B3B3] to-[#6F8090]" />

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold font-headline text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#6F8090] dark:text-[#00B3B3]" />
                  Send a Message
                </h3>
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Direct SSL Inbox
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Drop a note directly to my inbox with project or role details.
              </p>
            </div>

            {/* Quick Topic Selector Pills */}
            <div className="mb-6">
              <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 block">
                Quick Subject Intent
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPIC_PRESETS.map((topic) => {
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <motion.button
                      key={topic.id}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectTopic(topic)}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? "border-[#6F8090] dark:border-[#00B3B3] text-foreground bg-[#6F8090]/15 dark:bg-[#00B3B3]/15 font-semibold shadow-sm"
                          : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border liquid-glass-subtle"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="contactTopicHighlight"
                          className="absolute inset-0 rounded-lg bg-[#6F8090]/10 dark:bg-[#00B3B3]/10 -z-10"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span>{topic.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Success notification banner */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5 text-xs font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message delivered successfully! I will reply to your email promptly.</span>
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-semibold">{errorMessage}</p>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      You can send your message directly to <span className="font-mono font-semibold">{contactDetails.email}</span>:
                    </p>
                  </div>
                  <a
                    href={`mailto:${contactDetails.email}?subject=${encodeURIComponent("Message from " + (form.getValues("name") || "Portfolio Visitor"))}&body=${encodeURIComponent((form.getValues("message") || "") + "\n\nFrom: " + (form.getValues("name") || "") + " (" + (form.getValues("email") || "") + ")")}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-foreground font-bold text-xs shrink-0 transition-colors cursor-pointer w-fit shadow-sm"
                  >
                    <span>Open in Email App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Alex Morgan"
                          {...field}
                          className="bg-background/60 border-border/40 rounded-xl focus:border-[#6F8090] dark:focus:border-[#00B3B3] transition-colors"
                          disabled={form.formState.isSubmitting}
                        />
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
                      <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="e.g. alex@company.com"
                          {...field}
                          className="bg-background/60 border-border/40 rounded-xl focus:border-[#6F8090] dark:focus:border-[#00B3B3] transition-colors"
                          disabled={form.formState.isSubmitting}
                        />
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
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          Message Content
                        </FormLabel>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {field.value?.length || 0} characters
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project, idea, or role..."
                          rows={4}
                          {...field}
                          className="bg-background/60 border-border/40 rounded-xl focus:border-[#6F8090] dark:focus:border-[#00B3B3] transition-colors resize-none"
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Animated Submit Button */}
                <motion.div
                  whileHover={{ scale: form.formState.isSubmitting ? 1 : 1.015 }}
                  whileTap={{ scale: form.formState.isSubmitting ? 1 : 0.985 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Button
                    type="submit"
                    className="w-full rounded-xl shadow-lg bg-gradient-to-r from-[#6F8090] to-[#556575] dark:from-[#00B3B3] dark:to-[#008b8b] hover:opacity-95 text-white font-semibold transition-all duration-300 h-11 border-0 cursor-pointer"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting Message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Send Transmission</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
