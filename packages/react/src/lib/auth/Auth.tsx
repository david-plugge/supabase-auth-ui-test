import {
  I18nVariables,
  merge,
  en,
  RedirectTo,
  ProviderScopes,
  OtpType,
  generateCssVariablesFromTheme,
  ThemeVariables,
  ThemeSupa,
  SocialLayoutType,
  SOCIAL_LAYOUTS,
  VIEWS,
  ViewType,
} from '@supabase/auth-ui-shared';
import React, { useEffect, useState } from 'react';
import {
  EmailAuth,
  EmailAuthProps,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
  VerifyOtp,
} from './interfaces';
import { UserContextProvider, useUser } from './UserContext';
import { Provider, SupabaseClient } from '@supabase/supabase-js';

export interface AuthProps {
  supabaseClient: SupabaseClient;
  socialLayout?: SocialLayoutType;
  providers?: Provider[];
  providerScopes?: Partial<ProviderScopes>;
  queryParams?: { [key: string]: string };
  view?: ViewType;
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  magicLink?: boolean;
  showLinks?: boolean;
  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean;
  /**
   * Override the labels and button text
   */
  localization?: {
    variables?: I18nVariables;
  };
  theme?: ThemeVariables;
  otpType?: OtpType;
  additionalData?: { [key: string]: any };
  children?: React.ReactNode;
}

const Auth: React.FC<AuthProps> & {
  ForgottenPassword: typeof ForgottenPassword;
  UpdatePassword: typeof UpdatePassword;
  MagicLink: typeof MagicLink;
  UserContextProvider: typeof UserContextProvider;
  useUser: typeof useUser;
} = ({
  supabaseClient,
  socialLayout = SOCIAL_LAYOUTS.VERTICAL,
  providers,
  providerScopes,
  queryParams,
  view = VIEWS.SIGN_IN,
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
  showLinks = true,
  theme = ThemeSupa.default,
  localization = { variables: {} },
  otpType = 'email',
  additionalData,
  children,
}) => {
  /**
   * Localization support
   */

  const i18n: I18nVariables = merge(en, localization.variables ?? {});

  const [authView, setAuthView] = useState(view);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');

  /**
   * Simple boolean to detect if authView 'sign_in' or 'sign_up' or 'magic_link' is used
   *
   * @returns boolean
   */
  const SignView = authView === 'sign_in' || authView === 'sign_up' || authView === 'magic_link';

  /**
   * Wraps around all auth components
   * renders the social auth providers if SignView is true
   *
   * also handles the theme override
   *
   * @param children
   * @returns React.ReactNode
   */

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div>
      {SignView && (
        <SocialAuth
          supabaseClient={supabaseClient}
          providers={providers}
          providerScopes={providerScopes}
          queryParams={queryParams}
          socialLayout={socialLayout}
          redirectTo={redirectTo}
          onlyThirdPartyProviders={onlyThirdPartyProviders}
          i18n={i18n}
          view={authView}
        />
      )}
      {!onlyThirdPartyProviders && children}
    </div>
  );

  useEffect(() => {
    /**
     * Overrides the authview if it is changed externally
     */
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthView(VIEWS.UPDATE_PASSWORD);
      } else if (event === 'USER_UPDATED') {
        setAuthView(VIEWS.SIGN_IN);
      }
    });
    setAuthView(view);

    return () => authListener.subscription.unsubscribe();
  }, [view, supabaseClient.auth]);

  const emailProp: Omit<EmailAuthProps, 'authView' | 'id'> = {
    supabaseClient,
    setAuthView,
    defaultEmail,
    defaultPassword,
    setDefaultEmail,
    setDefaultPassword,
    redirectTo,
    magicLink,
    showLinks,
    i18n,
  };

  const style = generateCssVariablesFromTheme(theme).toObject();

  return <div style={style}>{viewHandler()}</div>;

  function viewHandler() {
    /**
     * View handler, displays the correct Auth view
     * all views are wrapped in <Container/>
     */
    switch (authView) {
      case VIEWS.SIGN_IN:
        return (
          <Container>
            <EmailAuth {...emailProp} authView={VIEWS.SIGN_IN} />
          </Container>
        );
      case VIEWS.SIGN_UP:
        return (
          <Container>
            <EmailAuth
              supabaseClient={supabaseClient}
              authView={VIEWS.SIGN_UP}
              setAuthView={setAuthView}
              defaultEmail={defaultEmail}
              defaultPassword={defaultPassword}
              setDefaultEmail={setDefaultEmail}
              setDefaultPassword={setDefaultPassword}
              redirectTo={redirectTo}
              magicLink={magicLink}
              showLinks={showLinks}
              i18n={i18n}
              additionalData={additionalData}
              children={children}
            />
          </Container>
        );
      case VIEWS.FORGOTTEN_PASSWORD:
        return (
          <ForgottenPassword
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
            i18n={i18n}
          />
        );

      case VIEWS.MAGIC_LINK:
        return (
          <Container>
            <MagicLink
              supabaseClient={supabaseClient}
              setAuthView={setAuthView}
              redirectTo={redirectTo}
              showLinks={showLinks}
              i18n={i18n}
            />
          </Container>
        );

      case VIEWS.UPDATE_PASSWORD:
        return <UpdatePassword supabaseClient={supabaseClient} i18n={i18n} />;
      case VIEWS.VERIFY_OTP:
        return <VerifyOtp supabaseClient={supabaseClient} otpType={otpType} i18n={i18n} />;
      default:
        return null;
    }
  }
};

Auth.ForgottenPassword = ForgottenPassword;
Auth.UpdatePassword = UpdatePassword;
Auth.MagicLink = MagicLink;
Auth.UserContextProvider = UserContextProvider;
Auth.useUser = useUser;

export default Auth;
