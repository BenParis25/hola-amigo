import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type LeaderRow = {
  user_id: string;
  user_email: string;
  pct_correct: number | null;
  current_level: string | null;
  rounds_played: number | null;
};

const Leaderboard = () => {
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("leaderboard").select("user_id, user_email, pct_correct, current_level, rounds_played");
      if (error) {
        console.error(error);
        setRows([]);
      } else if (isMounted) {
        setRows((data ?? []) as LeaderRow[]);
      }
      if (isMounted) setLoading(false);
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-sky">
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black">Leaderboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </header>

        <div className="bg-card border-2 border-border rounded-2xl p-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="text-center text-muted-foreground">No leaderboard data yet.</div>
          ) : (
            <div className="grid grid-cols-6 gap-3 items-center text-sm font-medium px-2">
              <div className="col-span-3">Player</div>
              <div className="col-span-1 text-center">Level</div>
              <div className="col-span-1 text-center">% Correct</div>
              <div className="col-span-1 text-right">Rounds</div>

              {rows.map((r) => (
                <div key={r.user_id} className="contents">
                  <div className="col-span-3 truncate">{r.user_email}</div>
                  <div className="col-span-1 text-center">{r.current_level ?? "—"}</div>
                  <div className="col-span-1 text-center">{r.pct_correct ?? "—"}%</div>
                  <div className="col-span-1 text-right">{r.rounds_played ?? 0}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
