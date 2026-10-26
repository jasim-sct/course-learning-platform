import React, { useState } from 'react'
import { Check, RotateCcw, Sparkles, Trophy, Zap, AlertCircle } from 'lucide-react'

export type GameType = 'sentence-builder' | 'code-sequencer' | 'focus-reflex'

interface MiniGameProps {
  gameType: GameType
  title: string
  instructions: string
  onGameComplete: () => void
}

export const InteractiveMiniGame: React.FC<MiniGameProps> = ({
  gameType,
  title,
  instructions,
  onGameComplete
}) => {
  const [completed, setCompleted] = useState(false)

  // -------------------------------------------------------------
  // GAME 1: Sentence Builder (English & Communication)
  // -------------------------------------------------------------
  const initialWords = ['I', 'speak', 'with', 'natural', 'calm', 'and', 'authority']
  const targetSentence = 'I speak with natural calm and authority'
  const [availableWords, setAvailableWords] = useState<string[]>(() =>
    [...initialWords].sort(() => Math.random() - 0.5)
  )
  const [selectedWords, setSelectedWords] = useState<string[]>([])

  const handleWordTap = (word: string, index: number) => {
    if (completed) return
    const nextSelected = [...selectedWords, word]
    const nextAvailable = availableWords.filter((_, i) => i !== index)
    setSelectedWords(nextSelected)
    setAvailableWords(nextAvailable)

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30)
    }

    if (nextSelected.join(' ') === targetSentence) {
      setCompleted(true)
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 60, 80])
      }
      onGameComplete()
    }
  }

  const handleRemoveWord = (word: string, index: number) => {
    if (completed) return
    const nextSelected = selectedWords.filter((_, i) => i !== index)
    const nextAvailable = [...availableWords, word]
    setSelectedWords(nextSelected)
    setAvailableWords(nextAvailable)
  }

  const resetSentence = () => {
    setSelectedWords([])
    setAvailableWords([...initialWords].sort(() => Math.random() - 0.5))
    setCompleted(false)
  }

  // -------------------------------------------------------------
  // GAME 2: Code Sequencer (Coding & STEM)
  // -------------------------------------------------------------
  const codeBlocksOriginal = [
    { id: 1, step: '01', text: 'Receive input stream from user' },
    { id: 2, step: '02', text: 'Validate condition (if valid)' },
    { id: 3, step: '03', text: 'Execute business logic transformation' },
    { id: 4, step: '04', text: 'Return formatted result to screen' }
  ]
  const [codeBlocks, setCodeBlocks] = useState(() =>
    [...codeBlocksOriginal].sort(() => Math.random() - 0.5)
  )
  const [selectedOrder, setSelectedOrder] = useState<number[]>([])
  const [errorHint, setErrorHint] = useState<string | null>(null)

  const handleCodeBlockTap = (blockId: number) => {
    if (completed) return
    if (selectedOrder.includes(blockId)) return

    const expectedId = selectedOrder.length + 1
    if (blockId !== expectedId) {
      setErrorHint(`Tap Step 0${expectedId} next!`)
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 40, 60])
      }
      setTimeout(() => setErrorHint(null), 2500)
      return
    }

    setErrorHint(null)
    const nextOrder = [...selectedOrder, blockId]
    setSelectedOrder(nextOrder)

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30)
    }

    if (nextOrder.length === codeBlocksOriginal.length) {
      setCompleted(true)
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 60, 80])
      }
      onGameComplete()
    }
  }

  const resetCode = () => {
    setSelectedOrder([])
    setErrorHint(null)
    setCodeBlocks([...codeBlocksOriginal].sort(() => Math.random() - 0.5))
    setCompleted(false)
  }

  // -------------------------------------------------------------
  // GAME 3: Focus Reflex (Mindset & Mastery)
  // -------------------------------------------------------------
  const [focusScore, setFocusScore] = useState(0)
  const targetScore = 5
  const focusPercentage = Math.round((focusScore / targetScore) * 100)

  const handleFocusNodeClick = () => {
    if (completed) return
    const next = focusScore + 1
    setFocusScore(next)

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40)
    }

    if (next >= targetScore) {
      setCompleted(true)
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([50, 50, 100])
      }
      onGameComplete()
    }
  }

  return (
    <div className="mini-game-card">
      {/* Game Header */}
      <div className="game-card-header">
        <div className="game-badge-cluster">
          <div className="game-type-icon-box">
            <Zap size={16} />
          </div>
          <div>
            <h4 className="game-main-title">{title}</h4>
            <p className="game-instructions-sub">{instructions}</p>
          </div>
        </div>
        {completed ? (
          <span className="game-chip-completed">
            <Trophy size={13} /> Completed!
          </span>
        ) : (
          <span className="game-chip-active">
            <Sparkles size={13} /> Interactive
          </span>
        )}
      </div>

      {/* GAME 1: SENTENCE BUILDER */}
      {gameType === 'sentence-builder' && (
        <div className="game-interactive-area sentence-game-layout">
          {/* Target Placement Box */}
          <div className="sentence-target-dropzone">
            <div className="dropzone-header-row">
              <span className="dropzone-label">Tap words to arrange sentence (tap placed word to return):</span>
              {selectedWords.length > 0 && !completed && (
                <button className="subtle-reset-link" onClick={resetSentence} title="Reset words">
                  <RotateCcw size={12} /> Clear
                </button>
              )}
            </div>

            <div className="dropzone-chips-container">
              {selectedWords.length === 0 ? (
                <span className="empty-dropzone-cue">
                  Tap the words below in the correct order
                </span>
              ) : (
                selectedWords.map((word, idx) => (
                  <button
                    key={idx}
                    className="sentence-placed-word"
                    onClick={() => handleRemoveWord(word, idx)}
                  >
                    <span>{word}</span>
                    <span className="chip-remove-cross">×</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Word Pool Buttons */}
          <div className="word-pool-section">
            <div className="word-pool-grid">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  className="word-pool-btn"
                  onClick={() => handleWordTap(word, idx)}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: CODE SEQUENCER */}
      {gameType === 'code-sequencer' && (
        <div className="game-interactive-area code-game-layout">
          <div className="code-game-info-row">
            <span className="pool-helper-label">Tap blocks in order (01 to 04):</span>
            {selectedOrder.length > 0 && !completed && (
              <button className="subtle-reset-link" onClick={resetCode} title="Restart order">
                <RotateCcw size={12} /> Restart
              </button>
            )}
          </div>

          {errorHint && (
            <div className="game-error-toast">
              <AlertCircle size={15} />
              <span>{errorHint}</span>
            </div>
          )}

          <div className="code-blocks-stack">
            {codeBlocks.map(block => {
              const isSelected = selectedOrder.includes(block.id)
              const orderIndex = selectedOrder.indexOf(block.id) + 1

              return (
                <button
                  key={block.id}
                  className={`mobile-code-step-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCodeBlockTap(block.id)}
                >
                  <div className="code-step-left">
                    <span className="step-num-pill">
                      {isSelected ? `✓ #${orderIndex}` : block.step}
                    </span>
                    <span className="code-step-text">{block.text}</span>
                  </div>
                  {isSelected && <Check size={18} className="code-check-icon" />}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* GAME 3: FOCUS REFLEX */}
      {gameType === 'focus-reflex' && (
        <div className="game-interactive-area reflex-game-layout">
          <div className="reflex-status-row">
            <span className="pool-helper-label">Tap to build energy ({focusScore} of {targetScore}):</span>
          </div>

          {/* Mobile Focus Interactive Orb */}
          <div className="reflex-orb-container">
            <button
              className={`mobile-focus-orb ${completed ? 'completed' : ''}`}
              onClick={handleFocusNodeClick}
              disabled={completed}
              aria-label="Tap to charge focus"
            >
              <div className="orb-pulse-ring" />
              <div className="orb-inner-content">
                {completed ? (
                  <>
                    <Check size={36} className="orb-icon" />
                    <span className="orb-label">Mastered!</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={32} className="orb-icon" />
                    <span className="orb-label">Tap to Charge</span>
                    <span className="orb-sub-count">{focusScore} / {targetScore}</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Progress Bar under Orb */}
          <div className="orb-progress-track">
            <div className="orb-progress-fill" style={{ width: `${focusPercentage}%` }} />
          </div>
        </div>
      )}

      {/* Success Confirmation */}
      {completed && (
        <div className="game-mastered-banner">
          <Check size={18} />
          <span>Game completed! Answer the quiz questions below.</span>
        </div>
      )}
    </div>
  )
}
