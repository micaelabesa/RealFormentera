"use client";


import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Cormorant_Garamond, Raleway } from "next/font/google";

/* ─── Fonts ──────────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

/* ─── Config ─────────────────────────────────────────────────────────────── */
const WHATSAPP_LINK =
  "https://wa.me/34633531887?text=Hola%20Rosita!%20Me%20gustar%C3%ADa%20planificar%20mis%20vacaciones%20en%20Formentera%20%F0%9F%8C%8A";
const EMAIL_LINK = "mailto:realformenteradreamestate@gmail.com";
const NAV_LINKS = [
  ["#servicios", "Servicios"],
  ["#medios", "Medios"],
  ["#sobre-mi", "Sobre Mi"],
  ["#contacto", "Contacto"],
] as const;

const SERVICES = [
  {
    emoji: "🎯",
    accent: "#6B4EA6",
    bg: "#EEE9F7",
    sub: "TU VIAJE, PERFECTAMENTE ORGANIZADO",
    title: "Planificación",
    desc: "Todo coordinado para que tú solo tengas que llegar y disfrutar. Packs 360° a tu medida.",
    items: [
      "Organización completa del viaje",
      "Packs vacacionales personalizados",
      "Alojamiento + Barcos + Actividades",
      "Transfers y logística",
      "Atención personal directa",
    ],
  },
  {
    emoji: "🌊",
    accent: "#0A9DBF",
    bg: "#E6F7FA",
    sub: "EL MAR COMO PROTAGONISTA",
    title: "Experiencias",
    desc: "Descubre Formentera desde adentro — y desde el mar — con una guía que lleva toda la vida aquí.",
    items: [
      "Guía turística personalizada",
      "Tours Formentera & Ibiza",
      "Salidas en barco y excursiones",
      "Actividades a medida",
      "Grupos exclusivos",
    ],
  },
  {
    emoji: "🏡",
    accent: "#1B5FA0",
    bg: "#EBF2FB",
    sub: "TU HOGAR EN EL MEDITERRÁNEO",
    title: "Alojamiento",
    desc: "Selección personalizada de propiedades — desde casas encantadoras hasta villas de lujo frente al mar.",
    items: [
      "Selección de casas y villas",
      "Asesoramiento personalizado",
      "Propiedades de lujo",
      "Compraventa inmobiliaria",
      "Gestión de reservas",
    ],
  },
  {
    emoji: "💒",
    accent: "#D94B8A",
    bg: "#F8EDF5",
    sub: "CELEBRACIONES ÚNICAS EN PARAÍSO",
    title: "Eventos",
    desc: "Bodas, aniversarios y celebraciones privadas en el escenario más hermoso del Mediterráneo.",
    items: [
      "Coordinación integral de bodas",
      "Aniversarios y celebraciones",
      "Fiestas privadas VIP",
      "Red de proveedores premium",
      "Logística completa en Formentera & Ibiza",
    ],
  },
];

const CREDENTIALS = [
  "Guía Patrimonio Cultural Baleares",
  "Titulada en Ecoturismo",
  "Socorrista · Cruz Roja",
  "Global Radio · Prensa Pitiusa",
  "Diplomada Operador Turístico",
];

