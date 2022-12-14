import React, { useState } from 'react';

import { Modal, Form, Input, Button, Space, Typography } from 'antd';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const SignInModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const changeFormHandler = () => {
    setIsSignIn((prev) => !prev);
  };

  const cancelModalHandler = () => {
    closeModal();
    setIsSignIn(true);
  };

  const submitFormHandler = () => {};

  return (
    <Modal open={isOpen} width={500} footer={null} onCancel={cancelModalHandler}>
      <h1 style={{ textAlign: 'center' }}>Node Blog</h1>
      <Form layout='vertical' onFinish={submitFormHandler}>
        {!isSignIn && (
          <Form.Item label='Name' required>
            <Input name='name' placeholder='name' />
          </Form.Item>
        )}
        <Form.Item label='Email' required>
          <Input name='email' placeholder='email' />
        </Form.Item>
        <Form.Item label='Password' required>
          <Input.Password name='password' placeholder='password' />
        </Form.Item>
        {!isSignIn && (
          <Form.Item label='Password Check' required>
            <Input.Password name='passwordChecker' placeholder='password check' />
          </Form.Item>
        )}
        <Form.Item>
          <Button htmlType='submit' type='primary' block>
            {!isSignIn ? 'Sign Up' : 'Sign In'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Space align='center' direction='horizontal' style={{ display: 'flex', justifyContent: 'center' }}>
            <span>{!isSignIn ? 'Do you have an account?' : "Don't have an account?"}</span>
            <Typography.Link underline={true} onClick={changeFormHandler}>
              {!isSignIn ? 'Sign In' : 'Sign Up'}
            </Typography.Link>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignInModal;
