import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from './lib';
import { createClient } from '@supabase/supabase-js';

function App() {
  const client = createClient('https://localhost:54321', '123');

  return (
    <main>
      <Auth supabaseClient={client} theme={ThemeSupa.default}></Auth>
    </main>
  );
}

export default App;
