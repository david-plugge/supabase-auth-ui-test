'use client';

import { supabaseClient } from '@/db';
import { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabaseClient.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<header className="mx-auto flex justify-between items-center max-w-5xl py-4">
			<h1 className="text-4xl">Site</h1>

			<nav className="mx-auto">
				<Link href="/">Home</Link>
			</nav>

			<div>
				{session ? (
					<>
						<span className="mr-4">{session.user.email}</span>
						<button
							className="bg-green-700 text-white px-3 py-2 rounded"
							onClick={() => supabaseClient.auth.signOut()}
						>
							Logout
						</button>
					</>
				) : (
					<Link href="/auth/signin">Signin</Link>
				)}
			</div>
		</header>
	);
}
