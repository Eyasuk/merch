'use client';
import { useState } from 'react';
import { Button, Form, Input, InputNumber, Tabs, Upload } from 'antd';
import { Text } from '@merch/shared';

import styles from './productVariation.module.scss';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

type Props = {
  onNext: Function;
  onPrevious: Function;
  productDetail?: any;
  setProductDetail?: Function;
};

export default function ProductVariation({
  onNext,
  onPrevious,
  productDetail,
}: Props): JSX.Element {
  const [form] = Form.useForm();
  const [colorImages, setColorImages] = useState<any[]>([]);

  const checkImage = async (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      throw new Error('You can only upload JPG/PNG image files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      throw new Error('Image must be smaller than 2MB!');
    }

    return;
  };

  const handleFileChange = async (fileList: any, index: number) => {
    try {
      await checkImage(fileList.file);
      const updatedImage = colorImages;
      updatedImage[index] = fileList.file;
      setColorImages(updatedImage);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const submit = (value: any) => {
    console.log(value);
    console.log(colorImages);
    // onNext();
    return true;
  };

  return (
    <div className={styles.modalContent}>
      <Form
        className={styles.form}
        form={form}
        name="addProductVariation"
        layout="vertical"
        autoComplete="false"
        onFinish={submit}
      >
        <Tabs
          defaultActiveKey="1"
          title="Color Variation"
          items={productDetail.colors.map((color: string, index: number) => {
            return {
              label: (
                <Button key={index} className={styles.colorButtons}>
                  <div
                    className={styles.color}
                    style={{
                      backgroundColor: color,
                      height: '40.5px',
                      width: '42.5px',
                    }}
                  />
                </Button>
              ),
              key: index,
              children: (
                <div>
                  <Form.Item label="Image for variation" name="image">
                    <Text type="secondary">
                      you can leave this field empty{' '}
                    </Text>
                    <Upload
                      className={styles.upload}
                      listType="picture-card"
                      // fileList={fileList.fileList}
                      maxCount={1}
                      onChange={(file) => handleFileChange(file, index)}
                      beforeUpload={() => false}
                    >
                      <UploadOutlined />
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    name={`stock${index}`}
                    label="Stock"
                    rules={[{ required: true, message: 'Enter a stock' }]}
                  >
                    <InputNumber min={5} addonAfter="Pics" />
                  </Form.Item>
                  <Form.Item
                    name={`price${index}`}
                    label="Price"
                    rules={[{ required: true, message: 'Enter a price' }]}
                  >
                    <InputNumber min={10} addonAfter="Birr" />
                  </Form.Item>
                </div>
              ),
            };
          })}
        />

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
