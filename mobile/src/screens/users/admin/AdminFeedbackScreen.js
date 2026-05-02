import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  Modal, TextInput, ActivityIndicator, Alert, ScrollView 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFeedbacks, updateFeedbackStatus, deleteFeedback } from '../../../api/api';

const AdminFeedbackScreen = ({ token, user }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [responseMsg, setResponseMsg] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchIncomingFeedback();
  }, []);

  const fetchIncomingFeedback = async () => {
    setLoading(true);
    try {
      const res = await getFeedbacks(token);
      if (res.status === 200) {
        // Filter based on role (Admins see everything)
        const userRole = user?.role?.toLowerCase();
        const filtered = userRole === 'admin' 
          ? res.data 
          : res.data.filter(item => item.target === userRole);
        setFeedbacks(filtered);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      // Build payload based on backend requirements
      // Usually, responses are stored in 'admin_response' or 'dept_response'
      const payload = { 
        status: newStatus,
        admin_response: responseMsg 
      };

      await updateFeedbackStatus(token, selectedItem.id, payload);
      Alert.alert("Success", `Feedback marked as ${newStatus}`);
      setSelectedItem(null);
      fetchIncomingFeedback();
    } catch (err) {
      Alert.alert("Error", "Failed to update feedback.");
    } finally {
      setUpdating(false);
    }
  };

  const handleResolve = async () => {
  const payload = {
    status: 'resolved',
    admin_response: responseMsg // Make sure this matches your Django field name
  };

  const res = await updateFeedbackStatus(token, selectedItem.id, payload);

  if (res.status === 200) {
    Alert.alert("Success", "Student has been notified of the resolution.");
    fetchIncomingFeedback(); // Refresh the list
    setSelectedItem(null);   // Close modal
  } else {
    Alert.alert("Error", res.detail || "Failed to update status");
  }
};

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Feedback",
      "Are you sure? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteFeedback(token, id);
              fetchIncomingFeedback();
              setSelectedItem(null);
            } catch (err) {
              Alert.alert("Error", "Delete failed.");
            }
          } 
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {
      setSelectedItem(item);
      setResponseMsg(item.admin_response || '');
    }}>
      <View style={styles.cardHeader}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={[styles.status, { color: item.status === 'resolved' ? '#2ecc71' : '#f39c12' }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.studentName}>By: {item.anonymous ? 'Anonymous' : item.student_fullname}</Text>
      <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4834d4" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}

      <Modal visible={!!selectedItem} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Feedback</Text>
              <TouchableOpacity onPress={() => confirmDelete(selectedItem?.id)}>
                <Feather name="trash-2" size={22} color="#eb4d4b" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>STUDENT MESSAGE:</Text>
                <Text style={styles.infoText}>{selectedItem?.description}</Text>
              </View>

              <Text style={styles.label}>Official Response</Text>
              <TextInput 
                style={styles.input}
                multiline
                placeholder="Type your reply here..."
                value={responseMsg}
                onChangeText={setResponseMsg}
              />

              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={[styles.btn, styles.reviewBtn]} 
                  onPress={() => handleStatusChange('review')}
                  disabled={updating}
                >
                  <Text style={styles.btnText}>Under Review</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.btn, styles.resolveBtn]} 
                  onPress={() => handleStatusChange('resolved')}
                  disabled={updating}
                >
                  <Text style={styles.btnText}>Resolve</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedItem(null)}>
                <Text style={styles.closeText}>Close Window</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fd' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  subject: { fontSize: 16, fontWeight: 'bold', color: '#2f3542', flex: 1 },
  status: { fontSize: 12, fontWeight: '800' },
  studentName: { fontSize: 13, color: '#747d8c', marginBottom: 10 },
  desc: { fontSize: 14, color: '#57606f', lineHeight: 20 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '85%', padding: 25 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold' },
  infoBox: { backgroundColor: '#f1f2f6', padding: 15, borderRadius: 12, marginBottom: 20 },
  infoLabel: { fontSize: 10, fontWeight: 'bold', color: '#a4b0be', marginBottom: 5 },
  infoText: { fontSize: 15, color: '#2f3542', lineHeight: 22 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#2f3542', marginBottom: 10 },
  input: { backgroundColor: '#f1f2f6', borderRadius: 12, padding: 15, height: 120, textAlignVertical: 'top', marginBottom: 20 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 0.48, padding: 15, borderRadius: 12, alignItems: 'center' },
  reviewBtn: { backgroundColor: '#f1c40f' },
  resolveBtn: { backgroundColor: '#2ecc71' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  closeBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  closeText: { color: '#a4b0be', fontWeight: '600' }
});

export default AdminFeedbackScreen;