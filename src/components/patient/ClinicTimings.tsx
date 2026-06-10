import { Clock, AlertCircle } from 'lucide-react';

export function ClinicTimings() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            Clinic Hours
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Consultation Timings
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Morning Session</h3>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-amber-600" />
                <span className="text-lg font-semibold">10:30 AM - 1:30 PM</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Wednesday and Sunday Closed</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">Available for:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">General Consultation</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">Lab Reports Review</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">Follow-up Visits</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Evening Session</h3>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="text-lg font-semibold">6:30 PM - 9:30 PM</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Sunday Closed</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">Available for:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">General Consultation</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">Lab Reports Review</span>
                <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">Follow-up Visits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
