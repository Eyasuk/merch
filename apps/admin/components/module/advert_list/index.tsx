'use client';
import { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import styles from './advert_list.module.scss';

interface DataType {
  key: React.Key;
  name: string;
  alt: string;
  image: string;
}

export function AdvertList(): JSX.Element {
  const [advertData, setAdvertData] = useState();
  const columns: ColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Alt', dataIndex: 'alt', key: 'alt' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: 'John Brown',
      image: 'New York No. 1 Lake Park',
      alt: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
  ];

  return (
    <Table
      className={styles.body}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => <img style={{ margin: 0 }} />,
      }}
      dataSource={data}
    />
  );
}
