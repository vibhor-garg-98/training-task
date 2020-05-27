import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import TextFields from './pages/component/textField/textField';
import ViewRoutes from './pages/component/viewpage/viewRouter';
import AuthlayoutRoute from './routes/AuthlayoutRoutes/AuthLayoutRoutes';
import PrivatelayoutRoute from './routes/PrivatelayoutRoute/PrivatelayoutRoute';
import NotFound from './pages/NoMatch/NoMatch';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/createObject" />
      </Route>
      <AuthlayoutRoute exact path="/createObject" component={TextFields} />
      <PrivatelayoutRoute path="/objectTable" component={ViewRoutes} />
      <PrivatelayoutRoute  component={NotFound} />
    </Switch>
  </Router>
  );
}

export default App;
