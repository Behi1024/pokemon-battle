import { useState } from "react";
import { useNavigate } from "react-router";
import { PokeBall } from "./RegisterPage";
import { useAuth } from "../context/AuthContext";
import { Toast } from "../components/ui/Toast";


function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}


function ArenaVisual() {
  const flags = [
    { left: 48,  color: "#43A047" },
    { left: 158, color: "#E53935" },
    { right: 48,  color: "#1565C0" },
    { right: 158, color: "#F9A825" },
  ] as { left?: number; right?: number; color: string }[];

  return (
    <div className="relative flex-1 overflow-hidden hidden lg:block">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#071d50 0%,#0d47a1 16%,#1565c0 32%,#1e88e5 50%,#64b5f6 64%,#81c784 64%,#4caf50 72%,#388e3c 78%,#c8a050 78%,#a07838 100%)" }}/>
      <div className="absolute" style={{ top:"-30px", right:"14%", width:240, height:240, background:"radial-gradient(circle,rgba(255,248,160,0.38) 0%,rgba(255,235,59,0.14) 38%,transparent 70%)", borderRadius:"50%" }}/>
      <div className="absolute top-0 left-0" style={{ width:"43%", height:"58%", background:"rgba(8,18,82,0.82)", clipPath:"polygon(0% 0%,100% 0%,100% 58%,55% 80%,22% 93%,0% 100%)" }}/>
      <div className="absolute top-0 right-0" style={{ width:"43%", height:"58%", background:"rgba(8,18,82,0.82)", clipPath:"polygon(0% 0%,100% 0%,100% 100%,78% 93%,45% 80%,0% 58%)" }}/>
      <div className="absolute top-0" style={{ left:"42%", right:"42%", height:"41%", background:"rgba(10,22,95,0.75)" }}/>
      <div className="absolute top-0 left-0 right-0" style={{ height:"56%", backgroundImage:"repeating-linear-gradient(180deg,transparent,transparent 25px,rgba(255,255,255,0.055) 25px,rgba(255,255,255,0.055) 28px)", WebkitMaskImage:"linear-gradient(180deg,black 0%,black 60%,transparent 100%)", maskImage:"linear-gradient(180deg,black 0%,black 60%,transparent 100%)" }}/>
      <div className="absolute" style={{ top:"53%", left:0, right:0, height:"6%", background:"#0c1850", clipPath:"polygon(0% 100%,0% 55%,18% 22%,40% 5%,50% 0%,60% 5%,82% 22%,100% 55%,100% 100%)" }}/>

      {[{ top:"6%", left:"4%", w:116, opacity:0.93 }, { top:"9%", left:"31%", w:88, opacity:0.78 }, { top:"5%", right:"4%", w:122, opacity:0.86 }].map((c,i) => (
        <div key={i} className="absolute" style={{ top:c.top, left:(c as any).left, right:(c as any).right, opacity:c.opacity }}>
          <div style={{ position:"relative", width:c.w, height:Math.round(c.w*0.4) }}>
            <div style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"58%", background:"white", borderRadius:c.w*0.13 }}/>
            <div style={{ position:"absolute", bottom:"38%", left:"12%", width:"48%", height:"80%", background:"white", borderRadius:c.w*0.18 }}/>
            <div style={{ position:"absolute", bottom:"28%", left:"44%", width:"40%", height:"72%", background:"white", borderRadius:c.w*0.16 }}/>
          </div>
        </div>
      ))}

      {([{ side:"left" }, { side:"right" }] as {side:string}[]).map((l,i) => (
        <div key={i} className="absolute top-0" style={{ [l.side]: 10 }}>
          <div style={{ width:8, height:72, background:"#3a5aaa", margin:"0 auto" }}/>
          <div style={{ width:26, height:10, background:"#4a6abb", borderRadius:4, marginLeft:-9 }}/>
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:70, height:70, background:"radial-gradient(circle,rgba(255,255,190,0.28) 0%,transparent 70%)", borderRadius:"50%" }}/>
        </div>
      ))}

      {flags.map((f,i) => (
        <div key={i} className="absolute top-0" style={{ left:f.left, right:f.right }}>
          <div style={{ width:2, height:52, background:"rgba(255,255,255,0.62)", margin:"0 auto" }}/>
          <div style={{ width:24, height:16, background:f.color, marginTop:-52, marginLeft:2, clipPath:"polygon(0% 0%,100% 50%,0% 100%)" }}/>
        </div>
      ))}

      <div className="absolute" style={{ top:"26%", left:"50%", transform:"translateX(-50%)", width:116, height:78, background:"#060f26", border:"2px solid rgba(255,255,255,0.18)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 24px rgba(0,0,0,0.65)" }}>
        <PokeBall size={46}/>
      </div>

      <div className="absolute" style={{ top:"63%", left:0, right:0, height:"8%", background:"linear-gradient(180deg,#58bb30 0%,#3d9020 100%)" }}/>
      <div className="absolute" style={{ top:"69%", left:0, right:0, bottom:0, background:"linear-gradient(180deg,#c8a050 0%,#a07838 100%)" }}/>
      <div className="absolute" style={{ top:"69%", left:0, right:0, height:"5%", background:"linear-gradient(180deg,rgba(0,0,0,0.18) 0%,transparent 100%)" }}/>

      <div className="absolute" style={{ bottom:"14%", left:"50%", transform:"translateX(-50%)", width:"62%", height:"14%", border:"3px dashed rgba(255,255,255,0.52)", borderRadius:"50%", boxShadow:"0 0 20px rgba(255,255,255,0.1),inset 0 0 20px rgba(255,255,255,0.06)" }}/>
      <div className="absolute" style={{ bottom:"14%", left:"50%", transform:"translateX(-50%) translateY(14px)" }}>
        <PokeBall size={32}/>
      </div>

      <div className="absolute" style={{ bottom:"16%", left:"14%", width:200, height:200, background:"radial-gradient(circle,rgba(255,203,5,0.30) 0%,rgba(255,230,60,0.10) 45%,transparent 70%)", borderRadius:"50%", animation:"float 3s ease-in-out infinite" }}/>
      <div className="absolute" style={{ bottom:"12%", right:"8%", width:240, height:240, background:"radial-gradient(circle,rgba(255,87,34,0.28) 0%,rgba(255,138,0,0.10) 45%,transparent 70%)", borderRadius:"50%", animation:"float 2.6s ease-in-out infinite 0.6s" }}/>
      <div className="absolute" style={{ bottom:"30%", left:6, fontSize:22, lineHeight:1 }}>🌿🌸🌿</div>
      <div className="absolute" style={{ bottom:"30%", right:6, fontSize:22, lineHeight:1 }}>🌿🌸🌿</div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center pt-12 px-10 pointer-events-none">
        <h2 style={{ fontFamily:"'Lilita One', cursive", fontSize:"clamp(22px,3.2vw,42px)", color:"white", textAlign:"center", lineHeight:1.25, WebkitTextStroke:"1.5px rgba(0,0,0,0.35)", paintOrder:"stroke fill", textShadow:"2px 4px 0 rgba(0,0,0,0.4)", letterSpacing:"1px" }}>
          WELCOME BACK,<br/>TRAINER!
        </h2>
        <p style={{ color:"rgba(255,255,255,0.95)", textAlign:"center", marginTop:12, fontFamily:"'Nunito', sans-serif", fontWeight:700, fontSize:"1rem", textShadow:"1px 1px 5px rgba(0,0,0,0.8)" }}>
          Your next battle awaits.<br/>Log in to continue.
        </p>
      </div>
    </div>
  );
}


