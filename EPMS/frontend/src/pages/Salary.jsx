import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Salary() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    employee: "",
    grossSalary: "",
    totalDeduction: "",
    month: ""
  });

  const loadData = async () => {
    const res = await api.get("/salaries");
    setData(res.data);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async () => {
    await api.post("/salaries", form);
    loadData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/salaries/${id}`);
    loadData();
  };

  return (
    <div className="p-4">
      <h2>Salary</h2>

      <input placeholder="Employee ID" onChange={e => setForm({...form, employee:e.target.value})} className="border m-2 p-2"/>
      <input placeholder="Gross Salary" onChange={e => setForm({...form, grossSalary:e.target.value})} className="border m-2 p-2"/>
      <input placeholder="Deduction" onChange={e => setForm({...form, totalDeduction:e.target.value})} className="border m-2 p-2"/>
      <input placeholder="Month" onChange={e => setForm({...form, month:e.target.value})} className="border m-2 p-2"/>

      <button onClick={handleSubmit} className="bg-green-500 p-2 text-white">Save</button>

      <table className="mt-4 border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Net Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(s => (
            <tr key={s._id}>
              <td>{s.employee?.firstName}</td>
              <td>{s.netSalary}</td>
              <td>
                <button onClick={() => handleDelete(s._id)} className="bg-red-500 text-white p-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}