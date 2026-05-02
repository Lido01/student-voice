import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const menuItems = [
  { label: 'Home', icon: 'home', key: 'Home' },
  { label: 'Feedback', icon: 'message-square', key: 'Feedback' },
  { label: 'Users', icon: 'users', key: 'Users' },
  { label: 'Settings', icon: 'settings', key: 'Settings' },
];

const Navbar = ({
  title,
  user,
  onNotificationPress,
  onProfilePress,
  onLogoutPress,
  onMenuSelect,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <View style={styles.leftRow}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuBtn}>
            <Feather name="menu" size={24} color="#2f3542" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightRow}>
          {/* User Info displayed next to icons */}
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
              {user?.fullname ? user.fullname.split(' ')[0] : 'User'}
            </Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user?.role || 'Guest'}</Text>
            </View>
            </View>
          )}
          
          <TouchableOpacity onPress={onNotificationPress} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={24} color="#2f3542" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onLogoutPress} style={[styles.iconBtn, styles.logoutBtn]}>
            <MaterialIcons name="logout" size={22} color="#eb4d4b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modern Drawer */}
      <Modal visible={drawerOpen} animationType="none" transparent>
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdrop} onPress={() => setDrawerOpen(false)} />
          <View style={styles.drawer}>
            <SafeAreaView>
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>Menu</Text>
                <TouchableOpacity onPress={() => setDrawerOpen(false)}>
                  <Feather name="x" size={24} color="#2f3542" />
                </TouchableOpacity>
              </View>
              
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.drawerItem}
                  onPress={() => {
                    setDrawerOpen(false);
                    onMenuSelect(item.key);
                  }}
                >
                  <Feather name={item.icon} size={20} color="#4834d4" style={styles.drawerIcon} />
                  <Text style={styles.drawerLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2f3542',
    letterSpacing: -0.5,
  },
  userInfo: {
    marginRight: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2f3542',
  },
  roleBadge: {
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#747d8c',
    textTransform: 'uppercase',
  },
  iconBtn: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f1f2f6',
    marginLeft: 8,
  },
  logoutBtn: {
    backgroundColor: '#fff5f5',
  },
  // Drawer Styles
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    width: 280,
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
    paddingTop: 40,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2f3542',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  drawerIcon: {
    marginRight: 15,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3542',
  },
});

export default Navbar;