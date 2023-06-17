<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = HTMLButtonAttributes & {
		loading?: boolean;
		color?: typeof color;
	};

	export let color: 'default' | 'primary' = 'default';
	export let loading = false;
</script>

<button
	on:click
	{...$$restProps}
	disabled={loading}
	class:default={color === 'default'}
	class:primary={color === 'primary'}
>
	<slot />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border-radius: var(--radii-border-radius-button);
		font-size: var(--font_sizes-base-button-size);
		padding: var(--space-button-padding);
		cursor: pointer;
		border-width: var(--border-widths-button-border-width);
		border-style: solid;
		width: 100%;
		transition-property: background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
	}

	button.default {
		background-color: var(--colors-default-button-background);
		color: var(--colors-default-button-text);
		border-color: var(--colors-default-button-border);
	}
	button.default:hover {
		background-color: var(--colors-default-button-background-hover);
	}

	button.primary {
		background-color: var(--colors-brand);
		color: var(--colors-brand-button-text);
		border-color: var(--colors-brand-accent);
	}
	button.primary:hover {
		background-color: var(--colors-brand-accent);
	}
</style>
