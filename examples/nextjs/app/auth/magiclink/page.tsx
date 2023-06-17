'use client';
import { Auth } from '@supabase/auth-ui-react';

export default function Home() {
	return <Auth view="magic_link"></Auth>;
}
