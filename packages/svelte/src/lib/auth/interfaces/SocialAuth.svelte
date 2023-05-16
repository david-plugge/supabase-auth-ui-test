<script lang="ts">
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';
	import {
		type I18nVariables,
		type SocialLayout,
		type ProviderScopes,
		template
	} from '@supabase/auth-ui-shared';

	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Divider from '$lib/ui/Divider.svelte';
	import Icons from '../Icons.svelte';

	export let supabaseClient: SupabaseClient;
	export let socialLayout: keyof typeof SocialLayout;
	export let redirectTo: string | undefined = undefined;
	export let onlyThirdPartyProviders: boolean;
	export let i18n: I18nVariables;
	export let providers: Provider[] = [];
	export let providerScopes: Partial<ProviderScopes> | undefined;
	export let queryParams: { [key: string]: string } | undefined;

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
				queryParams
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
	<Container direction="vertical" gap="large">
		<Container
			direction={verticalSocialLayout ? 'vertical' : 'horizontal'}
			gap={verticalSocialLayout ? 'small' : 'medium'}
		>
			{#each providers as provider}
				<Button
					aria-label={iconTitle(provider)}
					on:click={() => handleProviderSignIn(provider)}
					type="submit"
					color="default"
					{loading}
				>
					<Icons {provider} />
					{#if verticalSocialLayout}
						{iconTitle(provider)}
					{/if}
				</Button>
			{/each}
		</Container>
	</Container>
	{#if !onlyThirdPartyProviders}
		<Divider />
	{/if}
{/if}
