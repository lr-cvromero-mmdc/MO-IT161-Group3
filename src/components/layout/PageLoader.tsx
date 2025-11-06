// PageLoader component - Shows during page transitions
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export function PageLoader() {
  return (
    <div 
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      {/* Lottie Animation - New car wash animation */}
      <div className="w-[300px] h-[300px]">
        <DotLottieReact
          src="https://lottie.host/d31db985-e874-4c82-9f78-cbfccbf32ee7/BqDt57UdSj.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

