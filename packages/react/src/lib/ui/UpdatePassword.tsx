import Theme from '../Theme';

import React, { useState } from 'react';
import { Button, Container, Input, Label, Message, AuthLink } from '../components';
import { useSupabaseContext } from '../SupabaseProvider';
import { RedirectTo } from '@supabase/auth-ui-shared';

export default function UpdatePassword({ redirectTo }: { redirectTo?: RedirectTo }) {
	const {
		supabaseClient,
		i18n,
		config: { redirectTo: _redirectTo },
	} = useSupabaseContext();

	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setMessage('');
		setLoading(true);
		const { error } = await supabaseClient.auth.updateUser(
			{ password },
			{ emailRedirectTo: redirectTo ?? _redirectTo }
		);
		if (error) setError(error.message);
		else setMessage(i18n?.update_password?.confirmation_text as string);
		setLoading(false);
	};

	const labels = i18n?.update_password;

	return (
		<Theme>
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

					<AuthLink view="sign_in"></AuthLink>

					{message && <Message>{message}</Message>}
					{error && <Message color="danger">{error}</Message>}
				</Container>
			</form>
		</Theme>
	);
}
