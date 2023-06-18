import { Provider } from '@supabase/supabase-js';
import { useState } from 'react';
import { template, RedirectTo } from '@supabase/auth-ui-shared';
import { Button, Container } from '../components';
import * as SocialIcons from '../ProviderIcons.js';
import { useSupabaseContext } from '../SupabaseProvider.js';

function SocialAuth({ redirectTo }: { redirectTo?: RedirectTo }) {
	const [loading, setLoading] = useState(false);
	const [, setError] = useState('');

	const {
		supabaseClient,
		i18n,
		appearence: { socialLayout },
		config: { redirectTo: _redirectTo, providerScopes, providerQueryParams, providers = [] },
	} = useSupabaseContext();

	const handleProviderSignIn = async (provider: Provider) => {
		setLoading(true);
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: redirectTo ?? _redirectTo,
				scopes: providerScopes?.[provider],
				queryParams: providerQueryParams,
			},
		});
		if (error) setError(error.message);
		setLoading(false);
	};

	function capitalize(word: string) {
		const lower = word.toLowerCase();
		return word.charAt(0).toUpperCase() + lower.slice(1);
	}

	return (
		providers?.length > 0 && (
			<Container direction={socialLayout} gap={socialLayout === 'vertical' ? 'small' : 'medium'}>
				{providers.map((provider: Provider) => {
					// @ts-expect-error ignore this
					const AuthIcon = SocialIcons[provider] as () => JSX.Element;
					return (
						<Button
							key={provider}
							color="default"
							icon={AuthIcon ? <AuthIcon /> : ''}
							loading={loading}
							onClick={() => handleProviderSignIn(provider)}
						>
							{socialLayout === 'vertical' &&
								template(i18n?.['sign_in']?.social_provider_text as string, {
									provider: capitalize(provider),
								})}
						</Button>
					);
				})}
			</Container>
		)
	);
}

export { SocialAuth };
