<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type $$Props = HTMLAnchorAttributes & {
		href: string;
	};

	export let href: string;
</script>

<a on:click {href} {...$$restProps}>
	<slot />
</a>

<style>
	a {
		font-family: var(--fonts-body-font-family);
		font-size: var(--font-sizes-base-body-size);
		margin-bottom: var(--space-anchor-bottom-margin);
		color: var(--colors-anchor-text-tolor);
		display: block;
		text-align: center;
		text-decoration: underline;
	}

	a:hover {
		color: var(--colors-anchor-text-hover-color);
	}
</style>
