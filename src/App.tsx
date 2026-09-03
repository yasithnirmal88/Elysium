import { useState, useEffect, useCallback, useRef } from "react";
import imgApproach from "@/imports/hero.png";
import imgStation from "@/imports/Pt9w5.jpg";
import imgHelios from "@/imports/wBd0k.jpg";
import imgAthena from "@/imports/0Uyc4.jpg";
import imgSelene from "@/imports/Zxkjh.jpg";
import imgGrove from "@/imports/Kv8MR.jpg";
import imgBaths from "@/imports/3VIMb.jpg";
import videoArrival from "@/imports/Space_station_orbiting_Earth_202609032235.mp4";

const UNSPLASH_BASE = "https://images.unsplash.com";

const UNSPLASH = {
  docking:    `${UNSPLASH_BASE}/photo-1649256316231-4cb68e712bb4?w=1920&h=1080&fit=crop&auto=format`,
  rim:        `${UNSPLASH_BASE}/photo-1765816625406-1970e5ba00b5?w=1920&h=1080&fit=crop&auto=format`,
  assembly:   `${UNSPLASH_BASE}/photo-1773433409467-52a8181c0b94?w=1920&h=1080&fit=crop&auto=format`,
  invitation: `${UNSPLASH_BASE}/photo-1675117570059-a20de3a15272?w=1920&h=1080&fit=crop&auto=format`,
};

interface ScreenDef {
  key: string;
  eyebrow: string;
  title: string;
  caption: string;
  imgSrc?: string;
  bgUrl?: string;
  videoSrc?: string;
  bgColor: string;
  animClass?: string;
  hasSteam?: boolean;
  hasInvitationCta?: boolean;
  overlayColor?: string;
  bgPosition?: string;
  isHero?: boolean;
}

const SCREENS: ScreenDef[] = [
  {
    key: "approach",
    eyebrow: "PRIVATE ORBITAL RESIDENCES · 2100",
    title: "LIVE AMONG\nTHE GODS.",
    caption: "A wheel of marble and gold turning above the world. Residencies are not purchased. They are conferred.",
    imgSrc: imgApproach,
    bgColor: "#05060a",
    animClass: "anim-approach",
    bgPosition: "center center",
    isHero: true,
  },
  {
    key: "docking",
    eyebrow: "PRIVATE RECEPTION",
    title: "Arrival",
    caption: "You do not land. You are received.",
    videoSrc: videoArrival,
    imgSrc: imgStation,
    bgUrl: UNSPLASH.docking,
    bgColor: "#0d0a06",
    animClass: "anim-docking",
    overlayColor: "rgba(180, 100, 20, 0.22)",
    bgPosition: "center center",
  },
  {
    key: "rim",
    eyebrow: "THE RESIDENTIAL RIM",
    title: "One Rotation",
    caption: "One rotation. Earth weight. A coast that never ends.",
    imgSrc: imgStation,
    bgUrl: UNSPLASH.rim,
    bgColor: "#07090f",
    animClass: "anim-rim",
    bgPosition: "center center",
  },
  {
    key: "helios",
    eyebrow: "PRIVATE VILLA · HELIOS COURT",
    title: "Perpetual Day",
    caption: "The sun never sets on the inner rim.",
    imgSrc: imgHelios,
    bgColor: "#0c0a06",
    bgPosition: "center center",
  },
  {
    key: "athena",
    eyebrow: "THE ATHENA GALLERY",
    title: "Silence",
    caption: "For those who still think in silence.",
    imgSrc: imgAthena,
    bgColor: "#08090d",
    bgPosition: "center center",
  },
  {
    key: "selene",
    eyebrow: "NIGHT-SIDE SUITE · SELENE",
    title: "The Dark Face",
    caption: "The night face of the wheel is reserved for rest.",
    imgSrc: imgSelene,
    bgColor: "#04050a",
    animClass: "anim-selene",
    bgPosition: "center top",
  },
  {
    key: "grove",
    eyebrow: "THE ELYSIAN GROVE",
    title: "Rain That Falls Nowhere",
    caption: "Rain that never falls on the cities below.",
    imgSrc: imgGrove,
    bgColor: "#060a08",
    bgPosition: "center center",
  },
  {
    key: "baths",
    eyebrow: "THERMAL BATHS",
    title: "The Baths",
    caption: "Longevity as hospitality, not a clinic.",
    imgSrc: imgBaths,
    bgColor: "#080a09",
    hasSteam: true,
    bgPosition: "center center",
  },
  {
    key: "assembly",
    eyebrow: "THE ASSEMBLY HALL",
    title: "No Nation",
    caption: "A city that answers to no nation.",
    imgSrc: imgStation,
    bgUrl: UNSPLASH.assembly,
    bgColor: "#0a0906",
    bgPosition: "center 30%",
  },
  {
    key: "invitation",
    eyebrow: "BY INVITATION ONLY",
    title: "Ask",
    caption: "Few seats. Absolute quiet. Ask to be received.",
    imgSrc: imgApproach,
    bgUrl: UNSPLASH.invitation,
    bgColor: "#090809",
    animClass: "anim-invitation",
    hasInvitationCta: true,
    bgPosition: "center center",
  },
];

