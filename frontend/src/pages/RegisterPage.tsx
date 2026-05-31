import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";


export function PokeBall({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#EE1515" stroke="#1a1a2e" strokeWidth="4" />
      <path d="M2,50 A48,48 0 0,0 98,50 Z" fill="white" />
      <rect x="2" y="46" width="96" height="8" fill="#1a1a2e" />
      <circle cx="50" cy="50" r="13" fill="#1a1a2e" />
      <circle cx="50" cy="50" r="9" fill="white" />
      <circle cx="45" cy="45" r="3" fill="rgba(255,255,255,0.65)" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

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

function CheckIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
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

      {/* Sky + ground base */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg,#071d50 0%,#0d47a1 16%,#1565c0 32%,#1e88e5 50%,#64b5f6 64%,#81c784 64%,#4caf50 72%,#388e3c 78%,#c8a050 78%,#a07838 100%)",
      }}/>

      {/* Sun haze */}
      <div className="absolute" style={{
        top:"-30px", right:"14%",
        width:240, height:240,
        background:"radial-gradient(circle,rgba(255,248,160,0.38) 0%,rgba(255,235,59,0.14) 38%,transparent 70%)",
        borderRadius:"50%",
      }}/>

      {/* Stadium left wing */}
      <div className="absolute top-0 left-0" style={{
        width:"43%", height:"58%",
        background:"rgba(8,18,82,0.82)",
        clipPath:"polygon(0% 0%,100% 0%,100% 58%,55% 80%,22% 93%,0% 100%)",
      }}/>
      {/* Stadium right wing */}
      <div className="absolute top-0 right-0" style={{
        width:"43%", height:"58%",
        background:"rgba(8,18,82,0.82)",
        clipPath:"polygon(0% 0%,100% 0%,100% 100%,78% 93%,45% 80%,0% 58%)",
      }}/>
      {/* Stadium center block */}
      <div className="absolute top-0" style={{
        left:"42%", right:"42%", height:"41%",
        background:"rgba(10,22,95,0.75)",
      }}/>

      {/* Crowd seat rows */}
      <div className="absolute top-0 left-0 right-0" style={{
        height:"56%",
        backgroundImage:"repeating-linear-gradient(180deg,transparent,transparent 25px,rgba(255,255,255,0.055) 25px,rgba(255,255,255,0.055) 28px)",
        WebkitMaskImage:"linear-gradient(180deg,black 0%,black 60%,transparent 100%)",
        maskImage:"linear-gradient(180deg,black 0%,black 60%,transparent 100%)",
      }}/>

      {/* Stadium wall arch */}
      <div className="absolute" style={{
        top:"53%", left:0, right:0, height:"6%",
        background:"#0c1850",
        clipPath:"polygon(0% 100%,0% 55%,18% 22%,40% 5%,50% 0%,60% 5%,82% 22%,100% 55%,100% 100%)",
      }}/>

      {/* Clouds */}
      {[
        { top:"6%",  left:"4%",  w:116, opacity:0.93 },
        { top:"9%",  left:"31%", w:88,  opacity:0.78 },
        { top:"5%",  right:"4%", w:122, opacity:0.86 },
      ].map((c,i) => (
        <div key={i} className="absolute" style={{ top:c.top, left:(c as any).left, right:(c as any).right, opacity:c.opacity }}>
          <div style={{ position:"relative", width:c.w, height:Math.round(c.w*0.4) }}>
            <div style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"58%", background:"white", borderRadius:c.w*0.13 }}/>
            <div style={{ position:"absolute", bottom:"38%", left:"12%", width:"48%", height:"80%", background:"white", borderRadius:c.w*0.18 }}/>
            <div style={{ position:"absolute", bottom:"28%", left:"44%", width:"40%", height:"72%", background:"white", borderRadius:c.w*0.16 }}/>
          </div>
        </div>
      ))}

      {/* Stadium light towers */}
      {([{ side:"left" }, { side:"right" }] as {side:string}[]).map((l,i) => (
        <div key={i} className="absolute top-0" style={{ [l.side]: 10 }}>
          <div style={{ width:8, height:72, background:"#3a5aaa", margin:"0 auto" }}/>
          <div style={{ width:26, height:10, background:"#4a6abb", borderRadius:4, marginLeft:-9 }}/>
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:70, height:70, background:"radial-gradient(circle,rgba(255,255,190,0.28) 0%,transparent 70%)", borderRadius:"50%" }}/>
        </div>
      ))}

      {/* Flags */}
      {flags.map((f,i) => (
        <div key={i} className="absolute top-0" style={{ left:f.left, right:f.right }}>
          <div style={{ width:2, height:52, background:"rgba(255,255,255,0.62)", margin:"0 auto" }}/>
          <div style={{ width:24, height:16, background:f.color, marginTop:-52, marginLeft:2, clipPath:"polygon(0% 0%,100% 50%,0% 100%)" }}/>
        </div>
      ))}

      {/* Scoreboard */}
      <div className="absolute" style={{
        top:"26%", left:"50%", transform:"translateX(-50%)",
        width:116, height:78,
        background:"#060f26",
        border:"2px solid rgba(255,255,255,0.18)",
        borderRadius:8,
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 0 24px rgba(0,0,0,0.65)",
      }}>
        <PokeBall size={46}/>
      </div>

      {/* Grass strip */}
      <div className="absolute" style={{
        top:"63%", left:0, right:0, height:"8%",
        background:"linear-gradient(180deg,#58bb30 0%,#3d9020 100%)",
      }}/>

      {/* Arena dirt */}
      <div className="absolute" style={{
        top:"69%", left:0, right:0, bottom:0,
        background:"linear-gradient(180deg,#c8a050 0%,#a07838 100%)",
      }}/>
      {/* dirt shadow edge */}
      <div className="absolute" style={{
        top:"69%", left:0, right:0, height:"5%",
        background:"linear-gradient(180deg,rgba(0,0,0,0.18) 0%,transparent 100%)",
      }}/>

      {/* Battle oval */}
      <div className="absolute" style={{
        bottom:"14%", left:"50%", transform:"translateX(-50%)",
        width:"62%", height:"14%",
        border:"3px dashed rgba(255,255,255,0.52)",
        borderRadius:"50%",
        boxShadow:"0 0 20px rgba(255,255,255,0.1),inset 0 0 20px rgba(255,255,255,0.06)",
      }}/>

      {/* Center Pokeball */}
      <div className="absolute" style={{
        bottom:"14%", left:"50%",
        transform:"translateX(-50%) translateY(14px)",
      }}>
        <PokeBall size={32}/>
      </div>

      {/* Energy glows — suggest battle without characters */}
      <div className="absolute" style={{
        bottom:"16%", left:"14%",
        width:200, height:200,
        background:"radial-gradient(circle,rgba(255,203,5,0.30) 0%,rgba(255,230,60,0.10) 45%,transparent 70%)",
        borderRadius:"50%",
        animation:"float 3s ease-in-out infinite",
      }}/>
      <div className="absolute" style={{
        bottom:"12%", right:"8%",
        width:240, height:240,
        background:"radial-gradient(circle,rgba(255,87,34,0.28) 0%,rgba(255,138,0,0.10) 45%,transparent 70%)",
        borderRadius:"50%",
        animation:"float 2.6s ease-in-out infinite 0.6s",
      }}/>

      {/* Edge plants */}
      <div className="absolute" style={{ bottom:"30%", left:6, fontSize:22, lineHeight:1 }}>🌿🌸🌿</div>
      <div className="absolute" style={{ bottom:"30%", right:6, fontSize:22, lineHeight:1 }}>🌿🌸🌿</div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center pt-12 px-10 pointer-events-none">
        <h2 style={{
          fontFamily:"'Lilita One', cursive",
          fontSize:"clamp(22px,3.2vw,42px)",
          color:"white",
          textAlign:"center",
          lineHeight:1.25,
          WebkitTextStroke:"1.5px rgba(0,0,0,0.35)",
          paintOrder:"stroke fill",
          textShadow:"2px 4px 0 rgba(0,0,0,0.4)",
          letterSpacing:"1px",
        }}>
          TRAIN. BATTLE. WIN.
        </h2>
        <p style={{
          color:"rgba(255,255,255,0.95)",
          textAlign:"center",
          marginTop:12,
          fontFamily:"'Nunito', sans-serif",
          fontWeight:700,
          fontSize:"1rem",
          textShadow:"1px 1px 5px rgba(0,0,0,0.8)",
        }}>
          Build your team and become<br/>the ultimate champion!
        </p>
      </div>

    </div>
  );
}


