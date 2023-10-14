'use client';
import { useState } from 'react';
import { Badge, Button, ColorPicker, Form, Input, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './productVariation.module.scss';

const { TextArea } = Input;

type Props = {
  onNext: Function;
  onPrevious: Function;
};

export default function ProductDetail({
  onNext,
  onPrevious,
}: Props): JSX.Element {
  const [form] = Form.useForm();
  const [colors, setColors] = useState<string[]>([]);

  const addColor = () => {
    setColors((prev) => [...prev, '#22A39F']);
  };

  const removeColor = (index: number) => {
    setColors((prev) => {
      const updatedColors = [...prev.slice(0, index), ...prev.slice(index + 1)];
      return updatedColors;
    });
  };

  const submit = () => {
    onNext();
    return true;
  };

  return (
    <div className={styles.modalContent}>
      <Form
        className={styles.form}
        form={form}
        name="addProduct"
        layout="vertical"
        autoComplete="false"
        onFinish={submit}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Enter a product name' }]}
        >
          <Input size="large" type="name" />
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
          <Button
            className={styles.buttons}
            onClick={() => onPrevious()}
            size="large"
          >
            Previous
          </Button>
          <Button
            className={styles.buttons}
            type="primary"
            size="large"
            htmlType="submit"
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
