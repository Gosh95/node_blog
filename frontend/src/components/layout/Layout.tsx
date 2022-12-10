import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ChildrenProp } from '../../types/prop';

const AppLayout: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <Fragment>
      <Link to='/'>Recent</Link>
      <Link to='/popular'>Popular</Link>
      <div>{children}</div>
    </Fragment>
  );
};

export default AppLayout;
