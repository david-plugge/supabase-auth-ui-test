import { RedirectTo } from '@supabase/auth-ui-shared';
import { useSupabaseContext } from '../SupabaseProvider';
import Theme from '../Theme';
import { EmailAuth, SocialAuth } from '../interfaces';

export default function Signin({ redirectTo }: { redirectTo?: RedirectTo }) {
	const {
		config: { email_enabled = true, providers },
	} = useSupabaseContext();

	return (
		<Theme>
			{providers?.length && <SocialAuth redirectTo={redirectTo} />}
			{email_enabled && <EmailAuth redirectTo={redirectTo} />}
		</Theme>
	);
}
