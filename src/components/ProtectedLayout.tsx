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

    toast.success("Logged out");
    navigate("/auth", { replace: true });
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 rounded-2xl border bg-card/95 backdrop-blur px-3 py-2 shadow-card flex items-center gap-3">
        <span className="text-xs sm:text-sm text-muted-foreground max-w-[160px] truncate">{user?.email}</span>
        <Button size="sm" variant="outline" onClick={handleSignOut}>
          Logout
        </Button>
      </div>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
