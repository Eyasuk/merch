import styles from './productCard.module.scss';

type Props = {
  className?: string;
  index?: number;
};

export default function ProductCard({ className, index }: Props): JSX.Element {
  return <div className={`${styles.container} ${className}`}>{index}</div>;
}
