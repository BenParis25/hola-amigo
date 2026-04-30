import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";

export default function ResetPassword() {
  const supabase = createClient();
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!data.user) {
        toast.error("No recovery session found. Open the reset link in the same browser.");
        navigate("/auth", { replace: true });
        return;
      }
      setUserLoaded(true);
    })();
    return () => {
      mounted = false;
    };
  }, [supabase, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      toast.error("Enter a password of at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error("Reset failed", { description: error.message });
      return;
    }
    toast.success("Password set — you are signed in");
    navigate("/", { replace: true });
  };

  if (!userLoaded) return null;

  return (
    <main className="min-h-screen bg-gradient-sky flex items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Set a new password</h2>
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving…" : "Set new password"}
        </Button>
      </form>
    </main>
  );
}
