'use client';
import '@supabase/auth-ui-react/style.css';

import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';

export default () => {
  const supabaseClient = createClient('https://localhost:54321', '123');
  return <Auth supabaseClient={supabaseClient}></Auth>;
};
