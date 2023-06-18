<script lang="ts">
	import Theme from '../Theme.svelte';
	import { Button, Container, Input, Label, Message, AuthLink } from '../components/index.js';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';

	const {
		supabaseClient,
		i18n,
		config: { redirectTo: _redirectTo }
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
		const { error: resetPasswordError } = await supabaseClient.auth.resetPasswordForEmail(email, {
			redirectTo
		});
		if (resetPasswordError) error = resetPasswordError.message;
		else message = i18n.forgotten_password?.confirmation_text as string;
		loading = false;
	}
</script>

<Theme>
	<form id="auth-forgot-password" method="post" on:submit|preventDefault={handleSubmit}>
		<Container direction="vertical" gap="large">
			<div>
				<Label for="email">{i18n?.forgotten_password?.email_label}</Label>
				<Input
					id="email"
					type="email"
					name="email"
					autofocus
					placeholder={i18n?.forgotten_password?.email_input_placeholder}
					bind:value={email}
					autocomplete="email"
				/>
			</div>
			<Button type="submit" color="primary" {loading}>
				{i18n?.forgotten_password?.button_label}
			</Button>

			<Container direction="vertical" gap="small">
				<AuthLink view="sign_in" />
			</Container>

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
</Theme>

<style>
	form {
		width: 100%;
	}
</style>
