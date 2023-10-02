import { INavigationProps } from './NavigationProps';
import styles from './Navigation.module.scss';
import Link from 'next/link';
export const Navigation = ({ children }: INavigationProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/transaction">Transaction</Link>
          </li>
          <li>
            <Link href="/reports">Reports</Link>
          </li>
          <li>
            <Link href="/summary">Summary</Link>
          </li>
          <li>
            <Link href="/preferences">Prefernces</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
