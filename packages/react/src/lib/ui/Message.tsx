import styles from './auth-ui.module.css';

interface MessageProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  color?: 'default' | 'danger';
}

const Message: React.FC<MessageProps> = ({ children, color = 'default', ...props }) => {
  return (
    <label {...props} className={[styles.message, color].join(' ')}>
      {children}
    </label>
  );
};

export { Message };
