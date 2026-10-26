import React, { useState, useEffect } from 'react'

export const LumaSacredBg: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Respect user's motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let frameId: number | null = null
    const handleMove = (e: MouseEvent) => {
      if (frameId) return
      frameId = window.requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 16
        const ny = (e.clientY / window.innerHeight - 0.5) * 16
        setOffset({ x: nx, y: ny })
        frameId = null
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="luma-sacred-bg-root" aria-hidden="true">
      {/* 1. Ambient Horizon Sunlight & Aurora Glow Wash */}
      <div
        className="luma-ambient-glow"
        style={{
          transform: `translate3d(${offset.x * 0.5}px, ${offset.y * 0.5}px, 0)`
        }}
      />

      {/* 2. Responsive Multi-Layer Master SVG Canvas */}
      <svg
        className="luma-sacred-svg"
        viewBox="0 0 1440 960"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Aurora Mesh Gradients */}
          <radialGradient id="auroraSky" cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#818cf8" stopOpacity="0.16" />
            <stop offset="65%" stopColor="#34d399" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.04" />
          </radialGradient>

          {/* Golden Morning Dawn Sunburst */}
          <radialGradient id="dawnGlow" cx="50%" cy="18%" r="45%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#fb923c" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Golden Sunbeams */}
          <linearGradient id="goldenBeam" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Tree Trunk & Bark Gradient */}
          <linearGradient id="barkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#334155" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
          </linearGradient>

          {/* Emerald Wisdom Foliage Gradient */}
          <radialGradient id="leafEmerald" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
          </radialGradient>

          {/* Cyan Neural Leaves Gradient */}
          <radialGradient id="leafCyan" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.15" />
          </radialGradient>

          {/* Open Book Pages Gradient */}
          <linearGradient id="bookPageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="48%" stopColor="#f8fafc" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.9" />
            <stop offset="52%" stopColor="#f8fafc" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>

          {/* Corner Astrolabe Hologram */}
          <linearGradient id="astrolabeHolo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>

          {/* Corner Constellation Gold */}
          <linearGradient id="cornerGold" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
          </linearGradient>

          {/* Floating Particle Glow */}
          <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Global Atmosphere Fill */}
        <rect width="1440" height="960" fill="url(#auroraSky)" />
        <rect width="1440" height="960" fill="url(#dawnGlow)" />

        {/* -------------------------------------------------------------
            CELESTIAL SUNBEAM RAYS (STREAMING DOWN ACROSS THE SKY)
            ------------------------------------------------------------- */}
        <g opacity="0.65" className="sacred-sunbeams">
          <polygon points="720,0 480,960 590,960" fill="url(#goldenBeam)" />
          <polygon points="720,0 640,960 760,960" fill="url(#goldenBeam)" />
          <polygon points="720,0 810,960 930,960" fill="url(#goldenBeam)" />
          <polygon points="720,0 980,850 1100,850" fill="url(#goldenBeam)" />
          <polygon points="720,0 320,850 440,850" fill="url(#goldenBeam)" />
        </g>

        {/* -------------------------------------------------------------
            CENTER: THE SACRED TREE OF KNOWLEDGE & WISDOM BOOK
            (Reflecting the user's inspired vision of learning & life)
            ------------------------------------------------------------- */}
        <g
          className="sacred-tree-group"
          transform={`translate(${720 + offset.x * 0.3}, ${620 + offset.y * 0.3})`}
        >
          {/* Mountain & Hill Altar Silhouette */}
          <path
            d="M-420,180 Q-200,90 0,110 Q200,90 420,180 L420,340 L-420,340 Z"
            fill="#e2e8f0"
            fillOpacity="0.3"
          />
          <path
            d="M-300,160 Q-150,115 0,125 Q150,115 300,160 L300,340 L-300,340 Z"
            fill="#cbd5e1"
            fillOpacity="0.25"
          />

          {/* Sacred Open Book Base (Foundation of Learning) */}
          {/* Left Page Arcs */}
          <path
            d="M0,120 C-60,110 -140,115 -210,140 C-210,145 -205,155 -195,158 C-130,135 -60,130 0,138 Z"
            fill="url(#bookPageGrad)"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <path
            d="M0,126 C-58,116 -135,122 -200,146 C-200,150 -195,159 -188,162 C-125,142 -58,136 0,144 Z"
            fill="url(#bookPageGrad)"
            stroke="#94a3b8"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Right Page Arcs */}
          <path
            d="M0,120 C60,110 140,115 210,140 C210,145 205,155 195,158 C130,135 60,130 0,138 Z"
            fill="url(#bookPageGrad)"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <path
            d="M0,126 C58,116 135,122 200,146 C200,150 195,159 188,162 C125,142 58,136 0,144 Z"
            fill="url(#bookPageGrad)"
            stroke="#94a3b8"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Book Spine Center Glow */}
          <line x1="0" y1="118" x2="0" y2="148" stroke="#3b82f6" strokeWidth="2.5" strokeOpacity="0.7" />
          <circle cx="0" cy="120" r="4" fill="#60a5fa" />

          {/* Tree Roots Twisting over the open pages */}
          <path
            d="M-22,120 C-35,128 -70,134 -110,138 M22,120 C35,128 70,134 110,138"
            stroke="#475569"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.5"
            fill="none"
          />

          {/* Tree Trunk Rising Gracefully */}
          <path
            d="M-24,120 C-28,70 -45,10 -80,-50 C-95,-75 -110,-95 -145,-120 M-80,-50 C-60,-80 -55,-130 -65,-180 M-65,-100 C-35,-140 -20,-190 -25,-250 M24,120 C28,70 45,10 80,-50 C95,-75 110,-95 145,-120 M80,-50 C60,-80 55,-130 65,-180 M65,-100 C35,-140 20,-190 25,-250 M0,20 C-5,-40 -10,-100 0,-170"
            stroke="url(#barkGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Tree Secondary Branches */}
          <path
            d="M-110,-95 C-135,-115 -170,-130 -200,-135 M-145,-120 C-160,-150 -185,-175 -215,-190 M-65,-180 C-85,-210 -115,-235 -150,-245 M-25,-250 C-45,-285 -70,-310 -105,-325 M25,-250 C45,-285 70,-310 105,-325 M65,-180 C85,-210 115,-235 150,-245 M110,-95 C135,-115 170,-130 200,-135 M145,-120 C160,-150 185,-175 215,-190 M0,-170 C-15,-210 -10,-260 0,-310"
            stroke="#0284c7"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.65"
            fill="none"
          />

          {/* Foliage Clusters: Emerald & Cyan Glow Clouds */}
          {/* Canopy Left */}
          <circle cx="-160" cy="-160" r="75" fill="url(#leafEmerald)" />
          <circle cx="-110" cy="-220" r="65" fill="url(#leafCyan)" />
          <circle cx="-190" cy="-210" r="55" fill="url(#leafEmerald)" />
          {/* Canopy Center / Crown */}
          <circle cx="0" cy="-290" r="85" fill="url(#leafCyan)" />
          <circle cx="-60" cy="-300" r="65" fill="url(#leafEmerald)" />
          <circle cx="60" cy="-300" r="65" fill="url(#leafEmerald)" />
          <circle cx="0" cy="-340" r="55" fill="url(#leafCyan)" />
          {/* Canopy Right */}
          <circle cx="160" cy="-160" r="75" fill="url(#leafEmerald)" />
          <circle cx="110" cy="-220" r="65" fill="url(#leafCyan)" />
          <circle cx="190" cy="-210" r="55" fill="url(#leafEmerald)" />

          {/* Shimmering Neural Sparkle Nodes on Tree Tips */}
          <circle cx="-215" cy="-190" r="5" fill="#fef08a" />
          <circle cx="-150" cy="-245" r="5" fill="#67e8f9" />
          <circle cx="-105" cy="-325" r="6" fill="#fef08a" />
          <circle cx="0" cy="-350" r="7" fill="#ffffff" />
          <circle cx="105" cy="-325" r="6" fill="#fef08a" />
          <circle cx="150" cy="-245" r="5" fill="#67e8f9" />
          <circle cx="215" cy="-190" r="5" fill="#fef08a" />
        </g>

        {/* -------------------------------------------------------------
            CORNERS: ORNATE HIGH-TECH & BOTANICAL SVG EMBELLISHMENTS
            ("corners with svg images on background what makes it premium")
            ------------------------------------------------------------- */}

        {/* 1. TOP-LEFT CORNER: SACRED ASTROLABE & KNOWLEDGE ARCS */}
        <g className="corner-decor corner-top-left" transform="translate(0, 0)">
          {/* Radial Concentric Celestial Astrolabe Rings */}
          <circle cx="0" cy="0" r="140" fill="none" stroke="url(#astrolabeHolo)" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="0" cy="0" r="190" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="0" cy="0" r="240" fill="none" stroke="url(#astrolabeHolo)" strokeWidth="1.8" strokeDasharray="12 12" />
          <circle cx="0" cy="0" r="280" fill="none" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 6" />

          {/* Astrolabe Axis Spokes */}
          <line x1="0" y1="0" x2="260" y2="70" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.4" />
          <line x1="0" y1="0" x2="220" y2="160" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="0" y1="0" x2="140" y2="230" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.35" />

          {/* Compass Node Crystals */}
          <circle cx="260" cy="70" r="4" fill="#38bdf8" />
          <circle cx="220" cy="160" r="3.5" fill="#34d399" />
          <circle cx="140" cy="230" r="4.5" fill="#60a5fa" />
          <polygon points="190,0 200,-5 190,-10 180,-5" fill="#f59e0b" opacity="0.6" />
        </g>

        {/* 2. TOP-RIGHT CORNER: CONSTELLATION & SYNAPTIC CRYSTAL BRANCH */}
        <g className="corner-decor corner-top-right" transform="translate(1440, 0)">
          {/* Concentric Golden Orbit Quadrants */}
          <circle cx="0" cy="0" r="130" fill="none" stroke="url(#cornerGold)" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="0" cy="0" r="180" fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="0" cy="0" r="230" fill="none" stroke="url(#cornerGold)" strokeWidth="1.6" strokeDasharray="10 8" />

          {/* Constellation Golden Threads */}
          <path
            d="M-220,60 L-160,110 L-90,120 L-50,180 L-130,210"
            stroke="url(#cornerGold)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Glowing Constellation Diamond Stars */}
          <g transform="translate(-220, 60)">
            <polygon points="0,-6 6,0 0,6 -6,0" fill="#fde047" />
          </g>
          <g transform="translate(-160, 110)">
            <polygon points="0,-5 5,0 0,5 -5,0" fill="#f59e0b" />
          </g>
          <g transform="translate(-90, 120)">
            <polygon points="0,-6 6,0 0,6 -6,0" fill="#ec4899" />
          </g>
          <g transform="translate(-50, 180)">
            <polygon points="0,-7 7,0 0,7 -7,0" fill="#fde047" />
          </g>
          <g transform="translate(-130, 210)">
            <polygon points="0,-5 5,0 0,5 -5,0" fill="#f59e0b" />
          </g>
        </g>

        {/* 3. BOTTOM-LEFT CORNER: BOTANICAL FOLIAGE & WISDOM SCROLL EMBELLISHMENT */}
        <g className="corner-decor corner-bottom-left" transform="translate(0, 960)">
          {/* Curved Botanical Scroll Lines */}
          <path
            d="M0,-240 C60,-220 120,-170 160,-120 C200,-70 230,-20 280,0"
            stroke="#10b981"
            strokeWidth="2"
            strokeOpacity="0.45"
            fill="none"
          />
          <path
            d="M0,-180 C50,-165 95,-125 130,-85 C165,-45 190,-10 220,0"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeDasharray="5 5"
            fill="none"
          />

          {/* Botanical Leaves Sprouting Along the Curve */}
          <path d="M70,-190 Q90,-215 110,-200 Q95,-180 70,-190 Z" fill="#10b981" fillOpacity="0.45" />
          <path d="M110,-150 Q135,-170 155,-155 Q135,-135 110,-150 Z" fill="#059669" fillOpacity="0.4" />
          <path d="M155,-100 Q180,-120 200,-105 Q180,-85 155,-100 Z" fill="#34d399" fillOpacity="0.45" />
          <path d="M205,-50 Q230,-65 245,-50 Q225,-35 205,-50 Z" fill="#10b981" fillOpacity="0.4" />

          {/* Gentle Circular Ripple */}
          <circle cx="0" cy="0" r="160" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 6" />
        </g>

        {/* 4. BOTTOM-RIGHT CORNER: SACRED GOLDEN RATIO SPIRAL & CRYSTAL MATRIX */}
        <g className="corner-decor corner-bottom-right" transform="translate(1440, 960)">
          {/* Golden Ratio Logarithmic Arcs */}
          <path
            d="M0,-260 C-110,-250 -200,-180 -230,-90 C-250,-20 -230,0 -220,0"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeOpacity="0.45"
            fill="none"
          />
          <path
            d="M-220,0 C-210,-60 -160,-130 -100,-145 C-50,-155 -10,-120 0,-110"
            stroke="#818cf8"
            strokeWidth="1.6"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d="M0,-110 C-30,-105 -60,-75 -60,-40 C-60,-10 -30,0 0,0"
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            fill="none"
          />

          {/* Prismatic Crystal Vertices */}
          <polygon points="-230,-90 -220,-80 -230,-70 -240,-80" fill="#67e8f9" opacity="0.65" />
          <polygon points="-100,-145 -92,-137 -100,-129 -108,-137" fill="#818cf8" opacity="0.65" />
          <polygon points="-60,-40 -54,-34 -60,-28 -66,-34" fill="#fbbf24" opacity="0.65" />
        </g>

        {/* -------------------------------------------------------------
            UPWARD DRIFTING KNOWLEDGE LIGHT MOTES / PARTICLES
            ------------------------------------------------------------- */}
        <g opacity="0.6" className="floating-wisdom-particles">
          <circle cx="680" cy="460" r="3.5" fill="url(#particleGlow)" />
          <circle cx="750" cy="410" r="4.5" fill="url(#particleGlow)" />
          <circle cx="620" cy="380" r="3" fill="url(#particleGlow)" />
          <circle cx="790" cy="330" r="4" fill="url(#particleGlow)" />
          <circle cx="710" cy="280" r="5" fill="url(#particleGlow)" />
          <circle cx="660" cy="220" r="3.5" fill="url(#particleGlow)" />
          <circle cx="740" cy="180" r="4.5" fill="url(#particleGlow)" />
          <circle cx="700" cy="120" r="5.5" fill="url(#particleGlow)" />
        </g>
      </svg>
    </div>
  )
}
