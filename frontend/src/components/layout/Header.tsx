import { NavLink, useNavigate } from "react-router";
import { PokeBall } from "../../pages/RegisterPage";
import { useAuth } from "../../context/AuthContext";

const navLink = (isActive: boolean) => ({
  display: "inline-flex", alignItems: "center",
  background: isActive ? "#FFCB05" : "transparent",
  color: isActive ? "#1A1F5E" : "white",
  border: "2px solid rgba(255,255,255,0.3)",
  padding: "5px 12px", borderRadius: "6px",
  fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "12px",
  letterSpacing: "1.5px", textDecoration: "none",
  textTransform: "uppercase" as const,
});

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
      <NavLink to={isAuthenticated ? "/select" : "/"} className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
        <PokeBall size={38} />
        <div className="flex flex-col leading-none">
          <span style={{ fontFamily: "'Lilita One', cursive", fontSize: "22px", color: "#FFCB05", WebkitTextStroke: "1.5px #1a1a2e", paintOrder: "stroke fill", letterSpacing: "1.5px", lineHeight: 1.15, textShadow: "2px 3px 0 rgba(0,0,0,0.35)" }}>
            POKÉMON
          </span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "11px", color: "white", letterSpacing: "3px", textTransform: "uppercase" as const, textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
            BATTLE&nbsp;◈&nbsp;ARENA
          </span>
        </div>
      </NavLink>

      {/* Nav */}
      <div className="flex items-center gap-2">

        {/* Leaderboard — always visible */}
        <NavLink to="/leaderboard" style={({ isActive }) => navLink(isActive)}>
          TOP
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink to="/select" style={({ isActive }) => navLink(isActive)}>
              PLAY
            </NavLink>
            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex", alignItems: "center",
                background: "transparent", color: "rgba(255,255,255,0.55)",
                border: "2px solid rgba(255,255,255,0.2)",
                padding: "5px 12px", borderRadius: "6px",
                fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "12px",
                letterSpacing: "1px", cursor: "pointer",
                textTransform: "uppercase" as const,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "white", color: "#1A1F5E",
              border: "2px solid #c8d0e8", padding: "5px 14px", borderRadius: "6px",
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "13px",
              letterSpacing: "1.5px", textDecoration: "none",
              textTransform: "uppercase" as const, boxShadow: "0 2px 0 #b0bbda",
            }}
          >
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
