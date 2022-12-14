import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Menu, MenuProps } from 'antd';
import { FireOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import { ChildrenProp } from '../../types/prop';
import Header from '../header/Header';

const menuItems: MenuProps['items'] = [
  {
    label: <Link to='/'>Recent</Link>,
    key: 'recent',
    icon: <ClockCircleOutlined />,
  },
  {
    label: <Link to='/popular'>Popular</Link>,
    key: 'popular',
    icon: <FireOutlined />,
  },
];

const AppLayout: React.FC<ChildrenProp> = ({ children }) => {
  const [current, setCurrent] = useState<string>('recent');

  const onClick: MenuProps['onClick'] = useCallback((e: MenuInfo) => {
    setCurrent(e.key);
  }, []);

  const nav = useNavigate();

  return (
    <div>
      <Header />
      <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={menuItems} />
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