type LoginFieldErrors = { email?: string; password?: string };

function validateLogin(form: { email: string; password: string }): LoginFieldErrors {
  const errs: LoginFieldErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
  if (form.password.length < 1)
    errs.password = "Bitte Passwort eingeben.";
  return errs;
}

export default function LoginPage() {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    const updated = { ...form, [field]: e.target.value };
    setForm(updated);
    if (submitted) setFieldErrors(validateLogin(updated));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateLogin(form);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      await login({ email: form.email, password: form.password });
      setShowToast(true);
      setTimeout(() => navigate("/select"), 1500);
    } catch {
      // error is already set in AuthContext
    }
  };

  return (
    <main className="flex flex-1">
      {showToast && <Toast message="Willkommen zurück, Trainer! ⚡" type="success" duration={1500} />}

      <div
        className="flex items-center justify-center p-5 lg:p-8 w-full lg:w-auto shrink-0"
        style={{ background: "linear-gradient(155deg,#2A4DB5 0%,#1A3599 100%)", width: "min(100%, 460px)" }}
      >
        <div
          className="bg-white w-full rounded-2xl overflow-hidden"
          style={{ border: "3px solid #1A1F5E", boxShadow: "0 8px 32px rgba(0,0,0,0.38)", maxWidth: "400px" }}
        >
          {/* Pokeball stripe */}
          <div className="flex h-1.5">
            <div className="flex-1 bg-[#EE1515]" />
            <div className="w-7" style={{ background: "#1a1a2e" }} />
            <div className="flex-1 bg-white" style={{ borderTop: "2px solid #1a1a2e" }} />
          </div>

          <div className="px-7 py-6">
            {/* Title */}
            <div className="flex flex-col items-center gap-1.5 mb-6">
              <PokeBall size={52} />
              <h1
                className="text-[22px] font-black tracking-wide text-center mt-0.5"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#1A1F5E", lineHeight: 1.2 }}
              >
                WELCOME <span style={{ color: "#3B5BA5" }}>BACK!</span>
              </h1>
              <p className="text-xs text-gray-500 text-center">
                Log in to your trainer account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center gap-1.5 mb-1 text-xs font-black uppercase tracking-widest" style={{ color: "#1A1F5E" }}>
                  <span style={{ color: fieldErrors.email ? "#dc2626" : "#3B5BA5" }}><MailIcon /></span>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={set("email")}
                  className="input w-full"
                  style={{ borderColor: fieldErrors.email ? "#dc2626" : "#3B5BA5", borderWidth: 2 }}
                />
                {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: "#1A1F5E" }}>
                    <span style={{ color: fieldErrors.password ? "#dc2626" : "#3B5BA5" }}><LockIcon /></span>
                    Password
                  </label>
                  <a href="/forgot-password" className="text-xs font-bold hover:underline" style={{ color: "#3B5BA5" }}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={set("password")}
                    className="input w-full"
                    style={{ borderColor: fieldErrors.password ? "#dc2626" : "#3B5BA5", borderWidth: 2, paddingRight: "2.75rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3B5BA5] transition-colors"
                  >
                    <EyeIcon visible={showPw} />
                  </button>
                </div>
                {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
              </div>

              {/* API error */}
              {error && (
                <p className="text-xs text-red-600 font-semibold text-center bg-red-50 rounded-lg px-3 py-2 border border-red-200">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn w-full font-black text-base tracking-widest gap-2 mt-2 disabled:opacity-60"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: "#1A1F5E",
                  background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)",
                  border: "2px solid #CC8800",
                  boxShadow: isLoading ? "none" : "0 4px 0 #AA7000",
                  borderRadius: 10,
                }}
              >
                {isLoading ? "Logging in…" : "LOGIN"}
                {!isLoading && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Register link */}
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/register" className="font-extrabold hover:underline" style={{ color: "#3B5BA5" }}>
                  REGISTER
                </a>
              </p>

            </form>
          </div>
        </div>
      </div>

      <ArenaVisual />

    </main>
  );
}
