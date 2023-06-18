<script lang="ts">
	import {
		Button,
		Container,
		Divider,
		Input,
		Label,
		Message,
		AuthLink,
		Card
	} from '$lib/components/index.js';
	import type { RedirectTo } from '@supabase/auth-ui-shared';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';
	import SocialAuth from '../interfaces/SocialAuth.svelte';

	const {
		supabaseClient,
		i18n,
		config: { email_enabled = true, providers, redirectTo: _redirectTo }
	} = getSupabaseContext();

	export let redirectTo: RedirectTo = _redirectTo;

	const labels = i18n.magic_link;
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
		else message = labels?.confirmation_text as string;
		loading = false;
	}
</script>

<Card>
	{#if providers?.length}
		<SocialAuth {redirectTo} />

		{#if email_enabled}
			<Divider />
		{/if}
	{/if}

	{#if email_enabled}
		<form id="auth-magic-link" method="post" on:submit|preventDefault={handleSubmit}>
			<Container direction="vertical" gap="large">
				<div>
					<Label for="email">{labels?.email_input_label}</Label>
					<Input
						id="email"
						type="email"
						name="email"
						autofocus
						placeholder={labels?.email_input_placeholder}
						bind:value={email}
						autocomplete="email"
					/>
				</div>

				<Button type="submit" color="primary" {loading}>
					{loading ? labels?.loading_button_label : labels?.button_label}
				</Button>

				<Container direction="vertical" gap="small">
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
</Card>

<style>
	form {
		width: 100%;
	}
</style>
