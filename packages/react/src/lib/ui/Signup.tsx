import { RedirectTo } from '@supabase/auth-ui-shared';
import { useSupabaseContext } from '../SupabaseProvider';
import Theme from '../Theme';
import { SocialAuth } from '../interfaces';
import { Button, Container, Input, Label, Message, AuthLink, Divider } from '../components';
import { useEffect, useRef, useState } from 'react';

export default function Signup({
	redirectTo,
	defaultEmail = '',
	defaultPassword = '',
}: {
	redirectTo?: RedirectTo;
	defaultEmail?: string;
	defaultPassword?: string;
}) {
	const {
		supabaseClient,
		i18n,
		config: {
			email_enabled = true,
			disable_signup = false,
			providers,
			redirectTo: _redirectTo,
			additionalData,
		},
	} = useSupabaseContext();

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
	}, [defaultEmail, defaultPassword]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		const {
			data: { user: signUpUser, session: signUpSession },
			error: signUpError,
		} = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				data: additionalData,
				emailRedirectTo: redirectTo ?? _redirectTo,
			},
		});
		if (signUpError) setError(signUpError.message);
		// Check if session is null -> email confirmation setting is turned on
		else if (signUpUser && !signUpSession) setMessage(i18n?.sign_up?.confirmation_text as string);

		/*
		 * it is possible the auth component may have been unmounted at this point
		 * check if component is mounted before setting a useState
		 */
		if (isMounted.current) setLoading(false);
	};

	const labels = i18n.sign_up;

	return (
		<Theme>
			{disable_signup ? (
				<Message>Signup is disabled.</Message>
			) : (
				<>
					{providers?.length && (
						<>
							<SocialAuth redirectTo={redirectTo} />
							{email_enabled && <Divider />}
						</>
					)}
					{email_enabled && (
						<form
							method="post"
							id="auth-sign-up"
							onSubmit={handleSubmit}
							autoComplete={'on'}
							style={{ width: '100%' }}
						>
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
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setPassword(e.target.value)
										}
										autoComplete="new-password"
									/>
								</div>

								<Button type="submit" color="primary" loading={loading}>
									{loading ? labels?.loading_button_label : labels?.button_label}
								</Button>

								<Container direction="vertical" gap="small">
									<AuthLink view="sign_in"></AuthLink>
								</Container>

								{message && <Message>{message}</Message>}
								{error && <Message color="danger">{error}</Message>}
							</Container>
						</form>
					)}
				</>
			)}
		</Theme>
	);
}
