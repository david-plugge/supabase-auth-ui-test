import { VIEWS } from '@supabase/auth-ui-shared';
import Auth, { AuthProps } from '../Auth';

export const SignUp = (props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders'>) => {
  return <Auth showLinks={false} {...props} onlyThirdPartyProviders={false} view={VIEWS.SIGN_UP} />;
};

export const SignIn = (
  props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders' | 'additionalData'>
) => {
  return <Auth showLinks={false} {...props} onlyThirdPartyProviders={false} view={VIEWS.SIGN_IN} />;
};

export const MagicLink = (
  props: Omit<
    AuthProps,
    'view' | 'onlyThirdPartyProviders' | 'magicLink' | 'showLinks' | 'additionalData'
  >
) => {
  return <Auth {...props} view={VIEWS.MAGIC_LINK} showLinks={false} />;
};

export const SocialAuth = (
  props: Omit<
    AuthProps,
    'view' | 'onlyThirdPartyProviders' | 'magicLink' | 'showLinks' | 'additionalData'
  >
) => {
  return <Auth {...props} view={VIEWS.SIGN_IN} showLinks={false} onlyThirdPartyProviders={true} />;
};

export const ForgottenPassword = (
  props: Pick<AuthProps, 'supabaseClient' | 'localization' | 'theme' | 'showLinks' | 'redirectTo'>
) => {
  return <Auth showLinks={false} {...props} view={VIEWS.FORGOTTEN_PASSWORD} />;
};

export const UpdatePassword = (
  props: Pick<AuthProps, 'supabaseClient' | 'localization' | 'theme'>
) => {
  return <Auth {...props} view={VIEWS.UPDATE_PASSWORD} />;
};

export const VerifyOtp = (
  props: Pick<AuthProps, 'supabaseClient' | 'localization' | 'theme' | 'otpType'>
) => {
  return <Auth {...props} view={VIEWS.VERIFY_OTP} />;
};
