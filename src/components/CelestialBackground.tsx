import React, { useState, useEffect } from 'react'

export const CelestialBackground: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 20
      const ny = (e.clientY / window.innerHeight - 0.5) * 20
      setMouseOffset({ x: nx, y: ny })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="celestial-bg-root" aria-hidden="true">
      {/* 1. Luminous Golden Morning Sunlight Wash */}
      <div className="sunlight-horizon-glow" />

      {/* 2. Soft Cloud Shimmer Aura */}
      <div
        className="celestial-orb-aura"
        style={{
          transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)`
        }}
      />

      {/* 3. The Grand SVG Celestial Canvas */}
      <svg
        className="celestial-svg-canvas"
        viewBox="0 0 1000 1600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Golden Sunbeam Gradient */}
          <linearGradient id="sunbeamGold" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
            <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Holographic Cyan Neural Stream */}
          <linearGradient id="hologramCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
          </linearGradient>

          {/* Cloud Mist Gradient */}
          <linearGradient id="cloudMist" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#f8fafc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Radial Knowledge Star Spark */}
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- Sunbeam Rays (Streaming down from celestial windows) --- */}
        <g className="sunbeam-rays" opacity="0.8">
          <polygon points="500,-50 250,900 340,900" fill="url(#sunbeamGold)" />
          <polygon points="500,-50 420,950 510,950" fill="url(#sunbeamGold)" />
          <polygon points="500,-50 600,900 690,900" fill="url(#sunbeamGold)" />
          <polygon points="500,-50 780,850 860,850" fill="url(#sunbeamGold)" />
        </g>

        {/* --- Rotating Holographic Orbital Rings (Inspired by the AI Mind in Image 2 & 4) --- */}
        <g className="celestial-orbit-rings" transform="translate(500, 260)">
          <ellipse
            cx="0"
            cy="0"
            rx="240"
            ry="70"
            fill="none"
            stroke="url(#hologramCyan)"
            strokeWidth="1.8"
            strokeDasharray="6 8"
            className="orbit-ring-outer"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="180"
            ry="50"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            strokeOpacity="0.35"
            className="orbit-ring-inner"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="300"
            ry="90"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeDasharray="2 12"
            strokeOpacity="0.4"
          />
          {/* Planetary Knowledge Nodes on Orbit */}
          <circle cx="210" cy="-35" r="5" fill="#f59e0b" />
          <circle cx="-160" cy="22" r="4" fill="#06b6d4" />
          <circle cx="70" cy="46" r="3.5" fill="#ec4899" />
        </g>

        {/* --- Vertical Constellation Energy Grid (Level Connector) --- */}
        <path
          d="M 500 280 C 440 450, 560 650, 500 850 C 440 1050, 560 1250, 500 1500"
          fill="none"
          stroke="url(#hologramCyan)"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="constellation-backbone"
        />

        {/* --- Floating Celestial Cloud Banks (Bottom Cloud Realm) --- */}
        <g className="floating-cloud-banks">
          <path
            d="M -100 1450 Q 150 1350 400 1420 Q 650 1340 900 1430 Q 1100 1370 1200 1500 L 1200 1700 L -100 1700 Z"
            fill="url(#cloudMist)"
          />
          <path
            d="M -50 1520 Q 200 1440 500 1500 Q 800 1430 1150 1520 L 1150 1700 L -50 1700 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>

        {/* --- Starlight Embers of Knowledge (Rising Particles) --- */}
        <g className="celestial-starlight-embers">
          <circle cx="280" cy="380" r="16" fill="url(#starGlow)" className="ember-star ember-1" />
          <circle cx="720" cy="420" r="14" fill="url(#starGlow)" className="ember-star ember-2" />
          <circle cx="340" cy="780" r="12" fill="url(#starGlow)" className="ember-star ember-3" />
          <circle cx="680" cy="880" r="18" fill="url(#starGlow)" className="ember-star ember-4" />
          <circle cx="220" cy="1150" r="14" fill="url(#starGlow)" className="ember-star ember-5" />
          <circle cx="780" cy="1220" r="15" fill="url(#starGlow)" className="ember-star ember-6" />
        </g>

        {/* --- Floating Neural Butterflies of Wisdom (SVG Path Symbols) --- */}
        <g className="celestial-butterflies">
          {/* Butterfly 1 near top orbit */}
          <g transform="translate(680, 240) scale(0.7)" className="butterfly-anim">
            <path
              d="M 0 0 C 15 -25 35 -15 25 10 C 15 5 5 10 0 0 C -5 10 -15 5 -25 10 C -35 -15 -15 -25 0 0"
              fill="#38bdf8"
              fillOpacity="0.45"
              stroke="#0284c7"
              strokeWidth="0.8"
            />
          </g>
          {/* Butterfly 2 near middle */}
          <g transform="translate(310, 620) scale(0.65)" className="butterfly-anim delay-1">
            <path
              d="M 0 0 C 15 -25 35 -15 25 10 C 15 5 5 10 0 0 C -5 10 -15 5 -25 10 C -35 -15 -15 -25 0 0"
              fill="#fbbf24"
              fillOpacity="0.55"
              stroke="#d97706"
              strokeWidth="0.8"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
