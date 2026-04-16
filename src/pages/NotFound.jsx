import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1 className="nf-code">404</h1>
      <p className="nf-title">Page Not Found</p>
      <p className="nf-sub">Looks like this friendship doesn't exist yet.</p>
      <button className="btn-primary" onClick={() => navigate("/")}>
        <Home size={16} /> Go Home
      </button>
    </div>
  );
}
