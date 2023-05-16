<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';

	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Message from '$lib/ui/Message.svelte';
	import Anchor from '$lib/ui/Anchor.svelte';

	import { type I18nVariables, ViewType } from '@supabase/auth-ui-shared';

	export let i18n: I18nVariables;
	export let supabaseClient: SupabaseClient;
	export let authView: ViewType;
	export let redirectTo: string | undefined = undefined;
	export let email = '';
	export let showLinks = false;

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

<form id="auth-forgot-password" method="post" on:submit|preventDefault={handleSubmit}>
	<Container direction="vertical" gap="large">
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
		</Container>

		{#if showLinks}
			<Anchor
				on:click={(e) => {
					e.preventDefault();
					authView = ViewType.SignIn;
				}}
				href="#auth-sign-in">{i18n?.sign_in?.link_text}</Anchor
			>
		{/if}
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

<style>
	form {
		width: 100%;
	}
</style>
