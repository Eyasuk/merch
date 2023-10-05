'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAdvertService } from 'utils/services/advertService';

import styles from './advert.module.scss';

type ImageProps = {
  name: string;
  _id: string;
  alt: string;
  image: string;
  color: string;
};

export default function AdvertBox(): JSX.Element {
  const [currentImage, setCurrentImage] = useState<ImageProps[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const getPhotos = async () => {
      const response = await getAdvertService();
      setCurrentImage(response.data.data);
    };

    getPhotos();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setZoomed(true);
      setTimeout(() => {
        if (currentImage.length > 0) {
          setImageIndex((prevIndex) => (prevIndex + 1) % currentImage.length);
        }
        setZoomed(false);
      }, 600); // Duration of the zoom animation in milliseconds
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [currentImage]);

  return (
    <div className={styles.container}>
      {currentImage.length > 0 && (
        <Image
          style={{ backgroundColor: currentImage[imageIndex].color }}
          src={currentImage[imageIndex].image}
          alt={currentImage[imageIndex].alt}
          width={50}
          height={31}
          className={`${styles.image} ${zoomed ? styles.zoomed : ''}`}
        />
      )}
      <div className={styles.indicatorContainer}>
        {currentImage.map((_items, _index) => (
          <div
            className={
              _index == imageIndex ? styles.activeIndicator : styles.indicator
            }
            onClick={() => {
              setImageIndex(_index);
            }}
          />
        ))}
      </div>
    </div>
  );
}
