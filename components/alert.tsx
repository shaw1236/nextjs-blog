import styles from './alert.module.css';
import cn from 'classnames';

export default function Alert({ children, type = 'success' }: { children: React.ReactNode, type?: string }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.warning]: type === 'warning',
        [styles.error]: type === 'error',
      })}
    >
      {children}
    </div>
  );
}