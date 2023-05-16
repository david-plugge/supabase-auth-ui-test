import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from './lib';
import { createClient } from '@supabase/supabase-js';

function App() {
  const supabaseClient = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  return (
    <main>
      <Auth supabaseClient={supabaseClient} theme={ThemeSupa.default}></Auth>
    </main>
  );
}

export default App;
