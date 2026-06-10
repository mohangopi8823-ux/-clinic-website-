import { Hero } from '../../components/patient/Hero';
import { About } from '../../components/patient/About';
import { DoctorProfile } from '../../components/patient/DoctorProfile';
import { Services } from '../../components/patient/Services';
import { Facilities } from '../../components/patient/Facilities';
import { ClinicTimings } from '../../components/patient/ClinicTimings';
import { Contact } from '../../components/patient/Contact';
import { Link } from 'react-router-dom';
import { Calendar, Phone, MessageCircle } from 'lucide-react';

function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-teal-600 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Book Your Appointment?
        </h2>
        <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
          Don't wait for health concerns to worsen. Book your appointment today and get expert care from Dr. Nalini T.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/appointment"
            className="flex items-center gap-2 px-8 py-4 bg-white text-teal-700 rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment
          </Link>
          <a
            href="tel:09640410062"
            className="flex items-center gap-2 px-8 py-4 bg-teal-500 text-white rounded-xl hover:bg-teal-400 transition-colors font-semibold"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a
            href="https://wa.me/919640410062"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <DoctorProfile />
      <Services />
      <Facilities />
      <ClinicTimings />
      <CTASection />
      <Contact />
    </div>
  );
}
