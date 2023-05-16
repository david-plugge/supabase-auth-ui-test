<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import {
		ViewType,
		type I18nVariables,
		type OtpType,
		type ThemeVariables
	} from '@supabase/auth-ui-shared';
	import Auth from '../Auth.svelte';

	export let supabaseClient: SupabaseClient;
	export let otpType: OtpType = 'email';
	export let theme: ThemeVariables;
	export let localization: { variables?: I18nVariables } = {};
</script>

<Auth
	view={ViewType.VerifyOtp}
	{supabaseClient}
	showLinks={false}
	magicLink={false}
	{otpType}
	{theme}
	{localization}
/>
