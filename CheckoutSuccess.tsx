import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function CheckoutSuccess() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const sessionId = new URLSearchParams(search).get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSession = trpc.stripe.getCheckoutSession.useQuery(
    { sessionId: sessionId || "" },
    { enabled: !!sessionId }
  );

  useEffect(() => {
    if (getSession.data) {
      setLoading(false);
    }
    if (getSession.error) {
      setError("Ödeme durumu kontrol edilemedi");
      setLoading(false);
    }
  }, [getSession.data, getSession.error]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Geçersiz İstek</CardTitle>
            <CardDescription>Session ID bulunamadı</CardDescription>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (error || !getSession.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Hata</CardTitle>
            <CardDescription>{error || "Ödeme işlenirken hata oluştu"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate("/pricing")} variant="outline" className="w-full">
              Fiyatlandırmaya Dön
            </Button>
            <Button onClick={() => navigate("/")} className="w-full">
              Ana Sayfaya Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const session = getSession.data as any;
  const isSuccessful = session.payment_status === "paid" || session.status === "complete";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {isSuccessful ? (
            <>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <CardTitle>Ödeme Başarılı!</CardTitle>
              <CardDescription>
                Aboneliğiniz etkinleştirildi. Hesabınıza erişebilirsiniz.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle>Ödeme Bekleniyor</CardTitle>
              <CardDescription>
                Ödemeniz işleniyor. Lütfen bekleyin...
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isSuccessful && (
            <>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Abonelik Detayları</p>
                <p className="text-sm text-muted-foreground">
                  Durum: <span className="text-green-600 font-semibold">Aktif</span>
                </p>
                {session.customer_email && (
                  <p className="text-sm text-muted-foreground">
                    Email: {session.customer_email}
                  </p>
                )}
              </div>
              <Button onClick={() => navigate("/dashboard")} className="w-full">
                Dashboard'a Git
              </Button>
            </>
          )}
          <Button onClick={() => navigate("/")} variant="outline" className="w-full">
            Ana Sayfaya Dön
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
