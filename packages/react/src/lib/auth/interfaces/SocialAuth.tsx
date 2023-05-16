import { Provider, SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import {
  I18nVariables,
  ProviderScopes,
  SocialLayoutType,
  SOCIAL_LAYOUTS,
  template,
} from '@supabase/auth-ui-shared';
import { Button, Container, Divider } from './../../ui';
import * as SocialIcons from './../Icons.js';

interface SocialAuthProps {
  supabaseClient: SupabaseClient;
  socialLayout?: SocialLayoutType;
  providers?: Provider[];
  providerScopes?: Partial<ProviderScopes>;
  queryParams?: { [key: string]: string };
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  view?: 'sign_in' | 'sign_up' | 'magic_link';
  i18n?: I18nVariables;
}

type RedirectTo = undefined | string;

function SocialAuth({
  supabaseClient,
  socialLayout = SOCIAL_LAYOUTS.VERTICAL,
  providers = ['github', 'google', 'azure'],
  providerScopes,
  queryParams,
  redirectTo,
  onlyThirdPartyProviders = true,
  view = 'sign_in',
  i18n,
}: SocialAuthProps) {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');

  const verticalSocialLayout = socialLayout === SOCIAL_LAYOUTS.VERTICAL ? true : false;

  const currentView = view === 'magic_link' ? 'sign_in' : view;

  const handleProviderSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        scopes: providerScopes?.[provider],
        queryParams,
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
    <>
      {providers && providers.length > 0 && (
        <>
          <Container gap="large" direction="vertical">
            <Container
              direction={verticalSocialLayout ? 'vertical' : 'horizontal'}
              gap={verticalSocialLayout ? 'small' : 'medium'}
            >
              {providers.map((provider: Provider) => {
                const AuthIcon = SocialIcons[provider];
                return (
                  <Button
                    key={provider}
                    color="default"
                    icon={AuthIcon ? <AuthIcon /> : ''}
                    loading={loading}
                    onClick={() => handleProviderSignIn(provider)}
                  >
                    {verticalSocialLayout &&
                      template(i18n?.[currentView]?.social_provider_text as string, {
                        provider: capitalize(provider),
                      })}
                  </Button>
                );
              })}
            </Container>
          </Container>
          {!onlyThirdPartyProviders && <Divider />}
        </>
      )}
    </>
  );
}

export { SocialAuth };
