import { Pill, Microscope, Moon, Clock } from 'lucide-react';

export function Facilities() {
  const facilities = [
    {
      icon: Pill,
      title: 'Pharmacy',
      description: 'Complete range of medicines, prescription medications, and healthcare products',
      timings: '6:30 AM - 9:30 PM',
      features: ['Prescription medications', 'Healthcare products', 'Quick dispensing']
    },
    {
      icon: Microscope,
      title: 'Diagnostics Services',
      description: 'All types of blood tests, ECG, and other cardiac tests with quick results',
      timings: '6:30 AM - 9:30 PM',
      features: ['Blood tests', 'ECG & Cardiac tests', 'Quick results']
    },
    {
      icon: Moon,
      title: 'Sleep Study / Polysomnography',
      description: 'Comprehensive sleep analysis with detailed monitoring and expert specialists',
      timings: 'By Appointment',
      features: ['Brain wave monitoring', 'Heart rate tracking', 'Breathing analysis']
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            Our Facilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Modern Medical Facilities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare facilities including pharmacy, diagnostics, and sleep study
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-3 bg-gradient-to-r from-teal-500 to-blue-500"></div>
              <div className="p-6 md:p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <facility.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                <p className="text-gray-600 mb-4">{facility.description}</p>

                <div className="flex items-center gap-2 text-teal-600 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{facility.timings}</span>
                </div>

                <div className="space-y-2">
                  {facility.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
