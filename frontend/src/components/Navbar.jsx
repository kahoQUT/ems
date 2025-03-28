import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import '../Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Employee Management System</Link>
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <Link to="/employees" onClick={() => setMenuOpen(false)} className="mr-4">CRUD</Link>
              <Link to="/departments" onClick={() => setMenuOpen(false)} className="mr-4">Department</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="mr-4">Profile</Link>
              <button
                onClick={() => { setMenuOpen(false); handleLogout(); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link
                to="/register" onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
