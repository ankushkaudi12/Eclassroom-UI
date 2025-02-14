import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AdminDashboard } from '../src/Components/Admin/AdminDashboard'
import Login  from './Components/Login';
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/faculty/login' element={<Login role="Faculty"/>} />
          <Route path='/admin/login' element={<Login role="Admin"/>} />
          <Route path='/student/login' element={<Login role="Student"/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
