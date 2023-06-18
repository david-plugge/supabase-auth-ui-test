<script lang="ts">
	import '../app.css';
	import { goto, invalidateAll } from '$app/navigation';
	import { supabaseClient } from '../db.js';
	import { SupabaseDarkTheme, SupabaseProvider } from '$lib/index.js';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>Supabase Auth UI for Svelte</title>
</svelte:head>

<SupabaseProvider
	config={data.settings}
	{supabaseClient}
	appearence={{
		theme: SupabaseDarkTheme
	}}
	paths={{
		sign_in: '/auth/signin',
		sign_up: '/auth/signup',
		magic_link: '/auth/magiclink',
		forgotten_password: '/auth/forgotten-password',
		update_password: '/auth/update-password',
		verify_otp: '/auth/verify-otp'
	}}
	on:navigate={(e) => goto(e.detail.path)}
>
	<header>
		<h1 class="text-4xl">Site</h1>

		<nav class="mx-auto">
			<a href="/">Home</a>
		</nav>

		<div>
			{#if data.session}
				<span>{data.session.user.email}</span>
				<button on:click={() => supabaseClient.auth.signOut()}>Logout</button>
			{:else}
				<a href="/auth/signin">Signin</a>
			{/if}
		</div>
	</header>

	<main>
		<slot />
	</main>
</SupabaseProvider>

<style>
	header {
		max-width: 100ch;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
