import { useQuery } from "@apollo/client";
import { GET_USER } from "../Graphql/Queries";
import { useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { userId } = useParams();

  const { data: userData, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading admin data</p>;

  const user = userData.getUser;

  return (
    <div>
      {user && (
        <AdminNavbar
          firstName={user.firstName}
          lastName={user.lastName}
          userId={userId}
        />
      )}
      <div className="dashboard-body">
        <h2>Welcome to Admin Dashboard</h2>

        <div className="admin-info-grid">
          <div><strong>First Name:</strong> {user.firstName}</div>
          <div><strong>Last Name:</strong> {user.lastName}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Phone:</strong> {user.phoneNumber}</div>
          <div><strong>Date of Birth:</strong> {user.dob}</div>
          <div><strong>Role:</strong> {user.role}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
