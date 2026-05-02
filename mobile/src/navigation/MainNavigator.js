import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from '../components/Layout';
import Dashboard from '../screens/dashboard/Dashboard';
import FeedbackScreen from '../screens/users/student/Feedback';
import UsersScreen from '../screens/users/admin/Users';

import FeedbackListScreen from '../screens/users/student/FeedbackList';
import HelpScreen from '../screens/HelpScreen';

import AdminFeedbackScreen from '../screens/users/admin/AdminFeedbackScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = ({ route }) => {
  // Grab user and token passed from Login
  const { token, user } = route.params || {};

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard">
        {(props) => (
          <Layout {...props} title="Console" user={user}>
            <Dashboard {...props} token={token} user={user} />
          </Layout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Feedback">
        {(props) => (
          <Layout {...props} title="Feedback" user={user}>
            <FeedbackScreen {...props} token={token} user={user} />
          </Layout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Users">
        {(props) => (
          <Layout {...props} title="User Management" user={user}>
            <UsersScreen {...props} token={token} user={user} />
          </Layout>
        )}
      </Stack.Screen>

      <Stack.Screen name="FeedbackList">
        {(props) => (
          <Layout {...props} title="MyFeedback" user={user}>
            <FeedbackListScreen {...props} token={token} user={user} />
          </Layout>
        )}
      </Stack.Screen>
      {/* 4. Help Center */}
      <Stack.Screen name="Help">
        {(props) => (
          <Layout {...props} title="Help Center" user={user}>
            <HelpScreen {...props} token={token} user={user} />
          </Layout>
        )}
      </Stack.Screen>

      <Stack.Screen name="AdminFeedback">
        {(props) => (
          <Layout {...props} title="Feedback" user={user}>
            <AdminFeedbackScreen {...props} token={token} user={user} />
          </Layout>
        )}
      </Stack.Screen>


    </Stack.Navigator>
  );
};

export default MainNavigator;