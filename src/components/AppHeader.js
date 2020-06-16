import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import {Layout, Menu} from "antd";
import {ShopOutlined} from "@ant-design/icons";

const {Header} = Layout;
const {SubMenu} = Menu;

const AppHeader = (history) => {
  const [title, setTitle] = useState('가맹점 신청 목록')
  const location = useLocation();

  useEffect(() => {
    location.pathname === '/' ? setTitle('가맹점 신청 목록') : setTitle('가맹점 등록')
  }, [location])

  return (
    <Header id='components-layout-top'>
      <div className="logo"/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <SubMenu icon={<ShopOutlined/>} title={title}>
          <Menu.Item key="1"><Link to='/'>가맹점 신청 목록</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/register'>가맹점 등록</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  )
}

export default AppHeader;