import { OtpType, RedirectTo } from '@supabase/auth-ui-shared';
import Theme from '../Theme';
import { useSupabaseContext } from '../SupabaseProvider';
import { useState } from 'react';
import { Button, Container, Input, Label, Message, AuthLink } from '../components';
import { EmailOtpType, MobileOtpType, VerifyOtpParams } from '@supabase/supabase-js';

export default function VerifyOtp({
	otpType,
	redirectTo,
}: {
	otpType: OtpType;
	redirectTo?: RedirectTo;
}) {
	const {
		supabaseClient,
		i18n,
		config: { redirectTo: _redirectTo },
	} = useSupabaseContext();

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

		const verifyOpts: VerifyOtpParams = ['sms', 'phone_change'].includes(otpType)
			? {
					phone,
					token,
					type: otpType as MobileOtpType,
					options: {
						redirectTo: redirectTo ?? _redirectTo,
					},
			  }
			: {
					email,
					token,
					type: otpType as EmailOtpType,
					options: {
						redirectTo: redirectTo ?? _redirectTo,
					},
			  };

		const { error } = await supabaseClient.auth.verifyOtp(verifyOpts);
		if (error) setError(error.message);
		setLoading(false);
	};

	const labels = i18n?.verify_otp;

	return (
		<Theme>
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

					<Container direction="vertical" gap="small">
						<AuthLink view="sign_in"></AuthLink>
					</Container>

					{message && <Message>{message}</Message>}
					{error && <Message color="danger">{error}</Message>}
				</Container>
			</form>
		</Theme>
	);
}
