<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		color?: typeof color;
	};

	export let color: 'default' | 'danger' = 'default';
</script>

<span {...$$restProps} class:danger={color === 'danger'}>
	<slot />
</span>

<style>
	span {
		font-family: var(body-font-family);
		font-size: var(base-body-size);
		margin-bottom: var(label-bottom-margin);
		display: block;
		text-align: center;
		color: var(--colors-message-text);
	}
	span.danger {
		color: var(--colors-message-text-danger);
	}
</style>
