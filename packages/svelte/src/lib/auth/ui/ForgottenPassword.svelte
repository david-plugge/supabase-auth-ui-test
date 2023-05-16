<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { ViewType, type I18nVariables, type ThemeVariables } from '@supabase/auth-ui-shared';
	import Auth from '../Auth.svelte';

	export let supabaseClient: SupabaseClient;
	export let redirectTo: string | undefined = undefined;
	export let showLinks = false;
	export let theme: ThemeVariables;
	export let localization: { variables?: I18nVariables } = {};
</script>

<Auth
	view={ViewType.ForgottenPassword}
	{showLinks}
	{supabaseClient}
	{redirectTo}
	{theme}
	{localization}
/>
