import styles from './auth-ui.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: 'default' | 'primary';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'default',
  icon,
  loading = false,
  ...props
}) => {
  return (
    <button {...props} className={[styles.button, color].join(' ')} disabled={loading}>
      {icon}
      {children}
    </button>
  );
};

export { Button };
