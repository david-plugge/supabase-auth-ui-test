<script lang="ts">
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';
	import {
		type I18nVariables,
		merge,
		en,
		type SocialLayout,
		ViewType,
		type ProviderScopes,
		type OtpType,
		generateCssVariablesFromTheme,
		type ThemeVariables,
		ThemeSupa
	} from '@supabase/auth-ui-shared';
	import EmailAuth from './interfaces/EmailAuth.svelte';
	import ForgottenPassword from './interfaces/ForgottenPassword.svelte';
	import MagicLink from './interfaces/MagicLink.svelte';
	import SocialAuth from './interfaces/SocialAuth.svelte';
	import UpdatePassword from './interfaces/UpdatePassword.svelte';
	import VerifyOtp from './interfaces/VerifyOtp.svelte';
	import { onMount } from 'svelte';

	export let supabaseClient: SupabaseClient;
	export let socialLayout: keyof typeof SocialLayout = 'vertical';
	export let providers: Provider[] = [];
	export let providerScopes: Partial<ProviderScopes> | undefined = undefined;
	export let queryParams: { [key: string]: string } | undefined = undefined;
	export let view: ViewType = ViewType.SignIn;
	export let redirectTo: string | undefined = undefined;
	export let onlyThirdPartyProviders = false;
	export let magicLink = false;
	export let showLinks = true;
	export let theme: ThemeVariables = ThemeSupa.default;
	export let localization: { variables?: I18nVariables } = {};
	export let otpType: OtpType = 'email';
	export let additionalData: { [key: string]: any } | undefined = undefined;

	onMount(() => {
		const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
			if (event === 'PASSWORD_RECOVERY') {
				view = ViewType.UpdatePassword;
			} else if (event === 'USER_UPDATED') {
				view = ViewType.SignIn;
			}
		});

		() => authListener.subscription.unsubscribe();
	});

	$: i18n = merge(en, localization.variables ?? {});

	/**
	 * Simple boolean to detect if view 'sign_in' or 'sign_up' or 'magic_link' is used
	 *
	 * @returns boolean
	 */
	$: SignView = view === 'sign_in' || view === 'sign_up' || view === 'magic_link';
</script>

<div style={generateCssVariablesFromTheme(theme).toInlineStyleString()}>
	{#if SignView}
		<SocialAuth
			{supabaseClient}
			{providers}
			{providerScopes}
			{queryParams}
			{socialLayout}
			{redirectTo}
			{onlyThirdPartyProviders}
			{i18n}
		/>
	{/if}
	{#if view === ViewType.SignIn}
		{#if !onlyThirdPartyProviders}
			<EmailAuth
				{supabaseClient}
				bind:authView={view}
				{redirectTo}
				{magicLink}
				{showLinks}
				{i18n}
				{additionalData}
			/>
		{/if}
	{/if}
	{#if view === ViewType.SignUp}
		{#if !onlyThirdPartyProviders}
			<EmailAuth
				{supabaseClient}
				bind:authView={view}
				{redirectTo}
				{magicLink}
				{showLinks}
				{additionalData}
				{i18n}
			>
				<slot />
			</EmailAuth>
		{/if}
	{/if}
	{#if view === ViewType.ForgottenPassword}
		<ForgottenPassword {i18n} {supabaseClient} bind:authView={view} {showLinks} />
	{/if}
	{#if view === ViewType.MagicLink}
		<MagicLink {i18n} {supabaseClient} bind:authView={view} {redirectTo} {showLinks} />
	{/if}
	{#if view === ViewType.UpdatePassword}
		<UpdatePassword {i18n} {supabaseClient} bind:authView={view} {showLinks} />
	{/if}
	{#if view === ViewType.VerifyOtp}
		<VerifyOtp {i18n} {supabaseClient} bind:authView={view} {showLinks} {otpType} />
	{/if}
</div>
