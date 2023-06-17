<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	type $$Props = HTMLLabelAttributes;
</script>

<label {...$$restProps}>
	<slot />
</label>

<style>
	label {
		font-family: var(--fonts-label-font-family);
		font-size: var(--font-sizes-base-label-size);
		margin-bottom: var(--space-label-bottom-margin);
		color: var(--colors-input-label-text);
		display: block;
	}
</style>
