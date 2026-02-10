import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Copy, Download } from "lucide-react";
import { Component, ReactNode } from "react";
import { logger } from "@/lib/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string;
  copied: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorId: "", copied: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    logger.fatal("React Error Boundary Caught", error, {
      errorId,
      component: "ErrorBoundary",
      message: error.message,
    });
    return { hasError: true, error, errorId, copied: false };
  }

  private copyToClipboard = async () => {
    const errorData = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch (err) {
      logger.error("Failed to copy error to clipboard", err);
    }
  };

  private downloadLogs = () => {
    const logs = logger.exportLogs();
    const blob = new Blob([logs], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `error-logs-${this.state.errorId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex items-center justify-center min-h-screen p-8"
          style={{ background: "oklch(0.10 0.01 270)" }}
        >
          <div
            className="flex flex-col items-center w-full max-w-3xl p-8 rounded-lg"
            style={{ background: "oklch(0.13 0.01 270)" }}
          >
            <AlertTriangle
              size={48}
              className="mb-6 flex-shrink-0"
              style={{ color: "oklch(0.70 0.15 40)" }}
            />

            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Bir hata oluştu
            </h2>
            <p className="text-gray-400 mb-6 text-center">
              Lütfen aşağıdaki bilgileri destek ekibine gönderin
            </p>

            {/* Error ID */}
            <div
              className="w-full mb-6 p-4 rounded-lg"
              style={{ background: "oklch(0.10 0.01 270)" }}
            >
              <p className="text-xs text-gray-500 mb-2">Hata Kimliği</p>
              <div className="flex items-center justify-between">
                <code
                  className="text-sm font-mono"
                  style={{ color: "oklch(0.82 0.17 75)" }}
                >
                  {this.state.errorId}
                </code>
                <button
                  onClick={this.copyToClipboard}
                  className="p-2 hover:opacity-70 transition-opacity"
                  title="Hata kimliğini kopyala"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Error Details */}
            <div className="w-full mb-6">
              <p className="text-xs text-gray-500 mb-2">Hata Detayları</p>
              <div className="p-4 rounded-lg bg-red-950/20 border border-red-900/30 overflow-auto max-h-64">
                <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono break-words">
                  {this.state.error?.stack || this.state.error?.message}
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-opacity",
                  "hover:opacity-90"
                )}
                style={{
                  background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                  color: "oklch(0.12 0.02 75)",
                }}
              >
                <RotateCcw size={16} />
                Sayfayı Yenile
              </button>
              <button
                onClick={this.downloadLogs}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors"
                style={{
                  background: "oklch(0.20 0.01 270)",
                  border: "1px solid oklch(1 0 0 / 6%)",
                  color: "white",
                }}
                title="Tüm günlükleri indir"
              >
                <Download size={16} />
                Günlükleri İndir
              </button>
            </div>

            {/* Copy Feedback */}
            {this.state.copied && (
              <p className="mt-4 text-sm" style={{ color: "oklch(0.70 0.15 150)" }}>
                ✓ Hata kimliği kopyalandı
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
