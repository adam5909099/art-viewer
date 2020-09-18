import Head from 'next/head';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import Logo from './logo';
import { useRouter } from 'next/router';
import { useWindowWidth } from '@react-hook/window-size';

const { Header, Content, Footer } = Layout;

const PageLayout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const width = useWindowWidth();

  return (
    <Layout css="display: flex; flex-direction: column; height: 100vh;">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Logo />
        {width >= 640 && (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]}>
            <Menu.Item key="/rooms">
              <Link href="/rooms">Rooms</Link>
            </Menu.Item>
            <Menu.Item key="/">
              <Link href="/">My Art Collection</Link>
            </Menu.Item>
            <Menu.Item key="/gallery">
              <Link href="/gallery">Gallery</Link>
            </Menu.Item>
          </Menu>
        )}
      </Header>
      <Content css="padding: 50px; flex: 1;">{children}</Content>
      <Footer css="text-align: center;">
        Copyright ©2020 Powered by <b>GreenRoadLabs.com</b>. All rights reserved
      </Footer>
    </Layout>
  );
};

export default PageLayout;
