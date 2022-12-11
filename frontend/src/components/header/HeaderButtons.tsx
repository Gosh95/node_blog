import styled from 'styled-components';
import { Button } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const Buttons = styled.div`
  button {
    margin-left: 0.4rem;
  }
`;

const HeaderButtons = () => {
  return (
    <Buttons>
      <Button icon={<SearchOutlined />}>Search</Button>
      <Button icon={<UserOutlined />}>Sign In</Button>
    </Buttons>
  );
};

export default HeaderButtons;
