import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { fetchPokemonPage, searchPokemon, TYPE_COLORS, type PokemonSummary } from "../services/pokemonApiService";
import { PokeBall } from "./RegisterPage";

const PAGE_SIZE = 20;


function TypeBadge({ type }: { type: string }) {
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white capitalize"
      style={{ background: TYPE_COLORS[type] ?? "#888", letterSpacing: "0.5px" }}>
      {type}
    </span>
  );
}


function PokeCard({ pokemon, selected, onClick }: {
  pokemon: PokemonSummary;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-2xl p-3 w-full transition-all duration-200 cursor-pointer"
      style={{
        background: selected ? "white" : "rgba(255,255,255,0.07)",
        border: `3px solid ${selected ? "#FFCB05" : "transparent"}`,
        boxShadow: selected
          ? "0 0 22px rgba(255,203,5,0.55), 0 4px 12px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        transform: selected ? "scale(1.06)" : "scale(1)",
      }}
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <PokeBall size={80} />
        </div>
        <img src={pokemon.sprite} alt={pokemon.name}
          className="w-20 h-20 object-contain relative z-10 drop-shadow-md" loading="lazy" />
      </div>
      <span className="font-black capitalize text-sm text-center leading-tight"
        style={{ fontFamily: "'Nunito', sans-serif", color: selected ? "#1A1F5E" : "white" }}>
        #{String(pokemon.id).padStart(3, "0")} {pokemon.name}
      </span>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types.map((t) => <TypeBadge key={t} type={t} />)}
      </div>
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl p-3 animate-pulse"
      style={{ background: "rgba(255,255,255,0.07)", border: "3px solid transparent" }}>
      <div className="w-24 h-24 rounded-full mx-auto mb-2" style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="h-3 rounded-full mx-4 mb-2" style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="h-4 rounded-full mx-6" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}


export default function SelectPage() {
  const navigate = useNavigate();

  const [selected, setSelected]       = useState<PokemonSummary | null>(null);
  const [pokemon, setPokemon]         = useState<PokemonSummary[]>([]);
  const [loading, setLoading]         = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [search, setSearch]           = useState("");
  const [searching, setSearching]     = useState(false);
  const [offset, setOffset]           = useState(0);
  const [hasMore, setHasMore]         = useState(true);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial load
  useEffect(() => {
    fetchPokemonPage(PAGE_SIZE, 0)
      .then((list) => { setPokemon(list); setHasMore(list.length === PAGE_SIZE); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!search.trim()) return;
    setSearching(true);
    searchTimer.current = setTimeout(() => {
      searchPokemon(search)
        .then((p) => setPokemon([p]))
        .catch(() => setPokemon([]))
        .finally(() => setSearching(false));
    }, 500);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [search]);

  // Reset when search cleared
  useEffect(() => {
    if (search.trim()) return;
    setLoading(true);
    setOffset(0);
    fetchPokemonPage(PAGE_SIZE, 0)
      .then((list) => { setPokemon(list); setHasMore(list.length === PAGE_SIZE); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [search]);

  const loadMore = () => {
    const next = offset + PAGE_SIZE;
    setLoadingMore(true);
    fetchPokemonPage(PAGE_SIZE, next)
      .then((list) => {
        setPokemon((prev) => [...prev, ...list]);
        setOffset(next);
        setHasMore(list.length === PAGE_SIZE);
      })
      .finally(() => setLoadingMore(false));
  };

  return (
    <main className="flex-1 flex flex-col"
      style={{ background: "linear-gradient(180deg, #071d50 0%, #0d2060 100%)", minHeight: 0 }}>

      {/* Header */}
      <div className="text-center pt-8 pb-4 px-4">
        <h1 style={{ fontFamily: "'Lilita One', cursive", fontSize: "clamp(22px, 3.5vw, 44px)", color: "#FFCB05", WebkitTextStroke: "2px #1a1a2e", paintOrder: "stroke fill", textShadow: "2px 4px 0 rgba(0,0,0,0.4)" }}>
          WÄHLE DEIN POKÉMON
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Nunito', sans-serif", marginTop: 6, fontSize: "0.9rem" }}>
          Dein Gegner wird zufällig ausgewählt
        </p>

        {/* Search */}
        <div className="relative mt-4 mx-auto" style={{ maxWidth: 320 }}>
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24"
            stroke="rgba(255,255,255,0.5)" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text" placeholder="Pokémon suchen…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input w-full pl-9"
            style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 12 }}
          />
          {searching && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 loading loading-spinner loading-sm"
              style={{ color: "#FFCB05" }} />
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-36">
        {error ? (
          <div className="text-center py-16">
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
              {loading
                ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)
                : pokemon.map((p) => (
                    <PokeCard key={p.id} pokemon={p}
                      selected={selected?.id === p.id}
                      onClick={() => setSelected(p)} />
                  ))
              }
            </div>

            {!loading && !search.trim() && hasMore && (
              <div className="flex justify-center mt-6">
                <button onClick={loadMore} disabled={loadingMore}
                  className="btn btn-outline gap-2"
                  style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
                  {loadingMore
                    ? <span className="loading loading-spinner loading-sm" />
                    : "Mehr laden"}
                </button>
              </div>
            )}

            {!loading && pokemon.length === 0 && (
              <p className="text-center py-12"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif" }}>
                Kein Pokémon namens „{search}" gefunden.
              </p>
            )}
          </>
        )}
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-3"
        style={{ background: "#050e2a", borderTop: "3px solid #FFCB05" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {selected ? (
            <div className="flex items-center gap-3">
              <img src={selected.sprite} alt={selected.name} className="w-12 h-12 object-contain" />
              <div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "'Nunito', sans-serif" }}>Ausgewählt</p>
                <p className="capitalize font-black" style={{ color: "#FFCB05", fontFamily: "'Nunito', sans-serif", fontSize: 16 }}>
                  {selected.name}
                </p>
              </div>
            </div>
          ) : (
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif", fontSize: 13 }}>
              Noch kein Pokémon gewählt
            </p>
          )}

          <button
            onClick={() => selected && navigate("/battle", { state: { pokemon: selected } })}
            disabled={!selected}
            className="btn font-black text-base tracking-widest gap-2 shrink-0 disabled:opacity-40"
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: "#1A1F5E",
              background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)",
              border: "2px solid #CC8800",
              boxShadow: selected ? "0 4px 0 #AA7000" : "none",
              borderRadius: 10,
            }}
          >
            IN DEN KAMPF!
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

        </div>
      </div>
    </main>
  );
}
