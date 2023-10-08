'use client';
import { useState } from 'react';
import { Button } from 'antd';
import { Title } from '@merch/shared';
import ProductCard from 'components/elements/productCard';

import styles from './bestSeller.module.scss';

export default function BestSeller(): JSX.Element {
  const products = [1, 2, 3, 4];
  const [productIndex, setProductIndex] = useState<number>(0);
  return (
    <div className={styles.container}>
      <Title className={styles.title} level={4}>
        Best Seller
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
        {/* <Button
          onClick={() => {
            setProductIndex((prev) => (prev + 1) % products.length);
            console.log(productIndex);
          }}
        >
          Next
        </Button> */}
      </div>
    </div>
  );
}
