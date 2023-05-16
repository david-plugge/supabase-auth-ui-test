<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';

	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Message from '$lib/ui/Message.svelte';
	import Anchor from '$lib/ui/Anchor.svelte';

	import { ViewType, type I18nVariables } from '@supabase/auth-ui-shared';

	export let i18n: I18nVariables;
	export let supabaseClient: SupabaseClient;
	export let authView: ViewType;
	export let showLinks = false;

	let password = '';
	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';
		const { data, error: resetPasswordError } = await supabaseClient.auth.updateUser({
			password
		});
		if (resetPasswordError) error = resetPasswordError.message;
		else message = i18n.update_password?.confirmation_text as string;
		loading = false;
	}
</script>

<form id="auth-update-password" method="post" on:submit|preventDefault={handleSubmit}>
	<Container direction="vertical" gap="large">
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
