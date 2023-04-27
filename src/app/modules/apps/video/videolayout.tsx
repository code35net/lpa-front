import React, {useState, useEffect, useRef} from 'react'

interface Props {
  fileUrl: string
  setLessonPosition: Function
  lessonPosition: number
}

const VideoLayout: React.FC<Props> = ({fileUrl, setLessonPosition, lessonPosition}) => {
  const [totalSeconds, setTotalSeconds] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const videoRef = useRef<any>()

  useEffect(() => {
    setSeconds(lessonPosition)
    const video = videoRef.current
    video.currentTime = lessonPosition
  }, [lessonPosition])

  useEffect(() => {
    videoRef.current?.load()
  }, [fileUrl])

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current
      if (!video) return
      setLessonPosition(Math.floor(video.currentTime))
      console.log(video.currentTime)
      console.log(`The video is ${video.duration} seconds long.`)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = lessonPosition
    console.log(video.currentTime)
    console.log(`The video is ${video.duration} seconds long.`)
  }

  return (
    <>
      <div>
        <video
          ref={videoRef}
          height='100%'
          autoPlay
          controls
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={fileUrl} type='video/mp4' />
        </video>
      </div>
    </>
  )
}

export default VideoLayout
