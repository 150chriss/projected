import { useState } from "react";
import api from "../api/axios";

export default function Department() {
  const [form, setForm] = useState({
    departmentCode: "",
    departmentName: "",
    grossSalary: ""
  });

  const handleSubmit = async () => {
    await api.post("/departments", form);
    alert("Department added");
  };

  return (
    <div className="p-4">
      <h2>Department</h2>

      <input placeholder="Code" onChange={e => setForm({...form, departmentCode:e.target.value})} className="border m-2 p-2"/>
      <input placeholder="Name" onChange={e => setForm({...form, departmentName:e.target.value})} className="border m-2 p-2"/>
      <input placeholder="Gross Salary" onChange={e => setForm({...form, grossSalary:e.target.value})} className="border m-2 p-2"/>

      <button onClick={handleSubmit} className="bg-green-500 p-2 text-white">Save</button>
    </div>
  );
}