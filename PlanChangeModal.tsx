import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

interface PlanChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: "pro" | "enterprise";
  targetPlan: "pro" | "enterprise";
  isUpgrade: boolean;
}

export default function PlanChangeModal({
  isOpen,
  onClose,
  currentPlan,
  targetPlan,
  isUpgrade,
}: PlanChangeModalProps) {
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  if (!isOpen) return null;

  const planDetails = {
    pro: {
      name: "Pro",
      price: "$19",
      period: "/ay",
      features: [
        "Unlimited image generations",
        "200 video generations / month",
        "4K video resolution",
        "All visual effects & styles",
        "Priority queue",
        "Motion control & lipsync",
        "Face swap & character tools",
        "Commercial license",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: "$89",
      period: "/ay",
      features: [
        "Everything in Pro",
        "Unlimited video generations",
        "8K resolution support",
        "API access",
        "Custom model training",
        "Dedicated support",
        "Team collaboration",
        "White-label options",
      ],
    },
  };

  const current = planDetails[currentPlan];
  const target = planDetails[targetPlan];

  const handleProceed = async () => {
    setIsProcessing(true);
    try {
      const result = await createCheckout.mutateAsync({
        planId: targetPlan === "pro" ? 1 : 2,
        returnUrl: `${window.location.origin}/billing`,
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0" style={{ background: "oklch(0.13 0.01 270)" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle style={{ fontFamily: "'Sora', sans-serif" }}>
                {isUpgrade ? "Plan Yükselt" : "Plan Düşür"}
              </CardTitle>
              <CardDescription>
                {isUpgrade
                  ? `${current.name} planından ${target.name} planına geçin`
                  : `${current.name} planından ${target.name} planına geçin`}
              </CardDescription>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-opacity-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Plan Comparison */}
            <div className="grid grid-cols-2 gap-4">
              {/* Current Plan */}
              <div
                className="p-4 rounded-lg border"
                style={{
                  background: "oklch(0.10 0.01 270)",
                  borderColor: "oklch(1 0 0 / 6%)",
                }}
              >
                <h3 className="font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {current.name}
                </h3>
                <div className="space-y-2">
                  {current.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Plan */}
              <div
                className="p-4 rounded-lg border-2"
                style={{
                  background: "oklch(0.13 0.01 270)",
                  borderColor: "oklch(0.82 0.17 75)",
                }}
              >
                <h3
                  className="font-semibold mb-4"
                  style={{ fontFamily: "'Sora', sans-serif", color: "oklch(0.82 0.17 75)" }}
                >
                  {target.name}
                </h3>
                <div className="space-y-2">
                  {target.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: "oklch(0.82 0.17 75)" }}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div
              className="p-4 rounded-lg"
              style={{ background: "oklch(0.10 0.01 270)" }}
            >
              <p className="text-sm text-gray-400 mb-2">Aylık Ücret Farkı</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
                {isUpgrade ? "+" : "-"}${Math.abs(89 - 19)}/ay
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {isUpgrade
                  ? "Değişiklik hemen yürürlüğe girecektir"
                  : "Değişiklik dönem sonunda yürürlüğe girecektir"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Vazgeç
              </Button>
              <Button
                onClick={handleProceed}
                disabled={isProcessing}
                className="flex-1"
                style={{
                  background: "linear-gradient(135deg, oklch(0.82 0.17 75), oklch(0.70 0.17 75))",
                  color: "oklch(0.12 0.02 75)",
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    İşleniyor...
                  </>
                ) : (
                  `${isUpgrade ? "Yükselt" : "Düşür"}`
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
