<script lang="ts">
	import { generateCssVariablesFromTheme } from '@supabase/auth-ui-shared';
	import { getSupabaseContext } from './SupabaseProvider.svelte';

	const {
		appearence: { theme }
	} = getSupabaseContext();
</script>

<div style={generateCssVariablesFromTheme(theme).toInlineStyleString()}>
	<slot />
</div>

<style>
	div {
		display: contents;
	}
</style>
