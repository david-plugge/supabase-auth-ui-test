<script lang="ts">
	import type { Provider } from '@supabase/supabase-js';
	import { template } from '@supabase/auth-ui-shared';

	import { Button, Container } from '../components/index.js';
	import ProviderIcon from '../ProviderIcon.svelte';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';

	const {
		supabaseClient,
		i18n,
		config: { providers = [], providerScopes, providerQueryParams, redirectTo: _redirectTo },
		appearence: { socialLayout }
	} = getSupabaseContext();

	export let redirectTo: string | undefined = _redirectTo;

	let error = '';
	let loading = false;

	$: verticalSocialLayout = socialLayout === 'vertical' ? true : false;

	async function handleProviderSignIn(provider: Provider) {
		loading = true;
		error = '';
		const { error: providerSigninError } = await supabaseClient.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo,
				scopes: providerScopes?.[provider],
				queryParams: providerQueryParams
			}
		});
		if (providerSigninError) error = providerSigninError.message;
		loading = false;
	}

	function capitalize(word: string) {
		return word[0].toUpperCase() + word.slice(1).toLowerCase();
	}

	let iconTitle = (provider: string) =>
		template(i18n['sign_in']?.social_provider_text as string, {
			provider: capitalize(provider)
		});
</script>

{#if providers.length}
	<Container
		direction={verticalSocialLayout ? 'vertical' : 'horizontal'}
		gap={verticalSocialLayout ? 'small' : 'medium'}
	>
		{#each [...new Set(providers)] as provider}
			<Button
				aria-label={iconTitle(provider)}
				on:click={() => handleProviderSignIn(provider)}
				type="submit"
				color="default"
				{loading}
			>
				<ProviderIcon {provider} />
				{#if verticalSocialLayout}
					{iconTitle(provider)}
				{/if}
			</Button>
		{/each}
	</Container>
{/if}
