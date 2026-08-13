import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global Error Boundary caught an exception:", error, errorInfo);
  }

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
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-xl bg-white border border-[#E9E5DE] rounded-2xl shadow-xl p-8 space-y-5">
            <div className="w-14 h-14 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto text-2xl font-black">
              ⚠️
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#2C3E35] font-serif m-0">Kanyamanan System Recovery</h2>
              <p className="text-xs text-[#5A6E63] mt-2 leading-relaxed font-mono bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E9E5DE]">
                {this.state.error?.message || "An unexpected error occurred during rendering."}
              </p>
            </div>
            {this.state.error?.stack && (
              <div className="bg-[#1E293B] text-slate-200 p-3 rounded-lg text-[10px] font-mono text-left max-h-36 overflow-y-auto whitespace-pre-wrap">
                {this.state.error.stack}
              </div>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-3.5 px-5 bg-[#2C5E3B] hover:bg-[#20452B] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🔄 Clear All Cache & Hard Reload</span>
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
