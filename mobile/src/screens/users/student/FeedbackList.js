import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  Modal, ScrollView, Image, ActivityIndicator 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getFeedbacks } from '../../../api/api';

const FeedbackListScreen = ({ token, user }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchMyFeedback();
  }, [token]);

  const fetchMyFeedback = async () => {
    setLoading(true);
    const res = await getFeedbacks(token);
    if (res.status === 200) {
      setFeedbacks(Array.isArray(res.data) ? res.data : []);
    }
    setLoading(false);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return { bg: '#e1f7ec', text: '#2ecc71', icon: 'check-circle' };
      case 'pending': return { bg: '#fff4e5', text: '#f39c12', icon: 'clock' };
      default: return { bg: '#f1f2f6', text: '#747d8c', icon: 'info' };
    }
  };

  const renderItem = ({ item }) => {
    const style = getStatusStyle(item.status);
    const hasResponse = item.admin_response || item.dept_response;

    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => setSelectedItem(item)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.subjectText} numberOfLines={1}>{item.subject}</Text>
          <View style={[styles.statusBadge, { backgroundColor: style.bg }]}>
            <Text style={[styles.statusText, { color: style.text }]}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.dateText}>{new Date(item.created_at).toLocaleDateString()}</Text>
        
        {hasResponse && (
          <View style={styles.responseAlert}>
            <Feather name="message-circle" size={14} color="#4834d4" />
            <Text style={styles.responseText}> Response received</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator size="large" color="#4834d4" style={{flex: 1}} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="folder-minus" size={50} color="#dfe4ea" />
            <Text style={styles.emptyText}>No feedback submitted yet.</Text>
          </View>
        }
      />

      {/* DETAIL VIEW MODAL */}
      <Modal visible={!!selectedItem} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Feedback Details</Text>
              <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Feather name="x" size={24} color="#2f3542" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.detailSection}>
                <Text style={styles.label}>Subject</Text>
                <Text style={styles.value}>{selectedItem?.subject}</Text>
                
                <Text style={styles.label}>Your Description</Text>
                <Text style={styles.descriptionText}>{selectedItem?.description}</Text>
                
                {selectedItem?.image && (
                  <Image source={{ uri: selectedItem.image }} style={styles.attachedImage} />
                )}
              </View>

              {/* RESPONSE SECTION */}
              <View style={styles.responseBox}>
                <Text style={styles.responseLabel}>Official Response</Text>
                {selectedItem?.admin_response || selectedItem?.dept_response ? (
                  <Text style={styles.responseBody}>
                    {selectedItem.admin_response || selectedItem.dept_response}
                  </Text>
                ) : (
                  <Text style={styles.noResponseText}>Pending review by the department.</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    padding: 16, 
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subjectText: { fontSize: 16, fontWeight: '700', color: '#2f3542', flex: 1, marginRight: 10 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  dateText: { fontSize: 12, color: '#a4b0be', marginTop: 4 },
  responseAlert: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f1f2f6' },
  responseText: { fontSize: 13, color: '#4834d4', fontWeight: '600' },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#a4b0be', marginTop: 10 },
  
  // Modal Styles
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, height: '85%', padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#2f3542' },
  detailSection: { marginBottom: 20 },
  label: { fontSize: 12, color: '#747d8c', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  value: { fontSize: 18, color: '#2f3542', fontWeight: '600', marginBottom: 15 },
  descriptionText: { fontSize: 15, color: '#57606f', lineHeight: 22, marginBottom: 15 },
  attachedImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
  responseBox: { backgroundColor: '#f8faff', padding: 20, borderRadius: 15, borderLeftWidth: 4, borderLeftColor: '#4834d4' },
  responseLabel: { fontSize: 14, fontWeight: 'bold', color: '#4834d4', marginBottom: 8 },
  responseBody: { fontSize: 15, color: '#2f3542', fontStyle: 'italic', lineHeight: 22 },
  noResponseText: { fontSize: 14, color: '#a4b0be', fontStyle: 'italic' }
});

export default FeedbackListScreen;
