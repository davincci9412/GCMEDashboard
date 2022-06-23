import React from "react";
import { Link } from "react-router-dom";
import { Menu, Grid } from "antd";
import IntlMessage from "../util-components/IntlMessage";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";
import { connect } from "react-redux";
import utils from 'utils'
import { onMobileNavToggle } from "redux/actions/Theme";

const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = "";
  if (key) {
    const arr = key.split("-");
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = (props) => {
  const { sideNavTheme, routeInfo, hideGroupTitle, localization, onMobileNavToggle } = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false)
    }
  }
  return (
    <Menu
      // theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
      mode="inline"
      style={{ height: "100%", borderRight: 0, backgroundColor: '#005AFF'}}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className={hideGroupTitle ? "hide-group-title" : ""}
    >
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <div style={{color: 'white'}}><Menu.ItemGroup
            key={menu.key}
            title={<h3 style={{color: 'white'}}>{setLocale(localization, menu.title)}</h3>}
          >
            {menu.submenu.map((subMenuFirst) =>
               (
                  <Menu.Item key={subMenuFirst.key}>
                    {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> :
                      (
                        <span role="img" aria-label="telegram" className="anticon anticon-telegram" style={{'color': 'white'}}>
                          <img style={{ marginTop: "-5px", color: 'white'}} width="17px" height="17px"
                            src={subMenuFirst.iconURL} alt='ico' />
                        </span>
                      )}
                    <span style={{ 'color': 'white' }}>{setLocale(localization, subMenuFirst.title)}</span>
                    <Link onClick={() => closeMobileNav()} to={subMenuFirst.path} />
                  </Menu.Item>
                )
            )}
          </Menu.ItemGroup></div>
        ) : (
            <Menu.Item key={menu.key}>
              {menu.icon ? <Icon type={menu?.icon} /> : null}
              <span style={{color: "white"}}>{setLocale(localization, menu?.title)}</span>
              {menu.path ? <Link onClick={() => closeMobileNav()} to={menu.path} /> :
                <Link onClick={() => closeMobileNav()} to={menu.pathURL} />}
            </Menu.Item>
          )
      )}
    </Menu>
  );
};


const MenuContent = (props) => {
  return (
    <SideNavContent {...props} />
  )
};

const mapStateToProps = ({ theme }) => {
  const { sideNavTheme, topNavColor } = theme;
  return { sideNavTheme, topNavColor };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
