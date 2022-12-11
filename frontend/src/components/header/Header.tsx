import styled from 'styled-components';

import HeaderTitle from './HeaderTitle';
import HeaderButtons from './HeaderButtons';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle />
      <HeaderButtons />
    </HeaderContainer>
  );
};

export default Header;
