import { SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { I18nVariables, RedirectTo, VIEWS } from '@supabase/auth-ui-shared';
import { Anchor, Button, Container, Input, Label, Message } from './../../ui';

function MagicLink({
  setAuthView = () => {},
  supabaseClient,
  redirectTo,
  i18n,
  showLinks = false,
}: {
  setAuthView?: any;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  i18n?: I18nVariables;
  showLinks?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) setError(error.message);
    else setMessage(i18n?.magic_link?.confirmation_text as string);
    setLoading(false);
  };

  const labels = i18n?.magic_link;

  return (
    <form method="post" id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <Container gap="large" direction="vertical">
        <div>
          <Label htmlFor="email">{labels?.email_input_label}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoFocus
            placeholder={labels?.email_input_placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <Button color="primary" type="submit" loading={loading}>
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Button>
        {showLinks && (
          <Anchor
            href="#auth-sign-in"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setAuthView(VIEWS.SIGN_IN);
            }}
          >
            {i18n?.sign_in?.link_text}
          </Anchor>
        )}
        {message && <Message>{message}</Message>}
        {error && <Message color="danger">{error}</Message>}
      </Container>
    </form>
  );
}

export { MagicLink };
