'use client';
import { useState } from 'react';
import { Button, Divider } from 'antd';
import { Title, Text } from '@merch/shared';
import ProductCard from 'components/elements/productCard';
import { BackIcon, ForwardIcon } from 'components/elements/icons';

import styles from './product.module.scss';

type ProductsProps = {
  name: string;
  products: any[];
};

export default function Products({
  name,
  products,
}: ProductsProps): JSX.Element {
  const [productIndex, setProductIndex] = useState<number>(0);
  return (
    <div className={styles.container}>
      <Title className={styles.title} level={1}>
        {name}
      </Title>
      <div className={styles.products}>
        {products.map((items, index) => (
          <ProductCard
            key={index}
            className={`${
              index == productIndex ? styles.showProduct : styles.hideProduct
            } 
             ${index > 2 && styles.moreProducts}
              `}
            index={index}
          />
        ))}
      </div>

      <div className={styles.productIndex}>
        <Button
          type="text"
          onClick={() => {
            if (productIndex > 0) setProductIndex((prev) => prev - 1);
          }}
        >
          <BackIcon />
        </Button>
        <Text type="secondary">
          {productIndex + 1}/{products.length}
        </Text>
        <Button
          type="text"
          onClick={() => {
            if (productIndex < products.length - 1)
              setProductIndex((prev) => prev + 1);
          }}
        >
          <ForwardIcon />
        </Button>
      </div>
      <Button type="primary" className={styles.showMore}>
        Show More
      </Button>
    </div>
  );
}
