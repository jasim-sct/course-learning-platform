import React, { useState } from 'react'
import { ArrowLeft, Sparkles, User, Flame, Award, Zap, X } from 'lucide-react'

export type TopBarVariant = 'home' | 'course' | 'session'

export interface TopBarProps {
  variant: TopBarVariant
  title?: string
  subtitle?: string
  backLabel?: string
  onBack?: () => void
  userStreak?: number
  userLevel?: string
}

export const TopBar: React.FC<TopBarProps> = ({
  variant,
  title,
  subtitle,
  backLabel = 'Back',
  onBack,
  userStreak = 7,
  userLevel = 'LVL 3'
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false)

  React.useEffect(() => {
    if (!showProfileModal) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowProfileModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showProfileModal])

  return (
    <>
      <header className={`mobile-top-bar mobile-top-bar--${variant}`}>
        {variant === 'home' ? (
          <div className="top-bar-home-header">
            <div className="home-logo-cluster">
              <div className="mobile-brand-icon">
                <Sparkles size={18} />
              </div>
              <div className="mobile-brand-title">
                <span className="app-title-main">LUMA</span>
                <span className="app-title-sub">ACADEMY</span>
              </div>
            </div>

            {/* Profile Island on Top Right */}
            <div className="top-bar-actions-cluster">
              <button
                type="button"
                className="top-bar-profile-btn"
                onClick={() => setShowProfileModal(true)}
                aria-label="View Student Profile"
                title="View Profile & Stats"
              >
                <div className="profile-streak-pill">
                  <Flame size={13} className="streak-flame-icon" />
                  <span>{userStreak}</span>
                </div>
                <div className="profile-avatar-disc">
                  <User size={16} />
                  <span className="profile-online-beacon" />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="top-bar-nav-row">
            <button
              className="top-bar-back-btn"
              onClick={onBack}
              aria-label={backLabel}
            >
              <ArrowLeft size={16} />
              <span>{backLabel}</span>
            </button>
            <div className="top-bar-title-wrap">
              {subtitle && <span className="top-bar-sub">{subtitle}</span>}
              {title && <h2 className="top-bar-heading">{title}</h2>}
            </div>

            {/* Profile Avatar in Session & Course Header */}
            <button
              type="button"
              className="top-bar-profile-btn compact"
              onClick={() => setShowProfileModal(true)}
              aria-label="View Student Profile"
              title="View Profile & Stats"
            >
              <div className="profile-avatar-disc">
                <User size={15} />
                <span className="profile-online-beacon" />
              </div>
            </button>
          </div>
        )}
      </header>

      {/* Floating Glassmorphic Profile Quick View Drawer / Modal */}
      {showProfileModal && (
        <div className="profile-modal-backdrop" onClick={() => setShowProfileModal(false)}>
          <div className="profile-glass-card" onClick={e => e.stopPropagation()}>
            <div className="profile-card-header">
              <div className="profile-card-user-info">
                <div className="profile-avatar-lg">
                  <User size={26} />
                  <span className="profile-online-beacon lg" />
                </div>
                <div>
                  <h3 className="profile-user-name">Mr. Jasim</h3>
                  <span className="profile-user-tier">{userLevel} • Master Scholar</span>
                </div>
              </div>
              <button
                type="button"
                className="profile-close-btn"
                onClick={() => setShowProfileModal(false)}
                aria-label="Close Profile"
              >
                <X size={16} />
              </button>
            </div>

            <div className="profile-stats-grid">
              <div className="profile-stat-box streak">
                <div className="stat-icon-wrap streak">
                  <Flame size={18} />
                </div>
                <div className="stat-text-wrap">
                  <span className="stat-number">{userStreak} Days</span>
                  <span className="stat-label">Daily Streak</span>
                </div>
              </div>

              <div className="profile-stat-box xp">
                <div className="stat-icon-wrap xp">
                  <Zap size={18} />
                </div>
                <div className="stat-text-wrap">
                  <span className="stat-number">1,480 XP</span>
                  <span className="stat-label">Knowledge Earned</span>
                </div>
              </div>

              <div className="profile-stat-box rank">
                <div className="stat-icon-wrap rank">
                  <Award size={18} />
                </div>
                <div className="stat-text-wrap">
                  <span className="stat-number">Certified</span>
                  <span className="stat-label">Course Milestones</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="profile-done-btn"
              onClick={() => setShowProfileModal(false)}
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </>
  )
}
