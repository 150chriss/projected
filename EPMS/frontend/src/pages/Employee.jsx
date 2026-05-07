import { useState } from "react";
import api from "../api/axios";

export default function Employee() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    position: "",
    department: ""
  });

  const handleSubmit = async () => {
    await api.post("/employees", form);
    alert("Employee added");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Employee</h2>

      <input placeholder="First Name" onChange={e => setForm({...form, firstName:e.target.value})} className="border p-2 m-2"/>
      <input placeholder="Last Name" onChange={e => setForm({...form, lastName:e.target.value})} className="border p-2 m-2"/>
      <input placeholder="Position" onChange={e => setForm({...form, position:e.target.value})} className="border p-2 m-2"/>
      <input placeholder="Department ID" onChange={e => setForm({...form, department:e.target.value})} className="border p-2 m-2"/>

      <button onClick={handleSubmit} className="bg-green-500 text-white p-2">Save</button>
    </div>
  );
}