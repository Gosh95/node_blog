import { Fragment, useState } from 'react';

import styled from 'styled-components';
import { Button } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import SignInModal from '../modals/SignInModal';

const ButtonGroup = styled.div`
  button {
    margin-left: 0.4rem;
  }
`;

const HeaderButtons = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  return (
    <Fragment>
      <ButtonGroup>
        <Button icon={<SearchOutlined />}>Search</Button>
        <Button icon={<UserOutlined />} onClick={() => openModalHandler()}>
          Sign In
        </Button>
      </ButtonGroup>
      <SignInModal isOpen={modalIsOpen} closeModal={closeModalHandler} />
    </Fragment>
  );
};

export default HeaderButtons;
