import { NavLink, useNavigate } from "react-router";
import { PokeBall } from "../../pages/RegisterPage";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className="flex items-center justify-between px-5 py-2.5 relative z-10"
      style={{ background: "#1A1F5E", boxShadow: "0 3px 0 #0f1235, 0 6px 0 #FFCB05" }}
    >
      {/* Logo */}
      <NavLink
        to={isAuthenticated ? "/select" : "/"}
        className="flex items-center gap-2.5"
        style={{ textDecoration: "none" }}
      >
        <PokeBall size={38} />
        <div className="flex flex-col leading-none">
          <span style={{ fontFamily: "'Lilita One', cursive", fontSize: "22px", color: "#FFCB05", WebkitTextStroke: "1.5px #1a1a2e", paintOrder: "stroke fill", letterSpacing: "1.5px", lineHeight: 1.15, textShadow: "2px 3px 0 rgba(0,0,0,0.35)" }}>
            POKÉMON
          </span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "11px", color: "white", letterSpacing: "3px", textTransform: "uppercase", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
            BATTLE&nbsp;◈&nbsp;ARENA
          </span>
        </div>
      </NavLink>

      {/* Nav */}
      <div className="flex items-center gap-2">

        <NavLink
          to="/leaderboard"
          className={({ isActive }) => isActive ? "btn-nav btn-nav-active" : "btn-nav"}
        >
          TOP
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink
              to="/select"
              className={({ isActive }) => isActive ? "btn-nav btn-nav-active" : "btn-nav"}
            >
              PLAY
            </NavLink>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn-login">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            LOGIN
          </NavLink>
        )}
      </div>
    </header>
  );
}
