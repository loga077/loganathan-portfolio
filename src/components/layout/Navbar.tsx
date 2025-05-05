
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy-dark/90 shadow-lg backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-wrapper flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient">Loga.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#certificates" className="nav-link">Certificates</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-navy-dark/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-lg">
          <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#skills" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#certificates" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Certificates</a>
          <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
