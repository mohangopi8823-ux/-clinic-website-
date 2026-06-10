import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Award, Users, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Doctor } from '../../lib/supabase';

const doctorPhotoPath = '/images/doctor-profile.jpeg';

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4 sm:p-6">
          <img
            src={doctorPhotoPath}
            alt="Doctor profile photo"
            className="h-80 w-full rounded-xl object-cover object-[center_30%] shadow-md sm:h-96 md:h-full md:min-h-[28rem]"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{doctor.doctor_name || 'Dr. Nalini T'}</h3>
            <p className="mt-1 text-lg font-medium text-teal-700">
              {doctor.specialization || 'Cardiology & Diabetology'}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Qualification</h4>
                <p className="text-gray-600 text-sm">
                  {doctor.qualification || 'MBBS, PGDCC Clinical Cardiology, Diploma in Diabetology'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Experience</h4>
                <p className="text-gray-600 text-sm">
                  {doctor.experience_years ? `${doctor.experience_years}+ Years` : '10+ Years'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Contact</h4>
                <p className="text-gray-600 text-sm">{doctor.phone || '096404 10062'}</p>
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
