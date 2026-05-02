import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Layout from '../components/Layout'; // Import the wrapper
import { getNotifications } from '../../api/api';

const Dashboard = ({ navigation, route }) => {
  const token = route.params?.token;
  const user = route.params?.user || { fullname: "Admin User", role: "Administrator" }; 

  return (
    <Layout 
      title="Console" 
      navigation={navigation} 
      route={route} 
      user={user}
    >
      {/* EVERYTHING HERE GOES INSIDE THE SCROLLVIEW OF LAYOUT */}
      <Text>Welcome to your Dashboard!</Text>
      {/* Add your Dashboard cards here */}
    </Layout>
  );
};

export default Dashboard;