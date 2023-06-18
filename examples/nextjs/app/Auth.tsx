'use client';
import '@supabase/auth-ui-react/style.css';

import { supabaseClient } from '@/db';
import { SupabaseContextProvider, AuthConfig, SupabaseDarkTheme } from '@supabase/auth-ui-react';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

export function AuthProvider({
	children,
	config,
}: PropsWithChildren<{
	config: AuthConfig;
}>) {
	const router = useRouter();

	return (
		<SupabaseContextProvider
			config={config}
			supabaseClient={supabaseClient}
			appearence={{
				theme: SupabaseDarkTheme,
			}}
			navigate={({ path }) => router.push(path)}
			paths={{
				sign_in: '/auth/signin',
				sign_up: '/auth/signup',
				magic_link: '/auth/magiclink',
				forgotten_password: '/auth/forgotten-password',
				update_password: '/auth/update-password',
				verify_otp: '/auth/verify-otp',
			}}
		>
			{children}
		</SupabaseContextProvider>
	);
}
