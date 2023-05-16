<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type DivProps = HTMLAttributes<HTMLDivElement>;
	type $$Props = DivProps & {
		direction?: typeof direction;
		gap?: typeof gap;
	};

	export let direction: 'horizontal' | 'vertical' = 'horizontal';
	export let gap: 'small' | 'medium' | 'large' = 'small';
</script>

<div
	{...$$restProps}
	class:horizontal={direction === 'horizontal'}
	class:vertical={direction === 'vertical'}
	style:--gap={gap === 'small' ? '4px' : gap === 'medium' ? '8px' : gap === 'large' ? '16px' : null}
>
	<slot />
</div>

<style>
	div {
		display: flex;
		gap: 4px;
	}

	div.horizontal {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
	}
	div.vertical {
		flex-direction: column;
		margin: 8px 0;
	}
</style>
