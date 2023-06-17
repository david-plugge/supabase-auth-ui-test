import { generateCssVariablesFromTheme } from '@supabase/auth-ui-shared';
import { PropsWithChildren } from 'react';
import { useSupabaseContext } from './SupabaseProvider';

export default function Theme({ children }: PropsWithChildren) {
	const {
		appearence: { theme },
	} = useSupabaseContext();

	const style = generateCssVariablesFromTheme(theme).toObject();
	style.display = 'contents';

	return <div style={style}>{children}</div>;
}
