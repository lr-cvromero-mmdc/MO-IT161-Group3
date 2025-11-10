// PageLoader component - Shows during page transitions
export function PageLoader() {
  return (
    <div 
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      {/* Lottie Animation - Using web component */}
      <dotlottie-wc 
        src="https://lottie.host/d31db985-e874-4c82-9f78-cbfccbf32ee7/BqDt57UdSj.lottie" 
        style={{ width: '300px', height: '300px' }}
        autoplay 
        loop
      />
    </div>
  )
}

