import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart2, Heart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <Heart size={20} fill="currentColor" />
          <span>KeenKeeper</span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Home size={16} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/timeline" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Clock size={16} />
            <span>Timeline</span>
          </NavLink>
          <NavLink to="/stats" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <BarChart2 size={16} />
            <span>Stats</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
