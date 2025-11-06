// SplashScreen component - Shows on initial load with Lottie animation
import { useEffect, useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface SplashScreenProps {
  onLoadingComplete: () => void
}

export function SplashScreen({ onLoadingComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress - slower for better animation visibility
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5  // Changed from 10 to 5 for smoother progress
      })
    }, 150)  // Changed from 100ms to 150ms for slower updates

    // Complete loading after 2.5 seconds (sweet spot for UX)
    const loadingTimer = setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      
      // Fade out after 400ms
      setTimeout(() => {
        setIsVisible(false)
        
        // Call completion callback after fade animation
        setTimeout(() => {
          onLoadingComplete()
        }, 400)
      }, 400)
    }, 2500)  // 2.5 seconds - optimal UX timing

    return () => {
      clearInterval(progressInterval)
      clearTimeout(loadingTimer)
    }
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-brand-primary via-brand-primary/95 to-brand-dark flex flex-col items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading Espinosa's Hand Carwash"
    >
      {/* Lottie Animation */}
      <div className="w-48 h-48 md:w-64 md:h-64 mb-6 animate-in zoom-in-50 duration-500">
        <DotLottieReact
          src="https://lottie.host/01d21275-1da3-4e1a-9b40-0627f11f634d/l2RMklRT9p.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

      {/* Brand Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        Espinosa's Hand Carwash
      </h1>
      
      <p className="text-brand-cream/90 text-sm md:text-base mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        Premium Car Care Services
      </p>

      {/* Loading Progress Bar */}
      <div className="w-64 md:w-80 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-brand-accent to-brand-cream transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading Text */}
        <p className="text-white/70 text-xs text-center mt-3">
          Loading... {progress}%
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-brand-accent/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-cream/10 rounded-full blur-2xl animate-pulse delay-500" />
    </div>
  )
}

