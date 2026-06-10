import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, Phone, Clock, GraduationCap, Briefcase, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Doctor } from '../../lib/supabase';

const doctorPhotoPath = '/images/doctor-profile.jpeg';

function formatDoctorName(name?: string | null) {
  if (!name) return 'Dr. Nalini T';
  return name.trim().toLowerCase().startsWith('dr.') ? name : `Dr. ${name}`;
}

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
            Meet Our Doctor
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-teal-50 via-white to-blue-50">
              <div className="rounded-2xl bg-white p-3 shadow-lg">
                <img
                  src={doctorPhotoPath}
                  alt="Doctor profile photo"
                  className="h-80 w-full rounded-xl object-cover object-[center_30%] sm:h-96 lg:h-[30rem]"
                />
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {formatDoctorName(doctor?.doctor_name)}
                </h3>
                <p className="text-lg font-medium text-teal-700">
                  {doctor?.specialization || 'Cardiology & Diabetology'}
                </p>
                {loadMessage && (
                  <p className="text-sm text-gray-500 mt-3">{loadMessage}</p>
                )}
              </div>

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
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Specialization</h4>
                    <p className="text-gray-600">{doctor?.specialization || 'Cardiology & Diabetology'}</p>
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
                    <Award className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Medical Registration</h4>
                    <p className="text-gray-600">Reg. No: 72441</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/appointment#appointment-form"
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
