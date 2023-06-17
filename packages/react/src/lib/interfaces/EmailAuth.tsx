import React, { useEffect, useRef, useState } from 'react';
import { AuthViewType } from '@supabase/auth-ui-shared';
import { Button, Container, Input, Label, Message, AuthLink } from '../components';
import { useSupabaseContext } from '../SupabaseProvider';

function EmailAuth({
	authView = 'sign_in',
	defaultEmail = '',
	defaultPassword = '',
	redirectTo,
}: {
	authView?: AuthViewType;
	defaultEmail?: string;
	defaultPassword?: string;
	redirectTo?: string;
}) {
	const {
		supabaseClient,
		i18n,
		config: { magic_link_enabled = true, additionalData, redirectTo: _redirectTo },
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

	const labels = i18n?.[authView as 'sign_in' | 'sign_up'];

	return (
		<form
			method="post"
			id={authView === 'sign_in' ? `auth-sign-in` : `auth-sign-up`}
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
						autoComplete={authView === 'sign_in' ? 'current-password' : 'new-password'}
					/>
				</div>
			</Container>

			<Button type="submit" color="primary" loading={loading}>
				{loading ? labels?.loading_button_label : labels?.button_label}
			</Button>

			<Container direction="vertical" gap="small">
				{authView === 'sign_in' && magic_link_enabled && <AuthLink view="magic_link"></AuthLink>}
				{authView === 'sign_in' && <AuthLink view="forgotten_password"></AuthLink>}

				<AuthLink view={authView === 'sign_in' ? 'sign_up' : 'sign_in'}></AuthLink>
			</Container>
			{message && <Message>{message}</Message>}
			{error && <Message color="danger">{error}</Message>}
		</form>
	);
}

export { EmailAuth };
