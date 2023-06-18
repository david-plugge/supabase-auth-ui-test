<script lang="ts">
	import type { RedirectTo } from '@supabase/auth-ui-shared';
	import { Button, Container, Input, Label, Message, AuthLink, Card } from '../components/index.js';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';

	const {
		supabaseClient,
		i18n,
		config: { redirectTo: _redirectTo }
	} = getSupabaseContext();

	export let redirectTo: RedirectTo = _redirectTo;

	let password = '';
	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';
		const { data, error: resetPasswordError } = await supabaseClient.auth.updateUser(
			{
				password
			},
			{
				emailRedirectTo: redirectTo
			}
		);
		if (resetPasswordError) error = resetPasswordError.message;
		else message = i18n.update_password?.confirmation_text as string;
		loading = false;
	}
</script>

<Card>
	<form id="auth-update-password" method="post" on:submit|preventDefault={handleSubmit}>
		<Container direction="vertical" gap="large">
			<div>
				<Label for="password">
					{i18n?.update_password?.password_label}
				</Label>
				<Input
					id="password"
					type="password"
					name="password"
					autofocus
					placeholder={i18n?.update_password?.password_label}
					bind:value={password}
					autocomplete="password"
				/>
			</div>

			<Button type="submit" color="primary" {loading}>
				{i18n?.update_password?.button_label}
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
</Card>

<style>
	form {
		width: 100%;
	}
</style>
