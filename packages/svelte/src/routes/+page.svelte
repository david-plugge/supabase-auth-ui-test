<script lang="ts">
	import { Auth } from '$lib/index.js';
	import { createClient } from '@supabase/supabase-js';

	const supabaseClient = createClient('https://localhost:54321', 'asd');
</script>

<svelte:head>
	<title>Supabase Auth UI for Svelte</title>
</svelte:head>

<main>
	<Auth {supabaseClient} providers={['google', 'github']} />
</main>

<style>
	main {
		max-width: 65ch;
		margin: 6em auto;
	}
</style>