// ─── Shared atoms ───────────────────────────────────────────────

function StarOverlay() {
  return <div className="star-overlay" aria-hidden="true" />;
}

function SteamOverlay() {
  const particles = [
    { left: "18%", width: 90,  height: 120, dur: "8s",   delay: "0s" },
    { left: "32%", width: 60,  height: 80,  dur: "6s",   delay: "1.4s" },
    { left: "45%", width: 110, height: 140, dur: "9s",   delay: "0.6s" },
    { left: "60%", width: 70,  height: 90,  dur: "7s",   delay: "2.1s" },
    { left: "72%", width: 95,  height: 130, dur: "8.5s", delay: "0.3s" },
    { left: "85%", width: 55,  height: 75,  dur: "6.5s", delay: "1.8s" },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="steam-particle"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            ["--dur" as string]: p.dur,
            ["--delay" as string]: p.delay,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

// ─── Dot rail ───────────────────────────────────────────────────

function NavDots({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav
      aria-label="Tour navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-[10px]"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to screen ${i + 1}`}
          className="w-[5px] h-[5px] rounded-full transition-all duration-500 cursor-pointer"
          style={{
            background: i === current ? "var(--gold)" : "transparent",
            border: `1px solid ${i === current ? "var(--gold)" : "var(--steel)"}`,
            transform: i === current ? "scale(1.5)" : "scale(1)",
          }}
        />
      ))}
    </nav>
  );
}

// ─── Caption ─────────────────────────────────────────────────────

function Caption({
  eyebrow,
  title,
  caption,
  screenKey,
  isHero,
  hasInvitationCta,
  onOpenModal,
  onNextScreen,
}: {
  eyebrow: string;
  title: string;
  caption: string;
  screenKey: string;
  isHero?: boolean;
  hasInvitationCta?: boolean;
  onOpenModal?: () => void;
  onNextScreen?: () => void;
}) {
  return (
    <div
      key={screenKey}
      className="caption-block absolute bottom-0 left-0 z-20 px-8 pb-12 md:px-16 md:pb-16 max-w-2xl"
      style={{
        background: isHero
          ? "radial-gradient(ellipse 950px 600px at bottom left, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.4) 65%, transparent 100%)"
          : "radial-gradient(ellipse 900px 500px at bottom left, rgba(5,5,5,0.75) 0%, transparent 70%)",
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: isHero ? "'Cinzel', serif" : "'Jost', sans-serif",
          fontSize: isHero ? "12px" : "10px",
          letterSpacing: isHero ? "0.32em" : "0.28em",
          color: isHero ? "var(--bronze)" : "var(--gold)",
          fontWeight: 400,
          marginBottom: isHero ? "18px" : "14px",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </p>

      {/* Main Headline */}
      <h1
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: isHero ? "clamp(44px, 5.6vw, 78px)" : "clamp(36px, 5.5vw, 68px)",
          fontWeight: 400,
          color: "var(--ivory)",
          lineHeight: 1.05,
          whiteSpace: "pre-line",
          marginBottom: "20px",
          letterSpacing: isHero ? "0.02em" : "-0.02em",
        }}
      >
        {title}
      </h1>

      {/* Subtitle / Description */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: isHero ? "clamp(16px, 1.45vw, 21px)" : "clamp(14px, 1.3vw, 17px)",
          fontWeight: 400,
          color: "var(--ivory-dim)",
          lineHeight: 1.65,
          maxWidth: isHero ? "540px" : "480px",
          marginBottom: isHero || hasInvitationCta ? "32px" : "0",
        }}
      >
        {caption}
      </p>

      {/* Hero CTA buttons */}
      {isHero && (
        <div className="flex items-center gap-5 flex-wrap" style={{ marginTop: "12px" }}>
          {/* Primary CTA */}
          <button
            onClick={onOpenModal}
            className="cursor-pointer transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              letterSpacing: "0.22em",
              fontWeight: 600,
              color: "#0a0907",
              background: "linear-gradient(135deg, #d4b276 0%, #c8a96e 50%, #b89352 100%)",
              border: "none",
              padding: "16px 32px",
              textTransform: "uppercase",
              boxShadow: "0 4px 20px rgba(200, 169, 110, 0.25)",
            }}
          >
            REQUEST AN INVITATION
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onNextScreen}
            className="cursor-pointer transition-all duration-300"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              letterSpacing: "0.22em",
              fontWeight: 400,
              color: "var(--ivory)",
              background: "rgba(10, 10, 14, 0.35)",
              border: "1px solid rgba(244, 238, 229, 0.28)",
              backdropFilter: "blur(4px)",
              padding: "16px 32px",
              textTransform: "uppercase",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.color = "var(--gold-bright)";
              e.currentTarget.style.background = "rgba(200, 169, 110, 0.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(244, 238, 229, 0.28)";
              e.currentTarget.style.color = "var(--ivory)";
              e.currentTarget.style.background = "rgba(10, 10, 14, 0.35)";
            }}
          >
            BEHOLD THE STATION
          </button>
        </div>
      )}

      {/* Screen 9 Invitation inline link */}
      {hasInvitationCta && !isHero && (
        <div className="flex items-center gap-5" style={{ marginTop: "8px" }}>
          <div
            style={{
              height: "1px",
              background: "var(--gold)",
              width: "100px",
              animation: "goldLineIn 2.4s cubic-bezier(0.16,1,0.3,1) 0.6s both",
            }}
            aria-hidden="true"
          />
          <button
            onClick={onOpenModal}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              letterSpacing: "0.28em",
              color: "var(--gold)",
              fontWeight: 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              borderBottom: "1px solid var(--gold-dim)",
              paddingBottom: "2px",
            }}
          >
            Request Consideration
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Screen wrapper ──────────────────────────────────────────────

function ElysiumScreen({
  screen,
  isActive,
  onOpenModal,
  onNextScreen,
}: {
  screen: ScreenDef;
  isActive: boolean;
  onOpenModal: () => void;
  onNextScreen: () => void;
}) {
  const bgSrc = screen.imgSrc ?? screen.bgUrl ?? "";

  return (
    <div
      className={`elysium-screen ${screen.animClass ?? ""} ${isActive ? "active" : ""}`}
      style={{ background: screen.bgColor }}
      aria-hidden={!isActive}
    >
      {/* Background media: Video or Image */}
      {screen.videoSrc ? (
        <video
          src={screen.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="screen-bg absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      ) : (
        <img
          src={bgSrc}
          alt={screen.title}
          className="screen-bg absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{
            objectPosition: screen.bgPosition ?? "center center",
            backgroundImage: bgSrc ? `url("${bgSrc}")` : undefined,
            backgroundSize: "cover",
            backgroundPosition: screen.bgPosition ?? "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Vignette overlay (hidden on hero so only the moving image shows) */}
      {!screen.isHero && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.05) 40%, rgba(5,5,5,0.6) 100%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Screen-specific tint */}
      {screen.overlayColor && (
        <div
          className="screen-bg-overlay absolute inset-0"
          style={{ zIndex: 2, background: screen.overlayColor }}
          aria-hidden="true"
        />
      )}

      {/* Star drift */}
      <StarOverlay />

      {/* Steam for baths */}
      {screen.hasSteam && <SteamOverlay />}

      {/* Caption block */}
      <Caption
        eyebrow={screen.eyebrow}
        title={screen.title}
        caption={screen.caption}
        screenKey={screen.key}
        isHero={screen.isHero}
        hasInvitationCta={screen.hasInvitationCta}
        onOpenModal={onOpenModal}
        onNextScreen={onNextScreen}
      />
    </div>
  );
}

// ─── Top navigation bar ──────────────────────────────────────────

const NAV_LINKS = [
  { label: "The Station", screen: 0 },
  { label: "Residences",  screen: 3 },
  { label: "Life Aboard", screen: 6 },
  { label: "Invitation",  screen: 9 },
];

function TopNav({
  current,
  onSelect,
  onOpenModal,
}: {
  current: number;
  onSelect: (i: number) => void;
  onOpenModal: () => void;
}) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12"
      style={{ height: 80, background: "transparent" }}
    >
      {/* Brand Wordmark (Left) */}
      <button
        onClick={() => onSelect(0)}
        className="flex items-center gap-3 cursor-pointer group"
        style={{ background: "none", border: "none", padding: 0 }}
        aria-label="ELYSIUM — return to start"
      >
        {/* Logo circle */}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1px solid var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform 0.5s ease",
          }}
          className="group-hover:scale-110"
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--gold)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "0.35em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          ELYSIUM
        </span>
      </button>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
        {NAV_LINKS.map(({ label, screen }) => (
          <button
            key={label}
            onClick={() => onSelect(screen)}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: current === screen ? "var(--ivory)" : "#9e8f7a",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--ivory)")}
            onMouseLeave={e => {
              e.currentTarget.style.color =
                current === screen ? "var(--ivory)" : "#9e8f7a";
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Request Entry Button (Right) */}
      <button
        onClick={onOpenModal}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--gold)",
          background: "rgba(10, 10, 14, 0.3)",
          border: "1px solid rgba(200, 169, 110, 0.45)",
          padding: "10px 22px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "var(--gold)";
          e.currentTarget.style.background = "rgba(200, 169, 110, 0.18)";
          e.currentTarget.style.color = "var(--gold-bright)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(200, 169, 110, 0.45)";
          e.currentTarget.style.background = "rgba(10, 10, 14, 0.3)";
          e.currentTarget.style.color = "var(--gold)";
        }}
      >
        REQUEST ENTRY
      </button>
    </header>
  );
}

// ─── Invitation Modal ──────────────────────────────────────────────

function InvitationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [sector, setSector] = useState("Helios Rim Villa");
  const [keyOrEmail, setKeyOrEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-lg overflow-hidden transition-all transform"
        style={{
          background: "rgba(10, 11, 16, 0.92)",
          border: "1px solid rgba(200, 169, 110, 0.35)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(200, 169, 110, 0.15)",
        }}
      >
        {/* Gold Accent Top Line */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #c8a96e, transparent)" }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer transition-color"
          style={{ fontFamily: "'Cinzel', serif", fontSize: "16px" }}
        >
          ✕
        </button>

        <div className="p-8 md:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    color: "var(--bronze)",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  CONCIERGE DISPATCH · ELYSIUM 2100
                </p>
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "var(--ivory)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Request Residency Consideration
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                  }}
                >
                  FULL NAME / TITLE
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Lord / Lady / Ambassador..."
                  className="w-full px-4 py-3 text-sm focus:outline-none transition-border"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(200, 169, 110, 0.25)",
                    color: "var(--ivory)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "16px",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                  }}
                >
                  ORBITAL SECTOR SELECTION
                </label>
                <select
                  value={sector}
                  onChange={e => setSector(e.target.value)}
                  className="w-full px-4 py-3 text-sm focus:outline-none transition-border"
                  style={{
                    background: "#0a0b10",
                    border: "1px solid rgba(200, 169, 110, 0.25)",
                    color: "var(--ivory)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "16px",
                  }}
                >
                  <option value="Helios Rim Villa">Helios Rim Villa (Perpetual Sun)</option>
                  <option value="Selene Night-side Suite">Selene Night-side Suite (Dark Face)</option>
                  <option value="Athena Gallery Penthouse">Athena Gallery Penthouse</option>
                  <option value="Elysian Grove Estate">Elysian Grove Estate</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                  }}
                >
                  DISPATCH EMAIL OR QUANTUM ENCRYPTION KEY
                </label>
                <input
                  type="email"
                  required
                  value={keyOrEmail}
                  onChange={e => setKeyOrEmail(e.target.value)}
                  placeholder="protocol@orbital-residence.eth"
                  className="w-full px-4 py-3 text-sm focus:outline-none transition-border"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(200, 169, 110, 0.25)",
                    color: "var(--ivory)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "16px",
                  }}
                />
              </div>

              <button
                type="submit"
                className="mt-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01]"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "11px",
                  letterSpacing: "0.24em",
                  fontWeight: 600,
                  color: "#0a0907",
                  background: "linear-gradient(135deg, #d4b276 0%, #c8a96e 50%, #b89352 100%)",
                  border: "none",
                  padding: "16px 24px",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(200, 169, 110, 0.3)",
                }}
              >
                TRANSMIT INVITATION REQUEST
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center py-6 gap-6">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "var(--gold)", fontSize: "20px" }}>✓</span>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "22px",
                    color: "var(--ivory)",
                    marginBottom: "8px",
                  }}
                >
                  REQUEST RECEIVED
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "18px",
                    color: "var(--ivory-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  Residencies are not purchased. They are conferred.<br />
                  An Elysium protocol attache will evaluate your inquiry.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "10px",
                  letterSpacing: "0.24em",
                  color: "var(--gold)",
                  background: "none",
                  border: "1px solid var(--gold-dim)",
                  padding: "10px 24px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                RETURN TO STATION
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────

export default function App() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wheelCooldown = useRef(false);

  useEffect(() => {
    SCREENS.forEach((screen) => {
      const src = screen.imgSrc ?? screen.bgUrl;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      const clamped = Math.max(0, Math.min(SCREENS.length - 1, index));
      setIsTransitioning(true);
      setCurrent(clamped);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [current, isTransitioning]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, isModalOpen]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isModalOpen || wheelCooldown.current) return;
      wheelCooldown.current = true;
      if (e.deltaY > 20)  next();
      else if (e.deltaY < -20) prev();
      setTimeout(() => { wheelCooldown.current = false; }, 900);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev, isModalOpen]);

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: "var(--void)" }}
    >
      {/* Screen stack */}
      {SCREENS.map((screen, i) => (
        <ElysiumScreen
          key={screen.key}
          screen={screen}
          isActive={i === current}
          onOpenModal={() => setIsModalOpen(true)}
          onNextScreen={next}
        />
      ))}

      {/* Persistent top nav */}
      <TopNav
        current={current}
        onSelect={goTo}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Dot rail */}
      <NavDots total={SCREENS.length} current={current} onSelect={goTo} />

      {/* Scroll hint — first screen only */}
      <div
        className="fixed bottom-8 right-8 z-40 flex items-center gap-3 transition-opacity duration-700"
        style={{ opacity: current === 0 ? 1 : 0, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "9px",
            letterSpacing: "0.28em",
            color: "var(--steel)",
          }}
        >
          SCROLL TO ENTER
        </span>
        <span style={{ color: "var(--gold)", fontSize: "13px" }}>→</span>
      </div>

      {/* Interactive Modal */}
      <InvitationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <MobileSwipe onNext={next} onPrev={prev} />
    </div>
  );
}

function MobileSwipe({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStart.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStart.current;
      if (dx < -40) onNext();
      else if (dx > 40) onPrev();
      touchStart.current = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [onNext, onPrev]);

  return null;
}
