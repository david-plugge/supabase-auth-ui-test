export { default as SupabaseProvider } from './SupabaseProvider.svelte';
export { default as Auth } from './Auth.svelte';
export { default as Signin } from './ui/Signin.svelte';
export { default as Signup } from './ui/Signup.svelte';
export { default as MagicLink } from './ui/MagicLink.svelte';
export { default as ForgottenPassword } from './ui/ForgottenPassword.svelte';
export { default as UpdatePassword } from './ui/UpdatePassword.svelte';
export { default as VerifyOtp } from './ui/VerifyOtp.svelte';

export {
    SupabaseTheme,
    SupabaseDarkTheme,
    MinimalTheme,
    MinimalDarkTheme,
    getAuthConfig    
} from '@supabase/auth-ui-shared'