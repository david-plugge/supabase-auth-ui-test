import { AuthViewType, OtpType, RedirectTo } from '@supabase/auth-ui-shared';

import ForgottenPassword from './ui/ForgottenPassword';
import MagicLink from './ui/MagicLink';
import UpdatePassword from './ui/UpdatePassword';
import VerifyOtp from './ui/VerifyOtp';
import Signin from './ui/Signin';
import Signup from './ui/Signup';

export default function Auth({
	view = 'sign_in',
	otpType = 'email',
	redirectTo,
}: {
	view?: AuthViewType;
	otpType?: OtpType;
	redirectTo?: RedirectTo;
}) {
	switch (view) {
		case 'sign_in':
			return <Signin redirectTo={redirectTo}></Signin>;
		case 'sign_up':
			return <Signup redirectTo={redirectTo}></Signup>;
		case 'magic_link':
			return <MagicLink redirectTo={redirectTo}></MagicLink>;
		case 'forgotten_password':
			return <ForgottenPassword redirectTo={redirectTo}></ForgottenPassword>;
		case 'update_password':
			return <UpdatePassword redirectTo={redirectTo}></UpdatePassword>;
		case 'verify_otp':
			return <VerifyOtp otpType={otpType} redirectTo={redirectTo}></VerifyOtp>;
	}
}
