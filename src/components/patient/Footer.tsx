import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Amrutha Clinic</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Best Cardiology & Diabetology Clinic with Diagnostic & Pharmacy. Expert care by Dr. Nalini T with 10+ years of experience.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/doctors" className="text-gray-400 hover:text-teal-400 transition-colors">Doctors</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-teal-400 transition-colors">Services</Link></li>
              <li><Link to="/appointment" className="text-gray-400 hover:text-teal-400 transition-colors">Book Appointment</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:09640410062" className="text-gray-400 hover:text-teal-400 transition-colors">096404 10062</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <a href="https://amruthaclinic.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                  amruthaclinic.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  B.N Reddy Nagar, Hyderabad, Telangana 500112
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Amrutha Clinic. All rights reserved.</p>
          <p className="mt-1">Medical Registration No: 72441</p>
        </div>
      </div>
    </footer>
  );
}
