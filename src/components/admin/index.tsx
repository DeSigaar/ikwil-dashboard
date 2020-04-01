import React from "react";
import { Link } from "react-router-dom";
const Admin: React.FC = () => {
  return (
    <div>
      <Link to="/admin/meals">Meals</Link>
      <Link to="/admin/activities">Activities</Link>
      <Link to="/admin/news">News</Link>
      <Link to="/admin/organizer">Organisers</Link>
      <Link to="/admin/rule">Rules</Link>
    </div>
  );
};
export default Admin;
