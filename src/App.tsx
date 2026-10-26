import { useState } from 'react'
import { ArrowLeft, ArrowRight, Award, Check, CheckCircle2, Play, Sparkles } from 'lucide-react'

// Reusable UI Components
import { Button } from './components/ui/Button'
import { Badge } from './components/ui/Badge'
import { Card } from './components/ui/Card'
import { TopBar } from './components/TopBar'
import { CourseCard } from './components/CourseCard'
import { SessionTimelineCard } from './components/SessionTimelineCard'
import { VideoPlayer } from './components/VideoPlayer'
import { QuizCard } from './components/QuizCard'
import {
  InteractiveGameArena,
  GameLauncherCard,
  type SessionGameConfig
} from './components/InteractiveGameArena'
import { CertificateModal } from './components/CertificateModal'
import { LumaSacredBg } from './components/LumaSacredBg'

// Data Types
export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
}

export interface VideoLesson {
  id: string
  title: string
  videoId: string
  duration: string
}

export interface CourseSession {
  id: string
  sessionNumber: number
  title: string
  summary: string
  videos: VideoLesson[]
  game?: SessionGameConfig
  quiz: QuizQuestion[]
}

export interface Course {
  id: string
  title: string
  category: string
  description: string
  thumbnail: string
  accentColor: string
  sessions: CourseSession[]
}

