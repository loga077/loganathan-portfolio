
import { useState, FormEvent } from 'react';
import { Phone, Mail, Github, Linkedin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-navy-dark py-20">
      <div className="container-wrapper">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Contact Me</h2>
          <p className="text-gray-300 mt-8 max-w-2xl mx-auto">
            Let's build something amazing together. Feel free to reach out for collaboration, job opportunities, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field min-h-[150px]"
                  required
                  placeholder="How can I help you?"
                  rows={5}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full flex justify-center items-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </form>

            <div className="text-center mt-8 bg-teal/10 rounded-lg p-6 border border-teal/30">
              <p className="text-lg font-semibold text-teal-light">
                "Let's build something amazing. Hire me as an Employee or Freelancer."
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 glass p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                  <Phone size={24} className="text-teal" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:9025643513" className="text-white hover:text-teal transition-colors">
                    +91 9025643513
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                  <Mail size={24} className="text-teal" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href="mailto:loganathanmurugan055@gmail.com"
                    className="text-white hover:text-teal transition-colors break-all"
                  >
                    loganathanmurugan055@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                  <Github size={24} className="text-teal" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">GitHub</p>
                  <a
                    href="https://github.com/loga077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-teal transition-colors"
                  >
                    loga077
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                  <Linkedin size={24} className="text-teal" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">LinkedIn</p>
                  <a
                    href="https://linkedin.com/in/loga-nathan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-teal transition-colors"
                  >
                    Loga Nathan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
