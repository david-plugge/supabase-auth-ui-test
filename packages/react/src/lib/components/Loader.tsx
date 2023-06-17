import styles from './auth-ui.module.css';

type LoaderProps = React.LabelHTMLAttributes<HTMLDivElement>;

const Loader: React.FC<LoaderProps> = (props) => {
  return <div {...props} className={styles.loader} />;
};

export { Loader };
