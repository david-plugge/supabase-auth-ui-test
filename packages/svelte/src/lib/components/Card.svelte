<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type DivProps = HTMLAttributes<HTMLDivElement>;
	type $$Props = DivProps;
</script>

<div {...$$restProps}>
	<slot />
</div>

<style>
	div {
		padding: 3em 2em;
		margin: 1em auto;
		max-width: 50ch;
		border-radius: 1em;
		background-color: inherit;
		box-shadow: 0px 25px 100px -50px var(--colors-brand);
		border: 1px solid var(--colors-divider-background);
	}
</style>
