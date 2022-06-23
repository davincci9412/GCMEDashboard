import React, { useState, useEffect } from "react";
import { Row, Col, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import ChartWidget from 'components/shared-components/ChartWidget';
import {
  VisitorChartData,
  AnnualStatisticData,
} from './DefaultDashboardData';
import {
  FileExcelOutlined,
  PrinterOutlined,
  EllipsisOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import utils from 'utils';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import gcmeTokenAbi from './abi/gcme-abi';
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();
const Web3 = require('web3');
// const tokenAddress = "0x7f9528b913A99989B88104b633D531241591A358";
const tokenAddress = "0x9528cCEb678B90dAf02cA5cA45622D5cBaF58A30";
const deadAddress = "0x000000000000000000000000000000000000dead";

const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
    <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
      <EllipsisOutlined />
    </a>
  </Dropdown>
)

const tableColumns = [
  {
    title: 'METRIC',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <Avatar size={30} className="font-size-sm" style={{ backgroundColor: record.avatarColor }}>
          {utils.getNameInitial(text)}
        </Avatar>
        <span className="ml-2">{text}</span>
      </div>
    ),
  },
  {
    title: 'VALUE',
    dataIndex: 'date',
    key: 'date',
  },

];

export const DefaultDashboard = () => {
  const [visitorChartData, setVisitorChartData] = useState({});
  const [annualStatisticData] = useState(AnnualStatisticData);
  let [manualburntToken, setburntToken] = useState();
  let [recentTransactionData, setrecentTransactionData] = useState();
  const { direction } = useSelector(state => state.theme)

  const params = {
    "ids": "gocryptome",
    "vs_currency": "usd"
  };
  const [token, setToken] = useState({ max_supply: '', circulatingSupply: '', burntToken: '', pancakeswap_price: '', volumePerDay: '', liquidity: '', holders: '', marketcapFull: '', ath: '' })
  const MINUTE_MS = 600000;
  let circulatingSupply;
  let burntToken;
  let pancakeswap_price;
  let volumePerDay;
  let liquidity;
  let holders;
  let marketcapFull;
  let ath;
  let total_supply;
  let max_supply = 100000000;

  async function getData() {
    const { data } = await CoinGeckoClient.coins.fetch('gocryptome', {
      tickers: false,
      community_data: false,
      developer_data: false,
      localization: false,
      sparkline: false,
    });
   
      console.log('market_data', data);

        pancakeswap_price = data.market_data.current_price['usd'];
        volumePerDay = data.market_data.total_volume['usd'];
        liquidity = 152614;
        holders = 5342 ;
        total_supply = data.market_data.total_supply;
        marketcapFull = pancakeswap_price * total_supply;
        ath = data.market_data.ath['usd'];

        burntToken = max_supply - total_supply + manualburntToken / 10 ** 9;
        circulatingSupply = data.market_data.circulating_supply;//total_supply - burntToken
        

        setToken({ circulatingSupply: circulatingSupply, burntToken: burntToken, pancakeswap_price: pancakeswap_price, volumePerDay: volumePerDay, liquidity: liquidity, holders: holders, marketcapFull: marketcapFull, ath: ath });
        setrecentTransactionData([
          {
            id: '#5327',
            name: 'Total supply',
            date: Number(total_supply).toLocaleString(),
            avatarColor: '#005AFF'
          },
          {
            id: '#5328',
            name: 'Circulating supply',
            date: Number(circulatingSupply).toLocaleString(),
            avatarColor: '#005AFF'
          },
          /*
          {
            id: '#5329',
            name: 'Burnt token',
            date: Number(burntToken).toLocaleString(),
            avatarColor: '#005AFF'
          }, {
            id: '#5330',
            name: 'Burning rate',
            date: 2 + ' %',
            avatarColor: '#005AFF'
          },
          */
          {
            id: '#5331',
            name: 'Pancakeswap Price',
            date: '$ ' + pancakeswap_price,
            avatarColor: '#005AFF'
          },
          {
            id: '#5332',
            name: '24H Volume',
            date: '$ ' + Number(volumePerDay).toLocaleString(),
            avatarColor: '#005AFF'
          },
          {
            id: '#5333',
            name: 'Liquidity',
            date: '$ ' + Number(liquidity).toLocaleString(),
            avatarColor: '#005AFF'
          },
          {
            id: '#5334',
            name: 'holders',
            date: Number(holders).toLocaleString(),
            avatarColor: '#005AFF'
          },
          {
            id: '#5335',
            name: 'Market Cap(Fully Dilluted)',
            date: '$ ' + Number(marketcapFull).toLocaleString(),
            avatarColor: '#005AFF'
          },
          {
            id: '#5336',
            name: 'All-Time High',
            date: '$ ' + ath,
            avatarColor: '#005AFF'
          }]);
  };

  const getBalance = async () => {
    const provider = new Web3(window.web3.currentProvider);
    var gcmeContract = new provider.eth.Contract(gcmeTokenAbi, tokenAddress);
    console.log(gcmeContract);
    gcmeContract.methods.balanceOf(deadAddress).call().then(res => {
      setburntToken(res);
    }).catch(err => {

      console.log(err);
    });

  };

  const getformatedTime = (time) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    time = new Date(time)
    
    var date = `${String(time.getDate()). padStart(2, '0')} ${monthNames[time.getMonth()]}`;
    var time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
  }


  const getChareData = async () => {
    // let startDate = 1645772589421;
    // let endDate = new Date().getTime();
    let day = 24*60*60*1000;
    // if((endDate - 356*day) > startDate) startDate = endDate - 365*day;
    let startDate = 1645772589421;
    let endDate = new Date().getTime();

    let data = await CoinGeckoClient.coins.fetchMarketChart('gocryptome', {
      days: ((endDate - 356*day) < startDate)?'max':'365',
      vs_currency: 'usd',
    });
    let resolve_arr = data.data.prices;
    let date_arr = [];
    let price_arr = [];

    for (let i = 0; i < resolve_arr.length; i += parseInt(resolve_arr.length / 15)) {
      date_arr.push(getformatedTime(resolve_arr[i][0]));
      price_arr.push(Number((resolve_arr[i][1]).toFixed(4)))
    }
    
    setVisitorChartData({
      categories: date_arr,
      series: [
        {
          data: price_arr,
          name: 'Price chart'
        }
      ]
    });
  }
  useEffect(()=>{
    console.log("visitorChartData", visitorChartData);
  },[visitorChartData]);

  useEffect(()=>{
    getChareData();
  },[]);

  useEffect(() => {
    getBalance();
    getData();
    setInterval(() => {
      getBalance();
      getData();
    }, MINUTE_MS);

  }, [manualburntToken]);

  return (
    <>
      <Row gutter={16} padding>
        <Col xs={32} sm={32} md={32} lg={24}>
          <Row gutter={40}>
            {
              annualStatisticData.map((elm, i) => (
                <Col xs={24} sm={24} md={8} lg={8} xl={8} key={i}>
                  <StatisticWidget
                    title={elm.title}
                    value={(i === 0 && token.circulatingSupply !== undefined) ? "$ " + (token.marketcapFull).toLocaleString() :
                      (i === 2 && token.volumePerDay !== undefined) ? "$ " + token.volumePerDay.toLocaleString() :
                        "$ " + token.pancakeswap_price.toLocaleString()}
                    status={elm.status}
                    subtitle={elm.subtitle}
                  />
                </Col>
              ))
            }
          </Row>
          <Row gutter={16, 0}>
            <Col span={24}>
            {visitorChartData !== {}?<ChartWidget
                title="$GCME Price History"
                type="area"
                extra={'$ ' + token.pancakeswap_price}
                series={visitorChartData.series}
                xAxis={visitorChartData.categories}
                height={'400px'}
                direction={direction}
              ></ChartWidget>:''
            }
              <Card title="Token Information" extra={cardDropdown(latestTransactionOption)}>
                <Table
                  className="no-border-last"
                  columns={tableColumns}
                  dataSource={recentTransactionData}
                  rowKey='id'
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}


export default withRouter(DefaultDashboard);