interface FormState {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

function FormField({
  id, label, icon, type, placeholder, value, onChange, suffix, fieldError,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: React.ReactNode;
  fieldError?: string;
}) {
  const hasError = !!fieldError;
  return (
    <div>
      <label htmlFor={id} className="flex items-center gap-1.5 mb-1 text-xs font-black uppercase tracking-widest" style={{ color: "#1A1F5E" }}>
        <span style={{ color: hasError ? "#dc2626" : "#3B5BA5" }}>{icon}</span>
        {label}
      </label>
      <div className="relative">
        <input
          id={id} name={id} type={type} placeholder={placeholder}
          value={value} onChange={onChange}
          className="input w-full"
          style={{ borderColor: hasError ? "#dc2626" : "#3B5BA5", borderWidth: 2, paddingRight: suffix ? "2.75rem" : undefined }}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</span>}
      </div>
      {hasError && <p className="text-xs text-red-600 mt-1 ml-0.5">{fieldError}</p>}
    </div>
  );
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validateRegister(form: FormState): FieldErrors {
  const errs: FieldErrors = {};
  if (form.username.trim().length < 3)
    errs.username = "Username muss mindestens 3 Zeichen lang sein.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
  if (form.password.length < 8)
    errs.password = "Passwort muss mindestens 8 Zeichen lang sein.";
  else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(form.password))
    errs.password = "Passwort muss Groß- und Kleinbuchstaben enthalten.";
  else if (!/\d/.test(form.password))
    errs.password = "Passwort muss mindestens eine Zahl enthalten.";
  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password))
    errs.password = "Passwort muss mindestens ein Sonderzeichen enthalten.";
  if (form.confirm !== form.password)
    errs.confirm = "Passwörter stimmen nicht überein.";
  return errs;
}

