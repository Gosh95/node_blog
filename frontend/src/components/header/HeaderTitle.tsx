import { Fragment } from 'react';

import styled from 'styled-components';

const Title = styled.h2`
  cursor: pointer;
`;

const HeaderTitle = () => {
  return (
    <Fragment>
      <Title>Node Blog</Title>
    </Fragment>
  );
};

export default HeaderTitle;
