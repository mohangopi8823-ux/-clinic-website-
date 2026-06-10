import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Activity,
  HeartPulse,
  Timer,
  Watch,
  Radio,
  Gauge,
  Moon,
  Droplets,
  Stethoscope,
  FileText,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Service } from '../../lib/supabase';

const serviceIcons: Record<string, React.ElementType> = {
  'Cardiology': Heart,
  'Diabetology': Droplets,
  'ECG': Activity,
  '2D Echo Cardiogram': HeartPulse,
  'TMT / Treadmill Test': Timer,
  '24hrs/48hrs Holter Monitoring': Watch,
  'Loop Recorders': Radio,
  'ABPM / BP Monitoring': Gauge,
  'Sleep Study / Polysomnography': Moon,
  'Diabetes Care': Droplets,
  'General Consultation': Stethoscope,
  'Lab Reports Review': FileText,
  'Follow-up Visits': RefreshCw,
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('service_name');

      if (error) {
        console.error('Error fetching services:', error);
        setLoadMessage('Services are not available right now.');
        return;
      }

      const activeServices = (data || []) as Service[];
      setServices(activeServices);
      if (activeServices.length === 0) {
        setLoadMessage('Services will be updated soon.');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setLoadMessage('Services are not available right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From cardiac diagnostics to diabetes management, we offer a complete range of medical services
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-600">{loadMessage || 'No active services found.'}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComponent = serviceIcons[service.service_name] || Heart;
              return (
                <div
                  key={service.id}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-teal-200 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-teal-200 group-hover:to-blue-200 transition-colors">
                    <IconComponent className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.service_name}</h3>
                  {service.description && (
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
          >
            Book an Appointment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
