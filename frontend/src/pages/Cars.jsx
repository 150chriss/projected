import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';

const initialForm = { plateNumber: '', type: '', model: '', manufacturingYear: '', driverPhone: '', mechanicName: '' };

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchCars = async () => {
    try {
      const res = await api.get('/cars');
      setCars(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCars(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/cars', form);
      setSuccess('Car added successfully');
      setForm(initialForm);
      setShowForm(false);
      fetchCars();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add car');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Cars</h2>
          <p className="text-gray-500 text-sm mt-1">{cars.length} registered vehicles</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Car'}
        </button>
      </div>

      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-4 text-sm">{success}</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}

      {showForm && (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Car</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'plateNumber', label: 'Plate Number', type: 'text' },
              { key: 'type', label: 'Type', type: 'text' },
              { key: 'model', label: 'Model', type: 'text' },
              { key: 'manufacturingYear', label: 'Manufacturing Year', type: 'number' },
              { key: 'driverPhone', label: 'Driver Phone', type: 'text' },
              { key: 'mechanicName', label: 'Mechanic Name', type: 'text' },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                Save Car
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {cars.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">No cars registered yet</div>
        ) : cars.map(car => (
          <div key={car.plateNumber} className="bg-white rounded-xl shadow p-4 space-y-1">
            <p className="font-bold text-blue-600 text-base">{car.plateNumber}</p>
            <p className="text-sm text-gray-700">{car.model} — {car.type} ({car.manufacturingYear})</p>
            <p className="text-sm text-gray-500">📞 {car.driverPhone}</p>
            <p className="text-sm text-gray-500">🔧 {car.mechanicName}</p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Plate Number', 'Type', 'Model', 'Year', 'Driver Phone', 'Mechanic'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cars.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No cars registered yet</td></tr>
              ) : cars.map(car => (
                <tr key={car.plateNumber} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-blue-600">{car.plateNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{car.type}</td>
                  <td className="px-4 py-3 text-gray-700">{car.model}</td>
                  <td className="px-4 py-3 text-gray-700">{car.manufacturingYear}</td>
                  <td className="px-4 py-3 text-gray-700">{car.driverPhone}</td>
                  <td className="px-4 py-3 text-gray-700">{car.mechanicName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Cars;
