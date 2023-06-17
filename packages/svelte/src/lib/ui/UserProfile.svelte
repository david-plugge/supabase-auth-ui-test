<script lang="ts">
	import { onMount } from 'svelte';
	import { getSupabaseContext } from '../SupabaseProvider.svelte';
	import type { User } from '@supabase/supabase-js';
	import Container from '../components/Container.svelte';
	import Button from '../components/Button.svelte';
	import Theme from '../Theme.svelte';
	import { fly } from 'svelte/transition';

	const { supabaseClient } = getSupabaseContext();

	let user: User | null;
	let open = false;

	async function loadUser() {
		const { data } = await supabaseClient.auth.getUser();

		user = data.user;
	}

	function signout() {
		supabaseClient.auth.signOut();
	}

	onMount(() => {
		loadUser();
	});
</script>

<Theme>
	<div class="wrapper">
		<button on:click={() => (open = !open)}>
			<img
				width="36"
				height="36"
				src={user?.user_metadata.avatar_url ?? user?.user_metadata.picture}
				alt="Profile"
			/>
		</button>

		{#if open}
			<div transition:fly={{ duration: 200, y: 10 }} class="userprofile">
				{#if user}
					<Container direction="vertical">
						<Container gap="large">
							<img
								width="48"
								height="48"
								src={user.user_metadata.avatar_url ?? user.user_metadata.picture}
								alt="Profile"
							/>
							<Container direction="vertical" gap="none">
								<span class="user_name"
									>{user.user_metadata.full_name ??
										user.user_metadata.name ??
										user.user_metadata.preferred_username ??
										user.user_metadata.username}</span
								>
								<span class="user_login">{user.email}</span>
							</Container>
						</Container>

						<Button on:click={signout}>Sign out</Button>
					</Container>
				{:else}
					<p>Log in to see your profile</p>
				{/if}
			</div>
		{/if}
	</div>
</Theme>

<style>
	.wrapper {
		position: relative;
		width: max-content;
	}

	.userprofile {
		border: 1px solid #eee;
		background-color: #fff;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
		padding: 1rem;
		border-radius: 1rem;
		position: absolute;
		top: 100%;
		margin-top: 0.5rem;
		right: 0;
		display: flex;
		width: max-content;
	}

	img {
		border-radius: 100%;
		height: fit-content;
	}

	.user_name {
		font-weight: 600;
	}
	.user_login {
		font-size: 0.85rem;
		color: #777;
	}
</style>
