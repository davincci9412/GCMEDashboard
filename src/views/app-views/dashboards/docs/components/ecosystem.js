import React from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: '$GCME token',
    description: 'Seed investing and staking launchpad',
  },
  {
    key: '2',
    name: 'Farming and Staking',
    description: 'Farming and Staking',
  },
  {
    key: '3',
    name: 'GCME asset management',
    description: 'Auditing/Tokenomics on chain analysis',
  },
  {
    key: '4',
    name: 'Portfolio building',
    description: 'Portfolio building',
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
];

const Introduction = () => {
  return (
    <div>
      <h2>The GoCryptoMe Ecosystem</h2>
    </div>
  )
}

export default Introduction
