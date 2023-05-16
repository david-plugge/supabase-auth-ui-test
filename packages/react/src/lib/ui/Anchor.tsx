import styles from './auth-ui.module.css';

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const Anchor: React.FC<AnchorProps> = ({ children, ...props }) => {
  return (
    <a {...props} className={styles.anchor}>
      {children}
    </a>
  );
};

export { Anchor };
