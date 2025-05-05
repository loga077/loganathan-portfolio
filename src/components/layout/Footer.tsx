
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-dark py-16">
      <div className="container-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-3xl font-bold text-gradient">Loga.</Link>
            <p className="text-gray-300 mt-2">
              Bringing creativity and technology together to build amazing experiences.
            </p>
            <div className="flex gap-4 mt-4">
              <a 
                href="https://github.com/loga077" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-teal transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/loga-nathan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-teal transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:loganathanmurugan055@gmail.com" 
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-teal transition-colors duration-300"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:9025643513" 
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-teal transition-colors duration-300"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-teal transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-teal transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-300 hover:text-teal transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-300 hover:text-teal transition-colors">Projects</a></li>
              <li><a href="#certificates" className="text-gray-300 hover:text-teal transition-colors">Certificates</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-teal transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-teal" />
                <span className="text-gray-300">+91 9025643513</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-teal" />
                <span className="text-gray-300">loganathanmurugan055@gmail.com</span>
              </li>
              <li className="flex gap-3 items-center">
                <Github size={18} className="text-teal" />
                <span className="text-gray-300">loga077</span>
              </li>
              <li className="flex gap-3 items-center">
                <Linkedin size={18} className="text-teal" />
                <span className="text-gray-300">Loga Nathan</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-light mt-12 pt-6 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Loganathan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
