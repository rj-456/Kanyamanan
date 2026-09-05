import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global Error Boundary caught an exception:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    window.location.href = window.location.origin + window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#12100E] text-charcoal dark:text-[#F7F5F0] flex items-center justify-center p-3 sm:p-6 font-sans antialiased">
          <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-[#1E1B18] border border-[#E9E5DE] dark:border-[#2E2A24] rounded-3xl shadow-2xl p-5 sm:p-8 space-y-4 sm:space-y-5 text-center animate-scale-in">
            {/* Header Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-terracotta/10 dark:bg-terracotta/20 text-terracotta dark:text-orange-400 flex items-center justify-center mx-auto text-2xl sm:text-3xl shadow-inner border border-terracotta/20">
              🛠️
            </div>

            {/* Title & Description */}
            <div className="space-y-1.5">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-terracotta dark:text-orange-400 bg-terracotta/10 dark:bg-terracotta/20 px-3 py-1 rounded-full border border-terracotta/20 inline-block">
                Auto Recovery Mode
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-charcoal dark:text-white m-0 tracking-tight">
                Kanyamanan System Recovery
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-light dark:text-gray-300 leading-relaxed font-medium m-0">
                A rendering issue was prevented from freezing the application. You can reload or reset app data below.
              </p>
            </div>

            {/* Error Message Pill */}
            <div className="text-left bg-terracotta/5 dark:bg-terracotta/15 p-3 sm:p-3.5 rounded-2xl border border-terracotta/20 dark:border-terracotta/30 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-wider text-terracotta dark:text-orange-400 block">
                Error Message:
              </span>
              <p className="text-xs font-mono font-bold text-charcoal dark:text-gray-100 break-words m-0 leading-snug">
                {this.state.error?.message || "An unexpected error occurred during rendering."}
              </p>
            </div>

            {/* Stack trace toggle */}
            {this.state.error?.stack && (
              <div className="text-left space-y-1.5">
                <button
                  type="button"
                  onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                  className="text-[11px] font-bold text-charcoal-light dark:text-gray-400 hover:text-terracotta dark:hover:text-orange-400 underline cursor-pointer flex items-center gap-1"
                >
                  {this.state.showDetails ? '▼ Hide Technical Details' : '▶ View Technical Stack Trace'}
                </button>

                {this.state.showDetails && (
                  <div className="bg-[#141210] text-gray-300 p-3 sm:p-4 rounded-2xl text-[10px] font-mono text-left max-h-36 sm:max-h-44 overflow-y-auto whitespace-pre-wrap break-all border border-white/10 shadow-inner">
                    {this.state.error.stack}
                  </div>
                )}
              </div>
            )}

            {/* Responsive Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 bg-terracotta hover:bg-terracotta-dark text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>🔄 Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-[#FAF8F5] dark:bg-[#25221E] hover:bg-[#E9E5DE] dark:hover:bg-[#2E2A24] text-charcoal dark:text-gray-200 border border-[#E9E5DE] dark:border-[#35302A] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>🧹 Clear Cache &amp; Reset</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
