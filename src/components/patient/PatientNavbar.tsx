import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Heart } from 'lucide-react';

export function PatientNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Appointment', path: '/appointment' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">Amrutha Clinic</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:09640410062"
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:09640410062"
              className="flex items-center justify-center gap-2 px-4 py-3 mt-4 bg-teal-600 text-white rounded-lg"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Call: 096404 10062</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
