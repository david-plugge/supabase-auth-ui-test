import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { getAuthConfig } from '$lib/index.js';
import { supabaseClient } from '../db.js';

export const load = async ({ fetch }) => {
	const settings = await getAuthConfig(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		fetch
	});

	const {
		data: { session }
	} = await supabaseClient.auth.getSession();

	return {
		settings,
		session
	};
};
