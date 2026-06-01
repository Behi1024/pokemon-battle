import { Link } from "react-router";
import { PokeBall } from "./RegisterPage";

export default function NotFoundPage() {
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "linear-gradient(180deg, #071d50 0%, #0d2060 100%)" }}
    >
      {/* Wobbling Pokéball */}
      <div
        className="mb-6 opacity-30"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <PokeBall size={120} />
      </div>

      {/* 404 */}
      <h1
        style={{
          fontFamily: "'Lilita One', cursive",
          fontSize: "clamp(64px, 14vw, 120px)",
          color: "#FFCB05",
          WebkitTextStroke: "3px #1a1a2e",
          paintOrder: "stroke fill",
          textShadow: "4px 6px 0 rgba(0,0,0,0.4)",
          lineHeight: 1,
        }}
      >
        404
      </h1>

      <p
        className="mt-2 font-black tracking-widest uppercase"
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "clamp(14px, 2.5vw, 20px)",
          color: "white",
          letterSpacing: "3px",
        }}
      >
        Seite nicht gefunden
      </p>

      <p
        className="mt-3 max-w-xs"
        style={{
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'Nunito', sans-serif",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        Diese Route existiert nicht. Vielleicht hat ein wilder Gengar sie verschluckt.
      </p>

      <div className="flex gap-3 mt-8 flex-wrap justify-center">
        <Link
          to="/"
          className="btn-primary"
        >
          ZUR STARTSEITE
        </Link>
      </div>
    </main>
  );
}
