import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router";
import { battleService } from "../services/battleService";
import { TYPE_COLORS, type PokemonSummary } from "../services/pokemonApiService";
import type { BattleResult } from "../types";

type Phase = "vs" | "fighting" | "result";


function TypeBadge({ type }: { type: string }) {
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white capitalize"
      style={{ background: TYPE_COLORS[type] ?? "#888" }}>
      {type}
    </span>
  );
}

function PowerBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito', sans-serif" }}>
        <span>{label}</span>
        <span className="font-bold">{value}</span>
      </div>
      <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.15)" }}>
        <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}


function PokemonPanel({
  pokemon, power, maxPower, side, shake, faded,
}: {
  pokemon: { name: string; types: string[]; sprite: string };
  power: number;
  maxPower: number;
  side: "left" | "right";
  shake?: boolean;
  faded?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 flex-1 px-4"
      style={{ opacity: faded ? 0.35 : 1, transition: "opacity 0.6s" }}>
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="object-contain drop-shadow-2xl"
        style={{
          width: "clamp(120px, 18vw, 200px)",
          height: "clamp(120px, 18vw, 200px)",
          transform: side === "right" ? "scaleX(-1)" : "none",
          animation: shake ? "shake 0.4s ease-in-out infinite" : "float 3s ease-in-out infinite",
          filter: faded ? "grayscale(80%)" : "none",
        }}
      />
      <p className="font-black capitalize text-white text-center"
        style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(14px, 2vw, 20px)" }}>
        {pokemon.name}
      </p>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types.map((t) => <TypeBadge key={t} type={t} />)}
      </div>
      <div className="w-full max-w-[180px]">
        <PowerBar label="Stärke" value={power} max={maxPower} color={side === "left" ? "#FFCB05" : "#EF4444"} />
      </div>
    </div>
  );
}


