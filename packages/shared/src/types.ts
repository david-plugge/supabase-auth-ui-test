import type { EmailOtpType, MobileOtpType, Provider } from '@supabase/supabase-js';
import type { ThemeVariables } from './theming';

export type SocialLayout = 'horizontal' | 'vertical';
export type AuthViewType =
	| 'sign_in'
	| 'sign_up'
	| 'magic_link'
	| 'forgotten_password'
	| 'update_password'
	| 'verify_otp';

export type RedirectTo = undefined | string;
export type OtpType = EmailOtpType | MobileOtpType;

export type ProviderScopes = {
	[Key in Provider]?: string;
};

export interface AuthConfig {
	providers?: Provider[];
	providerScopes?: ProviderScopes;
	providerQueryParams?: Record<string, string>;

	disable_signup?: boolean;
	mailer_autoconfirm?: boolean;
	phone_autoconfirm?: boolean;
	mfa_enabled?: boolean;
	saml_enabled?: boolean;
	email_enabled?: boolean;
	magic_link_enabled?: boolean;

	additionalData?: Record<string, string>;
	redirectTo?: RedirectTo;
}

export type ViewPaths = Record<AuthViewType, string>;

export interface Appearence {
	theme: ThemeVariables;
	socialLayout?: SocialLayout;
}