const coursesData: Course[] = [
  {
    id: 'english',
    title: 'Spoken English & Verbal Confidence',
    category: 'Language & Communication',
    description: 'Learn clear pronunciation, everyday conversational flow, and speaking with natural poise.',
    thumbnail: '/images/english_flow.jpg',
    accentColor: '#2563eb',
    sessions: [
      {
        id: 'eng-1',
        sessionNumber: 1,
        title: 'Natural Self-Introductions & First Greetings',
        summary: 'Learn how to introduce yourself effortlessly in any situation without hesitation.',
        videos: [
          { id: 'v1', title: 'Video 1: Introducing Yourself with Ease', videoId: 'ysz5S6PUM-U', duration: '08:42' },
          { id: 'v2', title: 'Video 2: Tone, Smile & Body Language', videoId: 'jNQXAC9IVRw', duration: '05:15' }
        ],
        // Standalone developed game passed to this session
        game: {
          id: 'game-1',
          title: 'Word Rain Arcade: Auxiliary Verbs',
          instructions: 'Catch the raining auxiliary verbs falling from the sky to complete the sentence:',
          url: '/game-1/index.html',
          data: {
            type: 'sentence-gap',
            rounds: [
              {
                prefix: 'I',
                suffix: 'going',
                options: ['was', 'is', 'were'],
                correctAnswer: 'was',
                hint: 'Use "was" for past continuous first-person ("I was going").'
              },
              {
                prefix: 'Yesterday, they',
                suffix: 'speaking with confidence.',
                options: ['were', 'was', 'is'],
                correctAnswer: 'were',
                hint: 'Plural subject "they" requires "were".'
              },
              {
                prefix: 'She',
                suffix: 'introducing herself gracefully.',
                options: ['is', 'are', 'were'],
                correctAnswer: 'is',
                hint: 'Singular third-person takes "is".'
              }
            ]
          }
        },
        quiz: [
          {
            question: 'What is the best way to open a self-introduction?',
            options: [
              'With a calm, friendly vocal tone and warm greeting',
              'By speaking as fast as you can without breathing',
              'By listing 20 facts about yourself in one breath'
            ],
            correctIndex: 0
          },
          {
            question: 'After sharing your name and what you do, what should you do next?',
            options: [
              'Immediately look away at your phone',
              'Ask a friendly return question to keep the conversation going',
              'Leave the room abruptly'
            ],
            correctIndex: 1
          }
        ]
      },
      {
        id: 'eng-2',
        sessionNumber: 2,
        title: 'Everyday Conversations & Social Small Talk',
        summary: 'Master effortless small talk that turns casual meetings into friendly connections.',
        videos: [
          { id: 'v1', title: 'Video: The Art of Friendly Small Talk', videoId: 'ScMzIvxBSi4', duration: '09:20' }
        ],
        game: {
          id: 'game-eng-2',
          title: 'Social Small Talk Word Builder',
          instructions: 'Select the right conversational bridge phrase:',
          data: {
            type: 'sentence-gap',
            rounds: [
              {
                prefix: 'How',
                suffix: 'your day going so far?',
                options: ['is', 'are', 'were'],
                correctAnswer: 'is'
              },
              {
                prefix: 'We',
                suffix: 'having an inspiring discussion.',
                options: ['are', 'is', 'was'],
                correctAnswer: 'are'
              }
            ]
          }
        },
        quiz: [
          {
            question: 'How do you reply when someone asks "How is your day going?"',
            options: [
              'Just say "fine" with a blank stare',
              'Share a brief positive highlight and ask how their day is',
              'Ignore the question'
            ],
            correctIndex: 1
          }
        ]
      },
      {
        id: 'eng-3',
        sessionNumber: 3,
        title: 'Clear Pronunciation, Stress & Rhythm',
        summary: 'Speak melodically by emphasizing key words and breathing between thought groups.',
        videos: [
          { id: 'v1', title: 'Video: Rhythm, Word Stress & Natural Cadence', videoId: 'ysz5S6PUM-U', duration: '10:30' }
        ],
        game: {
          id: 'game-eng-3',
          title: 'Rhythm & Cadence Word Challenge',
          instructions: 'Select the word that correctly balances the rhythm:',
          data: {
            type: 'sentence-gap',
            rounds: [
              {
                prefix: 'Natural pauses',
                suffix: 'your speech clear and easy to understand.',
                options: ['make', 'makes', 'making'],
                correctAnswer: 'make'
              }
            ]
          }
        },
        quiz: [
          {
            question: 'Why is pausing between sentences helpful in clear English speech?',
            options: [
              'It allows your listener time to process ideas and keeps you calm',
              'It makes you look uncertain',
              'It is not helpful'
            ],
            correctIndex: 0
          }
        ]
      }
    ]
  },
  {
    id: 'coding',
    title: 'Thinking in Code & Creative Logic',
    category: 'Computer Science & STEM',
    description: 'Understand how computers think, execute commands, make decisions, and build interactive programs.',
    thumbnail: '/images/code_flow.jpg',
    accentColor: '#7c3aed',
    sessions: [
      {
        id: 'code-1',
        sessionNumber: 1,
        title: 'How Computers Think & Execute Logic',
        summary: 'Visualizing how instructions travel line by line from code to processor memory.',
        videos: [
          { id: 'v1', title: 'Video 1: Step-by-Step Code Execution', videoId: 'ysz5S6PUM-U', duration: '11:00' },
          { id: 'v2', title: 'Video 2: Variables & Memory Boxes', videoId: 'jNQXAC9IVRw', duration: '07:20' }
        ],
        game: {
          id: 'game-code-1',
          title: 'Code Pipeline Execution Challenge',
          instructions: 'Tap execution blocks in chronological order from step 1 to 4:',
          data: {
            type: 'code-sequencer',
            blocks: [
              { id: 1, step: '01', text: 'Receive input stream from user' },
              { id: 2, step: '02', text: 'Validate condition (if valid)' },
              { id: 3, step: '03', text: 'Execute business logic transformation' },
              { id: 4, step: '04', text: 'Return formatted result to screen' }
            ]
          }
        },
        quiz: [
          {
            question: 'How does a computer generally read program instructions?',
            options: [
              'From bottom to top at random',
              'Sequentially line-by-line from top to bottom',
              'It guesses what to execute'
            ],
            correctIndex: 1
          },
          {
            question: 'What is a variable in programming?',
            options: [
              'A labeled container that holds a value in memory',
              'A type of computer screen',
              'A broken internet connection'
            ],
            correctIndex: 0
          }
        ]
      },
      {
        id: 'code-2',
        sessionNumber: 2,
        title: 'Smart Decisions with If & Else Conditions',
        summary: 'Learn how to teach code to make intelligent decisions based on real user input.',
        videos: [
          { id: 'v1', title: 'Video: If/Else Conditional Logic', videoId: 'ScMzIvxBSi4', duration: '08:50' }
        ],
        game: {
          id: 'game-code-2',
          title: 'Condition Logic Decision Pipeline',
          instructions: 'Arrange conditional decision branches in execution order:',
          data: {
            type: 'code-sequencer',
            blocks: [
              { id: 1, step: '01', text: 'Evaluate primary if (condition)' },
              { id: 2, step: '02', text: 'Check else-if criteria if false' },
              { id: 3, step: '03', text: 'Fallback to default else block' },
              { id: 4, step: '04', text: 'Resume normal application flow' }
            ]
          }
        },
        quiz: [
          {
            question: 'When will an "else" block execute in a program?',
            options: [
              'When the preceding "if" condition evaluated to false',
              'All the time simultaneously',
              'Never'
            ],
            correctIndex: 0
          }
        ]
      },
      {
        id: 'code-3',
        sessionNumber: 3,
        title: 'Loops, Arrays & Building Interactive Apps',
        summary: 'Repeat tasks effortlessly with loops and organize collections with arrays.',
        videos: [
          { id: 'v1', title: 'Video: Repeating Actions with Loops & Lists', videoId: 'ysz5S6PUM-U', duration: '12:15' }
        ],
        game: {
          id: 'game-code-3',
          title: 'Loop Lifecycle Pipeline',
          instructions: 'Sequence the loop lifecycle stages in valid order:',
          data: {
            type: 'code-sequencer',
            blocks: [
              { id: 1, step: '01', text: 'Initialize index counter (i = 0)' },
              { id: 2, step: '02', text: 'Check bound limit (i < array.length)' },
              { id: 3, step: '03', text: 'Execute inner block logic' },
              { id: 4, step: '04', text: 'Increment counter (i++) & repeat' }
            ]
          }
        },
        quiz: [
          {
            question: 'Why do software engineers use loops instead of copy-pasting code?',
            options: [
              'To eliminate manual repetition and make code clean and maintainable',
              'Because loops make computers run out of power',
              'Just for decoration'
            ],
            correctIndex: 0
          }
        ]
      }
    ]
  },
  {
    id: 'mindset',
    title: 'Daily Study Habits & Deep Focus Skills',
    category: 'Personal Mastery & Mindset',
    description: 'Overcome procrastination, build effortless 2-minute starter habits, and protect mental energy.',
    thumbnail: '/images/mind_flow.jpg',
    accentColor: '#d97706',
    sessions: [
      {
        id: 'mind-1',
        sessionNumber: 1,
        title: 'Overcoming Procrastination with the 2-Minute Rule',
        summary: 'Shrink starting friction so starting any difficult project feels completely natural.',
        videos: [
          { id: 'v1', title: 'Video: The 2-Minute Activation Threshold', videoId: 'ScMzIvxBSi4', duration: '09:12' }
        ],
        game: {
          id: 'game-mind-1',
          title: 'Focus Reflex Momentum Orb',
          instructions: 'Tap the pulsating focus orb to charge mental momentum and eliminate friction:',
          data: {
            type: 'focus-reflex',
            targetScore: 5
          }
        },
        quiz: [
          {
            question: 'Why does the 2-minute starter rule eliminate procrastination?',
            options: [
              'Because getting started takes 80% of mental energy; continuing is easy',
              'Because you only study for 2 minutes and quit forever',
              'It has no effect'
            ],
            correctIndex: 0
          }
        ]
      },
      {
        id: 'mind-2',
        sessionNumber: 2,
        title: 'Protecting Energy with 25-Minute Focus Cycles',
        summary: 'Learn to work in energized intervals paired with restorative visual breaks.',
        videos: [
          { id: 'v1', title: 'Video: The Rhythm of Deep Rest & Focus', videoId: 'ysz5S6PUM-U', duration: '10:45' }
        ],
        game: {
          id: 'game-mind-2',
          title: 'Deep Rest & Focus Arena',
          instructions: 'Tap to complete your restorative focus cycle:',
          data: {
            type: 'focus-reflex',
            targetScore: 5
          }
        },
        quiz: [
          {
            question: 'What is the best way to spend a 5-minute study break?',
            options: [
              'Look at a distant window, breathe, and rest your eyes away from screens',
              'Open 10 social media apps and read negative news',
              'Stare even closer at your screen'
            ],
            correctIndex: 0
          }
        ]
      }
    ]
  }
]

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedSession, setSelectedSession] = useState<CourseSession | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('All')

  // Completed session IDs
  const [completedSessions, setCompletedSessions] = useState<string[]>(['eng-1'])
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0)

  // Fullscreen Game State
  const [activeFullscreenGame, setActiveFullscreenGame] = useState<SessionGameConfig | null>(null)
  const [completedGames, setCompletedGames] = useState<string[]>([])

  // Quiz answers state: { [questionIndex]: selectedOptionIndex }
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})

  // Toast notifications for locked sessions
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Certificate Modal
  const [showCertificate, setShowCertificate] = useState(false)
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null)

  // Category filters with icons
  const categoryFilters = [
    { id: 'All', label: 'All Courses', icon: '✨' },
    { id: 'Language & Communication', label: 'English & Speech', icon: '🗣️' },
    { id: 'Computer Science & STEM', label: 'Coding & STEM', icon: '💻' },
    { id: 'Personal Mastery & Mindset', label: 'Focus & Habits', icon: '🧠' }
  ]

  const filteredCourses = categoryFilter === 'All'
    ? coursesData
    : coursesData.filter(c => c.category === categoryFilter)

  // Prerequisite logic
  const isSessionUnlocked = (course: Course, sessionIndex: number): boolean => {
    if (sessionIndex === 0) return true
    const previousSession = course.sessions[sessionIndex - 1]
    return completedSessions.includes(previousSession.id)
  }

  const isSessionCompleted = (sessionId: string): boolean => {
    return completedSessions.includes(sessionId)
  }

  const isCourseFullyCompleted = (course: Course): boolean => {
    return course.sessions.every(s => completedSessions.includes(s.id))
  }

  // Session Phase: 'learn' (Video & Game) vs 'quiz' (Question Session)
  const [sessionPhase, setSessionPhase] = useState<'learn' | 'quiz'>('learn')
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0)

  // Active in-progress course and next session for Continue Learning banner
  const activeResumeCourse = coursesData.find(c => {
    const doneCount = c.sessions.filter(s => completedSessions.includes(s.id)).length
    return doneCount > 0 && doneCount < c.sessions.length
  }) || (completedSessions.length > 0 ? coursesData[0] : null)

  const nextResumeSession = activeResumeCourse?.sessions.find(s => !completedSessions.includes(s.id))

  // Handlers
  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course)
    setSelectedSession(null)
    setSessionPhase('learn')
    setActiveQuizIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenSession = (session: CourseSession) => {
    setSelectedSession(session)
    setActiveVideoIndex(0)
    setQuizAnswers({})
    setSessionPhase('learn')
    setActiveQuizIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const triggerLockedToast = (sessionNum: number) => {
    setToastMessage(`🔒 Please complete Session 0${sessionNum - 1} first to unlock this session!`)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 50, 40])
    }
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleCompleteSession = () => {
    if (!selectedSession || !selectedCourse) return
    const id = selectedSession.id
    if (!completedSessions.includes(id)) {
      setCompletedSessions(prev => [...prev, id])
    }

    const currentIndex = selectedCourse.sessions.findIndex(s => s.id === id)
    const nextSession = selectedCourse.sessions[currentIndex + 1]

    if (nextSession) {
      handleOpenSession(nextSession)
    } else {
      // Course completed! Trigger certificate view
      setSelectedSession(null)
      setCertificateCourse(selectedCourse)
      setShowCertificate(true)
    }
  }

  const handleOpenCertificate = (course: Course) => {
    setCertificateCourse(course)
    setShowCertificate(true)
  }

  return (
    <div className="mobile-app-root">
      {/* Dynamic Responsive Sacred Tree & Ornate Corners SVG Background */}
      <LumaSacredBg />

      {/* Main Mobile Phone Canvas */}
      <div className="mobile-phone-canvas">
        {/* REUSABLE TOP BAR COMPONENT */}
        {selectedSession ? (
          <TopBar
            variant="session"
            subtitle={sessionPhase === 'quiz' ? `QUESTION 0${activeQuizIndex + 1} OF 0${selectedSession.quiz.length}` : `SESSION 0${selectedSession.sessionNumber}`}
            title={selectedSession.title}
            backLabel={sessionPhase === 'quiz' ? 'Lesson' : 'Roadmap'}
            onBack={() => {
              if (sessionPhase === 'quiz') {
                setSessionPhase('learn')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              } else {
                setSelectedSession(null)
              }
            }}
          />
        ) : selectedCourse ? (
          <TopBar
            variant="course"
            subtitle={selectedCourse.category}
            title={selectedCourse.title}
            backLabel="Courses"
            onBack={() => setSelectedCourse(null)}
          />
        ) : (
          <TopBar variant="home" />
        )}

        {/* Global Floating Toast Alert */}
        {toastMessage && (
          <div className="mobile-toast-banner">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* =========================================================================
           SCROLLABLE MAIN APP BODY
           ========================================================================= */}
        <main className={`mobile-scroll-body ${selectedSession ? 'session-view-active' : ''}`}>
          {/* SCREEN 1: ALL COURSES (HOME) */}
          {!selectedCourse && !selectedSession && (
            <section className="mobile-home-section">
              {/* Editorial Continue Learning Anchor Banner */}
              {activeResumeCourse && nextResumeSession && (
                <div className="home-resume-banner">
                  <div className="resume-banner-content">
                    <span className="resume-tag">
                      <Sparkles size={13} /> Continue Where You Left Off
                    </span>
                    <h2 className="resume-course-title">{activeResumeCourse.title}</h2>
                    <p className="resume-session-subtitle">
                      <Play size={13} style={{ color: '#2563eb' }} />
                      Session 0{nextResumeSession.sessionNumber}: {nextResumeSession.title}
                    </p>
                  </div>
                  <div className="resume-action-btn-wrap">
                    <Button
                      variant="primary"
                      color="blue"
                      size="md"
                      radius="punchy"
                      rightIcon={<ArrowRight size={16} />}
                      onClick={() => {
                        handleOpenCourse(activeResumeCourse)
                        handleOpenSession(nextResumeSession)
                      }}
                    >
                      Resume Learning
                    </Button>
                  </div>
                </div>
              )}

              {/* Category Filter Pills (Reusable Badge Component) */}
              <div className="mobile-category-scroll">
                {categoryFilters.map(cat => (
                  <Badge
                    key={cat.id}
                    variant="subtle"
                    size="lg"
                    color="blue"
                    active={categoryFilter === cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    icon={<span className="cat-chip-icon">{cat.icon}</span>}
                  >
                    {cat.label}
                  </Badge>
                ))}
              </div>

              {/* Clean Course Cards (Reusable CourseCard Component) */}
              <div className="mobile-courses-feed">
                {filteredCourses.map(course => {
                  const done = course.sessions.filter(s => completedSessions.includes(s.id)).length
                  const isDone = isCourseFullyCompleted(course)

                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      completedCount={done}
                      isCompleted={isDone}
                      variant="standard"
                      onClick={() => handleOpenCourse(course)}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {/* SCREEN 2: COURSE SESSIONS VIEW (ROADMAP) */}
          {selectedCourse && !selectedSession && (
            <section className="mobile-course-sessions-view">
              {/* Course Header Banner (Reusable Card Component) */}
              <Card variant="bordered" padding="md" radius="md" color="white" className="course-mobile-banner">
                <span className="course-cat-tag">{selectedCourse.category}</span>
                <h1 className="course-banner-title">{selectedCourse.title}</h1>
                <p className="course-banner-desc">{selectedCourse.description}</p>

                {isCourseFullyCompleted(selectedCourse) && (
                  <Button
                    variant="success"
                    size="md"
                    fullWidth
                    leftIcon={<Award size={18} />}
                    onClick={() => handleOpenCertificate(selectedCourse)}
                    style={{ marginTop: '12px' }}
                  >
                    View Official Certificate
                  </Button>
                )}
              </Card>

              {/* Sessions Stepper Roadmap */}
              <div className="sessions-stepper-title">
                <h3>Sessions Roadmap</h3>
                <span>{selectedCourse.sessions.length} Sessions</span>
              </div>

              <div className="sessions-stepper-list">
                {selectedCourse.sessions.map((session, index) => {
                  const unlocked = isSessionUnlocked(selectedCourse, index)
                  const completed = isSessionCompleted(session.id)
                  const isCurrent = unlocked && !completed
                  const isLast = index === selectedCourse.sessions.length - 1

                  return (
                    <SessionTimelineCard
                      key={session.id}
                      sessionNumber={session.sessionNumber}
                      title={session.title}
                      summary={session.summary}
                      unlocked={unlocked}
                      completed={completed}
                      isCurrent={isCurrent}
                      isLast={isLast}
                      onSelect={() => {
                        if (unlocked) {
                          handleOpenSession(session)
                        } else {
                          triggerLockedToast(session.sessionNumber)
                        }
                      }}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {/* SCREEN 3: COMPLETE SESSION (VIDEO + GAME LAUNCHER + QUIZ) */}
          {selectedCourse && selectedSession && (
            <section className="mobile-session-viewer">
              <div className="session-desktop-layout">
                <div className="session-main-pane">
                  {/* =========================================================================
                     PHASE 1: LEARNING HUB (VIDEO & GAME TOGETHER ON SAME PAGE)
                     Questions are strictly HIDDEN until user proceeds to question session.
                     No tab switcher clutter on top!
                     ========================================================================= */}
                  {sessionPhase === 'learn' && (
                    <div className="session-learn-hub" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      {/* 1. VIDEO LESSON */}
                      <div className="session-section-block">
                        <div className="section-block-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Play size={15} style={{ color: '#2563eb' }} />
                            <span style={{ color: '#2563eb', fontWeight: 800 }}>Video Lesson</span>
                          </div>
                          <Badge variant="subtle" size="sm" color="blue" radius="pill">
                            Learning Hub
                          </Badge>
                        </div>

                        <VideoPlayer
                          videos={selectedSession.videos}
                          activeVideoIndex={activeVideoIndex}
                          onSelectVideo={index => setActiveVideoIndex(index)}
                        />
                      </div>

                      {/* 2. INTERACTIVE GAME (SAME PAGE AS VIDEO FOR LEARNING PURPOSE) */}
                      {selectedSession.game && (
                        <div className="session-section-block">
                          <div className="section-block-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Sparkles size={15} style={{ color: '#ea580c' }} />
                              <span style={{ color: '#ea580c', fontWeight: 800 }}>Interactive Practice Game</span>
                            </div>
                            {completedGames.includes(selectedSession.game.id) && (
                              <Badge variant="subtle" size="sm" color="green" radius="pill">
                                ✓ Mastered
                              </Badge>
                            )}
                          </div>

                          <GameLauncherCard
                            game={selectedSession.game}
                            isCompleted={completedGames.includes(selectedSession.game.id)}
                            onLaunch={() => setActiveFullscreenGame(selectedSession.game!)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* =========================================================================
                     PHASE 2: QUESTION SESSION
                     Features clean Back button to return to Video & Learning anytime.
                     Clean question view with stepper dots so user NEVER has to scroll!
                     ========================================================================= */}
                  {sessionPhase === 'quiz' && (
                    <div className="session-quiz-hub" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="quiz-session-header">
                        <div className="quiz-top-actions-row">
                          <button
                            type="button"
                            className="quiz-back-chip"
                            onClick={() => {
                              setSessionPhase('learn')
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                          >
                            <ArrowLeft size={15} />
                            <span>Back to Video & Learning</span>
                          </button>
                          <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748b' }}>
                            {Object.keys(quizAnswers).length} of {selectedSession.quiz.length} Answered
                          </span>
                        </div>

                        {/* QUESTION STEPPER DOTS: JUMP TO ANY QUESTION WITH ZERO SCROLL */}
                        <div className="quiz-stepper-track">
                          {selectedSession.quiz.map((q, qIdx) => {
                            const isAnswered = quizAnswers[qIdx] !== undefined
                            const isCorrect = isAnswered && quizAnswers[qIdx] === q.correctIndex
                            const isActive = activeQuizIndex === qIdx

                            const dotClass = [
                              'quiz-step-dot',
                              isActive ? 'active' : '',
                              isAnswered ? (isCorrect ? 'correct' : 'wrong') : ''
                            ].filter(Boolean).join(' ')

                            return (
                              <button
                                key={qIdx}
                                type="button"
                                className={dotClass}
                                onClick={() => setActiveQuizIndex(qIdx)}
                              >
                                <span>Q{qIdx + 1}</span>
                                {isAnswered && (
                                  <span style={{ fontSize: '12px', fontWeight: 900 }}>
                                    {isCorrect ? '✓' : '✗'}
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* ACTIVE QUESTION CARD (NO SCROLLING NEEDED) */}
                      {selectedSession.quiz[activeQuizIndex] && (
                        <QuizCard
                          question={selectedSession.quiz[activeQuizIndex]}
                          questionIndex={activeQuizIndex}
                          totalQuestions={selectedSession.quiz.length}
                          selectedOption={quizAnswers[activeQuizIndex]}
                          onSelectOption={optIndex =>
                            setQuizAnswers(prev => ({ ...prev, [activeQuizIndex]: optIndex }))
                          }
                        />
                      )}

                      {/* STEP PREVIOUS / NEXT BUTTONS */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                        {activeQuizIndex > 0 && (
                          <Button
                            variant="secondary"
                            size="md"
                            radius="punchy"
                            onClick={() => setActiveQuizIndex(prev => Math.max(0, prev - 1))}
                          >
                            ← Previous
                          </Button>
                        )}
                        {activeQuizIndex < selectedSession.quiz.length - 1 && (
                          <Button
                            variant="outline"
                            color="blue"
                            size="md"
                            radius="punchy"
                            fullWidth
                            rightIcon={<ArrowRight size={16} />}
                            onClick={() => setActiveQuizIndex(prev => Math.min(selectedSession.quiz.length - 1, prev + 1))}
                          >
                            Next Question ({activeQuizIndex + 2}/{selectedSession.quiz.length})
                          </Button>
                        )}
                      </div>

                      {/* CELEBRATION BANNER WHEN ALL QUESTIONS ARE ANSWERED */}
                      {selectedSession.quiz.every((_, idx) => quizAnswers[idx] !== undefined) && (
                        <div className="quiz-celebration-banner">
                          <div className="quiz-celebration-icon">
                            <Sparkles size={24} />
                          </div>
                          <div className="quiz-celebration-info">
                            <h5>All Questions Answered! 🎉</h5>
                            <p>Outstanding! Click below to complete this session.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Contextual Course Curriculum Sidebar on Tablet & Desktop */}
                <aside className="session-sidebar-pane" aria-label="Course curriculum outline">
                  <div className="sidebar-course-card">
                    <span className="sidebar-cat-pill">{selectedCourse.category}</span>
                    <h3 className="sidebar-course-title">{selectedCourse.title}</h3>

                    <div className="sidebar-progress-wrap">
                      <div className="sidebar-progress-label">
                        <span>Course Completion</span>
                        <strong>
                          {selectedCourse.sessions.filter(s => completedSessions.includes(s.id)).length} of {selectedCourse.sessions.length}
                        </strong>
                      </div>
                      <div className="sidebar-progress-bar">
                        <div
                          className="sidebar-progress-fill"
                          style={{
                            width: `${Math.round(
                              (selectedCourse.sessions.filter(s => completedSessions.includes(s.id)).length /
                                selectedCourse.sessions.length) *
                                100
                            )}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="sidebar-sessions-list">
                      <h4 className="sidebar-sessions-heading">Course Sessions</h4>
                      {selectedCourse.sessions.map((session, idx) => {
                        const isUnlocked = isSessionUnlocked(selectedCourse, idx)
                        const isDone = isSessionCompleted(session.id)
                        const isCurrentActive = session.id === selectedSession.id

                        return (
                          <button
                            key={session.id}
                            type="button"
                            className={`sidebar-session-item ${isCurrentActive ? 'active' : ''} ${isDone ? 'done' : ''} ${!isUnlocked ? 'locked' : ''}`}
                            onClick={() => {
                              if (isUnlocked) {
                                handleOpenSession(session)
                              } else {
                                triggerLockedToast(session.sessionNumber)
                              }
                            }}
                          >
                            <span className="sidebar-session-num">0{session.sessionNumber}</span>
                            <div className="sidebar-session-info">
                              <span className="sidebar-session-title">{session.title}</span>
                              <span className="sidebar-session-meta">
                                {isDone ? '✓ Completed' : isCurrentActive ? '● Active Lesson' : isUnlocked ? 'Ready to Start' : '🔒 Locked'}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {isCourseFullyCompleted(selectedCourse) && (
                      <Button
                        variant="gold"
                        size="md"
                        radius="punchy"
                        fullWidth
                        leftIcon={<Award size={16} />}
                        onClick={() => handleOpenCertificate(selectedCourse)}
                        style={{ marginTop: '8px' }}
                      >
                        View Official Certificate
                      </Button>
                    )}
                  </div>
                </aside>
              </div>
            </section>
          )}
        </main>

        {/* ONE SINGLE PRIMARY ACTION BUTTON (Reusable Button Component) */}
        {selectedSession && selectedCourse && (
          <div className="mobile-fixed-bottom-cta-bar">
            {sessionPhase === 'learn' ? (
              <Button
                variant="primary"
                color="blue"
                size="lg"
                radius="punchy"
                fullWidth
                leftIcon={<CheckCircle2 size={18} />}
                rightIcon={<ArrowRight size={18} />}
                onClick={() => {
                  setSessionPhase('quiz')
                  setActiveQuizIndex(0)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Proceed to Question Session ({selectedSession.quiz.length} Questions)
              </Button>
            ) : selectedSession.quiz.every((_, idx) => quizAnswers[idx] !== undefined) ? (
              selectedCourse.sessions.findIndex(s => s.id === selectedSession.id) === selectedCourse.sessions.length - 1 ? (
                <Button
                  variant="gold"
                  size="lg"
                  radius="punchy"
                  fullWidth
                  leftIcon={<Award size={18} />}
                  rightIcon={<ArrowRight size={18} />}
                  onClick={handleCompleteSession}
                >
                  Complete Course & Claim Certificate
                </Button>
              ) : (
                <Button
                  variant="primary"
                  color="green"
                  size="lg"
                  radius="punchy"
                  fullWidth
                  leftIcon={<Check size={18} />}
                  rightIcon={<ArrowRight size={18} />}
                  onClick={handleCompleteSession}
                >
                  Complete Session & Continue
                </Button>
              )
            ) : quizAnswers[activeQuizIndex] !== undefined && activeQuizIndex < selectedSession.quiz.length - 1 ? (
              <Button
                variant="primary"
                color="blue"
                size="lg"
                radius="punchy"
                fullWidth
                rightIcon={<ArrowRight size={18} />}
                onClick={() => setActiveQuizIndex(prev => Math.min(selectedSession.quiz.length - 1, prev + 1))}
              >
                Next Question ({activeQuizIndex + 2}/{selectedSession.quiz.length}) →
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                radius="punchy"
                fullWidth
                disabled
              >
                Select an answer to complete quiz ({Object.keys(quizAnswers).length}/{selectedSession.quiz.length})
              </Button>
            )}
          </div>
        )}
      </div>

      {/* STANDALONE FULLSCREEN GAME ARENA (Takes over screen when launched) */}
      {activeFullscreenGame && (
        <InteractiveGameArena
          game={activeFullscreenGame}
          isOpen={Boolean(activeFullscreenGame)}
          onClose={() => setActiveFullscreenGame(null)}
          onComplete={() => {
            if (!completedGames.includes(activeFullscreenGame.id)) {
              setCompletedGames(prev => [...prev, activeFullscreenGame.id])
            }
          }}
        />
      )}

      {/* OFFICIAL CERTIFICATE MODAL */}
      {showCertificate && certificateCourse && (
        <CertificateModal
          courseTitle={certificateCourse.title}
          courseCategory={certificateCourse.category}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  )
}
