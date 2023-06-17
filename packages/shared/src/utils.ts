import { Provider } from '@supabase/supabase-js';
import { AuthConfig } from './types';

type Fetch = typeof fetch;

interface GoTrueAuthConfiguration {
	external?: Record<Provider | 'email', boolean>;
	disable_signup?: boolean;
	mailer_autoconfirm?: boolean;
	phone_autoconfirm?: boolean;
	sms_provider?: string;
	mfa_enabled?: boolean;
	saml_enabled?: boolean;
}

export async function getAuthConfig(
	supabaseUrl: string,
	supabaseKey: string,
	{
		fetch: _fetch = fetch
	}: {
		fetch?: Fetch;
	} = {}
): Promise<AuthConfig> {
	return _fetch(`${supabaseUrl}/auth/v1/settings`, {
		headers: {
			apikey: supabaseKey,
			Accept: 'application/json'
		}
	})
		.then((res) => res.json() as GoTrueAuthConfiguration)
		.then(({ external = {}, ...rest }) => {
			const { email, ...social } = external;

			const providers = Object.entries(social)
				.filter(([_, enabled]) => enabled)
				.map(([name]) => name as Provider);

			return {
				email_enabled: email,
				providers,
				...rest
			} as AuthConfig;
		})
		.catch(() => ({}));
}

function value(src: any, next: any) {
  let k: PropertyKey;
  if (src && next && typeof src === 'object' && typeof next === 'object') {
    if (Array.isArray(next)) {
      for (k = 0; k < next.length; k++) {
        src[k] = value(src[k], next[k]);
      }
    } else {
      for (k in next) {
        src[k] = value(src[k], next[k]);
      }
    }
    return src;
  }
  return next;
}

export function merge(target: any, ...args: any) {
  let len: number = args.length;
  for (let i = 0; i < len; i++) {
    target = value(target, args[i]);
  }
  return target;
}

// Source https://stackoverflow.com/a/61634647/811799
export function template(string: string, data: Record<string, string>) {
  return string.replace(/{{(\w+)}}/g, (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
    data.hasOwnProperty(placeholderWithoutDelimiters)
      ? data[placeholderWithoutDelimiters]
      : placeholderWithDelimiters
  );
}
