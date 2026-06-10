import { Services } from '../../components/patient/Services';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Comprehensive healthcare services ranging from cardiology to diabetes management
          </p>
        </div>
      </section>

      <Services />

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Consultation?</h2>
          <p className="text-gray-600 mb-6">Book an appointment with our expert doctors today.</p>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
