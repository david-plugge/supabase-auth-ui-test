export { default as Auth } from './Auth';

export { default as ForgottenPassword } from './ui/ForgottenPassword';
export { default as MagicLink } from './ui/MagicLink';
export { default as UpdatePassword } from './ui/UpdatePassword';
export { default as VerifyOtp } from './ui/VerifyOtp';
export { default as Signin } from './ui/Signin';
export { default as Signup } from './ui/Signup';

export { SupabaseContextProvider } from './SupabaseProvider';

export {
	SupabaseTheme,
	SupabaseDarkTheme,
	MinimalTheme,
	MinimalDarkTheme,
	getAuthConfig,
	type AuthConfig,
} from '@supabase/auth-ui-shared';
