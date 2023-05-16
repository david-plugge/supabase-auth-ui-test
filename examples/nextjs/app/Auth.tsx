'use client';
import '@supabase/auth-ui-react/style.css';

import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';

export default () => {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string
  );

  return <Auth supabaseClient={supabaseClient}></Auth>;
};
