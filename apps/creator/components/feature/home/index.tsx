import AddProduct from 'components/module/addProduct';

import styles from './home.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <AddProduct />
    </div>
  );
}
