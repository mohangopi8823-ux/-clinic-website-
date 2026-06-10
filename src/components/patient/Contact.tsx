import { Phone, MapPin, Mail, MessageCircle, Clock, ExternalLink } from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '096404 10062',
      link: 'tel:09640410062',
      color: 'teal'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '096404 10062',
      link: 'https://wa.me/919640410062',
      color: 'green'
    },
    {
      icon: Mail,
      title: 'Website',
      value: 'amruthaclinic.com',
      link: 'https://amruthaclinic.com',
      color: 'blue'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  item.color === 'teal' ? 'bg-teal-100' :
                  item.color === 'green' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <item.icon className={`w-7 h-7 ${
                    item.color === 'teal' ? 'text-teal-600' :
                    item.color === 'green' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.value}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
              </a>
            ))}

            {/* Address Card */}
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Shop No: 1, 2, 3, 4, Padmavathi Shopping Complex, Amrutha Clinic,<br />
                    Nagarjuna Sagar Road, behind Sri Sarada Visaka Peetha Paalitha Venkateshwara Swamy Devasthanam,<br />
                    Sree Puram Colony, B.N Reddy Nagar, Hyderabad, Telangana 500112
                  </p>
                  <a
                    href="https://maps.google.com/?q=Amrutha+Clinic+B.N+Reddy+Nagar+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Timings Card */}
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinic Hours</h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p><span className="font-medium">Morning:</span> 10:30 AM - 1:30 PM</p>
                    <p><span className="font-medium">Evening:</span> 6:30 PM - 9:30 PM</p>
                    <p className="text-red-600 text-xs">Closed on Sundays (Morning also closed on Wednesdays)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5!2d78.5!3d17.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAmrutha+Clinic!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Amrutha Clinic Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
