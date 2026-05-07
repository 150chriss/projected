import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';

const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-white rounded-xl shadow p-6 flex items-center gap-4 border-l-4 ${color}`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ cars: 0, services: 0, records: 0, payments: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cars, services, records, payments] = await Promise.all([
          api.get('/cars'),
          api.get('/services'),
          api.get('/records'),
          api.get('/payments'),
        ]);
        const revenue = payments.data.reduce((sum, p) => sum + parseFloat(p.amountPaid || 0), 0);
        setStats({
          cars: cars.data.length,
          services: services.data.length,
          records: records.data.length,
          payments: payments.data.length,
          revenue,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome to SmartPark CRPMS</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard icon="🚗" label="Total Cars" value={stats.cars} color="border-blue-500" />
        <StatCard icon="🔧" label="Services" value={stats.services} color="border-green-500" />
        <StatCard icon="📋" label="Records" value={stats.records} color="border-yellow-500" />
        <StatCard icon="💳" label="Payments" value={stats.payments} color="border-purple-500" />
        <StatCard icon="💰" label="Revenue" value={`$${stats.revenue.toFixed(2)}`} color="border-red-500" />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">About SmartPark</h3>
        <p className="text-gray-500 text-sm">Manage your garage operations — cars, repair services, service records, and payments — all in one place.</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
