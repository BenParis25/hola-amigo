import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Todo = {
  id: number | string;
  name: string;
};

const SupabaseTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const loadTodos = async () => {
      const { data, error: queryError } = await supabase.from("todos").select("id, name");

      if (queryError) {
        setError(queryError.message);
      } else {
        setTodos((data ?? []) as Todo[]);
      }

      setIsLoading(false);
    };

    void loadTodos();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-sky">
      <div className="container max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black mb-4">Supabase Todos</h1>
        {isLoading ? <p>Loading...</p> : null}
        {error ? <p className="text-destructive">{error}</p> : null}
        {!isLoading && !error ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="rounded-xl border p-3 bg-card">
                {todo.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
};

export default SupabaseTodos;
