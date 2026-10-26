import React, { useState } from 'react'
import { Award, CheckCircle2, Printer, Share2, ShieldCheck, X, Sparkles } from 'lucide-react'

interface CertificateModalProps {
  courseTitle: string
  courseCategory: string
  onClose: () => void
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  courseTitle,
  courseCategory,
  onClose
}) => {
  const [studentName, setStudentName] = useState('Alex Morgan')
  const [isEditingName, setIsEditingName] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  const certId = `LUMA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

  const handlePrint = () => {
    window.print()
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `LUMA Certificate: ${courseTitle}`,
          text: `I just mastered "${courseTitle}" on LUMA Learning Academy! Verified Credential ID: ${certId}`,
          url: window.location.href
        })
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      } catch (err) {
        // User cancelled share or unsupported
      }
    } else {
      // Fallback: Copy link
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(
          `LUMA Certificate: ${courseTitle} awarded to ${studentName}. Verified ID: ${certId}`
        )
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2500)
      }
    }
  }

  return (
    <div className="certificate-modal-backdrop" onClick={onClose}>
      <div className="certificate-modal-card" onClick={e => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="certificate-modal-top-bar">
          <div className="cert-status-badge">
            <CheckCircle2 size={16} /> Verified Achievement
          </div>
          <button className="cert-close-btn" onClick={onClose} aria-label="Close certificate">
            <X size={20} />
          </button>
        </div>

        {/* PRINTABLE CERTIFICATE FRAME */}
        <div className="official-certificate-frame" id="printable-certificate">
          <div className="cert-ornate-border">
            <div className="cert-inner-content">
              {/* Header Badge */}
              <div className="cert-seal-icon">
                <Award size={36} />
              </div>

              <span className="cert-issuer">LUMA ACADEMY OF EXCELLENCE</span>
              <h1 className="cert-main-title">CERTIFICATE OF ACHIEVEMENT</h1>
              <p className="cert-subtitle">This official credential certifies that</p>

              {/* Student Name */}
              <div className="cert-recipient-name-wrap">
                {isEditingName ? (
                  <input
                    type="text"
                    className="recipient-name-input"
                    value={studentName}
                    autoFocus
                    onChange={e => setStudentName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') setIsEditingName(false)
                    }}
                  />
                ) : (
                  <h2
                    className="recipient-name"
                    title="Tap to change your name"
                    onClick={() => setIsEditingName(true)}
                  >
                    {studentName}
                  </h2>
                )}
                <span className="name-edit-hint">✎ Tap name above to edit</span>
              </div>

              <p className="cert-description">
                has successfully completed all video sessions, interactive challenges,
                and competency quizzes for
              </p>

              <h3 className="cert-course-name">{courseTitle}</h3>
              <span className="cert-category-tag">{courseCategory}</span>

              {/* Certificate Footer with Signatures & Seal */}
              <div className="cert-footer-grid">
                <div className="cert-meta-item">
                  <span className="meta-title">DATE ISSUED</span>
                  <strong>{currentDate}</strong>
                </div>

                <div className="cert-gold-seal">
                  <div className="seal-round">
                    <ShieldCheck size={20} />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className="cert-meta-item">
                  <span className="meta-title">CREDENTIAL ID</span>
                  <strong>{certId}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="certificate-actions-tray">
          <button className="cert-action-btn primary" onClick={handlePrint}>
            <Printer size={16} /> Print / Save PDF
          </button>
          <button className="cert-action-btn secondary" onClick={handleShare}>
            {shareSuccess ? (
              <>
                <Sparkles size={16} /> Copied!
              </>
            ) : (
              <>
                <Share2 size={16} /> Share
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
