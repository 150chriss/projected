import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/salaries").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Monthly Payroll Report</h2>

      <table className="border mt-4">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map(s => (
            <tr key={s._id}>
              <td>{s.employee?.firstName}</td>
              <td>{s.employee?.lastName}</td>
              <td>{s.employee?.position}</td>
              <td>{s.employee?.department?.departmentName}</td>
              <td>{s.netSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}