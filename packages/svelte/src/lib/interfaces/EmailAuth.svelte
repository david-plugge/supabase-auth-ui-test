<script lang="ts">
	import type { AuthViewType, RedirectTo } from '@supabase/auth-ui-shared';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';
	import { Button, Container, Input, Label, Message, AuthLink } from '../components/index.js';

	const {
		supabaseClient,
		i18n,
		config: { magic_link_enabled = true, additionalData, redirectTo: _redirectTo }
	} = getSupabaseContext();

	export let authView: AuthViewType;
	export let redirectTo: RedirectTo = _redirectTo;

	let email = '';
	let password = '';

	let loading = false;
	let message = '';
	let error = '';

	$: lngKey = authView === 'sign_in' ? ('sign_in' as const) : ('sign_up' as const);

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';

		switch (authView) {
			case 'sign_in':
				const { error: signInError } = await supabaseClient.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) error = signInError.message;
				loading = false;
				break;
			case 'sign_up':
				let options: { emailRedirectTo: RedirectTo; data?: object } = {
					emailRedirectTo: redirectTo
				};
				if (additionalData) {
					options.data = additionalData;
				}
				const {
					data: { user: signUpUser, session: signUpSession },
					error: signUpError
				} = await supabaseClient.auth.signUp({
					email,
					password,
					options
				});

				if (signUpError) error = signUpError.message;
				// Check if session is null -> email confirmation setting is turned on
				else if (signUpUser && !signUpSession) message = i18n.sign_up?.confirmation_text as string;
				break;
		}
		loading = false;
	}
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
	<Container direction="vertical" gap="large">
		<Container direction="vertical" gap="large">
			<div>
				<Label for="email">{i18n?.[lngKey]?.email_label}</Label>
				<Input
					id="email"
					type="email"
					name="email"
					autofocus
					placeholder={i18n?.[lngKey]?.email_input_placeholder}
					bind:value={email}
					autocomplete="email"
				/>
			</div>
			<div>
				<Label for="password">{i18n?.[lngKey]?.password_label}</Label>
				<Input
					id="password"
					type="password"
					name="password"
					placeholder={i18n?.[lngKey]?.password_input_placeholder}
					bind:value={password}
					autocomplete={true ? 'current-password' : 'new-password'}
				/>
			</div>

			<slot />
		</Container>

		<Button type="submit" color="primary" {loading}>{i18n?.[lngKey]?.button_label}</Button>

		<Container direction="vertical" gap="small">
			{#if authView === 'sign_in' && magic_link_enabled}
				<AuthLink view="magic_link" />
			{/if}
			{#if authView === 'sign_in'}
				<AuthLink view="forgotten_password" />
			{/if}

			<AuthLink view={authView === 'sign_in' ? 'sign_up' : 'sign_in'} />
		</Container>
	</Container>

	{#if message}
		<Message>{message}</Message>
	{/if}
	{#if error}
		<Message color="danger">{error}</Message>
	{/if}
</form>

<style>
	form {
		width: 100%;
	}
</style>
