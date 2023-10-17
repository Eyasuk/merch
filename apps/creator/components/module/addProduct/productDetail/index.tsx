'use client';
import { useEffect, useState } from 'react';
import { Badge, Button, ColorPicker, Form, Input, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Text } from '@merch/shared';
import {
  addProductService,
  editProductService,
  getUnsavedProductService,
} from 'utils/services/productService';

import styles from './productDetail.module.scss';

const { TextArea } = Input;

type Props = {
  next: Function;
  productDetail?: any;
  setProductDetail: Function;
};

export default function ProductDetail({
  next,
  productDetail,
  setProductDetail,
}: Props): JSX.Element {
  const [form] = Form.useForm();
  const [colors, setColors] = useState<string[]>([]);

  const addColor = (color: any) => {
    setColors((prev) => [...prev, '#00000000']);
  };

  const removeColor = (index: number) => {
    setColors((prev) => {
      const updatedColors = [...prev.slice(0, index), ...prev.slice(index + 1)];
      return updatedColors;
    });
  };

  const changeColor = (color: any, index: number) => {
    const updatedColors = [...colors];
    updatedColors[index] = color.toHexString();
    setColors(updatedColors);
  };

  const submit = async (value: any) => {
    try {
      const response = await addProductService(
        value.name,
        value.description,
        value.price,
        value.stock,
        value.category,
        colors
      );
      setProductDetail((prev: any) => ({ ...prev, ...response.data }));

      next();
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (value: any) => {
    try {
      const response = await editProductService({
        ...form.getFieldsValue(),
        colors,
      });
      setProductDetail((prev: any) => ({ ...prev, ...response.data }));

      next();
    } catch (err) {
      console.log(err);
    }
  };

  const checkUnsavedProduct = async () => {
    try {
      const unsavedProduct = await getUnsavedProductService();

      if (unsavedProduct) {
        setProductDetail((prev: any) => ({ ...prev, ...unsavedProduct.data }));
        const {
          name,
          description,
          price,
          stock,
          category,
          colors: colorData,
        } = unsavedProduct.data;
        form.setFieldsValue({ name, description, price, stock, category });
        setColors(colorData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!productDetail) {
      checkUnsavedProduct();
    } else {
      const {
        name,
        description,
        price,
        stock,
        category,
        colors: colorData,
      } = productDetail;
      form.setFieldsValue({
        name,
        description,
        price,
        stock,
        category,
      });
      if (colorData.length > 0) {
        setColors(colorData);
      }
    }
  }, []);

  return (
    <div className={styles.modalContent}>
      <Form
        className={styles.form}
        form={form}
        name="addProduct"
        layout="vertical"
        autoComplete="false"
        onFinish={productDetail ? edit : submit}
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
                  <ColorPicker
                    allowClear={true}
                    size="large"
                    format="hex"
                    defaultValue={'#FFFFFF00'}
                    onChangeComplete={(color) => changeColor(color, index)}
                    value={colors[index]}
                  />
                </Badge>
              );
            })}

            <Button className={styles.colorButton} onClick={addColor}>
              <PlusOutlined />
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Next
          </Button>
          {productDetail && (
            <Text type="secondary">
              {'  '}
              There is a product you have be editing but not saved it to delete
              it and start over.
            </Text>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