export default function BattlePage() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const selected = location.state?.pokemon as PokemonSummary | undefined;

  const [phase, setPhase]           = useState<Phase>("vs");
  const [result, setResult]         = useState<BattleResult | null>(null);
  const [error, setError]           = useState<string | null>(null);
  const [revealedEnemy, setRevealedEnemy] = useState<{ name: string; types: string[]; sprite: string } | null>(null);

  if (!selected) return <Navigate to="/select" replace />;

  const startBattle = async () => {
    setPhase("fighting");
    setRevealedEnemy(null);
    try {
      const battlePromise = battleService.fight({ pokemonId: selected.id });

      // Gegner anzeigen sobald API antwortet — unabhängig vom 2s-Timer
      battlePromise.then((res) => {
        const e = res.data.enemy;
        setRevealedEnemy({
          name:   e.name,
          types:  e.types.map((t) => t.type.name),
          sprite: e.sprites?.other?.["official-artwork"]?.front_default
                  ?? e.sprites?.front_default
                  ?? "",
        });
      });

      const [res] = await Promise.all([
        battlePromise,
        new Promise((r) => setTimeout(r, 2200)),
      ]);
      setResult(res.data);
      setPhase("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kampf fehlgeschlagen");
      setPhase("vs");
    }
  };

  const won   = result?.result === "win";
  const enemy = result?.enemy;

  if (phase === "vs" || phase === "fighting") {
    const fighting = phase === "fighting";

    return (
      <main className="flex-1 flex flex-col items-center justify-between py-8 px-4 relative"
        style={{ background: "linear-gradient(180deg, #071d50 0%, #0d1b3e 60%, #0a1228 100%)" }}>

        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                background: "white",
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Lilita One', cursive", fontSize: "clamp(20px, 3vw, 36px)", color: "#FFCB05", WebkitTextStroke: "1.5px #1a1a2e", paintOrder: "stroke fill", textShadow: "2px 3px 0 rgba(0,0,0,0.4)", letterSpacing: 1 }}>
          {fighting ? "KAMPF LÄUFT…" : "KAMPF ARENA"}
        </h1>

        {/* Pokemon vs Pokemon */}
        <div className="flex items-center justify-center gap-4 w-full max-w-3xl">
          <PokemonPanel
            pokemon={selected}
            power={selected.baseExperience}
            maxPower={Math.max(selected.baseExperience, 240)}
            side="left"
            shake={fighting}
          />

          {/* VS */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <span style={{ fontFamily: "'Lilita One', cursive", fontSize: "clamp(28px, 5vw, 64px)", color: "white", WebkitTextStroke: "2px #CC0000", paintOrder: "stroke fill", textShadow: "0 0 30px rgba(255,100,0,0.6)" }}>
              VS
            </span>
            {fighting && <span className="loading loading-spinner loading-md" style={{ color: "#FFCB05" }} />}
          </div>

          <PokemonPanel
            pokemon={revealedEnemy ?? { name: "???", types: ["normal"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png" }}
            power={revealedEnemy ? (result?.enemyPower ?? 0) : 0}
            maxPower={240}
            side="right"
            shake={fighting}
            faded={!revealedEnemy}
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}

        {/* CTA */}
        {!fighting && (
          <button
            onClick={startBattle}
            className="btn font-black text-lg tracking-widest gap-3"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1A1F5E", background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)", border: "2px solid #CC8800", boxShadow: "0 5px 0 #AA7000", borderRadius: 12, padding: "14px 36px" }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            KÄMPFEN!
          </button>
        )}
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 relative"
      style={{ background: won ? "linear-gradient(180deg,#071d50,#0d3020)" : "linear-gradient(180deg,#071d50,#2d0a0a)" }}>

      {/* Result badge */}
      <div className="flex flex-col items-center gap-2">
        <span style={{ fontFamily: "'Lilita One', cursive", fontSize: "clamp(40px, 8vw, 80px)", color: won ? "#FFCB05" : "#EF4444", WebkitTextStroke: "3px #1a1a2e", paintOrder: "stroke fill", textShadow: `0 0 40px ${won ? "rgba(255,203,5,0.7)" : "rgba(239,68,68,0.7)"}` }}>
          {won ? "SIEG!" : "NIEDERLAGE"}
        </span>
        <div className="flex items-center gap-2 px-5 py-2 rounded-full"
          style={{ background: "rgba(255,255,255,0.1)", border: `2px solid ${won ? "#FFCB05" : "#EF4444"}` }}>
          <span style={{ color: won ? "#FFCB05" : "#EF4444", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 20 }}>
            +{result?.score ?? 0}
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito', sans-serif", fontSize: 14 }}>Punkte</span>
        </div>
      </div>

      {/* Both Pokemon */}
      <div className="flex items-end justify-center gap-8 w-full max-w-2xl">
        <div className="flex flex-col items-center gap-2">
          <img src={selected.sprite} alt={selected.name}
            className="object-contain drop-shadow-2xl"
            style={{ width: "clamp(100px, 16vw, 180px)", height: "clamp(100px, 16vw, 180px)", filter: won ? "none" : "grayscale(50%)", opacity: won ? 1 : 0.6 }} />
          <p className="text-white font-black capitalize" style={{ fontFamily: "'Nunito', sans-serif" }}>{selected.name}</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'Nunito', sans-serif" }}>Stärke: {result?.playerPower}</p>
        </div>

        <span style={{ fontFamily: "'Lilita One', cursive", fontSize: 32, color: "rgba(255,255,255,0.3)" }}>VS</span>

        <div className="flex flex-col items-center gap-2">
          {enemy && (
            <>
              <img
                src={enemy.sprites?.other?.["official-artwork"]?.front_default ?? enemy.sprites?.front_default}
                alt={enemy.name}
                className="object-contain drop-shadow-2xl"
                style={{ width: "clamp(100px, 16vw, 180px)", height: "clamp(100px, 16vw, 180px)", filter: won ? "grayscale(50%)" : "none", opacity: won ? 0.6 : 1, transform: "scaleX(-1)" }} />
              <p className="text-white font-black capitalize" style={{ fontFamily: "'Nunito', sans-serif" }}>{enemy.name}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'Nunito', sans-serif" }}>Stärke: {result?.enemyPower}</p>
            </>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => navigate("/select")}
          className="btn btn-outline gap-2"
          style={{ color: "white", borderColor: "rgba(255,255,255,0.35)", fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.65 6.35a8 8 0 1 0 .71 10.24l-1.41-1.41A6 6 0 1 1 18 12h-3l4 4 4-4h-3a8 8 0 0 0-.35-5.65z"/></svg>
          Nochmal
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="btn font-black gap-2"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#1A1F5E", background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)", border: "2px solid #CC8800", boxShadow: "0 4px 0 #AA7000", borderRadius: 10 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/></svg>
          Bestenliste
        </button>
      </div>
    </main>
  );
}
