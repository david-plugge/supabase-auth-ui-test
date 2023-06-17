import { RedirectTo } from '@supabase/auth-ui-shared';
import { useSupabaseContext } from '../SupabaseProvider';
import Theme from '../Theme';
import { EmailAuth, SocialAuth } from '../interfaces';
import { Message } from '../components';

export default function Signup({ redirectTo }: { redirectTo?: RedirectTo }) {
	const {
		config: { email_enabled = true, disable_signup = false, providers },
	} = useSupabaseContext();

	return (
		<Theme>
			{disable_signup ? (
				<Message>Signup is disabled.</Message>
			) : (
				<>
					{providers?.length && <SocialAuth redirectTo={redirectTo} />}
					{email_enabled && <EmailAuth authView="sign_up" redirectTo={redirectTo} />}
				</>
			)}
		</Theme>
	);
}
