import {
	Appearence,
	AuthConfig,
	AuthViewType,
	I18nVariables,
	SupabaseTheme,
	ViewPaths,
	en,
} from '@supabase/auth-ui-shared';
import { SupabaseClient } from '@supabase/supabase-js';
import React, { createContext, useContext } from 'react';

interface SupabaseContext {
	supabaseClient: SupabaseClient;
	appearence: Appearence;
	config: AuthConfig;
	paths: ViewPaths;
	i18n: I18nVariables;
	navigate: (type: AuthViewType) => void;
}

const SupabaseContext = createContext<SupabaseContext>({} as SupabaseContext);

export function useSupabaseContext() {
	return useContext(SupabaseContext);
}

export function SupabaseContextProvider({
	children,

	supabaseClient,
	appearence,
	config = {},
	i18n = en,
	paths = {
		sign_in: '#sign_in',
		sign_up: '#sign_up',
		magic_link: '#magic_link',
		update_password: '#update-password',
		forgotten_password: '#forgotten-password',
		verify_otp: '#verify-otp',
	},
	navigate,
}: React.PropsWithChildren<{
	supabaseClient: SupabaseClient;
	appearence?: Partial<Appearence>;
	i18n?: I18nVariables;
	paths?: ViewPaths;
	config?: AuthConfig;
	navigate?: (input: { path: string; type: AuthViewType }) => void;
}>) {
	return (
		<SupabaseContext.Provider
			children={children}
			value={{
				supabaseClient,
				appearence: {
					theme: SupabaseTheme,
					...appearence,
				},
				config,
				i18n,
				paths,
				navigate(type) {
					navigate?.({
						type,
						path: paths[type],
					});
				},
			}}
		></SupabaseContext.Provider>
	);
}
