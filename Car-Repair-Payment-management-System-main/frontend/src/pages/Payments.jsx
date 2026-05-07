import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ amountPaid: '', paymentDate: '', recordNumber: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchAll = async () => {
    try {
      const [p, r] = await Promise.all([api.get('/payments'), api.get('/records')]);
      setPayments(p.data); setRecords(r.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/payments', form);
      setSuccess('Payment recorded successfully');
      setForm({ amountPaid: '', paymentDate: '', recordNumber: '' });
      setShowForm(false);
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record payment');
    }
  };

  const totalRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amountPaid || 0), 0);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Payments</h2>
          <p className="text-gray-500 text-sm mt-1">Total revenue: <span className="text-green-600 font-semibold">${totalRevenue.toFixed(2)}</span></p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Record Payment'}
        </button>
      </div>

      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-4 text-sm">{success}</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}

      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Record Payment</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Record</label>
              <select
                value={form.recordNumber}
                onChange={e => setForm({ ...form, recordNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select record...</option>
                {records.map(r => (
                  <option key={r.recordNumber} value={r.recordNumber}>
                    #{r.recordNumber} — {r.plateNumber} ({r.serviceName})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid ($)</label>
              <input
                type="number"
                step="0.01"
                value={form.amountPaid}
                onChange={e => setForm({ ...form, amountPaid: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
              <input
                type="date"
                value={form.paymentDate}
                onChange={e => setForm({ ...form, paymentDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="md:col-span-3">
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                Save Payment
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['#', 'Payment Date', 'Plate', 'Model', 'Service', 'Service Price', 'Amount Paid', 'Received By'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">No payments recorded yet</td></tr>
              ) : payments.map(p => (
                <tr key={p.paymentNumber} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">#{p.paymentNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{p.paymentDate?.split('T')[0]}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">{p.plateNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{p.model}</td>
                  <td className="px-4 py-3 text-gray-700">{p.serviceName}</td>
                  <td className="px-4 py-3 text-gray-500">${parseFloat(p.servicePrice).toFixed(2)}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">${parseFloat(p.amountPaid).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-700">{p.receivedBy || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
