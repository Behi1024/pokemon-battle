import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { fetchPokemonFull, TYPE_COLORS, type PokemonFull } from "../services/pokemonApiService";
import { PokeBall } from "./RegisterPage";
import { useAuth } from "../context/AuthContext";

const STAT_LABELS: Record<string, string> = {
  hp:               "KP",
  attack:           "Angriff",
  defense:          "Verteidigung",
  "special-attack": "Sp. Angriff",
  "special-defense":"Sp. Verteidigung",
  speed:            "Initiative",
};

const STAT_COLORS: Record<string, string> = {
  hp:               "#FF5959",
  attack:           "#F5AC78",
  defense:          "#FAE078",
  "special-attack": "#9DB7F5",
  "special-defense":"#A7DB8D",
  speed:            "#FA92B2",
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className="text-xs font-bold px-3 py-1 rounded-full text-white capitalize"
      style={{ background: TYPE_COLORS[type] ?? "#888", letterSpacing: "0.5px" }}
    >
      {type}
    </span>
  );
}

function StatBar({ name, value }: { name: string; value: number }) {
  const pct = Math.round((value / 255) * 100);
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs font-bold shrink-0 text-right"
        style={{ width: 110, color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif" }}
      >
        {STAT_LABELS[name] ?? name}
      </span>
      <span
        className="text-sm font-black shrink-0 text-right"
        style={{ width: 30, color: "white", fontFamily: "'Nunito', sans-serif" }}
      >
        {value}
      </span>
      <div
        className="flex-1 h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.12)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: STAT_COLORS[name] ?? "#FFCB05" }}
        />
      </div>
    </div>
  );
}

function SkeletonDetail() {
  return (
    <main
      className="flex-1 flex flex-col"
      style={{ background: "linear-gradient(180deg, #071d50 0%, #0d2060 100%)" }}
    >
      <div className="max-w-2xl mx-auto w-full px-4 pt-8 pb-16 animate-pulse">
        <div className="h-6 w-24 rounded-full mb-8" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="w-48 h-48 rounded-full mx-auto mb-6" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="h-8 w-40 rounded-full mx-auto mb-4" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="flex gap-2 justify-center mb-8">
          <div className="h-6 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="h-6 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
    </main>
  );
}

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [pokemon, setPokemon] = useState<PokemonFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchPokemonFull(id)
      .then(setPokemon)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <SkeletonDetail />;

  if (error || !pokemon) {
    return (
      <main
        className="flex-1 flex flex-col items-center justify-center gap-4"
        style={{ background: "linear-gradient(180deg, #071d50 0%, #0d2060 100%)" }}
      >
        <p className="text-red-400 font-semibold">{error ?? "Pokémon nicht gefunden."}</p>
        <Link to="/" className="btn-secondary">
          Zurück zur Übersicht
        </Link>
      </main>
    );
  }

  const primaryType = pokemon.types[0] ?? "normal";
  const typeColor   = TYPE_COLORS[primaryType] ?? "#888";

  return (
    <main
      className="flex-1 flex flex-col overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #071d50 0%, #0d2060 100%)" }}
    >
      <div className="max-w-2xl mx-auto w-full px-4 pt-6 pb-16">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 mb-6 transition-opacity hover:opacity-70"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 700 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>

        {/* Sprite card */}
        <div
          className="rounded-3xl flex flex-col items-center py-8 mb-6 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${typeColor}33 0%, ${typeColor}11 100%)`, border: `2px solid ${typeColor}44` }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <PokeBall size={280} />
          </div>
          <p
            className="font-black mb-1 relative z-10"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif", fontSize: 13, letterSpacing: 1 }}
          >
            #{String(pokemon.id).padStart(3, "0")}
          </p>
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-44 h-44 object-contain drop-shadow-2xl relative z-10"
          />
          <h1
            className="capitalize font-black mt-3 relative z-10"
            style={{
              fontFamily: "'Lilita One', cursive",
              fontSize: "clamp(26px, 5vw, 38px)",
              color: "#FFCB05",
              WebkitTextStroke: "1.5px #1a1a2e",
              paintOrder: "stroke fill",
              textShadow: "2px 3px 0 rgba(0,0,0,0.35)",
            }}
          >
            {pokemon.name}
          </h1>
          <div className="flex gap-2 mt-2 relative z-10">
            {pokemon.types.map((t) => <TypeBadge key={t} type={t} />)}
          </div>
        </div>

        {/* Info row */}
        <div
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { label: "Größe",       value: `${(pokemon.height / 10).toFixed(1)} m` },
            { label: "Gewicht",     value: `${(pokemon.weight / 10).toFixed(1)} kg` },
            { label: "Basis-EP",    value: String(pokemon.baseExperience) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl flex flex-col items-center py-3"
              style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.08)" }}
            >
              <span style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
                {label}
              </span>
              <span style={{ color: "white", fontFamily: "'Nunito', sans-serif", fontSize: 18, fontWeight: 900 }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl px-5 py-5 mb-8"
          style={{ background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.08)" }}
        >
          <h2
            className="font-black mb-4"
            style={{ color: "#FFCB05", fontFamily: "'Nunito', sans-serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}
          >
            Basiswerte
          </h2>
          <div className="flex flex-col gap-3">
            {pokemon.stats.map((s) => (
              <StatBar key={s.name} name={s.name} value={s.value} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 justify-center flex-wrap">
          {isAuthenticated ? (
            <Link to="/select" className="btn-primary">
              IN DEN KAMPF!
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary">REGISTRIEREN & KÄMPFEN</Link>
              <Link to="/login" className="btn-secondary">ANMELDEN</Link>
            </>
          )}
        </div>

      </div>
    </main>
  );
}
