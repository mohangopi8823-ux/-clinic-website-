import { Award, Users, Clock, Heart, Stethoscope, Pill, Microscope } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Stethoscope,
      title: 'Expert Consultation',
      description: 'Specialized cardiac and diabetes care by experienced doctors'
    },
    {
      icon: Pill,
      title: 'In-house Pharmacy',
      description: 'Complete range of medicines and healthcare products'
    },
    {
      icon: Microscope,
      title: 'Advanced Diagnostics',
      description: 'Modern diagnostic equipment for accurate results'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Patients' },
    { icon: Award, value: '10+', label: 'Years Experience' },
    { icon: Clock, value: '24/7', label: 'Emergency Support' },
    { icon: Heart, value: '15+', label: 'Services Offered' }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compassionate Care, Modern Medicine
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Amrutha Clinic is a leading healthcare facility in Hyderabad, specializing in Cardiology and Diabetology.
            Our clinic is equipped with modern diagnostic equipment and staffed by experienced medical professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-teal-100 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinic Location</h3>
          <p className="text-gray-600 leading-relaxed">
            Shop No: 1, 2, 3, 4, Padmavathi Shopping Complex, Amrutha Clinic, Nagarjuna Sagar Road,
            behind Sri Sarada Visaka Peetha Paalitha Venkateshwara Swamy Devasthanam, Sree Puram Colony,
            B.N Reddy Nagar, Hyderabad, Telangana 500112
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">Google Pay Accepted</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">NFC Payments</span>
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">Appointments Recommended</span>
          </div>
        </div>
      </div>
    </section>
  );
}
