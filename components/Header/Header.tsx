import { IHeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
export const Header = ({ children }: IHeaderProps): JSX.Element => {
  return <header className={styles.header}>{children}</header>;
};
