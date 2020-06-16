import React, {useReducer} from 'react';
import {Switch, Route} from "react-router-dom";

import AppHeader from 'components/AppHeader';
import Home from 'components/Home';
import Register from 'components/Register';

import 'components/App.css';
import {Layout} from 'antd';

const {Content, Footer} = Layout;

function App() {
  return (
    <Layout className="layout">
      <AppHeader />
      <Content style={{padding: '0', minHeight: '100vh'}}>
        <div className="site-layout-content">
          {/* Router */}
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </div>
      </Content>
      {/*<Footer style={{textAlign: 'center'}}/>*/}
    </Layout>
  );
}

export default App;
