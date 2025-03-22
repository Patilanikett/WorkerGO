import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function WorkerSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skills: [],
    experience: '',
    location: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.replace('/(app)');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => step > 1 ? setStep(step - 1) : router.back()}
      >
        <ArrowLeft color="#333" size={24} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Create Worker Profile</Text>
        <View style={styles.stepIndicator}>
          {[1, 2, 3].map((num) => (
            <View
              key={num}
              style={[
                styles.stepDot,
                num === step && styles.activeStepDot,
                num < step && styles.completedStepDot,
              ]}
            />
          ))}
        </View>

        {step === 1 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
          </View>
        )}

        {step === 2 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            <View style={styles.skillsContainer}>
              {['Construction', 'Plumbing', 'Electrical', 'Painting', 'Carpentry'].map((skill) => (
                <TouchableOpacity
                  key={skill}
                  style={[
                    styles.skillChip,
                    formData.skills.includes(skill) && styles.selectedSkillChip,
                  ]}
                  onPress={() => {
                    const newSkills = formData.skills.includes(skill)
                      ? formData.skills.filter((s) => s !== skill)
                      : [...formData.skills, skill];
                    setFormData({ ...formData, skills: newSkills });
                  }}
                >
                  <Text
                    style={[
                      styles.skillText,
                      formData.skills.includes(skill) && styles.selectedSkillText,
                    ]}
                  >
                    {skill}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about your work experience"
              multiline
              numberOfLines={4}
              value={formData.experience}
              onChangeText={(text) => setFormData({ ...formData, experience: text })}
            />
          </View>
        )}

        {step === 3 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Location"
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
            />
            <Text style={styles.hint}>
              Enter your area or landmark for better job matches
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {step === 3 ? 'Complete Profile' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    padding: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  activeStepDot: {
    backgroundColor: '#4A90E2',
    width: 24,
  },
  completedStepDot: {
    backgroundColor: '#4A90E2',
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  selectedSkillChip: {
    backgroundColor: '#4A90E2',
  },
  skillText: {
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  selectedSkillText: {
    color: '#FFFFFF',
  },
  hint: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});