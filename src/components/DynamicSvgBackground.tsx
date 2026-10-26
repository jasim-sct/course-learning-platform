import React, { useState, useEffect, useRef } from 'react'

export type SvgThemeMode = 'synaptic' | 'blueprint' | 'minimal'

interface DynamicSvgBackgroundProps {
  mode: SvgThemeMode
  onModeChange?: (mode: SvgThemeMode) => void
}

interface Ripple {
  id: number
  x: number
  y: number
  time: number
}

export const DynamicSvgBackground: React.FC<DynamicSvgBackgroundProps> = ({
  mode
}) => {
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 })
  const [mouse, setMouse] = useState({ x: 720, y: 450 })
  const [smoothMouse, setSmoothMouse] = useState({ x: 720, y: 450 })
  const [ripples, setRipples] = useState<Ripple[]>([])
  const animFrameRef = useRef<number | null>(null)

  // Track window resizing
  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: Math.max(window.innerHeight, 1000)
      })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    const handleClick = (e: MouseEvent) => {
      // Add ripple effect at click coordinates
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY + window.scrollY,
        time: Date.now()
      }
      setRipples(prev => [...prev.slice(-4), newRipple])
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  // Smooth mouse interpolation (lerp) for organic, fluid motion
  useEffect(() => {
    const updateSmooth = () => {
      setSmoothMouse(prev => ({
        x: prev.x + (mouse.x - prev.x) * 0.06,
        y: prev.y + (mouse.y - prev.y) * 0.06
      }))
      animFrameRef.current = requestAnimationFrame(updateSmooth)
    }
    animFrameRef.current = requestAnimationFrame(updateSmooth)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [mouse])

  // Clean up old ripples after 2.5s
  useEffect(() => {
    if (ripples.length === 0) return
    const interval = setInterval(() => {
      const now = Date.now()
      setRipples(prev => prev.filter(r => now - r.time < 2400))
    }, 600)
    return () => clearInterval(interval)
  }, [ripples])

  const { width, height } = dimensions
  const mx = smoothMouse.x
  const my = smoothMouse.y
  const nx = (mx / (width || 1) - 0.5) * 2 // -1 to 1
  const ny = (my / (height || 1) - 0.5) * 2 // -1 to 1

  // Dynamic Bézier Control Points calculated from normalized mouse
  // Curve 1: Primary Azure Synaptic Wave
  const c1_y1 = height * 0.18 + ny * 35
  const c1_cp1x = width * 0.28 + nx * 90
  const c1_cp1y = height * 0.08 - ny * 80
  const c1_cp2x = width * 0.65 - nx * 90
  const c1_cp2y = height * 0.42 + ny * 90
  const c1_y2 = height * 0.28 - ny * 45
  const path1 = `M 0,${c1_y1} C ${c1_cp1x},${c1_cp1y} ${c1_cp2x},${c1_cp2y} ${width},${c1_y2}`

  // Curve 2: Secondary Violet Harmonic Counter-Wave
  const c2_y1 = height * 0.48 - ny * 40
  const c2_cp1x = width * 0.35 - nx * 100
  const c2_cp1y = height * 0.68 + ny * 100
  const c2_cp2x = width * 0.72 + nx * 80
  const c2_cp2y = height * 0.32 - ny * 80
  const c2_y2 = height * 0.58 + ny * 50
  const path2 = `M 0,${c2_y1} C ${c2_cp1x},${c2_cp1y} ${c2_cp2x},${c2_cp2y} ${width},${c2_y2}`

  // Curve 3: Deep Emerald Grounding Spline
  const c3_y1 = height * 0.78 + ny * 30
  const c3_cp1x = width * 0.42 + nx * 70
  const c3_cp1y = height * 0.92 - ny * 70
  const c3_cp2x = width * 0.82 - nx * 80
  const c3_cp2y = height * 0.68 + ny * 60
  const c3_y2 = height * 0.85 - ny * 40
  const path3 = `M 0,${c3_y1} C ${c3_cp1x},${c3_cp1y} ${c3_cp2x},${c3_cp2y} ${width},${c3_y2}`

  // Strategic network nodes
  const nodes = [
    { id: 'N1', x: width * 0.12, y: height * 0.15, label: 'SYNAPSE.01', active: true },
    { id: 'N2', x: width * 0.38, y: height * 0.24, label: 'NEURAL.FLOW', active: false },
    { id: 'N3', x: width * 0.72, y: height * 0.19, label: 'COGNITIVE.AURA', active: true },
    { id: 'N4', x: width * 0.88, y: height * 0.38, label: 'LADDER.GATE', active: false },
    { id: 'N5', x: width * 0.22, y: height * 0.54, label: 'CORE.MEMORY', active: true },
    { id: 'N6', x: width * 0.62, y: height * 0.62, label: 'SYNTHESIS.LAB', active: true },
    { id: 'N7', x: width * 0.82, y: height * 0.78, label: 'ARCH.VECTOR', active: false },
    { id: 'N8', x: width * 0.44, y: height * 0.86, label: 'PERSISTENCE.RING', active: true }
  ]

  return (
    <div className={`dynamic-svg-background-container mode-${mode}`} aria-hidden="true">
      {/* Precision Gradient Background Wash */}
      <div className="svg-ambient-backdrop" />

      {/* Interactive Cursor Spotlight */}
      <div
        className="svg-cursor-spotlight"
        style={{
          transform: `translate3d(${mx - 250}px, ${my - 250}px, 0)`
        }}
      />

      {/* Main SVG Vector Canvas */}
      <svg
        className="dynamic-svg-canvas"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Linear Gradients for Flowing Splines */}
          <linearGradient id="splineGradAzure" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.30" />
          </linearGradient>

          <linearGradient id="splineGradViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#ec4899" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.20" />
          </linearGradient>

          <linearGradient id="splineGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.22" />
          </linearGradient>

          {/* Node Radiant Glow */}
          <radialGradient id="nodeGlowAzure" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nodeGlowViolet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          {/* Precision Architectural Pattern */}
          <pattern
            id="archPrecisionGrid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Fine coordinate grid lines */}
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1"
              strokeOpacity="0.035"
            />
            {/* Center crosshair at intersection */}
            <path
              d="M 57 60 L 63 60 M 60 57 L 60 63"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeOpacity="0.14"
            />
            <circle cx="60" cy="60" r="1" fill="#64748b" fillOpacity="0.25" />
          </pattern>

          {/* Sub-lattice dot pattern */}
          <pattern
            id="subDotLattice"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="0.75" fill="#94a3b8" fillOpacity="0.18" />
          </pattern>
        </defs>

        {/* 1. Precision Grid Layer */}
        <rect width={width} height={height} fill="url(#subDotLattice)" />
        <rect width={width} height={height} fill="url(#archPrecisionGrid)" />

        {/* 2. Blueprint Alignment Reference Lines */}
        <g className="blueprint-lines" opacity="0.4">
          <line
            x1="0"
            y1={height * 0.18}
            x2={width}
            y2={height * 0.18}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <line
            x1={width * 0.15}
            y1="0"
            x2={width * 0.15}
            y2={height}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <line
            x1={width * 0.85}
            y1="0"
            x2={width * 0.85}
            y2={height}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </g>

        {/* 3. Interactive Expanding Click Ripples */}
        {ripples.map(ripple => {
          const age = (Date.now() - ripple.time) / 2400
          const radius = age * 180 + 10
          const opacity = Math.max(0, (1 - age) * 0.45)

          return (
            <g key={ripple.id}>
              <circle
                cx={ripple.x}
                cy={ripple.y}
                r={radius}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeOpacity={opacity}
              />
              <circle
                cx={ripple.x}
                cy={ripple.y}
                r={radius * 0.55}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1"
                strokeOpacity={opacity * 0.75}
                strokeDasharray="4 4"
              />
            </g>
          )
        })}

        {/* 4. Fluid Dynamic Bézier Splines (Live Curved Paths) */}
        <g className="dynamic-splines-layer">
          {/* Path 1: Primary Azure Spline */}
          <path
            d={path1}
            fill="none"
            stroke="url(#splineGradAzure)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="spline-flow-wave wave-1"
          />
          <path
            d={path1}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="8 14"
            strokeOpacity="0.4"
            className="spline-pulse-dash dash-1"
          />

          {/* Path 2: Violet Counter-Harmonic Spline */}
          <path
            d={path2}
            fill="none"
            stroke="url(#splineGradViolet)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="spline-flow-wave wave-2"
          />
          <path
            d={path2}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1"
            strokeDasharray="6 12"
            strokeOpacity="0.35"
            className="spline-pulse-dash dash-2"
          />

          {/* Path 3: Emerald Foundation Spline */}
          <path
            d={path3}
            fill="none"
            stroke="url(#splineGradEmerald)"
            strokeWidth="2"
            strokeLinecap="round"
            className="spline-flow-wave wave-3"
          />
          <path
            d={path3}
            fill="none"
            stroke="#10b981"
            strokeWidth="1"
            strokeDasharray="10 16"
            strokeOpacity="0.3"
            className="spline-pulse-dash dash-3"
          />
        </g>

        {/* 5. Precision Constellation Nodes */}
        <g className="constellation-nodes-layer">
          {nodes.map(node => {
            // Calculate distance to mouse for subtle proximity brighten
            const dist = Math.hypot(node.x - mx, node.y - my)
            const isNear = dist < 220
            const proximityFactor = Math.max(0, 1 - dist / 260)

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="constellation-node"
              >
                {/* Outer Glow Halo on proximity */}
                <circle
                  r={22 + proximityFactor * 14}
                  fill="url(#nodeGlowAzure)"
                  opacity={0.3 + proximityFactor * 0.5}
                />

                {/* Rotating Dashed Alignment Ring */}
                <circle
                  r="14"
                  fill="none"
                  stroke={isNear ? '#3b82f6' : '#94a3b8'}
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  strokeOpacity={isNear ? 0.7 : 0.28}
                  className="node-rotating-reticle"
                />

                {/* Target Circle */}
                <circle
                  r="7"
                  fill="#ffffff"
                  stroke={isNear ? '#2563eb' : '#64748b'}
                  strokeWidth="1.5"
                />

                {/* Core Nucleus */}
                <circle
                  r="3"
                  fill={node.active ? '#3b82f6' : '#6366f1'}
                />

                {/* Technical Node Identifier Label */}
                <text
                  x="18"
                  y="4"
                  fontFamily="'Space Grotesk', -apple-system, monospace"
                  fontSize="9"
                  fontWeight="600"
                  fill="#64748b"
                  fillOpacity={isNear ? 0.9 : 0.45}
                  letterSpacing="0.08em"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </g>

        {/* 6. Technical Blueprint Telemetry Tags */}
        <g className="blueprint-telemetry-layer" opacity="0.5">
          <text
            x="36"
            y={height - 40}
            fontFamily="'Space Grotesk', monospace"
            fontSize="10"
            fill="#64748b"
            letterSpacing="0.1em"
          >
            SYS.COGNITIVE_MESH // VECT-8.4 // LATENCY: 8ms // GRID 60px
          </text>

          <text
            x={width - 290}
            y={height - 40}
            fontFamily="'Space Grotesk', monospace"
            fontSize="10"
            fill="#64748b"
            letterSpacing="0.1em"
          >
            TOPOLOGY: ADAPTIVE SYNAPSE // DYNAMIC SVG OK
          </text>

          {/* Precision Alignment Mark */}
          <path
            d={`M 36 ${height - 24} L 120 ${height - 24} M 40 ${height - 28} L 40 ${height - 20}`}
            stroke="#94a3b8"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  )
}
