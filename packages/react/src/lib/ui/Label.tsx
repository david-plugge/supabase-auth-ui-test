import styles from './auth-ui.module.css';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label {...props} className={styles.label}>
      {children}
    </label>
  );
};

export { Label };
