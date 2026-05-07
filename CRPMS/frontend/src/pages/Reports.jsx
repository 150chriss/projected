import { useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/axios';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('invoice');
  const [invoiceId, setInvoiceId] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [dailyDate, setDailyDate] = useState('');
  const [dailyReport, setDailyReport] = useState(null);
  const [error, setError] = useState('');

  const fetchInvoice = async (e) => {
    e.preventDefault();
    setError(''); setInvoice(null);
    try {
      const res = await api.get(`/reports/invoice/${invoiceId}`);
      setInvoice(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Invoice not found');
    }
  };

  const fetchDailyReport = async (e) => {
    e.preventDefault();
    setError(''); setDailyReport(null);
    try {
      const res = await api.get(`/reports/daily?date=${dailyDate}`);
      setDailyReport(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load report');
    }
  };

  const handlePrint = () => window.print();

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
        <p className="text-gray-500 text-sm mt-1">Generate invoices and daily reports</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setActiveTab('invoice'); setError(''); setInvoice(null); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'invoice' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
        >
          Invoice
        </button>
        <button
          onClick={() => { setActiveTab('daily'); setError(''); setDailyReport(null); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'daily' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
        >
          Daily Report
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}

      {activeTab === 'invoice' && (
        <div>
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <form onSubmit={fetchInvoice} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Number</label>
                <input
                  type="number"
                  value={invoiceId}
                  onChange={e => setInvoiceId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter payment number"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                Generate Invoice
              </button>
            </form>
          </div>

          {invoice && (
            <div className="bg-white rounded-xl shadow p-8 print:shadow-none" id="invoice">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">SmartPark Garage</h1>
                  <p className="text-gray-500 text-sm">Car Repair Payment Management System</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">INVOICE</p>
                  <p className="text-gray-500 text-sm">#{invoice.paymentNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Car Details</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Plate:</span> {invoice.plateNumber}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Model:</span> {invoice.model} ({invoice.type})</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Year:</span> {invoice.manufacturingYear}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Driver Phone:</span> {invoice.driverPhone}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Mechanic:</span> {invoice.mechanicName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Payment Details</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Service Date:</span> {invoice.serviceDate?.split('T')[0]}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Payment Date:</span> {invoice.paymentDate?.split('T')[0]}</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Received By:</span> {invoice.receivedBy}</p>
                </div>
              </div>

              <table className="w-full text-sm mb-6">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="text-left px-4 py-3">Service</th>
                    <th className="text-right px-4 py-3">Service Price</th>
                    <th className="text-right px-4 py-3">Amount Paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-700">{invoice.serviceName}</td>
                    <td className="px-4 py-3 text-right text-gray-700">${parseFloat(invoice.servicePrice).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-bold text-green-600">${parseFloat(invoice.amountPaid).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between items-center">
                <button onClick={handlePrint} className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors print:hidden">
                  🖨️ Print Invoice
                </button>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">${parseFloat(invoice.amountPaid).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'daily' && (
        <div>
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <form onSubmit={fetchDailyReport} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input
                  type="date"
                  value={dailyDate}
                  onChange={e => setDailyDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                Generate Report
              </button>
            </form>
          </div>

          {dailyReport && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Daily Report — {dailyReport.date}</h3>
                <button onClick={handlePrint} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors print:hidden">
                  🖨️ Print
                </button>
              </div>

              {dailyReport.report.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">No services recorded on this date</div>
              ) : dailyReport.report.map(car => (
                <div key={car.plateNumber} className="bg-white rounded-xl shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{car.plateNumber}</p>
                      <p className="text-gray-500 text-sm">{car.model} ({car.type}) — {car.driverPhone}</p>
                      <p className="text-gray-500 text-sm">Mechanic: {car.mechanicName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-xl font-bold text-green-600">${car.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-3 py-2 text-gray-600">Record #</th>
                        <th className="text-left px-3 py-2 text-gray-600">Service</th>
                        <th className="text-right px-3 py-2 text-gray-600">Price</th>
                        <th className="text-right px-3 py-2 text-gray-600">Paid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {car.services.map(svc => (
                        <tr key={svc.recordNumber}>
                          <td className="px-3 py-2 text-gray-500">#{svc.recordNumber}</td>
                          <td className="px-3 py-2 text-gray-700">{svc.serviceName}</td>
                          <td className="px-3 py-2 text-right text-gray-700">${parseFloat(svc.servicePrice).toFixed(2)}</td>
                          <td className="px-3 py-2 text-right text-green-600 font-medium">
                            {svc.amountPaid ? `$${parseFloat(svc.amountPaid).toFixed(2)}` : <span className="text-yellow-500">Unpaid</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Reports;
