import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";
import CoursePage from "../Course/CoursePage";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Graphql/Queries";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const userId = useParams()
  console.log("userId.userId",userId.userId);
  
  const [activeSection, setActiveSection] = useState("announcements");
  const { data: userData } = useQuery(GET_USER, {
    variables: { id: userId.userId }, 
  });

  return (
    <div>
      {userData && <AdminNavbar firstName={userData.getUser.firstName} lastName={userData.getUser.lastName} userId={userId.userId}/>}
      
      <div className="tabs">
        {/* <button
          className={activeSection === "announcements" ? "active" : ""}
          onClick={() => setActiveSection("announcements")}
        >
          Announcements
        </button>
        <button
          className={activeSection === "chat" ? "active" : ""}
          onClick={() => setActiveSection("chat")}
        >
          Comments
        </button> */}
        <button
          className={activeSection === "courses" ? "active" : ""}
          onClick={() => setActiveSection("courses")}
        >
          Manage Courses
        </button>
      </div>

      <div className="content">
        {/* {activeSection === "announcements" && <Announcements />}
        {activeSection === "chat" && <Chat />} */}
        {activeSection === "courses" && <CoursePage />}
      </div>
    </div>
  );
};

export default Dashboard;
