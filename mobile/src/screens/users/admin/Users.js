import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Navbar from '../../Navbar';
import { getUsers } from '../../../api/api';

const UsersScreen = ({ navigation, route, token: tokenProp }) => {
  const token = tokenProp || route.params?.token;
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (token) {
      getUsers(token, role).then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
      });
    }
  }, [token, role]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Filter by role:</Text>
        <Text style={styles.filterBtn} onPress={() => setRole('')}>All</Text>
        <Text style={styles.filterBtn} onPress={() => setRole('student')}>Student</Text>
        <Text style={styles.filterBtn} onPress={() => setRole('admin')}>Admin</Text>
        <Text style={styles.filterBtn} onPress={() => setRole('department')}>Department</Text>
        <Text style={styles.filterBtn} onPress={() => setRole('student_affairs')}>Affairs</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.username}</Text>
            <Text style={styles.userMeta}>{item.email} | {item.role} | {item.user_id}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No users found.</Text>}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  filterLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#273c75',
  },
  filterBtn: {
    color: '#487eb0',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  userItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#353b48',
  },
  userMeta: {
    color: '#888',
    fontSize: 13,
  },
  empty: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default UsersScreen;
