import styles from './auth-ui.module.css';

type DividerProps = React.HtmlHTMLAttributes<HTMLDivElement>;

const Divider: React.FC<DividerProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={styles.divider}>
      {children}
    </div>
  );
};

export { Divider };
