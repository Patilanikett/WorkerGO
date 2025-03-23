/*import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, CodeSquare } from 'lucide-react-native';
import axios from 'axios';

export default function WorkerSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    skills: string[];
    experience: string;
    location: string;
  }>({
    name: '',
    phone: '',
    skills: [],
    experience: '',
    location: '',
  });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form data
      console.log(formData);

      const worker = {
        ...formData,
        registeredFrom: 'worker',
        experinceLevel: formData.experience,
      }
      let res = null;
      try {
        res = await axios.post('http://172.16.0.6:3000/worker/register', worker);
        console.log(res.data);
      }
      catch (err) {
        console.log(err);
      }
      // const res = await axios.post('http://localhost:3000/worker/register', worker);
      // console.log(res.data);


      if (res && res.data) {
        router.replace({
          pathname: '/(z-app)/home',
          params: { user : JSON.stringify(res.data) },
        });
      }
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
              style={[styles.input, styles.input]}
              placeholder="Work experience in years"
              keyboardType="numeric"
              numberOfLines={1}
              value={formData.experience}
              onChangeText={(text) => setFormData({ ...formData, experience: text })}
            />
            <Text style={styles.hint}>
              Tell us about your work experience in years
            </Text>
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
});*/

import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Search, X } from 'lucide-react-native';
import axios from 'axios';

export default function WorkerSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    skills: string[];
    experience: string;
    location: string;
  }>({
    name: '',
    phone: '',
    skills: [],
    experience: '',
    location: '',
  });
  
  // Available skills list - extended with more options
  const availableSkills = [
    'Construction', 'Plumbing', 'Electrical', 'Painting', 'Carpentry', 
    'Masonry', 'Tiling', 'Roofing', 'Landscaping', 'Welding', 
    'HVAC', 'Flooring', 'Drywall', 'Concrete Work', 'Cabinet Making',
    'Glazing', 'Insulation', 'Demolition', 'Fence Installation', 'Window Installation',
    'Appliance Repair', 'Paving', 'Bricklaying', 'Stucco Work', 'Siding Installation'
  ];
  
  // State for the skills search modal
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(availableSkills);

  // Filter skills based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredSkills(
        availableSkills.filter(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !formData.skills.includes(skill)
        )
      );
    } else {
      setFilteredSkills(availableSkills.filter(skill => !formData.skills.includes(skill)));
    }
  }, [searchQuery, formData.skills]);

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form data
      console.log(formData);

      const worker = {
        ...formData,
        registeredFrom: 'worker',
        experinceLevel: formData.experience,
      }
      let res = null;
      try {
        res = await axios.post('http://172.16.0.6:3000/worker/register', worker);
        console.log(res.data);
      }
      catch (err) {
        console.log(err);
      }

      if (res && res.data) {
        router.replace({
          pathname: '/(z-app)/home',
          params: { user : JSON.stringify(res.data) },
        });
      }
    }
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
    setSearchQuery('');
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
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
            
            {/* Skills label and count */}
            <View style={styles.skillsHeader}>
              <Text style={styles.skillsLabel}>Select your skills</Text>
              <Text style={styles.skillsCount}>{formData.skills.length} selected</Text>
            </View>
            
            {/* Selected skills display */}
            <View style={styles.selectedSkillsContainer}>
              {formData.skills.map((skill) => (
                <View key={skill} style={styles.selectedSkillChip}>
                  <Text style={styles.selectedSkillText}>{skill}</Text>
                  <TouchableOpacity onPress={() => removeSkill(skill)}>
                    <X size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
              
              {/* Add skill button */}
              <TouchableOpacity 
                style={styles.addSkillButton}
                onPress={() => setModalVisible(true)}
              >
                <Text>Add skill</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Work experience in years"
              keyboardType="numeric"
              numberOfLines={1}
              value={formData.experience}
              onChangeText={(text) => setFormData({ ...formData, experience: text })}
            />
            <Text style={styles.hint}>
              Tell us about your work experience in years
            </Text>
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

      {/* Skills search modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Skills</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {/* Search bar */}
            <View style={styles.searchContainer}>
              <Search size={20} color="#666666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search skills..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
            
            {/* Skills list */}
            <FlatList
              data={filteredSkills}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.skillListItem}
                  onPress={() => {
                    addSkill(item);
                    if (formData.skills.length < availableSkills.length - 1) {
                      // Keep modal open if there are more skills to add
                    } else {
                      setModalVisible(false);
                    }
                  }}
                >
                  <Text style={styles.skillListItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.skillsList}
            />
            
            {/* Close button */}
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillsLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333',
  },
  skillsCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  selectedSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  selectedSkillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
  },
  selectedSkillText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  addSkillButton: {
    width: 80,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1A1A1A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  skillsList: {
    maxHeight: 400,
  },
  skillListItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  skillListItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});