import React from 'react'
import { Clock3, Play } from 'lucide-react'

export interface VideoLessonData {
  id: string
  title: string
  videoId: string
  duration: string
}

export interface VideoPlayerProps {
  videos: VideoLessonData[]
  activeVideoIndex: number
  onSelectVideo: (index: number) => void
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videos,
  activeVideoIndex,
  onSelectVideo
}) => {
  const currentVideo = videos[activeVideoIndex] || videos[0]

  return (
    <div className="session-video-container">
      <div className="responsive-video-player">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${currentVideo.videoId}?rel=0`}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video title and duration metadata */}
      <div className="video-meta-box">
        <h4>{currentVideo.title}</h4>
        <span className="duration-tag">
          <Clock3 size={13} /> {currentVideo.duration}
        </span>
      </div>

      {/* Multi-video switch pills if more than 1 video */}
      {videos.length > 1 && (
        <div className="video-selector-bar" role="tablist" aria-label="Lesson video playlist">
          {videos.map((vid, i) => (
            <button
              key={vid.id}
              role="tab"
              aria-selected={activeVideoIndex === i}
              aria-label={`Video ${i + 1}: ${vid.title}`}
              className={`video-select-chip ${activeVideoIndex === i ? 'active' : ''}`}
              onClick={() => onSelectVideo(i)}
            >
              <Play size={12} fill="currentColor" /> {vid.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
