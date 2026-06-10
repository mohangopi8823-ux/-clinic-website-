import { About } from '../../components/patient/About';
import { DoctorProfile } from '../../components/patient/DoctorProfile';
import { Facilities } from '../../components/patient/Facilities';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Amrutha Clinic</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Learn about our journey, our mission, and our commitment to providing excellent healthcare
          </p>
        </div>
      </section>

      <About />
      <DoctorProfile />
      <Facilities />

      {/* Back to Home */}
      <section className="py-8 bg-white">
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
