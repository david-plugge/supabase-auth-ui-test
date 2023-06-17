<script lang="ts">
	import Theme from '../Theme.svelte';

	import type { EmailOtpType, MobileOtpType, VerifyOtpParams } from '@supabase/supabase-js';
	import type { OtpType, RedirectTo } from '@supabase/auth-ui-shared';
	import { Button, Container, Input, Label, Message, AuthLink } from '../components/index.js';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';

	const {
		supabaseClient,
		i18n,
		config: { redirectTo: _redirectTo }
	} = getSupabaseContext();

	export let otpType: OtpType;
	export let redirectTo: RedirectTo = _redirectTo;

	let email = '';
	let phone = '';
	let token = '';

	let message = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		loading = true;
		error = '';
		message = '';

		let verifyOpts: VerifyOtpParams = {
			email,
			token,
			type: otpType as EmailOtpType
		};
		if (['sms', 'phone_change'].includes(otpType)) {
			verifyOpts = {
				phone,
				token,
				type: otpType as MobileOtpType,
				options: {
					redirectTo
				}
			};
		}
		const { error: err } = await supabaseClient.auth.verifyOtp(verifyOpts);
		if (err) error = err.message;
		loading = false;
	}
</script>

<Theme>
	<form id="auth-magic-link" method="post" on:submit|preventDefault={handleSubmit}>
		<Container direction="vertical" gap="large">
			{#if ['sms', 'phone_change'].includes(otpType)}
				<div>
					<Label for="phone">{i18n?.verify_otp?.phone_input_label}</Label>
					<Input
						id="phone"
						type="text"
						name="phone"
						autofocus
						placeholder={i18n?.verify_otp?.phone_input_placeholder}
						bind:value={phone}
						autocomplete="phone"
					/>
				</div>
			{:else}
				<div>
					<Label for="email">{i18n?.verify_otp?.email_input_label}</Label>
					<Input
						id="email"
						type="email"
						name="email"
						autofocus
						placeholder={i18n?.verify_otp?.email_input_placeholder}
						bind:value={email}
						autocomplete="email"
					/>
				</div>
			{/if}
			<div>
				<Label for="token">{i18n?.verify_otp?.token_input_label}</Label>
				<Input
					id="token"
					type="text"
					name="token"
					placeholder={i18n?.verify_otp?.token_input_placeholder}
					bind:value={token}
					autocomplete="token"
				/>
			</div>
			<Button type="submit" color="primary" {loading}>
				{i18n?.verify_otp?.button_label}
			</Button>

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
</Theme>

<style>
	form {
		width: 100%;
	}
</style>
