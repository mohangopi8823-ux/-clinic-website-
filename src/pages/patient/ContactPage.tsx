import { Contact } from '../../components/patient/Contact';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      <Contact />

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
