'use client';
import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  ColorPicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Steps,
} from 'antd';
import { Text, Title } from '@merch/shared';

import styles from './addProduct.module.scss';
import {
  MinusCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

export default function AddProduct(): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const addColor = () => {
    setColors((prev) => [...prev, '#22A39F']);
  };

  const removeColor = (index: number) => {
    console.log('this called');
    setColors((prev) => {
      const updatedColors = [...prev.slice(0, index), ...prev.slice(index + 1)];
      return updatedColors;
    });
  };

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
          <Steps
            current={currentStep}
            labelPlacement="vertical"
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
          <Form
            className={styles.form}
            name="addProduct"
            layout="vertical"
            autoComplete="false"
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Enter a product name' }]}
            >
              <Input size="large" type="email" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Enter a Description' }]}
            >
              <TextArea
                size="large"
                autoSize={{ minRows: 3, maxRows: 8 }}
                minLength={30}
                maxLength={600}
                showCount
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Enter a price' }]}
            >
              <InputNumber min={10} addonAfter="Birr" />
            </Form.Item>
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: 'Enter a stock' }]}
            >
              <InputNumber min={5} addonAfter="Pics" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Enter a category' }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item name="color" label="Product colors">
              <div className={styles.colorForm}>
                {colors.map((value, index) => {
                  return (
                    <Badge
                      key={index}
                      size="small"
                      count={
                        <MinusCircleOutlined
                          style={{ color: '#22A39F' }}
                          onClick={() => {
                            removeColor(index);
                          }}
                        />
                      }
                    >
                      <ColorPicker size="large" defaultValue={'#FFFFFF00'} />
                    </Badge>
                  );
                })}

                <Button className={styles.colorButton} onClick={addColor}>
                  <PlusOutlined />
                </Button>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large">
                Next
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
