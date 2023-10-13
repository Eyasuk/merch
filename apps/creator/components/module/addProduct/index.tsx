'use client';
import { useState } from 'react';
import { Button, Card, Divider, Modal } from 'antd';
import { Text, Title } from '@merch/shared';
import styles from './addProduct.module.scss';

export default function AddProduct(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
        <div className={styles.modalContent}>
          <Title level={4} className={styles.modalTitle}>
            Add new product
          </Title>
          <Divider className={styles.divider} />
        </div>
      </Modal>
    </div>
  );
}
