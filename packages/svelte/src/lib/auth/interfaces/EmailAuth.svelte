<script lang="ts">
	import { ViewType, type I18nVariables, type RedirectTo } from '@supabase/auth-ui-shared';

	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Label from '$lib/ui/Label.svelte';
	import Message from '$lib/ui/Message.svelte';
	import Anchor from '$lib/ui/Anchor.svelte';

	import type { SupabaseClient } from '@supabase/supabase-js';

	export let authView: ViewType = ViewType.SignIn;
	export let email = '';
	export let password = '';
	export let showLinks = false;
	export let magicLink = true;
	export let i18n: I18nVariables;

	export let supabaseClient: SupabaseClient;
	export let redirectTo: RedirectTo = undefined;
	export let additionalData: { [key: string]: any } | undefined = undefined;

	let loading = false;
	let message = '';
	let error = '';

	let lngKey: 'sign_in' | 'sign_up';
	$: lngKey = authView === 'sign_in' ? 'sign_in' : 'sign_up';

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';

		switch (authView) {
			case ViewType.SignIn:
				const { error: signInError } = await supabaseClient.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) error = signInError.message;
				loading = false;
				break;
			case ViewType.SignUp:
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

		{#if showLinks}
			<Container direction="vertical" gap="small">
				{#if authView === ViewType.SignIn && magicLink}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = ViewType.MagicLink;
						}}
						href="#auth-magic-link"
					>
						{i18n?.magic_link?.link_text}
					</Anchor>
				{/if}
				{#if authView === ViewType.SignIn}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = ViewType.ForgottenPassword;
						}}
						href="#auth-forgot-password"
					>
						{i18n?.forgotten_password?.link_text}
					</Anchor>
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = ViewType.SignUp;
						}}
						href="#auth-sign-up"
					>
						{i18n?.sign_up?.link_text}
					</Anchor>
				{:else}
					<Anchor
						on:click={(e) => {
							e.preventDefault();
							authView = ViewType.SignIn;
						}}
						href="#auth-sign-in"
					>
						{i18n?.sign_in?.link_text}
					</Anchor>
				{/if}
			</Container>
		{/if}
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