export default function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [form, setForm] = useState<FormState>({ username: "", email: "", password: "", confirm: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    const updated = { ...form, [field]: e.target.value };
    setForm(updated);
    if (submitted) setFieldErrors(validateRegister(updated));
  };

  const checks = [
    { label: "At least 8 characters", ok: form.password.length >= 8 },
    { label: "Uppercase & lowercase letters", ok: /(?=.*[a-z])(?=.*[A-Z])/.test(form.password) },
    { label: "Include at least one number", ok: /\d/.test(form.password) },
    { label: "Include at least one special character", ok: /[!@#$%^&*(),.?":{}|<>]/.test(form.password) },
  ];

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateRegister(form);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      await register({ username: form.username, email: form.email, password: form.password });
      setSuccess(true);
    } catch {
      // error is already set in AuthContext
    }
  };

  const eyeBtn = (visible: boolean, toggle: () => void, label: string) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="text-gray-400 hover:text-[#3B5BA5] transition-colors"
    >
      <EyeIcon visible={visible} />
    </button>
  );

  return (
    <main className="flex flex-1">
      <div
        className="flex items-center justify-center p-5 lg:p-8 w-full lg:w-auto shrink-0"
        style={{
          background: "linear-gradient(155deg,#2A4DB5 0%,#1A3599 100%)",
          width: "min(100%, 460px)",
        }}
      >
        {/* Card */}
        <div
          className="bg-white w-full rounded-2xl overflow-hidden"
          style={{
            border: "3px solid #1A1F5E",
            boxShadow: "0 8px 32px rgba(0,0,0,0.38)",
            maxWidth: "400px",
          }}
        >
          {/* Pokeball stripe */}
          <div className="flex h-1.5">
            <div className="flex-1 bg-[#EE1515]" />
            <div className="w-7" style={{ background: "#1a1a2e" }} />
            <div className="flex-1 bg-white" style={{ borderTop: "2px solid #1a1a2e" }} />
          </div>

          <div className="px-7 py-5">

            {success && (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#dcfce7", border: "3px solid #16a34a" }}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-black" style={{ color: "#1A1F5E", fontFamily: "'Nunito', sans-serif" }}>
                    Account erstellt!
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Du kannst dich jetzt einloggen.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="btn w-full font-black text-base tracking-widest gap-2"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    color: "#1A1F5E",
                    background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)",
                    border: "2px solid #CC8800",
                    boxShadow: "0 4px 0 #AA7000",
                    borderRadius: 10,
                  }}
                >
                  Zum Login
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}

            {!success && <>
            {/* Title block */}
            <div className="flex flex-col items-center gap-1.5 mb-5">
              <PokeBall size={52} />
              <h1
                className="text-[22px] font-black tracking-wide text-center mt-0.5"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#1A1F5E", lineHeight: 1.2 }}
              >
                CREATE{" "}
                <span style={{ color: "#3B5BA5" }}>ACCOUNT</span>
              </h1>
              <p className="text-xs text-gray-500 text-center">
                Join the arena and start your journey!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <FormField
                id="username"
                label="Username"
                icon={<UserIcon />}
                type="text"
                placeholder="Choose a username"
                value={form.username}
                onChange={set("username")}
                fieldError={fieldErrors.username}
              />

              <FormField
                id="email"
                label="Email"
                icon={<MailIcon />}
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={set("email")}
                fieldError={fieldErrors.email}
              />

              <FormField
                id="password"
                label="Password"
                icon={<LockIcon />}
                type={showPw ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={set("password")}
                suffix={eyeBtn(showPw, () => setShowPw((v) => !v), showPw ? "Hide password" : "Show password")}
                fieldError={fieldErrors.password}
              />

              <FormField
                id="confirm"
                label="Confirm Password"
                icon={<LockIcon />}
                type={showCpw ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirm}
                onChange={set("confirm")}
                suffix={eyeBtn(showCpw, () => setShowCpw((v) => !v), showCpw ? "Hide password" : "Show password")}
                fieldError={fieldErrors.confirm}
              />

              {/* Password requirements */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                {checks.map((c, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <CheckIcon ok={c.ok} />
                    <span>{c.label}</span>
                  </div>
                ))}
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
                className="btn w-full font-black text-base tracking-widest gap-2 disabled:opacity-60"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: "#1A1F5E",
                  background: "linear-gradient(180deg,#FFE84D 0%,#FFCB05 55%,#E8B200 100%)",
                  border: "2px solid #CC8800",
                  boxShadow: isLoading ? "none" : "0 4px 0 #AA7000",
                  borderRadius: 10,
                }}
              >
                {isLoading ? "Creating account…" : "CREATE ACCOUNT"}
                {!isLoading && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Login link */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-extrabold hover:underline"
                  style={{ color: "#3B5BA5" }}
                >
                  LOGIN
                </a>
              </p>
            </form>
            </>}
          </div>
        </div>
      </div>

      <ArenaVisual />
    </main>
  );
}
