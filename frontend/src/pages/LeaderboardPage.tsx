import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { battleService } from "../services/battleService";
import type { ScoreEntry } from "../types";

const MEDALS = ["🥇", "🥈", "🥉"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [scores, setScores]   = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    battleService.leaderboard()
      .then((res) => setScores(res.data))
      .catch((e) => setError(e instanceof Error ? e.message : "Fehler beim Laden"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      className="flex-1 flex flex-col px-4 py-8"
      style={{ background: "linear-gradient(180deg, #071d50 0%, #0d1b3e 100%)" }}
    >
      <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h1
            style={{
              fontFamily: "'Lilita One', cursive",
              fontSize: "clamp(24px, 4vw, 44px)",
              color: "#FFCB05",
              WebkitTextStroke: "2px #1a1a2e",
              paintOrder: "stroke fill",
              textShadow: "2px 4px 0 rgba(0,0,0,0.4)",
            }}
          >
            BESTENLISTE
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Nunito', sans-serif", marginTop: 6 }}>
            Die stärksten Trainer der Arena
          </p>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg" style={{ color: "#FFCB05" }} />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && scores.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif" }}>
              Noch keine Kämpfe bestritten.
            </p>
          </div>
        )}

        {!loading && scores.length > 0 && (
          <div className="flex flex-col gap-2">
            {scores.map((entry, i) => {
              const isTop3  = i < 3;
              const won     = entry.result === "win";
              return (
                <div
                  key={entry._id}
                  className="flex items-center gap-4 rounded-2xl px-5 py-3"
                  style={{
                    background: isTop3 ? "rgba(255,203,5,0.1)" : "rgba(255,255,255,0.05)",
                    border: `2px solid ${isTop3 ? "rgba(255,203,5,0.35)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {/* Rank */}
                  <span className="text-2xl w-8 text-center shrink-0">
                    {MEDALS[i] ?? <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 16 }}>#{i + 1}</span>}
                  </span>

                  {/* Pokemon sprite */}
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.pokemonId}.png`}
                    alt={entry.pokemonName}
                    className="w-10 h-10 object-contain shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-black capitalize truncate" style={{ color: "white", fontFamily: "'Nunito', sans-serif", fontSize: 15 }}>
                      {entry.username}
                    </p>
                    <p className="capitalize truncate" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif", fontSize: 12 }}>
                      {entry.pokemonName} vs {entry.enemyName}
                    </p>
                  </div>

                  {/* Result badge */}
                  <span
                    className="text-xs font-black px-2.5 py-1 rounded-full shrink-0"
                    style={{
                      background: won ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                      color: won ? "#4ade80" : "#f87171",
                      border: `1px solid ${won ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {won ? "SIEG" : "NIEDERLAGE"}
                  </span>

                  {/* Score */}
                  <div className="text-right shrink-0">
                    <p className="font-black" style={{ color: "#FFCB05", fontFamily: "'Nunito', sans-serif", fontSize: 18 }}>
                      {entry.score}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "'Nunito', sans-serif" }}>
                      {formatDate(entry.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => navigate("/select")}
            className="btn font-black gap-2"
            style={{ fontFamily: "'Nunito', sans-serif", color: "#1A1F5E", background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)", border: "2px solid #CC8800", boxShadow: "0 4px 0 #AA7000", borderRadius: 10 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Nochmal kämpfen
          </button>
        </div>

      </div>
    </main>
  );
}
