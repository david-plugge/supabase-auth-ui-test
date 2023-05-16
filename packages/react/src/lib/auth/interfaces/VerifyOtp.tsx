import {
  EmailOtpType,
  MobileOtpType,
  SupabaseClient,
  VerifyOtpParams,
} from '@supabase/supabase-js';
import React, { useState } from 'react';
import { I18nVariables, OtpType, VIEWS } from '@supabase/auth-ui-shared';
import { Anchor, Button, Container, Input, Label, Message } from './../../ui';

function VerifyOtp({
  setAuthView = () => {},
  supabaseClient,
  otpType = 'email',
  i18n,
  showLinks = false,
}: {
  setAuthView?: any;
  supabaseClient: SupabaseClient;
  otpType: OtpType;
  i18n?: I18nVariables;
  showLinks?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    let verifyOpts: VerifyOtpParams = {
      email,
      token,
      type: otpType as EmailOtpType,
    };
    if (['sms', 'phone_change'].includes(otpType)) {
      verifyOpts = {
        phone,
        token,
        type: otpType as MobileOtpType,
      };
    }
    const { error } = await supabaseClient.auth.verifyOtp(verifyOpts);
    if (error) setError(error.message);
    setLoading(false);
  };

  const labels = i18n?.verify_otp;

  return (
    <form method="post" id="auth-magic-link" onSubmit={handleSubmit}>
      <Container gap="large" direction="vertical">
        {['sms', 'phone_change'].includes(otpType) ? (
          <div>
            <Label htmlFor="phone">{labels?.phone_input_label}</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              autoFocus
              placeholder={labels?.phone_input_placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
          </div>
        ) : (
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
        )}
        <div>
          <Label htmlFor="token">{labels?.token_input_label}</Label>
          <Input
            id="token"
            name="token"
            type="text"
            placeholder={labels?.token_input_placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
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

export { VerifyOtp };
