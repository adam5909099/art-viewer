/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { useState } from 'react';
import Head from 'next/head';
import { Layout, Menu, Card, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Logo from '../components/Logo';
import AddSerieModal from '../components/AddSerieModal';
import produce from 'immer';
import { Typography } from 'antd';
import PaintingCard from '../components/PaintingCard';
import AddPaintingModal, { Painting } from '../components/AddPaintingModal';
import AddPaintingCard from '../components/AddPaintingCard';

const { Header, Content, Footer } = Layout;
const all = 'All';
const { Title } = Typography;

const Home: React.FC = () => {
  const [series, setSeries] = useState(['Abstracts', 'Kandinsky', 'Serie3']);
  const [currentSerie, setCurrentSerie] = useState<string>(all);
  const [addSerieVisible, setAddSerieVisible] = useState(false);
  const [paintings, setPaintings] = useState<Painting[]>([
    {
      name: 'Composition VII',
      author: 'Wassily Kandinsky',
      creationDate: new Date(),
      width: 100,
      height: 50,
    },
  ]);
  const [addPaintingVisible, setAddPaintingVisible] = useState(true);

  const handleAddSerieOk = (serie) => {
    setSeries(
      produce((draft) => {
        draft.push(serie);
      })
    );
    setAddSerieVisible(false);
  };

  const handlePaitingOk = (painting) => {
    setPaintings(
      produce((draft) => {
        draft.push(painting);
      })
    );
    setAddPaintingVisible(false);
  };

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
              <Card
                title="Series"
                bordered={false}
                css={css({ '.ant-card-body': { px: 0 } })}
              >
                <Menu
                  mode="inline"
                  selectedKeys={[currentSerie]}
                  onClick={(e) => setCurrentSerie(e.key as string)}
                >
                  {[all, ...series].map((serie) => (
                    <Menu.Item key={serie}>{serie}</Menu.Item>
                  ))}
                </Menu>
                <div css={css({ m: 16 })}>
                  <Button
                    type="primary"
                    shape="round"
                    block
                    icon={<PlusOutlined />}
                    onClick={() => setAddSerieVisible(true)}
                  >
                    Add New Serie
                  </Button>
                </div>
              </Card>
            </Col>
            <Col span={18}>
              <Title>{currentSerie}</Title>
              <Row gutter={32}>
                {paintings.map((painting, index) => (
                  <Col span={8} key={index}>
                    <PaintingCard painting={painting} />
                  </Col>
                ))}
                <Col span={8}>
                  <AddPaintingCard
                    onClick={() => setAddPaintingVisible(true)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright ©2020 Powered by <b>GreenRoadLabs.com</b>. All rights
          reserved
        </Footer>
      </Layout>
      <AddSerieModal
        visible={addSerieVisible}
        onOk={handleAddSerieOk}
        onCancel={() => setAddSerieVisible(false)}
      />
      <AddPaintingModal
        visible={addPaintingVisible}
        onOk={handlePaitingOk}
        onCancel={() => setAddPaintingVisible(false)}
      ></AddPaintingModal>
    </>
  );
};

export default Home;
