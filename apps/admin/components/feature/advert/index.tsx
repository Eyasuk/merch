'use client';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { Title } from '@merch/shared';
import AddAdvert from 'components/module/advert_add';
import { AdvertList } from 'components/module/advert_list';

import styles from './advert.module.scss';

export default function Advert() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.body}>
      <Title level={3}>Advertisement</Title>
      <Button size="large" onClick={showModal}>
        Add Advert
      </Button>
      <AdvertList />
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
        maskClosable={false}
      >
        <AddAdvert />
      </Modal>
    </div>
  );
}
