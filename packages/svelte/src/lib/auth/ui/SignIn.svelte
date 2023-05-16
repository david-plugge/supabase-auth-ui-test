<script lang="ts">
	import type { Provider, SupabaseClient } from '@supabase/supabase-js';
	import {
		ViewType,
		type I18nVariables,
		type ProviderScopes,
		SocialLayout,
		type ThemeVariables
	} from '@supabase/auth-ui-shared';
	import Auth from '../Auth.svelte';

	export let supabaseClient: SupabaseClient;
	export let socialLayout: SocialLayout = SocialLayout.vertical;
	export let providers: Provider[] = [];
	export let providerScopes: Partial<ProviderScopes> | undefined = undefined;
	export let queryParams: { [key: string]: string } | undefined = undefined;
	export let redirectTo: string | undefined = undefined;
	export let magicLink = false;
	export let showLinks = false;
	export let theme: ThemeVariables;
	export let localization: { variables?: I18nVariables } = {};
</script>

<Auth
	view={ViewType.SignIn}
	onlyThirdPartyProviders={false}
	{supabaseClient}
	{showLinks}
	{redirectTo}
	{socialLayout}
	{providers}
	{providerScopes}
	{queryParams}
	{magicLink}
	{theme}
	{localization}
/>
