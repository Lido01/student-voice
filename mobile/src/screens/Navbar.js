import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const Navbar = ({
  title,
  user,
  onNotificationPress,
  onLogoutPress,
  onMenuSelect,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Define available links with their required roles
  const allLinks = [
    { label: 'Dashboard', icon: 'grid', key: 'Dashboard', roles: ['admin', 'student', 'department', 'student_affairs'] },
    { label: 'New Feedback', icon: 'plus-circle', key: 'Feedback', roles: ['student'] },
    { label: 'My Submissions', icon: 'clipboard', key: 'FeedbackList', roles: ['student'] },
    { label: 'View Feedbacks', icon: 'list', key: 'AdminFeedback', roles: ['admin', 'department', 'student_affairs'] },
    { label: 'Incoming Issues', icon: 'inbox', key: 'AdminFeedback', roles: ['admin', 'department', 'student_affairs'] },
    { label: 'Manage Users', icon: 'users', key: 'Users', roles: ['admin', 'department'] },
    { label: 'Reports', icon: 'bar-chart-2', key: 'Reports', roles: ['admin', 'department', 'student_affairs'] },
    { label: 'Analytics', icon: 'pie-chart', key: 'Analytics', roles: ['admin', 'student_affairs'] },
    { label: 'Help & FAQ', icon: 'help-circle', key: 'Help', roles: ['admin', 'student', 'department', 'student_affairs'] },
    { label: 'Settings', icon: 'settings', key: 'Settings', roles: ['admin', 'student', 'department', 'student_affairs'] },
  ];

  // Filter links based on the logged-in user's role
  const filteredMenu = allLinks.filter(item => 
    item.roles.includes(user?.role?.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <View style={styles.leftRow}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuBtn}>
            <Feather name="menu" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightRow}>
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user?.fullname ? user.fullname.split(' ')[0] : 'User'}
              </Text>
              <View style={[styles.roleBadge, { backgroundColor: user.role === 'admin' ? '#ffeaa7' : theme.surfaceAlt }]}>
                <Text style={styles.roleText}>{user?.role}</Text>
              </View>
            </View>
          )}
          
          <TouchableOpacity onPress={onNotificationPress} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={theme.text} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onLogoutPress} style={[styles.iconBtn, styles.logoutBtn]}>
            <MaterialIcons name="logout" size={20} color="#eb4d4b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Side Drawer Modal */}
      <Modal visible={drawerOpen} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdrop} onPress={() => setDrawerOpen(false)} />
          
          <View style={styles.drawer}>
            <SafeAreaView style={{ flex: 1 }}>
              {/* Drawer User Header */}
              <View style={styles.drawerUserSection}>
                <View style={styles.avatarPlaceholder}>
                   <Text style={styles.avatarText}>{user?.fullname?.charAt(0) || 'U'}</Text>
                </View>
                <Text style={styles.drawerUserName}>{user?.fullname || 'System User'}</Text>
                <Text style={styles.drawerUserRole}>{user?.role?.toUpperCase()}</Text>
              </View>

              <View style={styles.drawerDivider} />
              
              {/* Filtered Menu Items */}
              {filteredMenu.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.drawerItem}
                  onPress={() => {
                    setDrawerOpen(false);
                    onMenuSelect(item.key);
                  }}
                >
                  <View style={styles.drawerIconCircle}>
                    <Feather name={item.icon} size={18} color={theme.primary} />
                  </View>
                  <Text style={styles.drawerLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}

              {/* Close Button at bottom */}
              <TouchableOpacity 
                style={styles.closeDrawerBtn} 
                onPress={() => setDrawerOpen(false)}
              >
                <Feather name="chevron-left" size={20} color={theme.mutedText} />
                <Text style={styles.closeDrawerText}>Close Menu</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.surface,
      paddingTop: 10, // Added for status bar spacing
      borderBottomWidth: 1,
      borderBottomColor: theme.cardBorder,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    leftRow: { flexDirection: 'row', alignItems: 'center' },
    rightRow: { flexDirection: 'row', alignItems: 'center' },
    menuBtn: { padding: 4, marginRight: 10 },
    title: { fontSize: 18, fontWeight: '800', color: theme.text },
    userInfo: { marginRight: 8, alignItems: 'flex-end' },
    userName: { fontSize: 13, fontWeight: '700', color: theme.text },
    roleBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2 },
    roleText: { fontSize: 9, fontWeight: '800', color: theme.mutedText, textTransform: 'uppercase' },
    iconBtn: { padding: 8, borderRadius: 12, backgroundColor: theme.surfaceAlt, marginLeft: 8 },
    logoutBtn: { backgroundColor: theme.mode === 'dark' ? '#3f1d2a' : '#fff5f5' },

    // Drawer Styles
    modalContainer: { flex: 1, flexDirection: 'row' },
    backdrop: { flex: 1, backgroundColor: 'rgba(47, 53, 66, 0.7)' },
    drawer: { width: 280, backgroundColor: theme.surface, height: '100%', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
    drawerUserSection: { padding: 30, alignItems: 'center', backgroundColor: theme.background },
    avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    drawerUserName: { fontSize: 18, fontWeight: '700', color: theme.text },
    drawerUserRole: { fontSize: 12, color: theme.mutedText, marginTop: 4, fontWeight: '600' },
    drawerDivider: { height: 1, backgroundColor: theme.cardBorder, marginVertical: 10 },
    drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20 },
    drawerIconCircle: { width: 36, height: 36, borderRadius: 10, backgroundColor: theme.surfaceAlt, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    drawerLabel: { fontSize: 15, fontWeight: '600', color: theme.text },
    closeDrawerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', paddingBottom: 30 },
    closeDrawerText: { color: theme.mutedText, fontWeight: '700', marginLeft: 5 }
  });

export default Navbar;
