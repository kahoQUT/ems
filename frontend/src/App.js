import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Index from './pages/Index'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </Router>
  );
}

export default App;
