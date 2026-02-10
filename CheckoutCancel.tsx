import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function CheckoutCancel() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-amber-500" />
          </div>
          <CardTitle>Ödeme İptal Edildi</CardTitle>
          <CardDescription>
            Checkout işlemi iptal edildi. Lütfen tekrar deneyin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Herhangi bir sorun yaşıyorsanız, lütfen bize iletişim kurun veya farklı bir ödeme yöntemi deneyin.
            </p>
          </div>
          <Button onClick={() => navigate("/pricing")} className="w-full">
            Fiyatlandırmaya Dön
          </Button>
          <Button onClick={() => navigate("/")} variant="outline" className="w-full">
            Ana Sayfaya Dön
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
