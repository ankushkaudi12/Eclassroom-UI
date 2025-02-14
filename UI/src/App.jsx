import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Components/Admin/AdminDashboard';
import FacultyDashboard from './Components/Faculty/FacultyDashboard';
import StudentDashboard from './Components/Student/StudentDashboard';
import AdminStudent from './Components/Admin/AdminStudent';
import Login from './Components/Login';
import Home from './Components/Home';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<Home />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login role="Admin" />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudent />} />

          {/* Faculty Routes */}
          <Route path="/faculty/login" element={<Login role="Faculty" />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />

          {/* Student Routes */}
          <Route path="/student/login" element={<Login role="Student" />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
