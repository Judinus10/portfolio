import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionHeading from './SectionHeading';
import { brand } from '@/lib/brand';
import { contactFormSchema, type ContactForm } from '@/lib/schema';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      
      // Create mailto link
      const subject = encodeURIComponent('Portfolio Contact from ' + formData.name);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:${brand.email}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
      
    } catch (error: any) {
      const fieldErrors: Partial<ContactForm> = {};
      error.errors?.forEach((err: any) => {
        fieldErrors[err.path[0] as keyof ContactForm] = err.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Let's Work Together"
          subtitle="Ready to start your next project? Let's discuss how I can help bring your ideas to life."
        />

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a specific project in mind or just want to chat about possibilities, 
                I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4 p-4 glass-card rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 bg-mist-100 rounded-lg">
                  <Mail className="h-5 w-5 text-mist-600" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a 
                    href={`mailto:${brand.email}`}
                    className="text-muted-foreground hover:text-mist-500 transition-colors"
                  >
                    {brand.email}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 glass-card rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 bg-blossom-100 rounded-lg">
                  <Phone className="h-5 w-5 text-blossom-600" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <a 
                    href={`tel:${brand.phone}`}
                    className="text-muted-foreground hover:text-blossom-500 transition-colors"
                  >
                    {brand.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 glass-card rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 bg-sunrise-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-sunrise-600" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{brand.location}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="p-4 bg-emerald-100 rounded-full w-fit mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Your email client should open shortly. Thank you for reaching out!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Textarea
                        placeholder="Tell me about your project..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={errors.message ? 'border-red-500' : ''}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full btn-hero group">
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}