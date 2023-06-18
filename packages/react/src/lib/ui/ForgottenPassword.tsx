import { RedirectTo } from '@supabase/auth-ui-shared';
import Theme from '../Theme';
import { useSupabaseContext } from '../SupabaseProvider';
import { useState } from 'react';
import { Button, Container, Input, Label, Message, AuthLink } from '../components';

export default function ForgottenPassword({ redirectTo }: { redirectTo?: RedirectTo }) {
	const {
		supabaseClient,
		i18n,
		config: { redirectTo: _redirectTo },
	} = useSupabaseContext();

	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setMessage('');
		setLoading(true);
		const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
			redirectTo: redirectTo ?? _redirectTo,
		});
		if (error) setError(error.message);
		else setMessage(i18n?.forgotten_password?.confirmation_text as string);
		setLoading(false);
	};

	const labels = i18n?.forgotten_password;

	return (
		<Theme>
			<form method="post" id="auth-forgot-password" onSubmit={handlePasswordReset}>
				<Container gap="large" direction="vertical">
					<div>
						<Label htmlFor="email">{labels?.email_label}</Label>
						<Input
							id="email"
							name="email"
							type="email"
							autoFocus
							placeholder={labels?.email_input_placeholder}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
