<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type $$Props = HTMLInputAttributes;

	export let value: HTMLInputAttributes['value'] = undefined;
</script>

<input bind:value {...$$restProps} />

<style>
	input {
		font-family: var(--fonts-input-font-family);
		background: var(--colors-input-background);
		border-radius: var(--radii-input-border-radius);
		padding: var(--space-input-padding);
		cursor: text;
		border-width: var(--border-widths-input-border-width);
		border-color: var(--colors-input-border);
		border-style: solid;
		font-size: var(--font-sizes-base-input-size);
		width: 100%;
		color: var(--colors-input-text);
		box-sizing: border-box;
		transition-property: background-color, border;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
	}

	input:hover {
		border-color: var(--colors-input-border-hover);
		outline: none;
	}
	input:focus {
		border-color: var(--colors-input-border-focus);
		outline: none;
	}
	input::placeholder {
		color: var(--colors-input-placeholder);
		letter-spacing: initial;
	}
	input[type='password'] {
		letter-spacing: 6px;
	}
</style>
