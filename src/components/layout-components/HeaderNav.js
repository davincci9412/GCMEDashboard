import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import NavPanel from './NavPanel';
import NavSearch from './NavSearch';
import SearchInput from './NavSearch/SearchInput.js'
import { toggleCollapsedNav, onMobileNavToggle } from 'redux/actions/Theme';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from 'constants/ThemeConstant';
import utils from 'utils'
import Logo from './Logo';

const { Header } = Layout;

export const HeaderNav = props => {
  const { navCollapsed, mobileNav, navType, headerNavColor, toggleCollapsedNav, onMobileNavToggle, isMobile, currentTheme, direction } = props;
  const [searchActive, setSearchActive] = useState(false)

  const onSearchActive = () => {
    setSearchActive(true)
  }

  const onSearchClose = () => {
    setSearchActive(false)
  }

  const onToggle = () => {
    if (!isMobile) {
      toggleCollapsedNav(!navCollapsed)
    } else {
      onMobileNavToggle(!mobileNav)
    }
  }

  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff')
    }
    return utils.getColorContrast(headerNavColor)
  }
  const navMode = mode()
  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return '0px'
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`
    } else {
      return `${SIDE_NAV_WIDTH}px`
    }
  }

  useEffect(() => {
    if (!isMobile) {
      onSearchClose()
    }
  })

  return (
    <Header className={`app-header ${navMode}`} style={{ backgroundColor: headerNavColor }}>
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <div className="nav" >
          <div className="mobile-menu">
            <span className="ant-menu-item ant-menu-item-only-child" onClick={() => { onToggle() }}>
              <span className="anticon anticon-menu-icon nav-icon"></span>
            </span>
          </div>
          <div className="nav-medium">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              <li className="ant-menu-item ant-menu-item-only-child" >
                {/* <span className="site-logo">&nbsp;</span> */}
                <img className="site-logo" src="/img/logo-sm.png" alt="Logo" />
              </li>
              <li className="ant-menu-item ant-menu-item-only-child" style={{ cursor: 'auto' }}>
                <h2 className="logo-title" style={{
                  color: 'white',
                  fontSize:'25px',
                  marginBottom: 0
                }}>
                  GoCryptoMe
                </h2>
              </li>
            </ul>
          </div>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              
              {
                isMobile ?
                  <li className="ant-menu-item ant-menu-item-only-child" onClick={() => { onSearchActive() }}>
                    <SearchOutlined />
                  </li>
                  :
                  <li className="ant-menu-item ant-menu-item-only-child" style={{ cursor: 'auto' }}>
                    <SearchInput mode={mode} isMobile={isMobile} />
                  </li>
              }
            </ul>
          </div>
          <div className="nav-right">
            <NavPanel direction={direction} />
            {
              isNavTop && !isMobile ?
                null
                :
                <span className="ant-menu-item ant-menu-item-only-child" onClick={() => { onToggle() }}>
                  {/* {navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon" /> : <MenuFoldOutlined className="nav-icon" />} */}
                  {navCollapsed || isMobile ? <span className="anticon anticon-menu-unfold nav-icon"></span> : <span className="anticon anticon-menu-fold nav-icon"></span>}
                </span>
            }
          </div>
          <NavSearch active={searchActive} close={onSearchClose} />
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction } = theme;
  return { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction }
};

export default connect(mapStateToProps, { toggleCollapsedNav, onMobileNavToggle })(HeaderNav);