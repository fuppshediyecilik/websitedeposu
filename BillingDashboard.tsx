import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Calendar,
  Zap,
  Download,
  ChevronRight,
  CreditCard,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

export default function BillingDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  const { data: subscription, isLoading: subLoading } = trpc.stripe.getCurrentSubscription.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: invoices, isLoading: invoicesLoading } = trpc.stripe.getInvoices.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: plans } = trpc.stripe.getPlans.useQuery();
  const cancelSub = trpc.stripe.cancelSubscription.useMutation();
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Giriş Gerekli</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")} className="w-full">
              Ana Sayfaya Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "canceled":
        return "text-red-500";
      case "paused":
        return "text-amber-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "canceled":
        return "İptal Edildi";
      case "paused":
        return "Duraklatıldı";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.01 270)" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "oklch(1 0 0 / 6%)" }}>
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                Faturalandırma
              </h1>
              <p className="text-sm mt-1" style={{ color: "oklch(0.60 0.01 270)" }}>
                Abonelik ve faturaları yönetin
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ChevronRight className="w-4 h-4" />
              Geri Dön
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Subscription */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Subscription Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="border-0"
                style={{
                  background: "oklch(0.13 0.01 270)",
                  boxShadow: "0 20px 60px oklch(0 0 0 / 30%)",
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                        Mevcut Abonelik
                      </CardTitle>
                      <CardDescription>Aktif plan ve dönem bilgisi</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" style={{ color: "oklch(0.82 0.17 75)" }} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {subLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin w-6 h-6" />
                    </div>
                  ) : subscription ? (
                    <>
                      {/* Plan Name and Status */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Plan Adı</p>
                          <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                            {subscription.planId === 1 ? "Pro" : "Enterprise"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400 mb-1">Durum</p>
                          <div className="flex items-center gap-2">
                            {subscription.status === "active" ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-500" />
                            )}
                            <span className={`font-semibold ${getStatusColor(subscription.status)}`}>
                              {getStatusLabel(subscription.status)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Period Information */}
                      <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ background: "oklch(0.10 0.01 270)" }}>
                        <div>
                          <p className="text-xs text-gray-400 mb-2">Dönem Başlangıcı</p>
                          <p className="font-semibold flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: "oklch(0.82 0.17 75)" }} />
                            {subscription.currentPeriodStart
                              ? new Date(subscription.currentPeriodStart).toLocaleDateString("tr-TR")
                              : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-2">Dönem Sonu</p>
                          <p className="font-semibold flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: "oklch(0.75 0.14 200)" }} />
                            {subscription.currentPeriodEnd
                              ? new Date(subscription.currentPeriodEnd).toLocaleDateString("tr-TR")
                              : "-"}
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Plan Özellikleri</p>
                        <div className="space-y-2">
                          {subscription.planId === 1 ? (
                            <>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.82 0.17 75)" }} />
                                <span className="text-sm">Unlimited image generations</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.82 0.17 75)" }} />
                                <span className="text-sm">200 video generations / month</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.82 0.17 75)" }} />
                                <span className="text-sm">4K video resolution</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.82 0.17 75)" }} />
                                <span className="text-sm">Priority queue & commercial license</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.75 0.14 200)" }} />
                                <span className="text-sm">Unlimited video generations</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.75 0.14 200)" }} />
                                <span className="text-sm">8K resolution support</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.75 0.14 200)" }} />
                                <span className="text-sm">API access & custom model training</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" style={{ color: "oklch(0.75 0.14 200)" }} />
                                <span className="text-sm">Dedicated support & team collaboration</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {subscription.status === "active" && (
                        <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "oklch(1 0 0 / 6%)" }}>
                          <Button
                            variant="outline"
                            onClick={() => navigate("/pricing")}
                            className="flex-1"
                          >
                            Plan Değiştir
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => setShowCancelModal(true)}
                            className="flex-1"
                          >
                            Aboneliği İptal Et
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                        <p className="text-gray-400">Aktif abonelik yok</p>
                        <Button
                          onClick={() => navigate("/pricing")}
                          className="mt-4"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                            color: "oklch(0.12 0.02 75)",
                          }}
                        >
                          Plan Seç
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Invoices Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card
                className="border-0"
                style={{
                  background: "oklch(0.13 0.01 270)",
                  boxShadow: "0 20px 60px oklch(0 0 0 / 30%)",
                }}
              >
                <CardHeader>
                  <CardTitle style={{ fontFamily: "'Sora', sans-serif" }}>Faturalar</CardTitle>
                  <CardDescription>Ödeme geçmişi ve fatura yönetimi</CardDescription>
                </CardHeader>
                <CardContent>
                  {invoicesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin w-6 h-6" />
                    </div>
                  ) : invoices && invoices.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr style={{ borderColor: "oklch(1 0 0 / 6%)" }} className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Tarih</th>
                            <th className="text-left py-3 px-4 font-semibold">Açıklama</th>
                            <th className="text-right py-3 px-4 font-semibold">Tutar</th>
                            <th className="text-center py-3 px-4 font-semibold">Durum</th>
                            <th className="text-right py-3 px-4 font-semibold">İşlem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((invoice: any) => (
                            <tr
                              key={invoice.id}
                              style={{ borderColor: "oklch(1 0 0 / 3%)" }}
                              className="border-b hover:bg-opacity-50 transition-colors"
                            >
                              <td className="py-3 px-4">
                                {new Date(invoice.createdAt).toLocaleDateString("tr-TR")}
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-gray-300">Aylık Abonelik</span>
                              </td>
                              <td className="py-3 px-4 text-right font-semibold">
                                ${(invoice.amount / 100).toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span
                                  className="px-3 py-1 rounded-full text-xs font-semibold"
                                  style={{
                                    background:
                                      invoice.status === "paid"
                                        ? "oklch(0.30 0.10 150 / 20%)"
                                        : "oklch(0.50 0.10 40 / 20%)",
                                    color:
                                      invoice.status === "paid"
                                        ? "oklch(0.70 0.15 150)"
                                        : "oklch(0.70 0.15 40)",
                                  }}
                                >
                                  {invoice.status === "paid" ? "Ödendi" : "Beklemede"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                {invoice.pdfUrl ? (
                                  <a
                                    href={invoice.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                                  >
                                    <Download className="w-4 h-4" />
                                    <span className="text-xs">İndir</span>
                                  </a>
                                ) : (
                                  <span className="text-gray-500 text-xs">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                      <p className="text-gray-400">Henüz fatura yok</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Plan Upgrade Card */}
            {subscription && subscription.planId === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card
                  className="border-0"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.82 0.17 75 / 10%), oklch(0.70 0.17 75 / 5%))",
                    borderLeft: "3px solid oklch(0.82 0.17 75)",
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>
                      Enterprise'a Yükselt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300">
                      Unlimited video generations, 8K resolution ve API access ile daha fazla yapın.
                    </p>
                    <Button
                      onClick={() => navigate("/pricing")}
                      className="w-full"
                      style={{
                        background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                        color: "oklch(0.12 0.02 75)",
                      }}
                    >
                      Detayları Gör
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Help Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card
                className="border-0"
                style={{
                  background: "oklch(0.13 0.01 270)",
                  boxShadow: "0 20px 60px oklch(0 0 0 / 30%)",
                }}
              >
                <CardHeader>
                  <CardTitle className="text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Yardım
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <Settings className="w-4 h-4 mr-2" />
                    Hesap Ayarları
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Faturalandırma SSS
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Destek ile İletişim
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-md border-0" style={{ background: "oklch(0.13 0.01 270)" }}>
              <CardHeader>
                <CardTitle className="text-red-500">Aboneliği İptal Et</CardTitle>
                <CardDescription>Bu işlem geri alınamaz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Aboneliğinizi iptal etmek istediğinizden emin misiniz? Mevcut dönemin sonuna kadar erişim sağlanacaktır.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1"
                  >
                    Vazgeç
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await cancelSub.mutateAsync();
                      setShowCancelModal(false);
                    }}
                    disabled={cancelSub.isPending}
                    className="flex-1"
                  >
                    {cancelSub.isPending ? "İptal Ediliyor..." : "İptal Et"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
