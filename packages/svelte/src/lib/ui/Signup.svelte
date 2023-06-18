<script lang="ts">
	import { getSupabaseContext } from '../SupabaseProvider.svelte';
	import SocialAuth from '../interfaces/SocialAuth.svelte';
	import {
		Button,
		Container,
		Input,
		Label,
		Message,
		AuthLink,
		Divider,
		Card
	} from '../components/index.js';

	export let redirectTo: string | undefined = undefined;

	let email = '';
	let password = '';

	let loading = false;
	let message = '';
	let error = '';

	const {
		supabaseClient,
		i18n,
		config: {
			email_enabled = true,
			disable_signup = false,
			redirectTo: _redirectTo,
			providers,
			additionalData
		}
	} = getSupabaseContext();

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';

		const {
			data: { user: signUpUser, session: signUpSession },
			error: signUpError
		} = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				data: additionalData,
				emailRedirectTo: redirectTo ?? _redirectTo
			}
		});
		if (signUpError) error = signUpError.message;
		// Check if session is null -> email confirmation setting is turned on
		else if (signUpUser && !signUpSession) message = i18n.sign_up?.confirmation_text as string;
		loading = false;
	}
</script>

<Card>
	{#if disable_signup}
		<Message>Signup is disabled.</Message>
	{:else}
		{#if providers?.length}
			<SocialAuth {redirectTo} />

			{#if email_enabled}
				<Divider />
			{/if}
		{/if}

		{#if email_enabled}
			<form method="post" on:submit|preventDefault={handleSubmit}>
				<Container direction="vertical" gap="large">
					<div>
						<Label for="email">{i18n?.sign_up?.email_label}</Label>
						<Input
							id="email"
							type="email"
							name="email"
							autofocus
							placeholder={i18n?.sign_up?.email_input_placeholder}
							bind:value={email}
							autocomplete="email"
						/>
					</div>
					<div>
						<Label for="password">{i18n?.sign_up?.password_label}</Label>
						<Input
							id="password"
							type="password"
							name="password"
							placeholder={i18n?.sign_up?.password_input_placeholder}
							bind:value={password}
							autocomplete="new-password"
						/>
					</div>
					<Button type="submit" color="primary" {loading}>{i18n?.sign_up?.button_label}</Button>

					<Container direction="vertical">
						<AuthLink view="sign_in" />
					</Container>

					{#if message}
						<Message>{message}</Message>
					{/if}
					{#if error}
						<Message color="danger">{error}</Message>
					{/if}
				</Container>
			</form>
		{/if}
	{/if}
</Card>

<style>
	form {
		width: 100%;
	}
</style>
