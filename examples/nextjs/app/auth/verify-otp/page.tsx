'use client';
import { Auth } from '@supabase/auth-ui-react';

export default function Home() {
	return <Auth view="verify_otp"></Auth>;
}
