<script lang="ts">
	import { Button, Container, Input, Label, Message, AuthLink } from '$lib/components/index.js';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';
	import Theme from '../Theme.svelte';
	import SocialAuth from '../interfaces/SocialAuth.svelte';

	const {
		supabaseClient,
		i18n,
		config: { email_enabled = true, providers, redirectTo: _redirectTo }
	} = getSupabaseContext();

	export let redirectTo: string | undefined = _redirectTo;

	let email = '';
	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';
		const { error: resetPasswordError } = await supabaseClient.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: redirectTo
			}
		});
		if (resetPasswordError) error = resetPasswordError.message;
		else message = i18n.magic_link?.confirmation_text as string;
		loading = false;
	}
</script>

<Theme>
	{#if providers?.length}
		<SocialAuth {redirectTo} />
	{/if}

	{#if email_enabled}
		<form id="auth-magic-link" method="post" on:submit|preventDefault={handleSubmit}>
			<Container direction="vertical" gap="large">
				<Container direction="vertical" gap="large">
					<div>
						<Label for="email">{i18n?.magic_link?.email_input_label}</Label>
						<Input
							id="email"
							type="email"
							name="email"
							autofocus
							placeholder={i18n?.magic_link?.email_input_placeholder}
							bind:value={email}
							autocomplete="email"
						/>
					</div>
					<Button type="submit" color="primary" {loading}>
						{i18n?.magic_link?.button_label}
					</Button>
				</Container>

				<AuthLink view="sign_in" />

				{#if message}
					<Message>
						{message}
					</Message>
				{/if}
				{#if error}
					<Message color="danger">
						{error}
					</Message>
				{/if}
			</Container>
		</form>
	{/if}
</Theme>

<style>
	form {
		width: 100%;
	}
</style>
