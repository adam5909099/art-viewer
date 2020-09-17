import { useState } from 'react';
import Head from 'next/head';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
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
      <Layout css="display: flex; flex-direction: column; height: 100vh;">
        <Header>
          <Logo />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Rooms</Menu.Item>
            <Menu.Item key="2">My Art Collection</Menu.Item>
            <Menu.Item key="3">Gallery</Menu.Item>
          </Menu>
        </Header>
        <Content css="padding: 50px; flex: 1;">
          <DndProvider backend={HTML5Backend}>
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
          </DndProvider>
        </Content>
        <Footer css="text-align: center;">
          Copyright ©2020 Powered by <b>GreenRoadLabs.com</b>. All rights
          reserved
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
