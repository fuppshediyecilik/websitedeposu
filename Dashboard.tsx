import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  
  const { data: subscription, isLoading: subLoading } = trpc.stripe.getCurrentSubscription.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: invoices, isLoading: invoicesLoading } = trpc.stripe.getInvoices.useQuery(undefined, {
    enabled: !!user,
  });

  const cancelSub = trpc.stripe.cancelSubscription.useMutation();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Billing Dashboard</h1>

        {/* Current Subscription */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            {subLoading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Status: {subscription.status}</p>
                    <p className="text-sm text-muted-foreground">
                      Current period: {new Date(subscription.currentPeriodStart!).toLocaleDateString()} - {new Date(subscription.currentPeriodEnd!).toLocaleDateString()}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                {subscription.status === "active" && (
                  <Button
                    variant="destructive"
                    onClick={() => cancelSub.mutate()}
                    disabled={cancelSub.isPending}
                  >
                    {cancelSub.isPending ? "Canceling..." : "Cancel Subscription"}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p>No active subscription</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Your billing history</CardDescription>
          </CardHeader>
          <CardContent>
            {invoicesLoading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : invoices && invoices.length > 0 ? (
              <div className="space-y-2">
                {invoices.map((invoice: any) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">${(invoice.amount / 100).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{invoice.status}</span>
                      {invoice.pdfUrl && (
                        <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No invoices yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
