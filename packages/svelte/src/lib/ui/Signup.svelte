<script lang="ts">
	import { getSupabaseContext } from '../SupabaseProvider.svelte';
	import Theme from '../Theme.svelte';
	import Message from '../components/Message.svelte';
	import EmailAuth from '../interfaces/EmailAuth.svelte';
	import SocialAuth from '../interfaces/SocialAuth.svelte';

	export let redirectTo: string | undefined = undefined;

	const {
		config: { email_enabled = true, providers, disable_signup }
	} = getSupabaseContext();
</script>

<Theme>
	{#if disable_signup}
		<Message>Signup is disabled.</Message>
	{:else}
		{#if providers?.length}
			<SocialAuth {redirectTo} />
		{/if}

		{#if email_enabled}
			<EmailAuth authView="sign_up" {redirectTo} />
		{/if}
	{/if}
</Theme>
