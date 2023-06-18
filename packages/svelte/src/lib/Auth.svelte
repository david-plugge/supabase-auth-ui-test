<script lang="ts">
	import ForgottenPassword from './ui/ForgottenPassword.svelte';
	import MagicLink from './ui/MagicLink.svelte';
	import UpdatePassword from './ui/UpdatePassword.svelte';
	import VerifyOtp from './ui/VerifyOtp.svelte';
	import Signin from './ui/Signin.svelte';
	import Signup from './ui/Signup.svelte';
	import type { AuthViewType, OtpType } from '@supabase/auth-ui-shared';

	export let view: AuthViewType = 'sign_in';
	export let otpType: OtpType = 'email';
	export let redirectTo: string | undefined = undefined;
</script>

{#if view === 'sign_in'}
	<Signin {redirectTo} />
{:else if view === 'sign_up'}
	<Signup {redirectTo} />
{:else if view === 'magic_link'}
	<MagicLink {redirectTo} />
{:else if view === 'forgotten_password'}
	<ForgottenPassword {redirectTo} />
{:else if view === 'update_password'}
	<UpdatePassword />
{:else if view === 'verify_otp'}
	<VerifyOtp {otpType} />
{/if}
