import { Link } from "react-router-dom";
import api from "../api/axios";

const logout = async () => {
  await api.get("/auth/logout");
  window.location.href = "/login";
};
export default function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-4 flex gap-4">
      <Link to="/">Employee</Link>
      <Link to="/department">Department</Link>
      <Link to="/salary">Salary</Link>
      <Link to="/reports">Reports</Link>
    </div>
  );
}