import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  FlatList, Alert, Image, ActivityIndicator, Switch, Modal 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Navbar from '../../Navbar';
import { getFeedbacks, submitFeedback } from '../../../api/api';

const FeedbackScreen = ({ navigation, route }) => {
  const { token, user } = route.params || {};
  
  // 1. Role Check: Only allow students
  const isStudent = user?.role === 'student';

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // For Detail Modal
  
  const [form, setForm] = useState({ 
    subject: '', 
    description: '', 
    category: 'academic', 
    target: 'department',
    anonymous: false 
  });

  useEffect(() => {
    if (isStudent) fetchFeedbacks();
  }, [token]);

  const fetchFeedbacks = async () => {
    if (token) {
      const response = await getFeedbacks(token);
      if (response.status === 200) {
        setFeedbacks(response.data);
      }
    }
  };

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!form.subject || !form.description) {
      Alert.alert('Error', 'Please fill in required fields.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('subject', form.subject);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('target', form.target);
      // Send as boolean string for backend
      formData.append('anonymous', String(form.anonymous));

      if (image) {
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('image', { uri: image, name: filename, type });
      }

      const res = await submitFeedback(token, formData);

      if (res.status === 201 || res.id) {
        Alert.alert('Success', 'Feedback submitted!');
        setForm({ subject: '', description: '', category: 'academic', target: 'department', anonymous: false });
        setImage(null);
        fetchFeedbacks();
      } else {
        Alert.alert('Error', res.detail || "Submission failed.");
      }
    } catch (err) {
      Alert.alert('Error', 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!isStudent) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Access Denied. Only students can submit feedback.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={{color: '#fff'}}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return '#4cd137';
      case 'review': return '#fbc531';
      default: return '#7f8c8d';
    }
  };

  const renderFeedbackItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedFeedback(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardSubject}>{item.subject}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status?.toUpperCase()}</Text>
        </View>
      </View>
      <Text numberOfLines={2} style={styles.cardDesc}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardMeta}>📍 {item.target}</Text>
        {item.anonymous && <Text style={styles.anonBadge}>Anonymous</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar title="Feedback Center" onNotificationPress={() => navigation.navigate('Dashboard', { token })} />
      
      <FlatList
        ListHeaderComponent={
          <View style={styles.formContainer}>
            <Text style={styles.headerTitle}>New Feedback</Text>
            
            <TextInput 
              style={styles.input} 
              placeholder="Subject" 
              value={form.subject} 
              onChangeText={v => handleChange('subject', v)} 
            />

            <View style={styles.row}>
                <Text style={styles.label}>Submit Anonymously?</Text>
                <Switch 
                    value={form.anonymous} 
                    onValueChange={(v) => handleChange('anonymous', v)}
                    trackColor={{ false: "#767577", true: "#2ecc71" }}
                />
            </View>

            <View style={styles.pickerWrapper}>
              <Picker selectedValue={form.category} onValueChange={(v) => handleChange('category', v)} style={styles.picker}>
                <Picker.Item label="Academic Issue" value="academic" />
                <Picker.Item label="Facility Issue" value="facility" />
                <Picker.Item label="Service Issue" value="service" />
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Picker selectedValue={form.target} onValueChange={(v) => handleChange('target', v)} style={styles.picker}>
                <Picker.Item label="Target: Department" value="department" />
                <Picker.Item label="Target: Student Affairs" value="student_affairs" />
              </Picker>
            </View>

            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Describe your concern..." 
              value={form.description} 
              onChangeText={v => handleChange('description', v)} 
              multiline 
            />

            <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
              <Text style={styles.imageBtnText}>{image ? '📸 Photo Attached' : '📷 Attach Evidence'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Send Feedback</Text>}
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>My Sent Feedback</Text>
          </View>
        }
        data={feedbacks}
        keyExtractor={item => item.id?.toString()}
        renderItem={renderFeedbackItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      {/* DETAIL MODAL */}
      <Modal visible={!!selectedFeedback} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedFeedback?.subject}</Text>
                <ScrollView>
                    <Text style={styles.modalLabel}>Description:</Text>
                    <Text style={styles.modalValue}>{selectedFeedback?.description}</Text>
                    
                    <Text style={styles.modalLabel}>Category: <Text style={styles.modalValue}>{selectedFeedback?.category}</Text></Text>
                    <Text style={styles.modalLabel}>Target: <Text style={styles.modalValue}>{selectedFeedback?.target}</Text></Text>
                    <Text style={styles.modalLabel}>Status: <Text style={[styles.modalValue, {color: getStatusColor(selectedFeedback?.status)}]}>{selectedFeedback?.status}</Text></Text>
                    
                    {selectedFeedback?.image && (
                        <Image source={{ uri: selectedFeedback.image }} style={styles.modalImage} resizeMode="contain" />
                    )}
                </ScrollView>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedFeedback(null)}>
                    <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  formContainer: { padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e272e', marginBottom: 15 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  textArea: { height: 80, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  label: { fontSize: 16, color: '#2f3542' },
  pickerWrapper: { backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  picker: { height: 50 },
  imageBtn: { padding: 12, borderRadius: 8, borderStyle: 'dashed', borderWidth: 1, borderColor: '#3498db', alignItems: 'center', marginBottom: 15 },
  imageBtnText: { color: '#3498db' },
  submitBtn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 10 },
  card: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 10, padding: 15, marginBottom: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardSubject: { fontWeight: 'bold', fontSize: 16, flex: 1 },
  statusBadge: { padding: 4, borderRadius: 4 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  anonBadge: { fontSize: 12, color: '#e67e22', fontStyle: 'italic' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalLabel: { fontWeight: 'bold', marginTop: 10, color: '#7f8c8d' },
  modalValue: { fontWeight: 'normal', color: '#2c3e50' },
  modalImage: { width: '100%', height: 200, marginTop: 15, borderRadius: 10 },
  closeBtn: { marginTop: 20, backgroundColor: '#34495e', padding: 12, borderRadius: 8, alignItems: 'center' },
  closeBtnText: { color: '#fff', fontWeight: 'bold' },
  errorText: { fontSize: 18, textAlign: 'center', color: '#e74c3c', marginBottom: 20 },
  backBtn: { backgroundColor: '#3498db', padding: 10, borderRadius: 5 }
});

export default FeedbackScreen;