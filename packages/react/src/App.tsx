import { useEffect, useState } from 'react';
import { SupabaseContextProvider, Auth } from './lib';
import { createClient } from '@supabase/supabase-js';
import {
	AuthConfig,
	AuthViewType,
	SupabaseDarkTheme,
	SupabaseTheme,
	getAuthConfig,
} from '@supabase/auth-ui-shared';

function App() {
	const supabaseClient = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);

	const [view, setView] = useState<AuthViewType>('sign_in');
	const [authConfig, setAuthConfig] = useState<AuthConfig>({});

	useEffect(() => {
		(async () => {
			const config = await getAuthConfig(
				import.meta.env.VITE_SUPABASE_URL,
				import.meta.env.VITE_SUPABASE_KEY
			);
			setAuthConfig(config);
		})();
	}, []);

	console.log(view);

	return (
		<main>
			<SupabaseContextProvider
				appearence={{
					theme: {
						...SupabaseTheme,
						...SupabaseDarkTheme,
					},
				}}
				supabaseClient={supabaseClient}
				config={authConfig}
				navigate={({ type }) => setView(type)}
			>
				<Auth view={view} />
			</SupabaseContextProvider>
		</main>
	);
}

export default App;
