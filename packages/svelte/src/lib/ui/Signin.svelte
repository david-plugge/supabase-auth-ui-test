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
	import type { RedirectTo } from '@supabase/auth-ui-shared';

	const {
		supabaseClient,
		i18n,
		config: { email_enabled = true, magic_link_enabled = true, providers }
	} = getSupabaseContext();

	export let redirectTo: RedirectTo = undefined;

	const labels = i18n.sign_in;
	let email = '';
	let password = '';

	let loading = false;
	let message = '';
	let error = '';

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';

		const { error: signInError } = await supabaseClient.auth.signInWithPassword({
			email,
			password
		});
		if (signInError) error = signInError.message;
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
		<form method="post" on:submit|preventDefault={handleSubmit}>
			<Container direction="vertical" gap="large">
				<div>
					<Label for="email">{labels?.email_label}</Label>
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
				<div>
					<Label for="password">{labels?.password_label}</Label>
					<Input
						id="password"
						type="password"
						name="password"
						placeholder={labels?.password_input_placeholder}
						bind:value={password}
						autocomplete="current-password"
					/>
				</div>

				<Button type="submit" color="primary" {loading}>
					{loading ? labels?.loading_button_label : labels?.button_label}
				</Button>

				<Container direction="vertical" gap="small">
					{#if magic_link_enabled}
						<AuthLink view="magic_link" />
					{/if}
					<AuthLink view="forgotten_password" />

					<AuthLink view="sign_up" />
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
