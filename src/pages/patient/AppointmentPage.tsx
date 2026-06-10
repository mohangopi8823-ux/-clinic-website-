import { AppointmentForm } from '../../components/patient/AppointmentForm';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Clock } from 'lucide-react';

export function AppointmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-600 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Schedule your visit with Dr. Nalini T at Amrutha Clinic
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a
              href="tel:09640410062"
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Call Us</p>
                <p className="font-medium text-gray-900">096404 10062</p>
              </div>
            </a>

            <a
              href="https://wa.me/919640410062"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">WhatsApp</p>
                <p className="font-medium text-gray-900">Message Us</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Timings</p>
                <p className="font-medium text-gray-900 text-sm">10:30 AM - 9:30 PM</p>
              </div>
            </div>
          </div>

          <AppointmentForm />

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
