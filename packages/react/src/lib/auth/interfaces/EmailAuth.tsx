import { SupabaseClient } from '@supabase/supabase-js';
import React, { useEffect, useRef, useState } from 'react';
import { I18nVariables, RedirectTo, ViewType, VIEWS } from '@supabase/auth-ui-shared';
import { Anchor, Button, Container, Input, Label, Message } from './../../ui';

export interface EmailAuthProps {
  authView?: typeof VIEWS.SIGN_IN | typeof VIEWS.SIGN_UP;
  defaultEmail?: string;
  defaultPassword?: string;
  setAuthView?: any;
  setDefaultEmail?: (email: string) => void;
  setDefaultPassword?: (password: string) => void;
  supabaseClient: SupabaseClient;
  showLinks?: boolean;
  redirectTo?: RedirectTo;
  additionalData?: { [key: string]: any };
  magicLink?: boolean;
  i18n?: I18nVariables;
  children?: React.ReactNode;
}

function EmailAuth({
  authView = VIEWS.SIGN_IN,
  defaultEmail = '',
  defaultPassword = '',
  setAuthView = () => {},
  setDefaultEmail = () => {},
  setDefaultPassword = () => {},
  supabaseClient,
  showLinks = false,
  redirectTo,
  additionalData,
  magicLink,
  i18n,
  children,
}: EmailAuthProps) {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    isMounted.current = true;
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
  }, [authView, defaultEmail, defaultPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    switch (authView) {
      case 'sign_in': {
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) setError(signInError.message);
        break;
      }
      case 'sign_up': {
        const options: { emailRedirectTo: RedirectTo; data?: object } = {
          emailRedirectTo: redirectTo,
        };
        if (additionalData) {
          options.data = additionalData;
        }
        const {
          data: { user: signUpUser, session: signUpSession },
          error: signUpError,
        } = await supabaseClient.auth.signUp({
          email,
          password,
          options,
        });
        if (signUpError) setError(signUpError.message);
        // Check if session is null -> email confirmation setting is turned on
        else if (signUpUser && !signUpSession)
          setMessage(i18n?.sign_up?.confirmation_text as string);
        break;
      }
    }

    /*
     * it is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    if (isMounted.current) setLoading(false);
  };

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

  const labels = i18n?.[authView];

  return (
    <form
      method="post"
      id={authView === VIEWS.SIGN_IN ? `auth-sign-in` : `auth-sign-up`}
      onSubmit={handleSubmit}
      autoComplete={'on'}
      style={{ width: '100%' }}
    >
      <Container direction="vertical" gap="large">
        <Container direction="vertical" gap="large">
          <div>
            <Label htmlFor="email">{labels?.email_label}</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={labels?.email_input_placeholder}
              defaultValue={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">{labels?.password_label}</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={labels?.password_input_placeholder}
              defaultValue={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              autoComplete={authView === VIEWS.SIGN_IN ? 'current-password' : 'new-password'}
            />
          </div>
          {children}
        </Container>

        <Button type="submit" color="primary" loading={loading}>
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Button>

        {showLinks && (
          <Container direction="vertical" gap="small">
            {authView === VIEWS.SIGN_IN && magicLink && (
              <Anchor
                href="#auth-magic-link"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setAuthView(VIEWS.MAGIC_LINK);
                }}
              >
                {i18n?.magic_link?.link_text}
              </Anchor>
            )}
            {authView === VIEWS.SIGN_IN && (
              <Anchor
                href="#auth-forgot-password"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setAuthView(VIEWS.FORGOTTEN_PASSWORD);
                }}
              >
                {i18n?.forgotten_password?.link_text}
              </Anchor>
            )}
            {authView === VIEWS.SIGN_IN ? (
              <Anchor
                href="#auth-sign-up"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleViewChange(VIEWS.SIGN_UP);
                }}
              >
                {i18n?.sign_up?.link_text}
              </Anchor>
            ) : (
              <Anchor
                href="#auth-sign-in"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleViewChange(VIEWS.SIGN_IN);
                }}
              >
                {i18n?.sign_in?.link_text}
              </Anchor>
            )}
          </Container>
        )}
      </Container>
      {message && <Message>{message}</Message>}
      {error && <Message color="danger">{error}</Message>}
    </form>
  );
}

export { EmailAuth };
