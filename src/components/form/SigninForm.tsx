import React from 'react';
import styled from 'styled-components';
import { DevTool } from "@hookform/devtools";
import { Typography, Form, Input, Row, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useSignForm, SigninFormState } from './useSignForm';
import { ErrorMessage } from './ErrorMessage';

const { Text } = Typography;

export const SigninForm: React.FC = () => {
  const {
    models: { errors },
    operations: { handleSubmit, reset, control },
    components: { Controller },
  } = useSignForm();

  const onSubmit = (data: SigninFormState) => {
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="signin-form">
      <FormContainer>
        <Form.Item>
          <Controller
            name="email"
            defaultValue=""
            render={(props) => (
              <Input size="large" prefix={<UserOutlined />} placeholder="Email" {...props} />
            )}
          />
          <ErrorMessage errors={errors} name="email" />
        </Form.Item>

        <Form.Item>
          <Controller
            name="password"
            defaultValue=""
            render={(props) => (
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
                {...props}
              />
            )}
          />
          <ErrorMessage errors={errors} name="password" />
        </Form.Item>

        <Row justify="center" className="form__submit-btn-row">
          <Form.Item>
            <Button htmlType="submit" className="form__button">
              <Text>Sign in</Text>
            </Button>
          </Form.Item>
        </Row>
      </FormContainer>
      <DevTool control={control} />
    </form>
  );
};

const FormContainer = styled.div`
  width: 100%;
  min-width: 30rem;
  padding: 4rem 2rem 2rem 2rem;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #ececec;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  .form__button {
    height: auto;
    padding: 0.7rem 3rem;
    border-radius: 3px;
  }
`;
