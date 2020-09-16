/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { useState } from 'react';
import Head from 'next/head';
import { Layout, Menu, Row, Col } from 'antd';
import Logo from '../components/logo';
import Series from '../components/my-art-collection/series';
import Paintings from '../components/my-art-collection/paintings';

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  const [activeSerieId, setActiveSerieId] = useState<string>(null);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        css={css({ display: 'flex', flexDirection: 'column', height: '100vh' })}
      >
        <Header>
          <Logo />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Rooms</Menu.Item>
            <Menu.Item key="2">My Art Collection</Menu.Item>
            <Menu.Item key="3">Gallery</Menu.Item>
          </Menu>
        </Header>
        <Content css={css({ p: 50, flex: 1 })}>
          <Row gutter={64}>
            <Col span={6}>
              <Series
                activeSerieId={activeSerieId}
                onSerieClick={setActiveSerieId}
              />
            </Col>
            <Col span={18}>
              <Paintings serieId={activeSerieId}></Paintings>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright ©2020 Powered by <b>GreenRoadLabs.com</b>. All rights
          reserved
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
