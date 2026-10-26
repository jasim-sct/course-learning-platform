import React from 'react'
import { Check, X } from 'lucide-react'
import { soundFX } from '../utils/soundEffects'

export interface QuizQuestionData {
  question: string
  options: string[]
  correctIndex: number
}

export type QuizCardSize = 'sm' | 'md' | 'lg'

export interface QuizCardProps {
  question: QuizQuestionData
  questionIndex: number
  totalQuestions?: number
  selectedOption?: number
  size?: QuizCardSize
  onSelectOption: (optionIndex: number) => void
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedOption,
  size = 'md',
  onSelectOption
}) => {
  const isAnswered = selectedOption !== undefined
  const isCorrect = isAnswered && selectedOption === question.correctIndex

  const handleSelect = (optIndex: number) => {
    onSelectOption(optIndex)
    if (optIndex === question.correctIndex) {
      soundFX.playCorrect()
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([30, 40, 30])
      }
    } else {
      soundFX.playWrong()
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60])
      }
    }
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const key = e.key.toUpperCase()
      // Support '1', '2', '3', '4'
      if (['1', '2', '3', '4'].includes(key)) {
        const index = parseInt(key, 10) - 1
        if (question.options[index] !== undefined) {
          handleSelect(index)
        }
      }
      // Support 'A', 'B', 'C', 'D'
      const charCode = key.charCodeAt(0)
      if (key.length === 1 && charCode >= 65 && charCode <= 68) {
        const index = charCode - 65
        if (question.options[index] !== undefined) {
          handleSelect(index)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [question, selectedOption])

  return (
    <div className={`mobile-question-card mobile-question-card--size-${size}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="q-index-tag">
          QUESTION 0{questionIndex + 1}{totalQuestions ? ` / 0${totalQuestions}` : ''}
        </span>
        {isAnswered && (
          <span
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '11px',
              fontWeight: 800,
              color: isCorrect ? '#059669' : '#dc2626',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isCorrect ? '✓ Correct Answer' : '✗ Incorrect Answer'}
          </span>
        )}
      </div>

      <h4 className="q-title-text">{question.question}</h4>

      <div className="q-options-column" role="radiogroup" aria-label={question.question}>
        {question.options.map((option, optIndex) => {
          const isChosen = selectedOption === optIndex
          const showCorrect = isAnswered && optIndex === question.correctIndex
          const showWrong = isChosen && !isCorrect

          return (
            <button
              key={optIndex}
              type="button"
              role="radio"
              aria-checked={isChosen}
              aria-label={`Option ${String.fromCharCode(65 + optIndex)}: ${option}`}
              className={`mobile-opt-btn ${isChosen ? 'chosen' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
              onClick={() => handleSelect(optIndex)}
            >
              <span className="opt-letter-circle">
                {String.fromCharCode(65 + optIndex)}
              </span>
              <span className="opt-label">{option}</span>
              {showCorrect && <Check size={18} className="opt-check" />}
              {showWrong && <X size={18} style={{ color: '#ef4444', flexShrink: 0 }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