const GALLERY_IMAGES = [
  "/images_galery/1000147075.jpg",
  "/images_galery/1000147096.jpg",
  "/images_galery/1000147097.jpg",
  "/images_galery/1000147100.jpg",
  "/images_galery/1000147102.jpg",
  "/images_galery/1000147103.jpg",
  "/images_galery/1000147104.jpg",
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }

    const closeMenu = () => setMobileNavOpen(false);
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("scroll", closeMenu, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", closeMenu);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const startAutoplay = () => {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
      }, 6000);
    };

    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
      }, 6000);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
      }, 6000);
    }
  };

  return (
    <main
      id="top"
      className={`${cormorant.variable} ${raleway.variable}`}
      style={{
        fontFamily: "var(--font-raleway)",
        backgroundColor: "#FEFBF4",
        overflowX: "hidden",
      }}
    >
      {/* ── Global styles & animations ────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes waShow {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }

        .anim-0 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .anim-1 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.22s both; }
        .anim-2 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.42s both; }
        .anim-3 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.62s both; }

        .hero-photo-wrap { animation: float 5s ease-in-out infinite; }

        .wa-float {
          position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 1000;
          animation: waShow 0.6s cubic-bezier(.34,1.56,.64,1) 1.8s both;
        }
        .wa-float-btn {
          width: 60px; height: 60px; border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 30px rgba(37,211,102,0.5);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .wa-float-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 14px 44px rgba(37,211,102,0.65);
        }

        /* Estate gradient text */
        .estate-text {
          background: linear-gradient(100deg, #00C9DC 0%, #C98BB9 52%, #7B5EA7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Service cards */
        .svc-card {
          transition: transform 0.38s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.38s ease;
        }
        .svc-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 32px 72px rgba(0,0,0,0.11) !important;
        }

        /* Nav links */
        .nav-link { transition: color 0.2s ease; text-decoration: none; }
        .nav-link:hover { color: #00BDD1 !important; }
        .nav-brand {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .nav-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .nav-icon-btn:hover { transform: translateY(-2px); }
        .nav-menu-btn {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.12);
          color: white;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .nav-menu-btn:hover { transform: translateY(-1px); }
        .mobile-nav-panel { display: none; }

        /* CTA buttons */
        .btn-primary {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          text-decoration: none; display: inline-block;
        }
        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 14px 44px rgba(201,139,185,0.34) !important;
        }
        .btn-ghost {
          transition: transform 0.22s ease, border-color 0.22s ease, color 0.22s ease;
          text-decoration: none; display: inline-block;
        }
        .btn-ghost:hover {
          transform: scale(1.04);
          border-color: #00BDD1 !important;
          color: #00BDD1 !important;
        }
        .btn-wa {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          text-decoration: none; display: inline-flex; align-items: center;
        }
        .btn-wa:hover {
          transform: scale(1.05);
          box-shadow: 0 14px 44px rgba(37,211,102,0.5) !important;
        }
        .btn-email {
          transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
          text-decoration: none; display: inline-flex; align-items: center;
        }
        .btn-email:hover {
          transform: scale(1.04);
          border-color: #C98BB9 !important;
          background: #FFF2F8 !important;
        }
        .ig-link { transition: color 0.2s ease; text-decoration: none; }
        .ig-link:hover { color: #1B5FA0 !important; }

        /* Responsive breakpoints */
        @media (max-width: 1300px) {
          .svc-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-grid    { grid-template-columns: 1fr !important; }
          .hero-photo   { display: none !important; }
          .hero-copy    { text-align: center; }
          .hero-btns    { justify-content: center !important; }
          .about-grid   { grid-template-columns: 1fr !important; }
          .about-photo  { display: none !important; }
        }
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-menu-btn { display: inline-flex !important; }
          .mobile-nav-panel {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 0 1rem 1rem;
            padding: 1rem 1.2rem 1.2rem;
            border-radius: 24px;
            background: linear-gradient(180deg, rgba(254,251,244,0.98) 0%, rgba(255,245,249,0.98) 100%);
            box-shadow: 0 20px 60px rgba(21,13,74,0.18);
          }
          .mobile-nav-actions {
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }
        }
        @media (max-width: 640px) {
          .wa-float {
            right: 1rem !important;
            bottom: 4.75rem !important;
          }
          .wa-float-btn {
            width: 52px !important;
            height: 52px !important;
          }
          .nav-shell    { padding: 1rem !important; }
          .nav-brand-text {
            font-size: 0.74rem !important;
            letter-spacing: 0.16em !important;
          }
          .mobile-nav-panel {
            margin: 0 1rem 1rem;
            padding: 1rem;
          }
          .svc-grid     { grid-template-columns: 1fr !important; }
          .contact-btns { flex-direction: column; align-items: center; }
        }
        @media (max-height: 600px) {
          .hero-section {
            min-height: 100svh !important;
          }
          .hero-grid {
            padding: 7rem 2rem 4.5rem !important;
          }
          .quote-section {
            padding: 4rem 2rem !important;
          }
          .services-section {
            padding: 2.5rem 2rem 6rem !important;
          }
          .about-section,
          .contact-section {
            padding: 5.5rem 2rem !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════ FLOATING WHATSAPP ═════ */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Contactar por WhatsApp"
      >
        <div className="wa-float-btn">
          <WhatsAppIcon size={28} color="white" />
        </div>
      </a>

      {/* ═══════════════════════════════════════════════════ NAV ═══════ */}
      <nav
        ref={navRef}
            style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(254,251,244,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,189,209,0.14)" : "none",
          transition: "background 0.35s ease, border 0.35s ease",
        }}
      >
        <div
          className="nav-shell"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "1.2rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo wordmark */}
          <a
            href="#top"
            className="nav-brand"
            onClick={() => setMobileNavOpen(false)}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              letterSpacing: "0.22em",
              fontSize: "0.92rem",
              color: scrolled ? "#150D4A" : "white",
              transition: "color 0.3s ease",
              userSelect: "none",
            }}
          >
            <span className="nav-brand-text">
              REAL FORMENTERA DREAM{" "}
              <span style={{ color: "#00BDD1", fontStyle: "italic" }}>ESTATE</span>
            </span>
          </a>

          {/* Links + CTA */}
          <div
            className="nav-links"
            style={{ display: "flex", alignItems: "center", gap: "2.4rem" }}
          >
            {NAV_LINKS.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                style={{
                  color: scrolled ? "#1B5FA0" : "rgba(255,255,255,0.82)",
                  fontFamily: "var(--font-raleway)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  fontWeight: 500,
                }}
              >
                {label.toUpperCase()}
              </a>
            ))}
            <div className="nav-actions">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-btn"
                aria-label="Contactar por WhatsApp"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(37,211,102,0.28)",
                }}
              >
                <WhatsAppIcon size={20} color="white" />
              </a>
              <a
                href={EMAIL_LINK}
                className="nav-icon-btn"
                aria-label="Enviar email"
                style={{
                  backgroundColor: scrolled ? "#EEF4FF" : "rgba(255,255,255,0.16)",
                  color: scrolled ? "#1B5FA0" : "white",
                  border: scrolled
                    ? "1px solid rgba(27,95,160,0.14)"
                    : "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <EmailIcon size={18} />
              </a>
            </div>
          </div>
          <button
            type="button"
            className="nav-menu-btn"
            aria-label={mobileNavOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
            style={{
              color: scrolled ? "#150D4A" : "white",
              borderColor: scrolled
                ? "rgba(21,13,74,0.14)"
                : "rgba(255,255,255,0.28)",
              background: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.12)",
            }}
          >
            <MenuIcon open={mobileNavOpen} />
          </button>
        </div>
        {mobileNavOpen && (
          <div className="mobile-nav-panel">
            {NAV_LINKS.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                onClick={() => setMobileNavOpen(false)}
                style={{
                  color: "#1B5FA0",
                  fontFamily: "var(--font-raleway)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.16em",
                  fontWeight: 600,
                }}
              >
                {label.toUpperCase()}
              </a>
            ))}
            <div className="mobile-nav-actions">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-btn"
                aria-label="Contactar por WhatsApp"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(37,211,102,0.25)",
                }}
                onClick={() => setMobileNavOpen(false)}
              >
                <WhatsAppIcon size={20} color="white" />
              </a>
              <a
                href={EMAIL_LINK}
                className="nav-icon-btn"
                aria-label="Enviar email"
                style={{
                  backgroundColor: "#EEF4FF",
                  background: "linear-gradient(135deg, #EEF4FF 0%, #FFF1F7 100%)",
                  color: "#1B5FA0",
                  border: "1px solid rgba(27,95,160,0.14)",
                }}
                onClick={() => setMobileNavOpen(false)}
              >
                <EmailIcon size={18} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════ HERO ══════ */}
      <section
        className="hero-section"
        style={{
          minHeight: "100svh",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(148deg, #150D4A 0%, #1B5FA0 34%, #0A9DBF 62%, #C98BB9 82%, #00C9DC 100%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Radial glow accent */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "12%",
            width: 540,
            height: 540,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,139,185,0.18) 0%, rgba(0,201,220,0.08) 42%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-6%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,192,218,0.16) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="hero-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "9rem 2rem 7rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Copy ─────────────────────────────────────────────────── */}
          <div className="hero-copy">
            <p
              className="anim-0"
              style={{
                color: "#00C9DC",
                letterSpacing: "0.38em",
                fontSize: "0.65rem",
                fontFamily: "var(--font-raleway)",
                fontWeight: 600,
                marginBottom: "1.8rem",
              }}
            >
              ✦ &nbsp;FORMENTERA · IBIZA · MEDITERRÁNEO ✦ 
            </p>

            <h1
              className="anim-1"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(3rem, 6.5vw, 5.8rem)",
                lineHeight: 1.02,
                color: "white",
                margin: "0 0 1.25rem",
              }}
            >
              Real Formentera
              <br />
              Dream
              <span
                className="estate-text"
                style={{
                  display: "block",
                  fontWeight: 700,
                  fontStyle: "italic",
                }}
              >
                ESTATE.
              </span>
            </h1>

            <p
              className="anim-2"
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "1.05rem",
                lineHeight: 1.88,
                marginBottom: "2.8rem",
                fontFamily: "var(--font-raleway)",
                fontWeight: 300,
                maxWidth: 440,
              }}
            >
              Tu asistente personal de vacaciones en el último paraíso del
              Mediterráneo. Experiencias, alojamiento y planificación —{" "}
              <em style={{ color: "rgba(255,255,255,0.96)" }}>
                con alguien que lleva toda la vida aquí.
              </em>
            </p>

            <div
              className="hero-btns anim-3"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  backgroundColor: "#00C9DC",
                  background:
                    "linear-gradient(135deg, #00C9DC 0%, #F4B7CE 100%)",
                  color: "#150D4A",
                  padding: "1.05rem 2.5rem",
                  borderRadius: 100,
                  fontSize: "0.78rem",
                  letterSpacing: "0.2em",
                  fontFamily: "var(--font-raleway)",
                  fontWeight: 700,
                }}
              >
                PLANIFICA TU VIAJE
              </a>
              <a
                href="#servicios"
                className="btn-ghost"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  color: "white",
                  padding: "1.05rem 2rem",
                  borderRadius: 100,
                  fontSize: "0.78rem",
                  letterSpacing: "0.2em",
                  fontFamily: "var(--font-raleway)",
                  fontWeight: 400,
                }}
              >
                DESCUBRIR ↓
              </a>
            </div>
          </div>

          {/* ── Photo ────────────────────────────────────────────────── */}
          <div
            className="hero-photo anim-2"
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Photo frame */}
            <div
              className="hero-photo-wrap"
              style={{
                position: "relative",
                width: 420,
                height: 520,
                borderRadius: "32px 32px 130px 32px",
                overflow: "hidden",
                boxShadow: "0 50px 100px rgba(0,0,0,0.45)",
              }}
            >
              <Image
                src="/rosita.png"
                alt="Rosita Clerici — Guía Formentera"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
                sizes="420px"
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(21,13,74,0.62) 0%, transparent 52%)",
                }}
              />
              {/* Quote on photo */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.05rem",
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  &quot;Llevo toda la vida aquí —<br />y nunca paro de enamorarme.&quot;
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "-1.25rem",
                backgroundColor: "white",
                borderRadius: 16,
                padding: "0.9rem 1.2rem",
                boxShadow: "0 20px 52px rgba(0,0,0,0.22)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#150D4A",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                25+
              </p>
              <p
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "0.56rem",
                  letterSpacing: "0.15em",
                  color: "#999",
                  margin: "0.25rem 0 0",
                  fontWeight: 500,
                }}
              >
                AÑOS EN FORMENTERA
              </p>
            </div>
          </div>
        </div>

        {/* Wave → next section */}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg
            viewBox="0 0 1440 92"
            fill="#FEFBF4"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%" }}
          >
            <path d="M0,46 C360,92 1080,0 1440,52 L1440,92 L0,92 Z" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ QUOTE ════ */}
      <section
        className="quote-section"
        style={{ backgroundColor: "#FEFBF4", padding: "5.5rem 2rem" }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          {/* Decorative quote marks */}
          <svg
            width="38"
            height="30"
            viewBox="0 0 38 30"
            fill="#1B5FA0"
            opacity={0.18}
            style={{ marginBottom: "1.5rem" }}
            aria-hidden="true"
          >
            <path d="M0 30V18C0 8 6 2 18 0L19.6 3.4C14.4 4.8 11 7.6 10.2 12H17V30H0ZM21 30V18C21 8 27 2 39 0L40.6 3.4C35.4 4.8 32 7.6 31.2 12H38V30H21Z" />
          </svg>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1.35rem, 2.8vw, 2rem)",
              lineHeight: 1.78,
              color: "#1B5FA0",
              fontWeight: 300,
              margin: 0,
            }}
          >
            <em>Estate</em> en italiano significa{" "}
            <strong style={{ fontWeight: 600 }}>verano.</strong>
            <br />
            <em>Estate</em> en inglés significa{" "}
            <strong style={{ fontWeight: 600 }}>propiedad.</strong>
            <br />
            Para mí, significa{" "}
            <span style={{ color: "#00BDD1", fontWeight: 600 }}>
              el sueño de vivir Formentera.
            </span>
          </p>
          <div
            style={{
              width: 54,
              height: 2,
              background: "linear-gradient(90deg, #1B5FA0, #00C9DC)",
              margin: "2.25rem auto",
              borderRadius: 2,
            }}
          />
          <p
            style={{
              color: "#bbb",
              letterSpacing: "0.22em",
              fontSize: "0.65rem",
              fontFamily: "var(--font-raleway)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            ROSITA CLERICI · GUÍA CERTIFICADA · FORMENTERA, BALEARES
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════ SERVICIOS ═══════ */}
      <section
        className="services-section"
        id="servicios"
        style={{ backgroundColor: "#FEFBF4", padding: "3rem 2rem 9rem" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                color: "#00BDD1",
                letterSpacing: "0.32em",
                fontSize: "0.65rem",
                fontFamily: "var(--font-raleway)",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              LO QUE OFREZCO
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 300,
                color: "#150D4A",
                lineHeight: 1.08,
                margin: 0,
              }}
            >
              Servicios{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#1B5FA0",
                }}
              >
                360°
              </span>
            </h2>
          </div>

          {/* Cards */}
          <div
            className="svc-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.75rem",
            }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="svc-card"
                style={{
                  backgroundColor: "white",
                  borderRadius: 24,
                  padding: "2.25rem",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.055)",
                  border: `1.5px solid ${s.bg}`,
                }}
              >
                {/* Icon pill */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: s.bg,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.75rem",
                    marginBottom: "1.6rem",
                  }}
                >
                  {s.emoji}
                </div>

                <p
                  style={{
                    color: s.accent,
                    letterSpacing: "0.18em",
                    fontSize: "0.56rem",
                    fontFamily: "var(--font-raleway)",
                    fontWeight: 600,
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.sub}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.9rem",
                    fontWeight: 600,
                    color: "#150D4A",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "#888",
                    fontSize: "0.85rem",
                    lineHeight: 1.75,
                    fontFamily: "var(--font-raleway)",
                    fontWeight: 300,
                    marginBottom: "1.5rem",
                  }}
                >
                  {s.desc}
                </p>

                <ul
                  style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}
                >
                  {s.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        marginBottom: "0.55rem",
                        color: "#555",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-raleway)",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: s.accent,
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    paddingTop: "1.25rem",
                    borderTop: `1.5px solid ${s.bg}`,
                  }}
                >
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: s.accent,
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textDecoration: "none",
                      fontFamily: "var(--font-raleway)",
                      fontWeight: 700,
                      borderBottom: `1.5px solid ${s.accent}`,
                      paddingBottom: "0.1rem",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.opacity =
                        "0.65")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.opacity =
                        "1")
                    }
                  >
                    CONSULTAR →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave → dark section */}
      <div style={{ backgroundColor: "#FEFBF4" }}>
        <svg
          viewBox="0 0 1440 80"
          fill="#150D4A"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%" }}
        >
          <path d="M0,0 C480,80 960,0 1440,55 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* ════════════════════════════════════════ COMUNICACIÓN & MEDIOS ═══════ */}
      <section
        id="medios"
        style={{ backgroundColor: "#150D4A", padding: "6rem 2rem" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                color: "#00C9DC",
                letterSpacing: "0.32em",
                fontSize: "0.65rem",
                fontFamily: "var(--font-raleway)",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              CONEXIÓN Y AUTORIDAD
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: 1.12,
                margin: 0,
                marginBottom: "1rem",
              }}
            >
              Comunicación{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#00C9DC",
                }}
              >
               y Medios
              </span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "0.95rem",
                lineHeight: 1.88,
                fontFamily: "var(--font-raleway)",
                fontWeight: 300,
                maxWidth: 600,
                margin: "1.5rem auto 0",
              }}
            >
              Con más de 25 años en la isla, he consolidado una presencia sólida en los principales medios de comunicación de Baleares, amplificando la voz de Formentera desde plataformas locales.
            </p>
          </div>

          {/* Media Partners Grid */}
