import { Anchor } from './Anchor';
import { useSupabaseContext } from '../SupabaseProvider';

const AuthLink = ({
	view,
}: {
	view: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password';
}) => {
	const { navigate, paths, i18n } = useSupabaseContext();

	return (
		<Anchor
			href={paths[view]}
			onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
				e.preventDefault();
				navigate(view);
			}}
		>
			{i18n?.[view]?.link_text}
		</Anchor>
	);
};

export { AuthLink };
