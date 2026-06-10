import { Calendar, Phone, MessageCircle, MapPin, Heart, Shield, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-6">
              <Heart className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium text-teal-800">Best Healthcare in Hyderabad</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Amrutha
              <span className="block text-teal-600">Clinic</span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl">
              Best Cardiology & Diabetology Clinic with Diagnostic & Pharmacy
            </p>

            <p className="mt-4 text-base md:text-lg text-gray-500">
              Expert care by <span className="font-semibold text-gray-700">Dr. Nalini T</span> with 10+ years of experience
            </p>

            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/appointment"
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Link>

              <a
                href="tel:09640410062"
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow border font-medium"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="https://wa.me/919640410062"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>

              <a
                href="https://maps.google.com/?q=Amrutha+Clinic+B.N+Reddy+Nagar+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-teal-100 to-blue-100 rounded-3xl p-6 md:p-10">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-teal-200 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-xl"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white p-2 shadow-lg">
                    <img
                      src="/images/doctor-profile.jpeg"
                      alt="Doctor profile photo"
                      className="h-full w-full rounded-xl object-cover object-[center_30%]"
                    />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-2">Dr. Nalini T</h3>
                <p className="text-center text-teal-600 font-medium mb-4">Cardiology & Diabetology</p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-teal-50 rounded-xl p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-5 h-5 text-teal-600" />
                    </div>
                    <p className="text-lg md:text-xl font-bold text-gray-900">10+</p>
                    <p className="text-xs text-gray-500">Years</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-lg md:text-xl font-bold text-gray-900">10000+</p>
                    <p className="text-xs text-gray-500">Patients</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Shield className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-lg md:text-xl font-bold text-gray-900">72441</p>
                    <p className="text-xs text-gray-500">Reg. No</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