<div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 160px)",
              gap: "4rem",
              alignItems: "start",
              justifyContent: "center",
              maxWidth: 1200,
              margin: "3rem auto 0",
            }}
          >
            {[
              {
                name: "Prensa Pitiusa",
                desc: "Periódico de Ibiza & Formentera Radio",
                logoSrc: "/media/logo_radio.png",
                logoAlt: "Logo Grupo Prensa Pitiusa",
              },
              {
                name: "Global Radio",
                desc: "Radiodifusión Nacional",
                logoSrc: "",
                logoAlt: "Logo Global Radio",
              },
              {
                name: "Global Classic",
                desc: "Música & Podcast",
                logoSrc: "",
                logoAlt: "Logo Global Classic",
              },
              {
                name: "Revista N&D Mag",
                desc: "Publicación Premium",
                logoSrc: "",
                logoAlt: "Logo Revista N&D Mag",
              },
              {
                name: "Ibiza-eivissa.tv",
                desc: "Televisión Digital",
                logoSrc: "",
                logoAlt: "Logo Ibiza-eivissa.tv",
              },
            ].map((media, i) => (
              <div
                key={i}
                style={{
                  // ✅ Todas las cards con el mismo ancho y alto fijo
                  width: 160,
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem 1rem",
                  borderRadius: 16,
                  border: "2px solid #E6F7FA",
                  backgroundColor: "rgba(10, 157, 191, 0.04)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#0A9DBF";
                  el.style.backgroundColor = "rgba(10, 157, 191, 0.08)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 12px 36px rgba(10, 157, 191, 0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#E6F7FA";
                  el.style.backgroundColor = "rgba(10, 157, 191, 0.04)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* ✅ Contenedor de imagen — fijo 72x72, listo para logo */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    backgroundColor: "#E6F7FA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.9rem",
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  {media.logoSrc ? (
                    // Cuando logoSrc tenga valor, muestra el logo real
                    <Image
                      src={media.logoSrc}
                      alt={media.logoAlt}
                      fill
                      style={{ objectFit: "contain", padding: "8px" }}
                      sizes="72px"
                    />
                  ) : (
                    // Placeholder hasta que lleguen los logos
                    <span
                      style={{
                        fontSize: "1.6rem",
                        opacity: 0.35,
                        userSelect: "none",
                      }}
                    >
                      📡
                    </span>
                  )}
                </div>
 
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#1B5FA0",
                    margin: "0 0 0.3rem",
                    lineHeight: 1.2,
                  }}
                >
                  {media.name}
                </h4>
                <p
                  style={{
                    fontSize: "0.65rem",
                    color: "#999",
                    fontFamily: "var(--font-raleway)",
                    margin: 0,
                    letterSpacing: "0.07em",
                    lineHeight: 1.4,
                  }}
                >
                  {media.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <p
              style={{
                color: "#00BDD1",
                fontSize: "0.78rem",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-raleway)",
                fontWeight: 600,
                marginBottom: "1.25rem",
              }}
            >
              ¿COLABORACIONES CON MEDIOS?
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                backgroundColor: "rgba(10, 157, 191, 0.12)",
                color: "#0A9DBF",
                padding: "0.9rem 2rem",
                borderRadius: 100,
                fontSize: "0.74rem",
                letterSpacing: "0.18em",
                fontFamily: "var(--font-raleway)",
                fontWeight: 700,
                border: "2px solid #0A9DBF",
                display: "inline-block",
              }}
            >
              SOLICITA MÁS INFORMACIÓN
            </a>
          </div>
        </div>
      </section>

      {/* Wave → light section */}
      <div style={{ backgroundColor: "#150D4A" }}>
        <svg
          viewBox="0 0 1440 80"
          fill="#FEFBF4"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%" }}
        >
          <path d="M0,32 C360,80 1080,0 1440,46 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* ════════════════════════════════════════ GALERÍA DE FOTOS ═════════ */}
      <section
        style={{ backgroundColor: "#FEFBF4", padding: "8rem 2rem" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                color: "#00BDD1",
                letterSpacing: "0.32em",
                fontSize: "0.65rem",
                fontFamily: "var(--font-raleway)",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              A LO LARGO DE LOS AÑOS
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                color: "#150D4A",
                lineHeight: 1.12,
                margin: 0,
              }}
            >
              Momentos históricos en
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#1B5FA0",
                }}
              >
                Formentera e Ibiza
              </span>
            </h2>
          </div>

          {/* Carousel Container */}
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              backgroundColor: "rgba(0,201,220,0.08)",
              border: "2px solid rgba(0,201,220,0.15)",
              aspectRatio: "16 / 10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={GALLERY_IMAGES[currentImageIndex]}
                alt={`Rosita Formentera ${currentImageIndex + 1}`}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "opacity 0.6s ease",
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
              />

              {/* Zoom Button */}
              <button
                onClick={() => {
                  setSelectedImageIndex(currentImageIndex);
                  setShowImageModal(true);
                }}
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "1.5rem",
                  backgroundColor: "rgba(0,201,220,0.95)",
                  color: "#150D4A",
                  border: "none",
                  padding: "0.75rem 1.25rem",
                  borderRadius: 100,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  fontFamily: "var(--font-raleway)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00BDD1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,201,220,0.95)";
                }}
              >
                🔍 AMPLIAR
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={handlePrevImage}
              style={{
                position: "absolute",
                left: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0,201,220,0.9)",
                color: "#150D4A",
                border: "none",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00BDD1";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,201,220,0.9)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ←
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextImage}
              style={{
                position: "absolute",
                right: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0,201,220,0.9)",
                color: "#150D4A",
                border: "none",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00BDD1";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,201,220,0.9)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
              }}
            >
              →
            </button>

            {/* Dots indicator */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "0.6rem",
                zIndex: 10,
              }}
            >
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  style={{
                    width: i === currentImageIndex ? 10 : 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: i === currentImageIndex ? "#00C9DC" : "rgba(0,201,220,0.4)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.width = "10px";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== currentImageIndex) {
                      (e.currentTarget as HTMLButtonElement).style.width = "8px";
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Image counter */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.85rem",
                fontFamily: "var(--font-raleway)",
                margin: 0,
                letterSpacing: "0.08em",
              }}
            >
              {currentImageIndex + 1} / {GALLERY_IMAGES.length}
            </p>
          </div>
        </div>
      </section>

      {/* Wave → dark section */}
      <div style={{ backgroundColor: "#FEFBF4" }}>
        <svg
          viewBox="0 0 1440 80"
          fill="#150D4A"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%" }}
        >
          <path d="M0,0 C480,80 960,0 1440,55 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* Modal para ampliar imagen */}
      {showImageModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.92)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setShowImageModal(false)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowImageModal(false)}
              style={{
                position: "absolute",
                top: "-2.5rem",
                right: 0,
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                fontSize: "2rem",
                cursor: "pointer",
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            {/* Image Container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={GALLERY_IMAGES[selectedImageIndex]}
                alt={`Rosita Formentera ${selectedImageIndex + 1}`}
                fill
                style={{
                  objectFit: "contain",
                }}
                sizes="90vw"
              />
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
              }}
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0,201,220,0.9)",
                color: "#150D4A",
                border: "none",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00BDD1";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,201,220,0.9)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ←
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
              }}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0,201,220,0.9)",
                color: "#150D4A",
                border: "none",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00BDD1";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(0,201,220,0.9)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
              }}
            >
              →
            </button>

            {/* Image counter in modal */}
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
                fontFamily: "var(--font-raleway)",
                letterSpacing: "0.08em",
              }}
            >
              {selectedImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
        </div>
      )}

      

      {/* ══════════════════════════════════════════════ SOBRE MÍ ═══════ */}
      <section
        className="about-section"
        id="sobre-mi"
        style={{ backgroundColor: "#150D4A", padding: "8rem 2rem" }}
      >
        <div
          className="about-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "5.5rem",
            alignItems: "center",
          }}
        >
          {/* Photo */}
          <div className="about-photo" style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "32px 130px 32px 32px",
                overflow: "hidden",
                position: "relative",
                height: 500,
              }}
            >
              <Image
                src="/rosita.png"
                alt="Rosita Clerici"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="500px"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 52%, rgba(21,13,74,0.68))",
                }}
              />
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                top: "2rem",
                right: "-1.25rem",
                backgroundColor: "#00C9DC",
                borderRadius: 14,
                padding: "0.9rem 1.15rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#150D4A",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                +25
              </p>
              <p
                style={{
                  fontFamily: "var(--font-raleway)",
                  fontSize: "0.56rem",
                  letterSpacing: "0.12em",
                  color: "#150D4A",
                  margin: "0.2rem 0 0",
                  fontWeight: 700,
                }}
              >
                AÑOS AQUÍ
              </p>
            </div>
          </div>

          {/* Story */}
          <div>
            <p
              style={{
                color: "#00C9DC",
                letterSpacing: "0.32em",
                fontSize: "0.65rem",
                fontFamily: "var(--font-raleway)",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              MI HISTORIA
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 300,
                color: "white",
                lineHeight: 1.12,
                marginBottom: "2rem",
              }}
            >
              Crecí en un velero.
              <br />
              <span
                className="estate-text"
                style={{ fontStyle: "italic", fontWeight: 700 }}
              >
                Formentera me eligió.
              </span>
            </h2>

            <div
              style={{
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.95,
                fontFamily: "var(--font-raleway)",
                fontWeight: 300,
                fontSize: "0.91rem",
              }}
            >
              <p style={{ marginBottom: "1.1rem" }}>
                Hasta los 6 años navegué por el mundo, con base en Ibiza, a bordo del velero
                de mi padre. Y así en cada verano fui descubriendo las islas. Pero... en 1999, la isla me invitó a quedarme — y así
                empezó todo: vendiendo fotografías en blanco y negro cuando aún
                no existían los móviles.
              </p>
              <p style={{ marginBottom: "1.1rem" }}>
                Con los años, mi pasión se multiplicó: guía turística,
                socorrista, publicista en revistas impresas (cuando Instagram no
                existía), promotora de apartamentos de lujo para famosos y
                futbolistas... haciendoles sentir en casa.
              </p>
              <p>
                Me di cuenta de que siempre ofrecía lo mismo:{" "}
                <span style={{ color: "#00C9DC", fontStyle: "italic" }}>
                  felicidad.
                </span>{" "}
                Hoy combino todo ese conocimiento para crear experiencias únicas.
                Tengo las llaves de ambas islas — y me encantaría abrirte sus
                puertas.
              </p>
            </div>

            {/* Credential tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginTop: "2.5rem",
              }}
            >
              {CREDENTIALS.map((c, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: "rgba(0,201,220,0.1)",
                    border: "1px solid rgba(0,201,220,0.27)",
                    color: "#00C9DC",
                    padding: "0.38rem 0.95rem",
                    borderRadius: 100,
                    fontSize: "0.66rem",
                    letterSpacing: "0.1em",
                    fontFamily: "var(--font-raleway)",
                    fontWeight: 500,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                marginTop: "2.5rem",
                backgroundColor: "#00C9DC",
                color: "#150D4A",
                padding: "1rem 2.2rem",
                borderRadius: 100,
                fontSize: "0.76rem",
                letterSpacing: "0.2em",
                fontFamily: "var(--font-raleway)",
                fontWeight: 700,
              }}
            >
              HABLEMOS DE TU VIAJE
            </a>
          </div>
        </div>
      </section>

      {/* Wave → sandy section */}
      <div style={{ backgroundColor: "#150D4A" }}>
        <svg
          viewBox="0 0 1440 80"
          fill="#F5E3C0"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%" }}
        >
          <path d="M0,32 C360,80 1080,0 1440,46 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════ CONTACTO ══════ */}
      <section
        className="contact-section"
        id="contacto"
        style={{ backgroundColor: "#F5E3C0", padding: "8rem 2rem" }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              color: "#1B5FA0",
              letterSpacing: "0.32em",
              fontSize: "0.65rem",
              fontFamily: "var(--font-raleway)",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            HABLEMOS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              fontWeight: 300,
              color: "#150D4A",
              lineHeight: 1.08,
              marginBottom: "1.5rem",
            }}
          >
            Cuéntame tu
            <br />
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 700,
                color: "#1B5FA0",
              }}
            >
              sueño de verano
            </span>
          </h2>
          <p
            style={{
              color: "#777",
              lineHeight: 1.88,
              fontFamily: "var(--font-raleway)",
              fontWeight: 300,
              fontSize: "0.95rem",
              marginBottom: "3rem",
              maxWidth: 500,
              margin: "0 auto 3rem",
            }}
          >
            Respondo personalmente a cada consulta. Sin formularios, sin robots.
            Solo una conversación real con alguien que conoce Formentera como la
            palma de su mano.
          </p>

          <div
            className="contact-btns"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "2.25rem",
            }}
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
              style={{
                gap: "0.7rem",
                backgroundColor: "#25D366",
                color: "white",
                padding: "1.1rem 2.4rem",
                borderRadius: 100,
                fontSize: "0.78rem",
                letterSpacing: "0.17em",
                fontFamily: "var(--font-raleway)",
                fontWeight: 700,
                boxShadow: "0 8px 36px rgba(37,211,102,0.35)",
              }}
            >
              <WhatsAppIcon size={19} color="white" />
              WHATSAPP
            </a>
            <a
              href={EMAIL_LINK}
              className="btn-email"
              style={{
                gap: "0.65rem",
                backgroundColor: "white",
                background: "linear-gradient(135deg, #FFFFFF 0%, #FFF4F8 100%)",
                color: "#1B5FA0",
                padding: "1.1rem 2.4rem",
                borderRadius: 100,
                fontSize: "0.78rem",
                letterSpacing: "0.17em",
                fontFamily: "var(--font-raleway)",
                fontWeight: 600,
                border: "2px solid rgba(27,95,160,0.2)",
              }}
            >
              <EmailIcon size={18} />
              EMAIL
            </a>
          </div>

          <a
            href="https://instagram.com/realformenteraestate"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#bbb",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-raleway)",
              fontWeight: 500,
            }}
          >
            <InstagramIcon size={16} />
            @REALFORMENTERAESTATE
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ FOOTER ════════ */}
      <footer
        style={{
          backgroundColor: "#0D0921",
          padding: "1rem 2rem 1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            letterSpacing: "0.26em",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "0.25rem",
          }}
        >
          REAL FORMENTERA DREAM{" "}
          <span style={{ color: "#00BDD1", fontStyle: "italic" }}>ESTATE</span>
        </p>
        <p
          style={{
            fontFamily: "var(--font-raleway)",
            fontSize: "0.56rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.22)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} ROSITA CLERICI · FORMENTERA, ISLAS
          BALEARES · TODOS LOS DERECHOS RESERVADOS
        </p>
        <p
          style={{
            fontFamily: "var(--font-raleway)",
            fontSize: "0.56rem",
            letterSpacing: "0.12em",
            color: "rgba(255,220,232,0.72)",
            margin: "0.55rem 0 0",
          }}
        >
          Desarrollo web by {" "}
          <a
            href="https://portfolio-mica.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00BDD1",
              textDecoration: "none",
            }}
          >
            Micaela Besasso
          </a>
        </p>
      </footer>
    </main>
  );
}

/* ─── SVG Icon helpers ────────────────────────────────────────────────────── */
function WhatsAppIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.508A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.51-5.214-1.4l-.374-.221-3.766.896.924-3.672-.243-.387A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function EmailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}
