import React, { useState, useEffect } from 'react'
import {
  X, Check, Trophy, Sparkles, Zap,
  Maximize2, ArrowRight, Star
} from 'lucide-react'
import { soundFX } from '../utils/soundEffects'

// Configurable Game Data Contracts
export interface SentenceGapRound {
  prefix: string
  suffix: string
  options: string[]
  correctAnswer: string
  hint?: string
}

export interface SentenceGapGameData {
  type: 'sentence-gap'
  rounds: SentenceGapRound[]
}

export interface CodeBlockItem {
  id: number
  step: string
  text: string
}

export interface CodeSequencerGameData {
  type: 'code-sequencer'
  blocks: CodeBlockItem[]
}

export interface FocusReflexGameData {
  type: 'focus-reflex'
  targetScore: number
}

export type CustomGameData =
  | SentenceGapGameData
  | CodeSequencerGameData
  | FocusReflexGameData

export interface SessionGameConfig {
  id: string
  title: string
  instructions: string
  url?: string
  data?: CustomGameData
}

interface FullscreenGameProps {
  game: SessionGameConfig
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export const InteractiveGameArena: React.FC<FullscreenGameProps> = ({
  game,
  isOpen,
  onClose,
  onComplete
}) => {
  // Common Game States
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  // 1. Sentence Gap Game State
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [isGapCorrect, setIsGapCorrect] = useState<boolean | null>(null)

  // 2. Code Sequencer Game State
  const [selectedCodeOrder, setSelectedCodeOrder] = useState<number[]>([])
  const [codeErrorHint, setCodeErrorHint] = useState<string | null>(null)

  // 3. Focus Reflex State
  const [reflexTaps, setReflexTaps] = useState(0)

  // Handle body scroll lock and keyboard escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleExit()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset internal states on open
  useEffect(() => {
    if (isOpen) {
      setCurrentRoundIndex(0)
      setScore(0)
      setIsGameOver(false)
      setSelectedWord(null)
      setIsGapCorrect(null)
      setSelectedCodeOrder([])
      setCodeErrorHint(null)
      setReflexTaps(0)
    }
  }, [isOpen, game.id])

  // Listen for iframe communication messages (e.g. GAME_COMPLETED, CLOSE_GAME)
  useEffect(() => {
    if (!isOpen) return

    const handleWindowMessage = (e: MessageEvent) => {
      if (e.data?.type === 'GAME_COMPLETED') {
        onComplete()
      } else if (e.data?.type === 'CLOSE_GAME') {
        onClose()
      }
    }

    window.addEventListener('message', handleWindowMessage)
    return () => window.removeEventListener('message', handleWindowMessage)
  }, [isOpen, onComplete, onClose])

  if (!isOpen) return null

  const handleExit = () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
    } catch {
      // Ignored
    }
    onClose()
  }

  // If game is a standalone developed HTML/CSS game in public folder
  if (game.url) {
    return (
      <div className="fullscreen-game-arena-overlay">
        <iframe
          src={game.url}
          className="arena-external-iframe"
          title={game.title}
          allow="autoplay; fullscreen"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: 100
          }}
        />
      </div>
    )
  }

  // -------------------------------------------------------------
  // GAME HANDLERS: Sentence Gap
  // -------------------------------------------------------------
  const rounds = game.data?.type === 'sentence-gap' ? game.data.rounds : []
  const currentRound = rounds[currentRoundIndex]

  const handleSelectGapOption = (opt: string) => {
    if (selectedWord !== null || !currentRound) return

    soundFX.playTap()
    setSelectedWord(opt)

    if (opt.toLowerCase() === currentRound.correctAnswer.toLowerCase()) {
      setIsGapCorrect(true)
      soundFX.playCorrect()
      setScore(prev => prev + 100)

      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 60, 80])
      }

      // Check if all rounds are completed
      setTimeout(() => {
        if (currentRoundIndex + 1 < rounds.length) {
          setCurrentRoundIndex(prev => prev + 1)
          setSelectedWord(null)
          setIsGapCorrect(null)
        } else {
          setIsGameOver(true)
          soundFX.playFanfare()
          onComplete()
        }
      }, 1400)
    } else {
      setIsGapCorrect(false)
      soundFX.playWrong()
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 40, 60])
      }

      setTimeout(() => {
        setSelectedWord(null)
        setIsGapCorrect(null)
      }, 1200)
    }
  }

  // -------------------------------------------------------------
  // GAME HANDLERS: Code Sequencer
  // -------------------------------------------------------------
  const codeBlocks = game.data?.type === 'code-sequencer' ? game.data.blocks : []

  const handleCodeBlockTap = (blockId: number) => {
    if (isGameOver || selectedCodeOrder.includes(blockId)) return

    soundFX.playTap()
    const expectedId = selectedCodeOrder.length + 1
    if (blockId !== expectedId) {
      soundFX.playWrong()
      setCodeErrorHint(`Tap Step 0${expectedId} next!`)
      setTimeout(() => setCodeErrorHint(null), 2000)
      return
    }

    soundFX.playCorrect()
    const nextOrder = [...selectedCodeOrder, blockId]
    setSelectedCodeOrder(nextOrder)
    setScore(prev => prev + 50)

    if (nextOrder.length === codeBlocks.length) {
      setTimeout(() => {
        setIsGameOver(true)
        soundFX.playFanfare()
        onComplete()
      }, 600)
    }
  }

  // -------------------------------------------------------------
  // GAME HANDLERS: Focus Reflex
  // -------------------------------------------------------------
  const targetReflex = game.data?.type === 'focus-reflex' ? game.data.targetScore : 5

  const handleReflexTap = () => {
    if (isGameOver) return

    soundFX.playTap()
    const next = reflexTaps + 1
    setReflexTaps(next)
    setScore(prev => prev + 40)

    if (next >= targetReflex) {
      setTimeout(() => {
        setIsGameOver(true)
        soundFX.playFanfare()
        onComplete()
      }, 400)
    }
  }

  return (
    <div className="fullscreen-game-arena-overlay">
      {/* ARENA TOP CONTROL BAR */}
      <div className="game-arena-top-bar">
        <button
          className="arena-exit-btn"
          onClick={handleExit}
          aria-label="Exit Game"
        >
          <X size={20} />
          <span>Exit Game</span>
        </button>

        <div className="arena-score-chip">
          <Star size={15} fill="currentColor" />
          <span>Score: {score}</span>
        </div>
      </div>

      {/* MAIN GAMEPLAY ARENA */}
      <div className="arena-main-content">
        {!isGameOver ? (
          <div className="arena-active-board">
            {/* Game Subtitle & Level */}
            <div className="arena-header-zone">
              <span className="arena-category-pill">
                <Zap size={13} /> Interactive Challenge
              </span>
              <h2 className="arena-game-title">{game.title}</h2>
              <p className="arena-game-instruction">{game.instructions}</p>
            </div>

            {/* 1. SENTENCE GAP FILL GAMEPLAY */}
            {game.data?.type === 'sentence-gap' && currentRound && (
              <div className="game-gap-board">
                <div className="round-progress-row">
                  <span>ROUND 0{currentRoundIndex + 1} OF 0{rounds.length}</span>
                </div>

                {/* Big Sentence Display */}
                <div className="gap-sentence-display-card">
                  <span className="sentence-text-lead">{currentRound.prefix}</span>
                  
                  <span className={`gap-slot-box ${isGapCorrect === true ? 'correct' : isGapCorrect === false ? 'wrong' : ''}`}>
                    {selectedWord ? selectedWord : '______'}
                  </span>

                  <span className="sentence-text-tail">{currentRound.suffix}</span>
                </div>

                {/* Option Choice Buttons */}
                <div className="gap-options-wrapper">
                  <span className="options-prompt-label">Select the correct word to fill the blank:</span>
                  <div className="gap-options-grid">
                    {currentRound.options.map((opt, i) => {
                      const isChosen = selectedWord === opt
                      const isCorrectChoice = isChosen && isGapCorrect === true
                      const isWrongChoice = isChosen && isGapCorrect === false

                      return (
                        <button
                          key={i}
                          className={`gap-option-bubble ${isChosen ? 'chosen' : ''} ${isCorrectChoice ? 'correct' : ''} ${isWrongChoice ? 'wrong' : ''}`}
                          onClick={() => handleSelectGapOption(opt)}
                          disabled={selectedWord !== null}
                        >
                          <span className="option-bubble-text">{opt}</span>
                          {isCorrectChoice && <Check size={20} className="bubble-check" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. CODE SEQUENCER GAMEPLAY */}
            {game.data?.type === 'code-sequencer' && (
              <div className="game-sequencer-board">
                {codeErrorHint && (
                  <div className="arena-error-banner">
                    <span>{codeErrorHint}</span>
                  </div>
                )}

                <div className="sequencer-blocks-list">
                  {codeBlocks.map(block => {
                    const isSelected = selectedCodeOrder.includes(block.id)
                    const orderNum = selectedCodeOrder.indexOf(block.id) + 1

                    return (
                      <button
                        key={block.id}
                        className={`sequencer-step-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleCodeBlockTap(block.id)}
                      >
                        <div className="step-left-label">
                          <span className="step-badge">{isSelected ? `✓ Step ${orderNum}` : block.step}</span>
                          <span className="step-code-string">{block.text}</span>
                        </div>
                        {isSelected && <Check size={20} className="step-done-check" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 3. FOCUS REFLEX GAMEPLAY */}
            {game.data?.type === 'focus-reflex' && (
              <div className="game-reflex-board">
                <div className="reflex-tap-counter">
                  <span>Energy Level:</span>
                  <strong>{reflexTaps} / {targetReflex} Charges</strong>
                </div>

                <div className="arena-reflex-orb-wrap">
                  <button
                    className="arena-pulsing-orb"
                    onClick={handleReflexTap}
                    aria-label="Tap to charge focus"
                  >
                    <div className="orb-ambient-wave" />
                    <Sparkles size={44} />
                    <span className="orb-tap-text">Tap Now!</span>
                    <span className="orb-tap-sub">{reflexTaps} of {targetReflex}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* GAME OVER / CELEBRATION SCREEN */
          <div className="arena-victory-card">
            <div className="victory-trophy-badge">
              <Trophy size={54} />
            </div>

            <span className="victory-over-tag">CHALLENGE COMPLETE!</span>
            <h2 className="victory-headline">Outstanding Work!</h2>
            <p className="victory-desc">
              You mastered this challenge with <strong>{score} Points</strong>. Your progress has been credited to your session.
            </p>

            <button className="arena-return-btn" onClick={handleExit}>
              <span>Return to Session</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// COMPACT LAUNCHER CARD (Shown inside the session page)
// -------------------------------------------------------------
export interface GameLauncherCardProps {
  game: SessionGameConfig
  isCompleted: boolean
  onLaunch: () => void
}

export const GameLauncherCard: React.FC<GameLauncherCardProps> = ({
  game,
  isCompleted,
  onLaunch
}) => {
  return (
    <div className={`session-game-launcher-card ${isCompleted ? 'completed' : ''}`}>
      <div className="launcher-thumb-col">
        <div className="launcher-icon-box">
          {isCompleted ? <Trophy size={22} /> : <Zap size={22} />}
        </div>
      </div>

      <div className="launcher-info-col">
        <div className="launcher-header-row">
          <span className="launcher-tag">INTERACTIVE GAME</span>
          {isCompleted && <span className="launcher-done-chip">✓ Mastered</span>}
        </div>
        <h4 className="launcher-title">{game.title}</h4>
        <p className="launcher-desc">{game.instructions}</p>

        <button className="launcher-play-action-btn" onClick={onLaunch}>
          <Maximize2 size={16} />
          <span>{isCompleted ? 'Play Again (Fullscreen)' : 'Play Challenge (Fullscreen)'}</span>
        </button>
      </div>
    </div>
  )
}
