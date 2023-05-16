import { SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { I18nVariables } from '@supabase/auth-ui-shared';
import { Button, Container, Input, Label, Message } from './../../ui';

function UpdatePassword({
  supabaseClient,
  i18n,
}: {
  supabaseClient: SupabaseClient;
  i18n?: I18nVariables;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabaseClient.auth.updateUser({ password });
    if (error) setError(error.message);
    else setMessage(i18n?.update_password?.confirmation_text as string);
    setLoading(false);
  };

  const labels = i18n?.update_password;

  return (
    <form method="post" id="auth-update-password" onSubmit={handlePasswordReset}>
      <Container gap="large" direction={'vertical'}>
        <div>
          <Label htmlFor="password">{labels?.password_label}</Label>
          <Input
            id="password"
            name="password"
            placeholder={labels?.password_label}
            type="password"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" color="primary" loading={loading}>
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Button>
        {message && <Message>{message}</Message>}
        {error && <Message color="danger">{error}</Message>}
      </Container>
    </form>
  );
}

export { UpdatePassword };
