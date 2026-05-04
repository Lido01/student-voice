import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  FlatList, Alert, Image, ActivityIndicator, Switch, Modal, ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getFeedbacks, submitFeedback } from '../../../api/api';

const FeedbackScreen = ({ navigation, token, user }) => {
  const isStudent = user?.role?.toLowerCase() === 'student';
  const [feedbacks, setFeedbacks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  
  const [form, setForm] = useState({ 
    subject: '', 
    description: '', 
    category: 'academic', 
    target: 'department', // Backend Required: department or student_affair
    anonymous: false 
  });

  useEffect(() => {
    if (isStudent && token) fetchHistory();
  }, [isStudent, token]);

  const fetchHistory = async () => {
    const res = await getFeedbacks(token);
    if (res.status === 200) setFeedbacks(Array.isArray(res.data) ? res.data : []);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll access to upload photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!form.subject || !form.description) {
      Alert.alert('Missing Info', 'Please provide a subject and description.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('subject', form.subject);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('target', form.target);
      formData.append('anonymous', String(form.anonymous));

      if (image) {
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('image', { uri: image, name: filename, type });
      }

      const res = await submitFeedback(token, formData);

      if (res.id || res.status === 201) {
        Alert.alert('Success', 'Your feedback has been sent.');
        setForm({ ...form, subject: '', description: '', anonymous: false });
        setImage(null);
        fetchHistory();
      } else {
        Alert.alert('Error', res.detail || 'Failed to submit.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isStudent) return <View style={styles.centered}><Text>Access Restricted</Text></View>;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.formCard}>
            <Text style={styles.headerTitle}>Voice Your Concern</Text>
            
            <TextInput 
              style={styles.input} 
              placeholder="What is this about?" 
              value={form.subject} 
              onChangeText={(v) => setForm({...form, subject: v})}
              autoCapitalize="sentences"
              autoCorrect={false}
            />

            <View style={styles.pickerLabel}><Text style={styles.labelText}>Category</Text></View>
            <View style={styles.pickerBorder}>
              <Picker 
                selectedValue={form.category} 
                onValueChange={(v) => setForm({...form, category: v})}
              >
                <Picker.Item label="Academic" value="academic" />
                <Picker.Item label="Facility / Infrastructure" value="facility" />
                <Picker.Item label="Staff / Management" value="service" />
              </Picker>
            </View>

            <View style={styles.pickerLabel}><Text style={styles.labelText}>Send To</Text></View>
            <View style={styles.pickerBorder}>
              <Picker 
                selectedValue={form.target} 
                onValueChange={(v) => setForm({...form, target: v})}
              >
                <Picker.Item label="Department Head" value="department" />
                <Picker.Item label="Student Affairs Office" value="student_affairs" />
              </Picker>
            </View>

            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Detailed description..." 
              multiline 
              value={form.description}
              onChangeText={(v) => setForm({...form, description: v})}
              autoCapitalize="sentences"
            />

            <View style={styles.row}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Feather name={image ? "check-circle" : "camera"} size={18} color={image ? "#2ecc71" : "#4834d4"} />
                <Text style={[styles.imageText, {color: image ? "#2ecc71" : "#4834d4"}]}>
                  {image ? "Image Attached" : "Attach Photo (Optional)"}
                </Text>
              </TouchableOpacity>

              <View style={styles.anonContainer}>
                <Text style={styles.anonLabel}>Anonymous</Text>
                <Switch 
                  value={form.anonymous} 
                  onValueChange={(v) => setForm({...form, anonymous: v})}
                  trackColor={{ false: "#dfe4ea", true: "#70a1ff" }}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={submitting}>
              {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Submit Feedback</Text>}
            </TouchableOpacity>

            {/* <Text style={styles.historyTitle}>Recent Submissions</Text> */}
          </View>
        }
        // data={feedbacks}
        // keyExtractor={(item) => item.id.toString()}
        // renderItem={({ item }) => (
        //   <TouchableOpacity style={styles.historyCard} onPress={() => setSelectedFeedback(item)}>
        //     <View style={styles.historyTop}>
        //       <Text style={styles.historySubject}>{item.subject}</Text>
        //       <View style={[styles.badge, {backgroundColor: item.status === 'resolved' ? '#2ecc71' : '#f1c40f'}]}>
        //         <Text style={styles.badgeText}>{item.status}</Text>
        //       </View>
        //     </View>
        //     <Text style={styles.historyTarget}>Target: {item.target.replace('_', ' ')}</Text>
        //   </TouchableOpacity>
        // )}
      />

      {/* Details Modal */}
      {/* <Modal visible={!!selectedFeedback} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedFeedback?.subject}</Text>
              <Text style={styles.modalDesc}>{selectedFeedback?.description}</Text>
              {selectedFeedback?.image && (
                <Image source={{ uri: selectedFeedback.image }} style={styles.modalImage} resizeMode="cover" />
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedFeedback(null)}>
              <Text style={styles.closeBtnText}>Back to List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f2f6' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  formCard: { padding: 20, backgroundColor: '#fff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#2f3542', marginBottom: 20 },
  input: { backgroundColor: '#f1f2f6', borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  pickerLabel: { marginBottom: 5, paddingLeft: 5 },
  labelText: { fontSize: 12, fontWeight: 'bold', color: '#747d8c', textTransform: 'uppercase' },
  pickerBorder: { backgroundColor: '#f1f2f6', borderRadius: 12, marginBottom: 15, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  imagePicker: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f2f6', padding: 10, borderRadius: 10 },
  imageText: { marginLeft: 8, fontWeight: '600', fontSize: 14 },
  anonContainer: { flexDirection: 'row', alignItems: 'center' },
  anonLabel: { marginRight: 8, fontSize: 14, color: '#747d8c' },
  submitBtn: { backgroundColor: '#4834d4', padding: 18, borderRadius: 15, alignItems: 'center', shadowColor: '#4834d4', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  historyTitle: { fontSize: 18, fontWeight: '700', marginTop: 30, color: '#2f3542' },
  historyCard: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: 12, padding: 15, borderRadius: 15, elevation: 2 },
  historyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historySubject: { fontSize: 16, fontWeight: 'bold', color: '#2f3542' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  historyTarget: { fontSize: 12, color: '#747d8c', marginTop: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 25, padding: 25, maxHeight: '85%' },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 15 },
  modalDesc: { fontSize: 16, color: '#57606f', lineHeight: 22 },
  modalImage: { width: '100%', height: 200, borderRadius: 15, marginTop: 20 },
  closeBtn: { marginTop: 25, backgroundColor: '#2f3542', padding: 15, borderRadius: 15, alignItems: 'center' },
  closeBtnText: { color: '#fff', fontWeight: 'bold' }
});

export default FeedbackScreen;
FeedbackScreen.displayName = 'FeedbackScreen';
