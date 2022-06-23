import React from "react";
import { Layout , Divider} from 'antd';
import { connect } from 'react-redux';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import Logo from './Logo';

const { Sider } = Layout;

export const SideNav = ({ navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true }) => {
  const props = { sideNavTheme, routeInfo, hideGroupTitle, localization }
  return (
    <Sider
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK ? 'side-nav-dark' : ''}`}
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        <Logo/>
        <h2 className="logo-title" style={{
          color: 'white',
          fontSize:'25px',
          marginBottom: 0
        }}>
          GoCryptoMe
        </h2>
      </div>
      <Scrollbars autoHide>
        <MenuContent
          style={{
            'backgroundColor': '#005AFF',
            color: 'white'
          }}
          type={NAV_TYPE_SIDE}
          {...props}
        />
      </Scrollbars>
    </Sider>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme } = theme;
  return { navCollapsed, sideNavTheme }
};

export default connect(mapStateToProps)(SideNav);
