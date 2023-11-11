'use client';
import { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { Title, BufferImage, Text } from '@merch/shared';
import { editProductService } from 'utils/services/productService';

import styles from './productReview.module.scss';

type Props = {
  onPrevious: Function;
  productDetail?: any;
};

export default function ProductReview({ onPrevious, productDetail }: Props) {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    const mainImages = productDetail.image.map((image: any, index: number) => {
      return {
        name: `main${index}`,
        image: image.data.data,
        contentType: image.contentType,
      };
    });
    let colorImages = [];
    if (
      productDetail.variation &&
      productDetail.variation.color &&
      productDetail.variation.color.length > 0
    ) {
      colorImages = productDetail.variation.color.map(
        (image: any, index: number) => {
          return {
            name: `color${image.color}`,
            image: image.image.data.data,
            contentType: image.image.contentType,
          };
        }
      );
    }
    setImages([...mainImages, ...colorImages]);
  }, []);

  const submit = async () => {
    try {
      const response = await editProductService({
        completed: true,
        status: true,
      });
      console.log('ave');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <div className={styles.images}>
          <div className={styles.imageSelector}></div>
          <div className={styles.fullImage}>
            {images.length > 0 && (
              <>
                <BufferImage
                  className={styles.img}
                  imageBuffer={images[imageIndex].image}
                  contentType={images[imageIndex].contentType}
                  name={images[imageIndex].name}
                  fill
                />
                <BufferImage
                  className={styles.img}
                  imageBuffer={images[imageIndex + (1 % images.length)].image}
                  contentType={
                    images[imageIndex + (1 % images.length)].contentType
                  }
                  name={images[imageIndex + (1 % images.length)].name}
                  fill
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.section}>
            <Title className={styles.title}>{productDetail.name}</Title>
            <Title className={styles.text} level={4}>
              {productDetail.price} Birr
            </Title>
          </div>

          {productDetail.colors && (
            <div className={styles.section}>
              <Title className={styles.title} level={4}>
                Select Color
              </Title>
              <div className={styles.colorSelection}>
                {productDetail.colors.map((items: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className={styles.colorBox}
                      style={{ backgroundColor: items }}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}
          <Card className={`${styles.section} ${styles.box}`}>
            <Title className={styles.title} level={4}>
              Description
            </Title>
            <Text>{productDetail.description}</Text>
          </Card>
          {productDetail.productInformation && (
            <Card className={`${styles.section} ${styles.box}`}>
              <Title className={styles.title} level={4}>
                Product Information
              </Title>
              <Text>{productDetail.productInformation}</Text>
            </Card>
          )}
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          className={styles.buttons}
          onClick={() => onPrevious()}
          size="large"
        >
          Previous
        </Button>
        <Button
          type="primary"
          className={styles.buttons}
          onClick={() => submit()}
          size="large"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
