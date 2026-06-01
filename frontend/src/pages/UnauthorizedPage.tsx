import { Link, useLocation } from "react-router";
import { PokeBall } from "./RegisterPage";

export default function UnauthorizedPage() {
  const location = useLocation();

  return (
    <main
      className="flex-1 flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "linear-gradient(180deg, #071d50 0%, #0d2060 100%)" }}
    >
      {/* Lock icon */}
      <div
        className="mb-5 relative"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <div className="opacity-20 absolute inset-0 flex items-center justify-center">
          <PokeBall size={100} />
        </div>
        <div className="relative z-10 flex items-center justify-center w-24 h-24">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFCB05"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-16 h-16 drop-shadow-lg"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="rgba(255,203,5,0.12)" stroke="#FFCB05"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
      </div>

      <h1
        style={{
          fontFamily: "'Lilita One', cursive",
          fontSize: "clamp(24px, 4vw, 42px)",
          color: "#FFCB05",
          WebkitTextStroke: "1.5px #1a1a2e",
          paintOrder: "stroke fill",
          textShadow: "2px 3px 0 rgba(0,0,0,0.4)",
        }}
      >
        ZUGANG VERWEIGERT
      </h1>

      <p
        className="mt-3 max-w-sm"
        style={{
          color: "rgba(255,255,255,0.55)",
          fontFamily: "'Nunito', sans-serif",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        Du musst eingeloggt sein, um diese Seite zu sehen. Melde dich an oder erstelle ein Konto, um weiterzumachen.
      </p>

      <div className="flex gap-3 mt-8 flex-wrap justify-center">
        <Link
          to="/login"
          state={{ from: location }}
          className="btn font-black tracking-widest"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "#1A1F5E",
            background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)",
            border: "2px solid #CC8800",
            boxShadow: "0 4px 0 #AA7000",
            borderRadius: 10,
          }}
        >
          ANMELDEN
        </Link>
        <Link
          to="/register"
          className="btn btn-outline font-bold tracking-wider"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "white",
            borderColor: "rgba(255,255,255,0.3)",
            borderRadius: 10,
          }}
        >
          REGISTRIEREN
        </Link>
      </div>

      <Link
        to="/"
        className="mt-5 text-sm font-bold hover:opacity-70 transition-opacity"
        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif" }}
      >
        ← Zurück zur Startseite
      </Link>
    </main>
  );
}
