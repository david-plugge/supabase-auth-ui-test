<script lang="ts">
	import { getSupabaseContext } from '../SupabaseProvider.svelte';
	import Theme from '../Theme.svelte';
	import EmailAuth from '../interfaces/EmailAuth.svelte';
	import SocialAuth from '../interfaces/SocialAuth.svelte';

	export let redirectTo: string | undefined = undefined;

	const {
		config: { email_enabled = true, providers },
		paths
	} = getSupabaseContext();

	console.log(paths);
</script>

<Theme>
	{#if providers?.length}
		<SocialAuth {redirectTo} />
	{/if}

	{#if email_enabled}
		<EmailAuth authView="sign_in" {redirectTo} />
	{/if}
</Theme>
