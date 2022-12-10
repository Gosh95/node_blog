import { Fragment } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import AppLayout from './components/layout/Layout';

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/*' element={<AppLayout children={<Outlet />} />}>
          <Route path='' element={<h1>Recent Posts</h1>} />
          <Route path='popular' element={<h1>Post Popular</h1>} />
          <Route path=':postId' element={<h1>Post Detail</h1>} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
