import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

import { getEligibleSchemes } from "./schemes";
import { supabase } from "./supabase.ts";

async function showSchemes() {
  const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const userId = user.id;



  const schemes = await getEligibleSchemes(userId);

  const container = document.getElementById("schemes");

  if (!container) return;

  container.innerHTML = schemes
    .map(s => `<div class="scheme-card">
      <h3>${s.scheme_name}</h3>
      <p>${s.description}</p>
    </div>`)
    .join("");
}

showSchemes();
