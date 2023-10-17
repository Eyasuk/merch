'use client';
import { useState } from 'react';
import { Button, Card, Divider, Modal, Steps } from 'antd';
import { Text, Title } from '@merch/shared';
import ProductDetail from 'components/module/addProduct/productDetail';
import ProductImage from 'components/module/addProduct/productImage';
import ProductVariation from 'components/module/addProduct/productVariation';

import styles from './addProduct.module.scss';

export default function AddProduct(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [productDetail, setProductDetail] = useState();

  const onNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onPrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <ProductDetail
      next={onNext}
      productDetail={productDetail}
      setProductDetail={setProductDetail}
    />,
    <ProductImage
      onNext={onNext}
      onPrevious={onPrevious}
      productDetail={productDetail}
      setProductDetail={setProductDetail}
    />,
    <ProductVariation
      onNext={onNext}
      onPrevious={onPrevious}
      productDetail={productDetail}
      setProductDetail={setProductDetail}
    />,
    <div>f</div>,
  ];

  return (
    <div>
      <Card>
        <div className={styles.container}>
          <Text>Add product and Start getting revenue</Text>
          <Button
            className={styles.button}
            size="large"
            type="primary"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            ADD PRODUCTS
          </Button>
        </div>
      </Card>

      <Modal
        open={modalOpen}
        footer={null}
        onCancel={() => {
          setModalOpen(false);
        }}
        maskClosable={false}
        className={styles.modal}
      >
        {' '}
        <div className={styles.modalContent}>
          <Title level={4} className={styles.modalTitle}>
            Add new product
          </Title>
          <Divider className={styles.divider} />
          <Steps
            current={currentStep}
            labelPlacement="vertical"
            responsive={true}
            items={[
              {
                title: 'Details',
              },
              {
                title: 'Images',
              },
              {
                title: 'Variation',
              },
              {
                title: 'Review',
              },
            ]}
          />
          {steps[currentStep]}
        </div>
      </Modal>
    </div>
  );
}
