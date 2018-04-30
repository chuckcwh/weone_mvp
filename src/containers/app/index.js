import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Profile from '../profile';
import Match from '../match';
import Pro from '../pro';
import Public from '../public';
import Ranking from '../ranking';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <Header className="header" style={{ borderBottom: '1px solid grey' }}>
          <Link to="/">
            <div className="logo" style={{ color: 'white' }}>
              WeOne MVP
            </div>
          </Link>
          {/*
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          */}
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark">
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="pie-chart" />
                  <span>Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/match">
                  <Icon type="desktop" />
                  <span>Match</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/pro">
                  <Icon type="inbox" />
                  <span>Pro</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/public">
                  <Icon type="inbox" />
                  <span>Public</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/ranking">
                  <Icon type="inbox" />
                  <span>Ranking</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout style={{ padding: '24px', height: '1000px' }}>
            <Content>
              <Route exact path="/" component={Profile} />
              <Route exact path="/match" component={Match} />
              <Route exact path="/pro" component={Pro} />
              <Route exact path="/public" component={Public} />
              <Route exact path="/ranking" component={Ranking} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
