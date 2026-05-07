import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ serviceName: '', servicePrice: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await api.get('/services');
      setServices(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/services', form);
      setSuccess('Service added successfully');
      setForm({ serviceName: '', servicePrice: '' });
      setShowForm(false);
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add service');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Services</h2>
          <p className="text-gray-500 text-sm mt-1">{services.length} services available</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Service'}
        </button>
      </div>

      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-4 text-sm">{success}</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}

      {showForm && (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Service</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
              <input
                type="text"
                value={form.serviceName}
                onChange={e => setForm({ ...form, serviceName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.servicePrice}
                onChange={e => setForm({ ...form, servicePrice: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {services.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">No services added yet</div>
        ) : services.map(s => (
          <div key={s.serviceCode} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{s.serviceName}</p>
              <p className="text-xs text-gray-400">Code #{s.serviceCode}</p>
            </div>
            <p className="text-green-600 font-bold">${parseFloat(s.servicePrice).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">Code</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">Service Name</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400">No services added yet</td></tr>
              ) : services.map(s => (
                <tr key={s.serviceCode} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">#{s.serviceCode}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{s.serviceName}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">${parseFloat(s.servicePrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
