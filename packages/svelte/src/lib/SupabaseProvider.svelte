<script lang="ts" context="module">
	const key = Symbol();

	interface SupabaseContext {
		supabaseClient: SupabaseClient;
		appearence: Appearence;
		config: AuthConfig;
		paths: ViewPaths;
		i18n: I18nVariables;
		navigate: (type: AuthViewType) => void;
	}

	export function getSupabaseContext() {
		const context = getContext<SupabaseContext>(key);

		if (!context) {
			throw new Error('Supabase context missing, did you forget to set up the SupabaseProvider?');
		}

		return context;
	}

	type NavigateEventData = {
		type: AuthViewType;
		path: string;
	};
	export type NavigateEvent = CustomEvent<NavigateEventData>;
</script>

<script lang="ts">
	import {
		en,
		type AuthConfig,
		type I18nVariables,
		type AuthViewType,
		type Appearence,
		type ViewPaths
	} from '@supabase/auth-ui-shared';
	import { SupabaseTheme } from '@supabase/auth-ui-shared';

	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher, getContext, setContext } from 'svelte';
	import Theme from './Theme.svelte';

	export let supabaseClient: SupabaseClient;
	export let appearence: Partial<Appearence> = {};
	export let i18n: I18nVariables = en;
	export let paths: ViewPaths = {
		sign_in: '#sign_in',
		sign_up: '#sign_up',
		magic_link: '#magic_link',
		update_password: '#update-password',
		forgotten_password: '#forgotten-password',
		verify_otp: '#verify-otp'
	};
	export let config: AuthConfig = {
		disable_signup: false,
		phone_autoconfirm: false,
		mailer_autoconfirm: false,
		mfa_enabled: false,
		saml_enabled: false
	};

	const dispatch = createEventDispatcher<{
		navigate: NavigateEventData;
	}>();

	setContext<SupabaseContext>(key, {
		supabaseClient,
		appearence: {
			theme: SupabaseTheme,
			...appearence
		},
		config,
		paths,
		i18n,
		navigate(type) {
			dispatch('navigate', {
				type,
				path: paths[type]
			});
		}
	});
</script>

<Theme>
	<slot />
</Theme>
