"use client"

import { useEffect, useRef, useState } from "react"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WifiOff, Play, Square, AlertCircle, CheckCircle, Download, CameraIcon, Power, Maximize } from "lucide-react"

interface Detection {
  type: string
  confidence: number
  x: number
  y: number
  width: number
  height: number
  timestamp: string
}

interface Camera {
  id: string
  location: string
  status: "live" | "warning" | "offline"
  timestamp: string
  image?: string
  videoUrl?: string
  type?: "mp4" | "iframe"
  detections: Detection[]
  isWebcam?: boolean
  fps: number
  resolution: string
  lastActivity: string
  temperature: number
  uptime: number
  isEnabled?: boolean
}

interface EnhancedCameraCardProps {
  camera: Camera
}

export function EnhancedCameraCard({ camera }: EnhancedCameraCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt" | "loading">("prompt")
  const [error, setError] = useState<string | null>(null)
  const [detectedObjects, setDetectedObjects] = useState<Detection[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Check if camera is manually disabled
  const isCameraDisabled = camera.isEnabled === false

  const startWebcam = async () => {
    if (!camera.isWebcam || isCameraDisabled) return

    setPermissionStatus("loading")
    setError(null)

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      })

      setStream(mediaStream)
      setPermissionStatus("granted")
      setIsStreaming(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }

      // Start AI detection simulation
      const detectionInterval = setInterval(() => {
        if (Math.random() < 0.3) {
          const detectionTypes = ["Person", "Face"]
          const randomType = detectionTypes[Math.floor(Math.random() * detectionTypes.length)]
          const newDetection: Detection = {
            type: randomType,
            confidence: Math.floor(Math.random() * 15) + 85,
            x: Math.floor(Math.random() * 200) + 50,
            y: Math.floor(Math.random() * 150) + 50,
            width: Math.floor(Math.random() * 60) + 80,
            height: Math.floor(Math.random() * 80) + 100,
            timestamp: new Date().toISOString(),
          }
          setDetectedObjects([newDetection])
        } else {
          setDetectedObjects([])
        }
      }, 3000)

      return () => clearInterval(detectionInterval)
    } catch (err) {
      console.error("Error accessing webcam:", err)
      setPermissionStatus("denied")
      setError("Please allow camera access to continue")
    }
  }

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setIsStreaming(false)
      setDetectedObjects([])
    }
  }

  const captureScreenshot = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const dataURL = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = `${camera.id}_${new Date().toISOString()}.png`
        link.href = dataURL
        link.click()
      }
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    // Stop webcam if camera is disabled
    if (isCameraDisabled && stream) {
      stopWebcam()
    }
  }, [isCameraDisabled])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const renderVideoContent = () => {
    if (isCameraDisabled) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
          <Power className="h-16 w-16 text-gray-500 mb-4" />
          <h3 className="text-gray-400 font-semibold text-lg mb-2">Camera is Off</h3>
          <p className="text-gray-500 text-sm text-center px-4">
            This camera has been manually disabled.
            <br />
            Go to Camera Health to turn it back on.
          </p>
        </div>
      )
    }

    if (camera.status === "offline" && !camera.isWebcam) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <WifiOff className="h-12 w-12 text-red-400 mb-3" />
          <span className="text-red-400 font-semibold">Camera Offline</span>
          <span className="text-gray-400 text-sm mt-1">Trying to reconnect...</span>
        </div>
      )
    }

    if (camera.isWebcam) {
      return (
        <div className="relative w-full h-full">
          {!isStreaming ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
              <CameraIcon className="h-16 w-16 text-blue-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Live Camera Feed</h3>
              <p className="text-gray-400 text-sm mb-4 text-center px-4">
                Click to start live monitoring with AI detection
              </p>

              {permissionStatus === "loading" ? (
                <div className="flex items-center gap-2 text-blue-400">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                  <span>Starting camera...</span>
                </div>
              ) : permissionStatus === "denied" ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                  <Button onClick={startWebcam} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                    <CameraIcon className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              ) : (
                <Button onClick={startWebcam} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start Camera
                </Button>
              )}
            </div>
          ) : (
            <>
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              <canvas ref={canvasRef} className="hidden" />

              {/* AI Detection Overlays */}
              {detectedObjects.map((detection, index) => (
                <div
                  key={index}
                  className="absolute border-2 border-green-400 bg-green-400/20"
                  style={{
                    left: `${(detection.x / 640) * 100}%`,
                    top: `${(detection.y / 480) * 100}%`,
                    width: `${(detection.width / 640) * 100}%`,
                    height: `${(detection.height / 480) * 100}%`,
                  }}
                >
                  <div className="absolute -top-6 left-0 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {detection.type}: {detection.confidence}%
                  </div>
                </div>
              ))}

              <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                AI ACTIVE
              </div>

              <div className="absolute top-3 right-3 flex gap-2">
                <Button onClick={captureScreenshot} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white p-2">
                  <Download className="h-4 w-4" />
                </Button>
                <Button onClick={toggleFullscreen} size="sm" className="bg-gray-600 hover:bg-gray-700 text-white p-2">
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button onClick={stopWebcam} size="sm" className="bg-red-600 hover:bg-red-700 text-white p-2">
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )
    }

    // Handle video URLs
    if (camera.videoUrl) {
      if (camera.type === "mp4") {
        return (
          <>
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              onError={(e) => console.error("Video error:", e)}
            >
              <source src={camera.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Detection Overlays for video */}
            {camera.detections.map((detection, index) => (
              <div
                key={index}
                className="absolute border-2 border-green-400 bg-green-400/20"
                style={{
                  left: `${(detection.x / 400) * 100}%`,
                  top: `${(detection.y / 300) * 100}%`,
                  width: `${(detection.width / 400) * 100}%`,
                  height: `${(detection.height / 300) * 100}%`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  {detection.type}: {detection.confidence}%
                </div>
              </div>
            ))}

            <div className="absolute top-3 right-3">
              <Button onClick={toggleFullscreen} size="sm" className="bg-gray-600 hover:bg-gray-700 text-white p-2">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </>
        )
      } else if (camera.type === "iframe") {
        return (
          <>
            <iframe
              src={camera.videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${camera.id} feed`}
            />

            {/* Detection Overlays for iframe */}
            {camera.detections.map((detection, index) => (
              <div
                key={index}
                className="absolute border-2 border-green-400 bg-green-400/20 pointer-events-none"
                style={{
                  left: `${(detection.x / 400) * 100}%`,
                  top: `${(detection.y / 300) * 100}%`,
                  width: `${(detection.width / 400) * 100}%`,
                  height: `${(detection.height / 300) * 100}%`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  {detection.type}: {detection.confidence}%
                </div>
              </div>
            ))}
          </>
        )
      }
    }

    // Fallback to image
    return (
      <>
        <img
          src={camera.image || "/placeholder.svg?height=300&width=400"}
          alt={`${camera.id} feed`}
          className="w-full h-full object-cover"
        />

        {/* Detection Overlays for regular cameras */}
        {camera.detections.map((detection, index) => (
          <div
            key={index}
            className="absolute border-2 border-green-400 bg-green-400/20"
            style={{
              left: `${(detection.x / 400) * 100}%`,
              top: `${(detection.y / 300) * 100}%`,
              width: `${(detection.width / 400) * 100}%`,
              height: `${(detection.height / 300) * 100}%`,
            }}
          >
            <div className="absolute -top-6 left-0 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {detection.type}: {detection.confidence}%
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <div
        className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg border transition-all duration-200 ${
          isCameraDisabled ? "border-gray-600 opacity-75" : "border-gray-700 hover:border-gray-600"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 bg-gray-750 border-b border-gray-700">
          <div className="flex items-center gap-2">
            {isCameraDisabled ? (
              <Badge className="bg-gray-600 text-gray-300">
                <Power className="h-3 w-3 mr-1" />
                CAMERA OFF
              </Badge>
            ) : (
              <>
                <StatusBadge status={camera.isWebcam && isStreaming ? "live" : camera.status} />
                {camera.isWebcam && (
                  <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">
                    WEBCAM
                  </Badge>
                )}
                {camera.videoUrl && (
                  <Badge variant="outline" className="text-purple-400 border-purple-400 text-xs">
                    {camera.type?.toUpperCase()}
                  </Badge>
                )}
              </>
            )}
          </div>
          <span className="text-gray-300 text-sm font-mono">{camera.timestamp}</span>
        </div>

        {/* Video/Image Area */}
        <div className="relative aspect-video bg-gray-900">{renderVideoContent()}</div>

        {/* Footer */}
        <div className="p-3 bg-gray-750 border-t border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                {camera.id}
                {camera.isWebcam && isStreaming && !isCameraDisabled && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
                {camera.videoUrl && !isCameraDisabled && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="text-gray-400 text-sm">{camera.location}</div>
            </div>

            {camera.isWebcam && permissionStatus === "granted" && !isCameraDisabled && (
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            )}
          </div>

          {/* Simple Status Info */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>Quality: {isCameraDisabled ? "N/A" : `${camera.fps} FPS`}</span>
            <span>Status: {isCameraDisabled ? "Disabled" : `${camera.uptime}% uptime`}</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-4xl">
            <Button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white"
            >
              Close
            </Button>
            <div className="w-full h-full">{renderVideoContent()}</div>
          </div>
        </div>
      )}
    </>
  )
}
