import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Award, Users, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Doctor } from '../../lib/supabase';

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="md:flex">
        <div className="md:w-2/5 bg-gradient-to-br from-teal-500 to-teal-700 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur border-4 border-white/30 flex items-center justify-center mb-4">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-teal-600">
                  {doctor.doctor_name?.charAt(0) || 'D'}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">{doctor.doctor_name}</h3>
            <p className="text-teal-100">{doctor.specialization}</p>
          </div>
        </div>

        <div className="md:w-3/5 p-8">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Qualification</h4>
                <p className="text-gray-600 text-sm">{doctor.qualification || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Experience</h4>
                <p className="text-gray-600 text-sm">
                  {doctor.experience_years ? `${doctor.experience_years}+ Years` : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Contact</h4>
                <p className="text-gray-600 text-sm">{doctor.phone || 'Contact clinic'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Available Time</h4>
                <p className="text-gray-600 text-sm">Morning & Evening Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching doctors:', error);
        setLoadMessage('Doctors are not available right now.');
        return;
      }

      const activeDoctors = (data || []) as Doctor[];
      setDoctors(activeDoctors);
      if (activeDoctors.length === 0) {
        setLoadMessage('Doctor details will be updated soon.');
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setLoadMessage('Doctors are not available right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-blue-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Doctors</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Meet our experienced medical professionals dedicated to your health
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm text-gray-600">
              {loadMessage || 'No active doctors found.'}
            </div>
          ) : (
            <div className="space-y-8">
              {doctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

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
