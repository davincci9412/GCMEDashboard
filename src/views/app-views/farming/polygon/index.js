// import React from "react";
// import { Tabs, } from 'antd';

import React, { useState, useEffect } from "react";
import {
  Tabs,
  Row,
  Col,
  Button,
  Modal
} from 'antd';

import PortfolioPane from './Portfolio';
import HistoryPane from './History';
const Web3 = require('web3');
const { TabPane } = Tabs;

const Demo = () => {
  const [currentAccountAddress, setCurrentAccountAddress] = useState('0');
  const [alertVisible, setAlertVisible] = useState(0);

  const getAccount = async () => {
    var accounts, account;
    accounts = await window.ethereum.request({ method: 'eth_accounts' });
    account = accounts[0];
    return account;
  }

  const initWallet = async () => {

    await getAccount().then(res => {

      const _currentAccount = res;

      setCurrentAccountAddress(_currentAccount);
    }).catch(err => {
      console.log(err);
    });
  }

  const clickConnectWallet = () => {
    if (typeof web3 === 'undefined') {
      setAlertVisible(true);
      return;
    }
    if (!ethEnabled()) {
      initWallet();
      return true;
    }
    return false;
  }

  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);      
      return true;
    } 
    return false;
  }
  
  const intervalFunc = () => {
    if (typeof web3 === 'undefined')
      return;
    if ((currentAccountAddress === undefined || currentAccountAddress === '0')) {
      if (currentAccountAddress === undefined)
        setCurrentAccountAddress('0');
      initWallet();
    }
  }

  useEffect(() => {
    intervalFunc();
  });

  return (
    <>
      {alertVisible === true ? (
        Modal.warning({ title: "Metamask Error", content: "Please install metamask first." }),
        setAlertVisible(false))
        : null}
      { (currentAccountAddress === undefined || currentAccountAddress === '0') ? (
        <Row gutter={16} padding>
          <Col xs={32} sm={32} md={32} lg={24}>
            <Row gutter={40}>
              <Col xs={16} sm={16} md={16} lg={16} xl={12} offset={11}>
                <Button type="primary" onClick={clickConnectWallet} >Connect Wallet</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      ): (
      <Tabs size="large">
        <TabPane tab="Portfolio" key="2">
          <PortfolioPane accountAddress={currentAccountAddress} />
        </TabPane>
        <TabPane tab="History" key="3">
          <HistoryPane accountAddress={currentAccountAddress} />
        </TabPane>
      </Tabs>
      )
      }
    </>
  );
};
export default Demo;