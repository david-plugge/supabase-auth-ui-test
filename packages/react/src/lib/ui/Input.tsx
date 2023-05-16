import styles from './auth-ui.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email';
}

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} className={styles.input} />;
};

export { Input };
