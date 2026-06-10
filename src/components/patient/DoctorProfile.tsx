import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, Phone, MapPin, Clock, GraduationCap, Briefcase, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Doctor } from '../../lib/supabase';

export function DoctorProfile() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState('');

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching doctor:', error);
        setLoadMessage('Doctor details are not available right now.');
        return;
      }

      if (data) {
        setDoctor(data as Doctor);
      } else {
        setLoadMessage('Doctor details will be updated soon.');
      }
    } catch (err) {
      console.error('Error fetching doctor:', err);
      setLoadMessage('Doctor details are not available right now.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            Our Doctor
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Your Healthcare Partner
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gradient-to-br from-teal-500 to-teal-700 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full bg-white/20 backdrop-blur border-4 border-white/30 flex items-center justify-center mb-6">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                    <span className="text-5xl md:text-6xl font-bold text-teal-600">
                      {doctor?.doctor_name?.charAt(0) || 'D'}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {doctor?.doctor_name || 'Dr. Nalini T'}
                </h3>
                <p className="text-teal-100 text-lg">{doctor?.specialization || 'Cardiology & Diabetology'}</p>
                {loadMessage && (
                  <p className="text-teal-50 text-sm mt-3">{loadMessage}</p>
                )}

                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="bg-white/20 rounded-full p-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/5 p-8 md:p-12">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Qualification</h4>
                    <p className="text-gray-600">
                      {doctor?.qualification || 'MBBS, PGDCC Clinical Cardiology, Diploma in Diabetology'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Medical Registration</h4>
                    <p className="text-gray-600">Reg. No: 72441</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Experience</h4>
                    <p className="text-gray-600">
                      {doctor?.experience_years ? `${doctor.experience_years}+ Years` : '10+ Years'} | 10000+ Patients Treated
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Consultation Timings</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Morning: 10:30 AM - 1:30 PM (Wed & Sun Closed)</p>
                      <p>Evening: 6:30 PM - 9:30 PM (Sun Closed)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">B.N Reddy Nagar, Hyderabad</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/appointment"
                  className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Link>
                <a
                  href="tel:09640410062"
                  className="flex items-center gap-2 px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-xl hover:bg-teal-50 transition-colors font-medium"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
