import styles from './auth-ui.module.css';

interface ContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  gap?: 'small' | 'medium' | 'large';
}

const Container: React.FC<ContainerProps> = ({
  children,
  direction = 'horizontal',
  gap = 'small',
  ...props
}) => {
  return (
    <div
      {...props}
      className={[styles.container, direction].join(' ')}
      style={{
        gap:
          gap === 'small' ? '4px' : gap === 'medium' ? '8px' : gap === 'large' ? '16px' : undefined,
      }}
    >
      {children}
    </div>
  );
};

export { Container };
