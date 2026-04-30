import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { session, user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-sky flex items-center justify-center px-4">
        <p className="text-muted-foreground">Checking session...</p>
      </main>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Logout failed", { description: error.message });
      return;
    }

    toast.success("Switched user");
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full border-b border-border/70 bg-card/85 backdrop-blur">
        <div className="container max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-end gap-3">
          <span className="text-xs sm:text-sm text-muted-foreground max-w-[220px] truncate">{user?.email}</span>
          <Button size="sm" variant="outline" onClick={handleSignOut}>
            Switch user
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
