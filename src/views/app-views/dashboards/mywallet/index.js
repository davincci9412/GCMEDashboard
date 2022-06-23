import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Modal
} from 'antd';

import StatisticWidget from 'components/shared-components/StatisticWidget';
import { withRouter } from 'react-router-dom';
import ccfTokenAbi from './abi/gcme-abi';
import axios from 'axios';

const Web3 = require('web3');
const tokenAddress = "0x9528cCEb678B90dAf02cA5cA45622D5cBaF58A30";

export const DefaultMyWallet = () => {
  const [myBalance, setBalance] = useState(0);
  const [currentPrice, setCurrentPrice] = useState('0');
  const [currentAccountAddress, setCurrentAccountAddress] = useState('0');
  const [alertVisible, setAlertVisible] = useState(0);
  //  const MINUTE_MS = 10000;
  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }
  const getAccount = async () => {
    var accounts, account;
    accounts = await window.ethereum.request({ method: 'eth_accounts' });
    account = accounts[0];
    return account;
  }
  const getBalanceValue = () => {
    const ids = "gocryptome";
    const vs_currencies = "usd";

    axios.get("https://api.coingecko.com/api/v3/simple/price", { params: { "ids": ids, "vs_currencies": vs_currencies } })
      .then(res => {
        setCurrentPrice(res.data[ids].usd.toString());
      })
      .catch(err => {

        console.log(err);
      });
  }
  const getBalance = userAddress => {
    const provider = new Web3(window.web3.currentProvider);
    var ccfContract = new provider.eth.Contract(ccfTokenAbi, tokenAddress);

    ccfContract.methods.balanceOf(userAddress).call().then(res => {

      setBalance(res);
    }).catch(err => {

      console.log(err);
    });
  };
  const initWallet = async () => {

    await getAccount().then(res => {

      const _currentAccount = res;

      setCurrentAccountAddress(_currentAccount);
      getBalance(_currentAccount);
      getBalanceValue();
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
    /*    setInterval(() => {
          intervalFunc();
        }, MINUTE_MS);*/
  });

  return (
    <>
      {alertVisible === true ? (
        Modal.warning({ title: "Metamask Error", content: "Please install metamask frist." }),
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
      ) :
        (
          <Row gutter={16} padding>
            <Col xs={32} sm={32} md={32} lg={24}>
              <Row gutter={40}>
                <Col xl={12}>
                  <StatisticWidget
                    title="BALANCE ($GCME)"
                    value={(Number(myBalance) / 1000000000).toLocaleString() + " $GCME"}
                    status={0}
                    subtitle=''
                  />
                </Col><Col xl={12}>
                  <StatisticWidget
                    title="Total Value in $USD"
                    value={Number(Number(myBalance) * Number(currentPrice) / 1000000000).toLocaleString() + " $USD"}
                    status={0}
                    subtitle=''
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        )
      }
    </>
  )
}


export default withRouter(DefaultMyWallet);
