import { Button } from 'antd';
import styles from './productReview.module.scss';
import { Title } from '../../../../../../libs/shared/src/lib/antd-text/antd-text';

type Props = {
  onPrevious: Function;
  productDetail?: any;
};

export default function ProductReview({ onPrevious, productDetail }: Props) {
  console.log(productDetail);
  return (
    <div className={styles.modalContent}>
      <div className={styles.images}>
        <div className={styles.imageSelector}></div>
        <div className={styles.fullImage}></div>
      </div>
      <div>
        <Title>{productDetail.name}</Title>
      </div>

      <Button
        className={styles.buttons}
        onClick={() => onPrevious()}
        size="large"
      >
        Previous
      </Button>
    </div>
  );
}
