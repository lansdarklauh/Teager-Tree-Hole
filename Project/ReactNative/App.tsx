/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Icon, TabBar } from '@ant-design/react-native';
import ShowMessage from './src/pages/ShowMessage';
import SendMessage from './src/pages/SendMessage';

function App(): any {
  const [selectedTab, setSelectedTab] = React.useState('ShowMessage');

  function onChangeTab(tabName: any) {
    setSelectedTab(tabName)
  }

  function renderContent() {
    switch (selectedTab) {
      case 'ShowMessage':
        return (<ShowMessage />);
      case 'SendMessage':
        return (<SendMessage />);
      default:
        return (<ShowMessage />);
    }
  }

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="#f5f5f5">
      <TabBar.Item
        title="浏览"
        icon={<Icon name="idcard" />}
        selected={selectedTab === 'ShowMessage'}
        onPress={() => onChangeTab('ShowMessage')}>
        {renderContent()}
      </TabBar.Item>
      <TabBar.Item
        title="发表"
        icon={<Icon name="edit" />}
        selected={selectedTab === 'SendMessage'}
        onPress={() => onChangeTab('SendMessage')}>
        {renderContent()}
      </TabBar.Item>
    </TabBar>
  );
}

// const styles = StyleSheet.create({});

export default App;
