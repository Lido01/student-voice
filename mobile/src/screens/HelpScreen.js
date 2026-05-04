import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  LayoutAnimation, Platform, UIManager, Linking 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What is Student Voice?",
      answer: "Student Voice is a digital bridge between students and university administration. It allows you to submit academic or facility concerns directly to the relevant department heads or student affairs officers."
    },
    {
      question: "Is my feedback really anonymous?",
      answer: "Yes! If you toggle the 'Anonymous' switch, your name and ID are stripped from the submission. Only the content and category are sent to the department."
    },
    {
      question: "How long does a response take?",
      answer: "Responses typically take 3-5 business days depending on the complexity of the issue and the department's current workload."
    },
    {
      question: "Can I edit a submitted feedback?",
      answer: "Currently, once a feedback is submitted, it cannot be edited to ensure data integrity. However, you can add follow-up comments once a staff member responds."
    }
  ];

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const contactSupport = (method) => {
    const url = method === 'email' ? 'mailto:support@university.edu' : 'tel:+123456789';
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* App Mission Section */}
      <View style={styles.missionCard}>
        <MaterialCommunityIcons name="megaphone-variant-outline" size={40} color="#fff" />
        <Text style={styles.missionTitle}>Our Mission</Text>
        <Text style={styles.missionDesc}>
          Empowering students by providing a transparent, efficient, and accountable 
          platform to ensure every concern is heard and every issue is addressed.
        </Text>
      </View>

      {/* FAQ Section */}
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      <View style={styles.faqContainer}>
        {faqs.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.faqItem} 
            onPress={() => toggleExpand(index)}
            activeOpacity={0.7}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Feather 
                name={expandedIndex === index ? "chevron-up" : "chevron-down"} 
                size={18} 
                color="#747d8c" 
              />
            </View>
            {expandedIndex === index && (
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact Section */}
      <Text style={styles.sectionTitle}>Still need help?</Text>
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.contactBtn} onPress={() => contactSupport('email')}>
          <Feather name="mail" size={20} color="#4834d4" />
          <Text style={styles.contactBtnText}>Email Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.contactBtn, { borderColor: '#2ecc71' }]} onPress={() => contactSupport('call')}>
          <Feather name="phone" size={20} color="#2ecc71" />
          <Text style={[styles.contactBtnText, { color: '#2ecc71' }]}>Call Office</Text>
        </TouchableOpacity>
      </View>

      {/* App Info Footer */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Student Voice v2.4.0</Text>
        <Text style={styles.copyrightText}>© 2026 University Tech Division</Text>
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafd', padding: 20 },
  
  missionCard: { 
    backgroundColor: '#4834d4', 
    padding: 25, 
    borderRadius: 25, 
    alignItems: 'center',
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#4834d4',
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  missionTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginTop: 10, marginBottom: 8 },
  missionDesc: { fontSize: 14, color: '#fff', textAlign: 'center', opacity: 0.9, lineHeight: 20 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2f3542', marginBottom: 15 },
  
  faqContainer: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', marginBottom: 30, borderWidth: 1, borderColor: '#f1f2f6' },
  faqItem: { padding: 18, borderBottomWidth: 1, borderBottomColor: '#f1f2f6' },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { fontSize: 15, fontWeight: '600', color: '#2f3542', flex: 1, paddingRight: 10 },
  faqAnswer: { fontSize: 14, color: '#747d8c', marginTop: 12, lineHeight: 20 },

  contactRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  contactBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff', 
    width: '48%', 
    padding: 15, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#4834d4' 
  },
  contactBtnText: { marginLeft: 8, fontWeight: 'bold', color: '#4834d4' },

  footer: { alignItems: 'center', marginTop: 10 },
  versionText: { fontSize: 12, color: '#a4b0be', fontWeight: 'bold' },
  copyrightText: { fontSize: 11, color: '#ced6e0', marginTop: 2 }
});

export default HelpScreen;
HelpScreen.displayName = 'HelpScreen';
