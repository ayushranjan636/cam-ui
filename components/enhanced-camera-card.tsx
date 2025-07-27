"use client"

import { useEffect, useRef, useState } from "react"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WifiOff, Play, Square, AlertCircle, CheckCircle, Download, Maximize, Settings } from "lucide-react"
import { CameraIcon } from "lucide-react"

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
  image: string
  detections: Detection[]
  isWebcam?: boolean
  fps: number
  resolution: string
  lastActivity: string
  temperature: number
  uptime: number
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
  const [isRecording, setIsRecording] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState<Detection[]>([])

  const startWebcam = async () => {
    if (!camera.isWebcam) return

    setPermissionStatus("loading")
    setError(null)

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
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
      startAIDetection()
    } catch (err) {
      console.error("Error accessing webcam:", err)
      setPermissionStatus("denied")
      setError("Camera access denied or not available")
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

  const startAIDetection = () => {
    const detectionInterval = setInterval(() => {
      if (Math.random() < 0.4) {
        const detectionTypes = ["Person", "Face", "Hand", "Object"]
        const randomType = detectionTypes[Math.floor(Math.random() * detectionTypes.length)]
        const newDetection: Detection = {
          type: randomType,
          confidence: Math.floor(Math.random() * 20) + 80,
          x: Math.floor(Math.random() * 200) + 50,
          y: Math.floor(Math.random() * 150) + 50,
          width: Math.floor(Math.random() * 80) + 60,
          height: Math.floor(Math.random() * 100) + 80,
          timestamp: new Date().toISOString(),
        }
        setDetectedObjects([newDetection])
      } else {
        setDetectedObjects([])
      }
    }, 2000)

    return () => clearInterval(detectionInterval)
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

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const getCardGlowClass = () => {
    if (camera.isWebcam && isStreaming) return "live-glow"
    switch (camera.status) {
      case "live":
        return "live-glow"
      case "warning":
        return "warning-glow"
      case "offline":
        return "error-glow"
      default:
        return ""
    }
  }

  return (
    <div
      className={`glass-effect rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 transition-all duration-300 hover:scale-105 neon-border ${getCardGlowClass()}`}
    >
      {/* Enhanced Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <StatusBadge status={camera.isWebcam && isStreaming ? "live" : camera.status} />
          {camera.isWebcam && (
            <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">
              <CameraIcon className="h-3 w-3 mr-1" />
              WEBCAM
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-sm font-mono bg-black/30 px-2 py-1 rounded">{camera.timestamp}</span>
          {camera.isWebcam && isStreaming && (
            <div className="flex gap-1">
              <Button
                onClick={captureScreenshot}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                <Download className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                <Maximize className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Video/Image Area */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
        {camera.status === "offline" && !camera.isWebcam ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/20 to-gray-900">
            <div className="shimmer absolute inset-0"></div>
            <WifiOff className="h-12 w-12 text-red-400 mb-3 animate-pulse" />
            <span className="text-red-400 font-semibold text-lg">Connection Lost</span>
            <span className="text-gray-400 text-sm mt-1">Attempting reconnection...</span>
            <div className="mt-3 w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: "60%" }}></div>
            </div>
          </div>
        ) : camera.isWebcam ? (
          <div className="relative w-full h-full">
            {!isStreaming ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 to-gray-900">
                <CameraIcon className="h-16 w-16 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold mb-2">AI-Powered Live Feed</h3>
                <p className="text-gray-400 text-sm mb-4 text-center px-4">
                  Enable real-time object detection and monitoring
                </p>

                {permissionStatus === "loading" ? (
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                    <span>Requesting camera access...</span>
                  </div>
                ) : permissionStatus === "denied" ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <AlertCircle className="h-5 w-5" />
                      <span>{error}</span>
                    </div>
                    <Button
                      onClick={startWebcam}
                      className="btn-glow bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      <CameraIcon className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={startWebcam}
                    className="btn-glow bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Enable AI Detection
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
                    className="absolute border-2 border-green-400 bg-green-400/10 backdrop-blur-sm"
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

                <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  AI DETECTION ACTIVE
                </div>

                <Button
                  onClick={stopWebcam}
                  className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-full"
                  size="sm"
                >
                  <Square className="h-4 w-4" />
                </Button>

                {/* Performance Stats */}
                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  FPS: {camera.fps} | {camera.resolution}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <img
              src={camera.image || "/placeholder.svg"}
              alt={`${camera.id} feed`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Enhanced Detection Overlays */}
            {camera.detections.map((detection, index) => (
              <div
                key={index}
                className="absolute border-2 border-green-400 bg-green-400/10"
                style={{
                  left: `${(detection.x / 300) * 100}%`,
                  top: `${(detection.y / 200) * 100}%`,
                  width: `${(detection.width / 300) * 100}%`,
                  height: `${(detection.height / 200) * 100}%`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  {detection.type}: {detection.confidence}%
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Enhanced Footer */}
      <div className="p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-bold text-white text-lg flex items-center gap-2">
              {camera.id}
              {camera.isWebcam && isStreaming && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="text-gray-300 text-sm">{camera.location}</div>
          </div>

          {camera.isWebcam && permissionStatus === "granted" && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              <CheckCircle className="h-3 w-3 mr-1" />
              Authorized
            </Badge>
          )}
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-gray-400">FPS</div>
            <div className="text-white font-semibold">{camera.fps}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">Uptime</div>
            <div className="text-green-400 font-semibold">{camera.uptime}%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">Temp</div>
            <div className={`font-semibold ${camera.temperature > 50 ? "text-red-400" : "text-green-400"}`}>
              {camera.temperature}°C
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
