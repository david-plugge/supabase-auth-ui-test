<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;
</script>

<div {...$$restProps} />

<style>
	div {
		background: var(--colors-divider-background);
		display: block;
		margin: 16px 0;
		height: 1px;
		width: 100%;
	}
</style>
