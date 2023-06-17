<script lang="ts">
	import Anchor from './Anchor.svelte';
	import { getSupabaseContext } from '$lib/SupabaseProvider.svelte';

	export let view: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password';

	const { navigate, paths, i18n } = getSupabaseContext();
</script>

<Anchor
	on:click={(e) => {
		e.preventDefault();
		navigate(view);
	}}
	href={paths[view]}
>
	{i18n?.[view]?.link_text}
</Anchor>
