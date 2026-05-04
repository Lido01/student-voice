import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Dimensions, ActivityIndicator 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFeedbacks } from '../../api/api';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation, token, user }) => {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      const res = await getFeedbacks(token);
      if (res.status === 200) {
        const data = Array.isArray(res.data) ? res.data : [];
        setStats({
          total: data.length,
          pending: data.filter(f => f.status?.toLowerCase() !== 'resolved').length,
          resolved: data.filter(f => f.status?.toLowerCase() === 'resolved').length,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const QuickAction = ({ icon, label, color, onPress }) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <Feather name={icon} size={24} color={color} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.fullname || 'User'}</Text>
        </View>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#4834d4' }]}>
          <Feather name="list" size={20} color="#fff" />
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Feedback</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#f1c40f' }]}>
          <Feather name="clock" size={20} color="#fff" />
          <Text style={styles.statNumber}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#2ecc71' }]}>
          <Feather name="check-circle" size={20} color="#fff" />
          <Text style={styles.statNumber}>{stats.resolved}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      {/* Quick Actions Grid */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        {user?.role?.toLowerCase() === 'student' && (
          <>
            <QuickAction 
              icon="plus-square" 
              label="New Feedback" 
              color="#4834d4" 
              onPress={() => navigation.navigate('Feedback')} 
            />
            <QuickAction 
              icon="book-open" 
              label="My History" 
              color="#22a6b3" 
              onPress={() => navigation.navigate('FeedbackList')} 
            />
          </>
        )}

        {(user?.role === 'admin' || user?.role === 'department') && (
          <QuickAction 
            icon="users" 
            label="Manage Users" 
            color="#eb4d4b" 
            onPress={() => navigation.navigate('Users')} 
          />
        )}

        <QuickAction 
          icon="bar-chart-2" 
          label="Analytics" 
          color="#6ab04c" 
          onPress={() => {}} 
        />
        <QuickAction 
          icon="settings" 
          label="Settings" 
          color="#535c68" 
          onPress={() => {}} 
        />
      </View>

      {/* Recent Activity Card */}
      <Text style={styles.sectionTitle}>System Status</Text>
      <TouchableOpacity style={styles.statusCard}>
        <View style={styles.statusIndicator} />
        <View>
          <Text style={styles.statusTitle}>All Systems Operational</Text>
          <Text style={styles.statusSub}>Last updated: Just now</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#747d8c" style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

Dashboard.displayName = 'Dashboard';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafd', padding: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25 
  },
  greeting: { fontSize: 14, color: '#747d8c', fontWeight: '500' },
  userName: { fontSize: 22, fontWeight: '800', color: '#2f3542' },
  roleBadge: { 
    backgroundColor: '#dfe4ea', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8 
  },
  roleText: { fontSize: 10, fontWeight: 'bold', color: '#57606f' },
  
  // Stats
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statCard: { 
    width: (width - 60) / 3, 
    padding: 15, 
    borderRadius: 20, 
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  statLabel: { fontSize: 10, color: '#fff', opacity: 0.8, marginTop: 2 },

  // Grid
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2f3542', marginBottom: 15 },
  actionGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  actionCard: { 
    backgroundColor: '#fff', 
    width: (width - 55) / 2, 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f1f2f6'
  },
  iconCircle: { padding: 12, borderRadius: 15, marginBottom: 10 },
  actionLabel: { fontSize: 14, fontWeight: '600', color: '#57606f' },

  // Status Card
  statusCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f1f2f6'
  },
  statusIndicator: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: '#2ecc71', 
    marginRight: 15 
  },
  statusTitle: { fontSize: 14, fontWeight: '700', color: '#2f3542' },
  statusSub: { fontSize: 12, color: '#a4b0be' }
});

export default Dashboard;
