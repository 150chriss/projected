import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';

const initialForm = { serviceDate: '', plateNumber: '', serviceCode: '' };

const ServiceRecords = () => {
  const [records, setRecords] = useState([]);
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchAll = async () => {
    try {
      const [r, c, s] = await Promise.all([api.get('/records'), api.get('/cars'), api.get('/services')]);
      setRecords(r.data); setCars(c.data); setServices(s.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      if (editId) {
        await api.put(`/records/${editId}`, form);
        setSuccess('Record updated');
      } else {
        await api.post('/records', form);
        setSuccess('Record created');
      }
      setForm(initialForm); setEditId(null); setShowForm(false);
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (rec) => {
    setForm({ serviceDate: rec.serviceDate?.split('T')[0] || '', plateNumber: rec.plateNumber, serviceCode: rec.serviceCode });
    setEditId(rec.recordNumber);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.delete(`/records/${id}`);
      setSuccess('Record deleted');
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const cancelForm = () => { setForm(initialForm); setEditId(null); setShowForm(false); setError(''); };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Service Records</h2>
          <p className="text-gray-500 text-sm mt-1">{records.length} records total</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) cancelForm(); }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Record'}
        </button>
      </div>

      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-4 text-sm">{success}</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}

      {showForm && (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{editId ? 'Edit Record' : 'New Service Record'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
              <input
                type="date"
                value={form.serviceDate}
                onChange={e => setForm({ ...form, serviceDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car (Plate Number)</label>
              <select
                value={form.plateNumber}
                onChange={e => setForm({ ...form, plateNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select car...</option>
                {cars.map(c => <option key={c.plateNumber} value={c.plateNumber}>{c.plateNumber} — {c.model}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select
                value={form.serviceCode}
                onChange={e => setForm({ ...form, serviceCode: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select service...</option>
                {services.map(s => <option key={s.serviceCode} value={s.serviceCode}>{s.serviceName} (${parseFloat(s.servicePrice).toFixed(2)})</option>)}
              </select>
            </div>
            <div className="sm:col-span-3 flex gap-3">
              <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                {editId ? 'Update' : 'Save'}
              </button>
              {editId && <button type="button" onClick={cancelForm} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors">Cancel</button>}
            </div>
          </form>
        </div>
      )}

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {records.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">No records found</div>
        ) : records.map(rec => (
          <div key={rec.recordNumber} className="bg-white rounded-xl shadow p-4 space-y-1">
            <div className="flex justify-between items-start">
              <p className="font-bold text-blue-600">{rec.plateNumber}</p>
              <span className="text-xs text-gray-400">#{rec.recordNumber}</span>
            </div>
            <p className="text-sm text-gray-700">{rec.model} — {rec.serviceName}</p>
            <p className="text-sm text-green-600 font-medium">${parseFloat(rec.servicePrice).toFixed(2)}</p>
            <p className="text-xs text-gray-400">{rec.serviceDate?.split('T')[0]} · {rec.mechanicName}</p>
            <div className="flex gap-3 pt-1">
              <button onClick={() => handleEdit(rec)} className="text-blue-600 text-xs font-medium">Edit</button>
              <button onClick={() => handleDelete(rec.recordNumber)} className="text-red-500 text-xs font-medium">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['#', 'Date', 'Plate', 'Model', 'Service', 'Price', 'Mechanic', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">No records found</td></tr>
              ) : records.map(rec => (
                <tr key={rec.recordNumber} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">#{rec.recordNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{rec.serviceDate?.split('T')[0]}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">{rec.plateNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{rec.model}</td>
                  <td className="px-4 py-3 text-gray-700">{rec.serviceName}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">${parseFloat(rec.servicePrice).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-700">{rec.mechanicName}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(rec)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                      <button onClick={() => handleDelete(rec.recordNumber)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceRecords;
