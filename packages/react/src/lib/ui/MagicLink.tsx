import { RedirectTo } from '@supabase/auth-ui-shared';
import { useSupabaseContext } from '../SupabaseProvider';
import Theme from '../Theme';
import { SocialAuth } from '../interfaces';
import { Button, Container, Input, Label, Message, AuthLink } from '../components';
import { useState } from 'react';

export default function MagicLink({ redirectTo }: { redirectTo?: RedirectTo }) {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const {
		supabaseClient,
		i18n,
		config: { redirectTo: _redirectTo, magic_link_enabled = true, providers },
	} = useSupabaseContext();

	const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setMessage('');
		setLoading(true);
		const { error } = await supabaseClient.auth.signInWithOtp({
			email,
			options: { emailRedirectTo: redirectTo ?? _redirectTo },
		});
		if (error) setError(error.message);
		else setMessage(i18n?.magic_link?.confirmation_text as string);
		setLoading(false);
	};

	const labels = i18n?.magic_link;

	return (
		<Theme>
			{providers?.length && <SocialAuth redirectTo={redirectTo} />}
			{magic_link_enabled && (
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

						<AuthLink view="sign_in"></AuthLink>

						{message && <Message>{message}</Message>}
						{error && <Message color="danger">{error}</Message>}
					</Container>
				</form>
			)}
		</Theme>
	);
}
