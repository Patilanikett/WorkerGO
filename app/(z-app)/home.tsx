import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Modal, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, IndianRupee, Calendar, User, Home as HomeIcon, Settings, Globe } from 'lucide-react-native';
import { useState, useEffect } from 'react';

import { NavigationProp } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

// Add this import at the top of your file with the other imports
import { Linking, Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service'; // You'll need to install this package

import axios from 'axios';

const WorkerHome = ({ navigation }: { navigation: NavigationProp<any> }) => {
  // Worker data - replace with data fetched from database
  // TODO: Fetch worker data from database and display here
  const workerData = {
    name: "Rajesh Kumar",
    skill: "Carpenter",
    rating: "4.8",
    completedJobs: 27,
    phoneNumber: "+91 98765 43210"
  };

  var flag = 0;

  // State for worker availability
  const [isAvailable, setIsAvailable] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [jobToAccept, setJobToAccept] = useState(null);
  const [acceptedJob, setAcceptedJob] = useState(null);

  // Language state
  // TODO: Fetch user's preferred language from database on component mount
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language is English
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  // State for jobs from backend
  const [availableJobs, setAvailableJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useLocalSearchParams();
  const user_data = typeof user === 'string' ? JSON.parse(user) : null;

  // Load language preference on component mount
  useEffect(() => {
    // TODO: Fetch language preference from database or local storage
  }, []);

  // Fetch all jobs when component mounts
  useEffect(() => {
    getAllJobs();
  }, []);

  // Language translations
  // TODO: For a production app, use a proper i18n library like i18next or react-i18next
  const translations = {
    en: {
      status: "Status",
      available: "Available",
      unavailable: "Unavailable",
      availableJobs: "Available Jobs",
      pastJobs: "Past Jobs",
      noJobsAvailable: "No jobs available matching your skills",
      back: "← Back",
      location: "Location:",
      duration: "Duration:",
      pay: "Pay:",
      description: "Description:",
      mapView: "Map View",
      getDirections: "Get Directions",
      acceptJob: "Accept Job",
      selectLanguage: "Select Language",
      loading: "Loading jobs...",
      languages: {
        english: "English",
        hindi: "Hindi",
        marathi: "Marathi",
        tamil: "Tamil"
      }
    },
    hi: {
      status: "स्थिति",
      available: "उपलब्ध",
      unavailable: "अनुपलब्ध",
      availableJobs: "उपलब्ध नौकरियां",
      pastJobs: "पिछली नौकरियां",
      noJobsAvailable: "आपके कौशल से मेल खाती कोई नौकरी उपलब्ध नहीं है",
      back: "← वापस",
      location: "स्थान:",
      duration: "अवधि:",
      pay: "वेतन:",
      description: "विवरण:",
      mapView: "नक्शा देखें",
      getDirections: "रास्ता पाएं",
      acceptJob: "नौकरी स्वीकार करें",
      selectLanguage: "भाषा चुनें",
      loading: "नौकरियां लोड हो रही हैं...",
      languages: {
        english: "अंग्रेज़ी",
        hindi: "हिंदी",
        marathi: "मराठी",
        tamil: "तमिल"
      }
    },
    mr: {
      status: "स्थिती",
      available: "उपलब्ध",
      unavailable: "अनुपलब्ध",
      availableJobs: "उपलब्ध कामे",
      pastJobs: "मागील कामे",
      noJobsAvailable: "तुमच्या कौशल्याशी जुळणारी कामे उपलब्ध नाहीत",
      back: "← मागे",
      location: "स्थान:",
      duration: "कालावधी:",
      pay: "वेतन:",
      description: "वर्णन:",
      mapView: "नकाशा पहा",
      getDirections: "दिशानिर्देश मिळवा",
      acceptJob: "काम स्वीकारा",
      selectLanguage: "भाषा निवडा",
      loading: "कामे लोड होत आहेत...",
      languages: {
        english: "इंग्रजी",
        hindi: "हिंदी",
        marathi: "मराठी",
        tamil: "तमिळ"
      }
    },
    ta: {
      status: "நிலை",
      available: "கிடைக்கின்றது",
      unavailable: "கிடைக்கவில்லை",
      availableJobs: "கிடைக்கும் வேலைகள்",
      pastJobs: "முந்தைய வேலைகள்",
      noJobsAvailable: "உங்கள் திறன்களுக்கு பொருந்தக்கூடிய வேலைகள் இல்லை",
      back: "← பின்செல்",
      location: "இடம்:",
      duration: "காலம்:",
      pay: "ஊதியம்:",
      description: "விவரம்:",
      mapView: "வரைபடம் காண்க",
      getDirections: "வழிகாட்டுதல்களைப் பெறுக",
      acceptJob: "வேலையை ஏற்றுக்கொள்",
      selectLanguage: "மொழியைத் தேர்ந்தெடு",
      loading: "வேலைகள் ஏற்றப்படுகின்றன...",
      languages: {
        english: "ஆங்கிலம்",
        hindi: "இந்தி",
        marathi: "மராத்தி",
        tamil: "தமிழ்"
      }
    }
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await getAllJobs();
    setRefreshing(false);
  };
  // Get translations for current language (fallback to English if translation not found)
  const t = (key: string) => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let translation = translations[currentLanguage as keyof typeof translations];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k as keyof typeof translation];
      } else {
        // Fallback to English
        translation = translations.en;
        for (const k of keys) {
          if (translation && typeof translation === 'object' && k in translation) {
            translation = translation[k as keyof typeof translation];
          }
        }
        break;
      }
    }
    
    return typeof translation === 'string' ? translation : '';
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    setLanguageModalVisible(false);
    
    // TODO: Save language preference to database or local storage
  };

  const toggleAvailability = async () => {
      setIsAvailable(!isAvailable);
      console.log("Availability changed to:", !isAvailable);
      
      const result = await axios.post('http://172.16.0.6:3000/worker/changeAvailability', { availability : !isAvailable, id: user_data.id });

      console.log("result", result.data);
  };

  // Function to fetch all jobs from backend
  /*const getAllJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://172.16.0.6:3000/emp/jobs');
      console.log("Jobs fetched:", response.data);
      
      // Check if response has data and it's in expected format
      if (response.data) {
          console.log(response.data);

        // Transform the data if needed to match your job structure
        // const formattedJobs = response.data.map(job => ({
        //   id: job.id || job._id,
        //   title: job.title || job.jobTitle || "Untitled Job",
        //   employer: job.employer || job.employerName || "Unknown Employer",
        //   location: job.location || "Location not specified",
        //   duration: job.duration || "Duration not specified",
        //   pay: job.pay || job.salary || "Pay not specified",
        //   description: job.description || "No description available",
        //   coordinates: job.coordinates || {
        //     latitude: 19.0760,
        //     longitude: 72.8777
        //   }
        // }));
        
        setAvailableJobs(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        // Set empty array if response format is unexpected
        setAvailableJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setAvailableJobs([]);
    } finally {
      setIsLoading(false);
    }
  };
*/

// Update the getAllJobs function
const getAllJobs = async () => {
  try {
    setIsLoading(true);
   
    
    // If worker has an accepted job, set it and return early
    // Otherwise, fetch available jobs as normal
    const response = await axios.get('http://172.16.0.6:3000/emp/jobs');
    
    if (response.data) {
      const workerSkills = user_data.skills;
      const filteredJobs = response.data.filter((job) => {
        if (!job.requiredSkills || !workerSkills) return false;
        return job.requiredSkills.some(skill => 
          workerSkills.includes(skill) || 
          workerSkills.some((workerSkill) => skill.toLowerCase() === workerSkill.toLowerCase())
        );
      });
      
      setAvailableJobs(filteredJobs);
    } else {
      console.error("Unexpected response format:", response.data);
      setAvailableJobs([]);
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    setAvailableJobs([]);
  } finally {
    setIsLoading(false);
  }
};
  // Completed jobs history
  // TODO: Fetch completed jobs from database
  const completedJobs = [
    {
      id: 101,
      title: 'Wardrobe Installation',
      employer: 'Patel Family',
      completedDate: '15 Mar 2025',
      pay: '1500'
    },
    {
      id: 102,
      title: 'Window Frame Repair',
      employer: 'Green Apartments',
      completedDate: '10 Mar 2025',
      pay: '700'
    }
  ];

  // State to track selected job for viewing details
  const [selectedJob, setSelectedJob] = useState(null);

  // interface Job {
  //   id: number;
  //   title: string;
  //   employer: string;
  //   location: string;
  //   duration: string;
  //   pay: string;
  //   description: string;
  //   coordinates: {
  //     latitude: number;
  //     longitude: number;
  //   };
  // }

  const viewJobDetails = (job: any) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  /*const acceptJob = (jobId: number) => {
    // TODO: Update job status in database to accepted
    // updateJobStatus(jobId, 'accepted');
    
    // Close job details view
    setSelectedJob(null);
    
    // Refresh available jobs list
    getAllJobs();
  };
*/

const withdrawJob = async () => {
  try {
    console.log("Withdraw from job:", acceptedJob.id);
    console.log("user_data", user_data.id);
    // Make API call to withdraw from job
    const response = await axios.post('http://172.16.0.6:3000/emp/withdrawJob', {
      jobId: acceptedJob.id,
      workerId: user_data.id
    });
    
    console.log("Job withdrawn response:", response.data);
    
    // Reset accepted job
    flag = 0;
    //setAcceptedJob(null);
    
    // Refresh available jobs
    getAllJobs();
    
  } catch (error) {
    console.error("Error withdrawing from job:", error);
    // Handle error appropriately
  }
};


const cancelAcceptJob = () => {
  setShowConfirmation(false);
  setJobToAccept(null);
};

const acceptJob = async (worker_id, job_id) => {
  try {
    flag = 1;
    console.log("worker_id", worker_id);
    console.log("job_id", job_id);
    const response = await axios.post('http://172.16.0.6:3000/worker/acceptJob', {
      jobId: job_id,
      workerId: worker_id
    });
    
    console.log("Job accepted response:", response.data);
    
    // Find the accepted job from available jobs
    // const jobData = availableJobs.find(job => response.data.updatedWorker === job_id);
    setAcceptedJob(response.data.updatedWorker);

    console.log("acceptedJob", acceptedJob);
    
    // Clear available jobs since we've accepted one
    setAvailableJobs([]);
    
    // Hide confirmation dialog
    setShowConfirmation(false);
    
    // Close job details if open
    setSelectedJob(null);
    
  } catch (error) {
    console.error("Error accepting job:", error);
    setShowConfirmation(false);
    // Handle error appropriately
  }
};
const openMapWithRoute = async (jobLocation: string) => {
  try {
    // First check if we have location permission
    let hasPermission = false;
    
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location to provide directions.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // For iOS
      const auth = await Geolocation.requestAuthorization('whenInUse');
      hasPermission = auth === 'granted';
    }
    
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Location permission is required to get directions.");
      return;
    }
    
    // Get current position
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Format the job location for the map URL
        const destination = encodeURIComponent(jobLocation);
        const origin = `${latitude},${longitude}`;
        
        // Create the URL for the map app
        let url;
        if (Platform.OS === 'android') {
          // Google Maps URI format for Android
          url = `google.navigation:q=${destination}&mode=d`;
          
        } else {
          // Apple Maps URI format for iOS
          url = `http://maps.apple.com/?daddr=${destination}&dirflg=d`;
        }
        
        // Check if the map app is installed
        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
          await Linking.openURL(url);
        } else {
          // Fallback to web Google Maps if the app is not installed
          const webUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
          await Linking.openURL(webUrl);
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
        Alert.alert("Error", "Could not get your current location. Please check your settings.");
        
        // Fallback to just opening the destination without current location
        const url = Platform.OS === 'android'
          ? `google.navigation:q=${encodeURIComponent(jobLocation)}`
          : `http://maps.apple.com/?daddr=${encodeURIComponent(jobLocation)}`;
          
        Linking.openURL(url).catch(err => {
          console.error("Error opening map:", err);
          Alert.alert("Error", "Could not open maps application.");
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    
  } catch (error) {
    console.error("Error in openMapWithRoute:", error);
    Alert.alert("Error", "Could not open maps for directions.");
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {!selectedJob ? (
        <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4A90E2"]}
          />
        }
      >
          {/* Worker Profile Header */}
          <View style={styles.header}>
            <View style={styles.profileRow}>
              <View style={styles.profilePicContainer}>
                <User size={40} color="#4A90E2" style={styles.profileIcon} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.workerName}>{user_data?.name || workerData.name}</Text>
                <Text style={styles.workerSkill}>{user_data.skills[0] || workerData.skill}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>★ {workerData.rating}</Text>
                  <Text style={styles.jobCount}>• {workerData.completedJobs} jobs</Text>
                </View>
              </View>
              
              {/* Language Selection Button */}
              <TouchableOpacity 
                style={styles.languageButton}
                onPress={() => setLanguageModalVisible(true)}
              >
              <Text>Change language</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={languageModalVisible}
            onRequestClose={() => setLanguageModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
                
                <TouchableOpacity 
                  style={[styles.languageOption, currentLanguage === 'en' && styles.selectedLanguage]}
                  onPress={() => changeLanguage('en')}
                >
                  <Text style={[styles.languageOptionText, currentLanguage === 'en' && styles.selectedLanguageText]}>
                    {t('languages.english')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.languageOption, currentLanguage === 'hi' && styles.selectedLanguage]}
                  onPress={() => changeLanguage('hi')}
                >
                  <Text style={[styles.languageOptionText, currentLanguage === 'hi' && styles.selectedLanguageText]}>
                    {t('languages.hindi')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.languageOption, currentLanguage === 'mr' && styles.selectedLanguage]}
                  onPress={() => changeLanguage('mr')}
                >
                  <Text style={[styles.languageOptionText, currentLanguage === 'mr' && styles.selectedLanguageText]}>
                    {t('languages.marathi')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.languageOption, currentLanguage === 'ta' && styles.selectedLanguage]}
                  onPress={() => changeLanguage('ta')}
                >
                  <Text style={[styles.languageOptionText, currentLanguage === 'ta' && styles.selectedLanguageText]}>
                    {t('languages.tamil')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.closeModalButton}
                  onPress={() => setLanguageModalVisible(false)}
                >
                  <Text style={styles.closeModalText}>{t('back')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          // Add this after the Language Selection Modal in the return statement
{/* Job Acceptance Confirmation Modal */}
<Modal
  animationType="slide"
  transparent={true}
  visible={showConfirmation}
  onRequestClose={() => setShowConfirmation(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{t('confirmJobAcceptance')}</Text>
      <Text style={styles.confirmationText}>{t('confirmJobText')}</Text>
      
      <View style={styles.confirmationButtons}>
        <TouchableOpacity 
          style={[styles.confirmationButton, styles.cancelButton]}
          onPress={cancelAcceptJob}
        >
          <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.confirmationButton, styles.confirmButton]}
          onPress={() => {
            if (jobToAccept) {
              acceptJob(user_data.id, jobToAccept);
            }
          }}
        >
          <Text style={styles.confirmButtonText}>{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

          {/* Availability Toggle */}
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityLabel}>
              {t('status')}: <Text style={isAvailable ? styles.availableText : styles.unavailableText}>
                {isAvailable ? t('available') : t('unavailable')}
              </Text>
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#4A90E2" }}
              thumbColor={isAvailable ? "#ffffff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAvailability}
              value={isAvailable}
            />
          </View>

         {/* Available Jobs Section */}
<View style={styles.section}>
{/* Available Jobs Section */}
{acceptedJob && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{t('availableJobs')}</Text>

    {isLoading ? (
      <Text style={styles.loadingText}>{t('loading')}</Text>
    ) : availableJobs.length > 0 ? (
      availableJobs.map((job: any) => (
        <TouchableOpacity 
          key={job.id} 
          style={styles.jobCard}
          onPress={() => viewJobDetails(job)}
        >
          <View style={styles.jobContent}>
            <View style={styles.jobpanel}>
              <View style={styles.jobinfo}>
                <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                <Text style={styles.jobEmployer}>{job.companyName}</Text>
              </View>
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={() => acceptJob(user_data.id, job.id)}
              >
                <Text style={styles.acceptButtonText}>{t('acceptJob')}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.jobDescription}>{job.description}</Text>
            
            <View style={styles.jobDetails}>
              <View style={styles.jobDetailItem}>
                <MapPin size={16} color="#666666" />
                <Text style={styles.jobDetailText}>{job.locality}</Text>
              </View>
              
              <View style={styles.jobDetailItem}>
                <Clock size={16} color="#666666" />
                <Text style={styles.jobDetailText}>{job.totalDays} {t('days')}</Text>
              </View>
              <View style={styles.jobDetailItem}>
                <IndianRupee size={16} color="#666666" />
                <Text style={styles.jobDetailText}>{job.salary} {t('perDay')}</Text>
              </View>
            </View>

            <View style={styles.requiredSkills}>
              <Text style={styles.skillsLabel}>{t('requiredSkills')}: </Text>
              <Text style={styles.skillsText}>
                {job.requiredSkills.join(', ')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <View style={styles.section}>
    <Text style={styles.sectionTitle}>{t('acceptedJob')}</Text>
    <View style={styles.jobCard}>
      <View style={styles.jobContent}>
        <View style={styles.jobpanel}>
          <View style={styles.jobinfo}>
            <Text style={styles.jobTitle}>{acceptedJob.jobTitle}</Text>
            <Text style={styles.jobEmployer}>{acceptedJob.companyName}</Text>
          </View>
        </View>
        <Text style={styles.jobDescription}>{acceptedJob.description}</Text>
        
        <View style={styles.jobDetails}>
          <View style={styles.jobDetailItem}>
            <MapPin size={16} color="#666666" />
            <Text style={styles.jobDetailText}>{acceptedJob.locality}</Text>
          </View>
          
          <View style={styles.jobDetailItem}>
            <Clock size={16} color="#666666" />
            <Text style={styles.jobDetailText}>{acceptedJob.totalDays} {t('days')}</Text>
          </View>
          <View style={styles.jobDetailItem}>
            <IndianRupee size={16} color="#666666" />
            <Text style={styles.jobDetailText}>{acceptedJob.salary} {t('perDay')}</Text>
          </View>
        </View>

        <View style={styles.requiredSkills}>
          <Text style={styles.skillsLabel}>{t('requiredSkills')}: </Text>
          <Text style={styles.skillsText}>
            {acceptedJob.requiredSkills ? acceptedJob.requiredSkills.join(', ') : ''}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.withdrawButton}
          onPress={withdrawJob}
        >
          <Text style={styles.withdrawButtonText}>{'Withdraw Job'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
    )}
  </View>
)}
{/* Accepted Job Card */}
{/* {acceptedJob && (
  
)} */}

  {/* {isLoading ? (
    <Text style={styles.loadingText}>{t('loading')}</Text>
  ) : availableJobs.length > 0 ? (
    availableJobs.map((job: any) => (
      <TouchableOpacity 
        key={job.id} 
        style={styles.jobCard}
        onPress={() => viewJobDetails(job)}
      >
        <View style={styles.jobContent}>
        <View style={styles.jobpanel}>
        <View style={styles.jobinfo}>
          <Text style={styles.jobTitle}>{job.jobTitle}</Text>
          <Text style={styles.jobEmployer}>{job.companyName}</Text>
        </View>
          <TouchableOpacity 
              style={styles.acceptButton}
              onPress={() => acceptJob(user_data.id, job.id)}
            >
              <Text style={styles.acceptButtonText}>{t('acceptJob')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.jobDescription}>{job.description}</Text>
          
          <View style={styles.jobDetails}>
            <View style={styles.jobDetailItem}>
              <MapPin size={16} color="#666666" />
              <Text style={styles.jobDetailText}>{job.locality}</Text>
            </View>
            
            <View style={styles.jobDetailItem}>
              <Clock size={16} color="#666666" />
              <Text style={styles.jobDetailText}>{job.totalDays} {t('days')}</Text>
            </View>
            <View style={styles.jobDetailItem}>
              <IndianRupee size={16} color="#666666" />
              <Text style={styles.jobDetailText}>{job.salary} {t('perDay')}</Text>
            </View>
          </View>

          <View style={styles.requiredSkills}>
            <Text style={styles.skillsLabel}>{t('requiredSkills')}: </Text>
            <Text style={styles.skillsText}>
              {job.requiredSkills.join(', ')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ))
  ) : (
    <Text style={styles.noJobsText}>{t('noJobsAvailable')}</Text>
  )} */}
</View>

          {/* Completed Jobs Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('pastJobs')}</Text>
            {completedJobs.map((job) => (
              <View key={job.id} style={styles.completedJobCard}>
                <View style={styles.completedJobContent}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobEmployer}>{job.employer}</Text>
                  <View style={styles.jobDetails}>
                    <View style={styles.jobDetailItem}>
                      <Calendar size={16} color="#666666" />
                      <Text style={styles.jobDetailText}>{job.completedDate}</Text>
                    </View>
                    <View style={styles.jobDetailItem}>
                      <IndianRupee size={16} color="#666666" />
                      <Text style={styles.jobDetailText}>{job.pay}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        /* Job Details View */
        <View style={styles.jobDetailsContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={closeJobDetails}
          >
            <Text style={styles.backButtonText}>{t('back')}</Text>
          </TouchableOpacity>
          
          <View style={styles.jobDetailsContent}>
            <Text style={styles.jobDetailsTitle}>{selectedJob.jobTitle}</Text>
            <Text style={styles.jobDetailsEmployer}>{selectedJob.companyName}</Text>
            
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>{t('location')}</Text>
              <Text style={styles.detailValue}>{selectedJob.locality}</Text>
            </View>
            
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>{t('duration')}</Text>
              <Text style={styles.detailValue}>{selectedJob.totalDays}</Text>
            </View>
            
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>{t('pay')}</Text>
              <Text style={styles.detailValue}>${selectedJob.salary}</Text>
            </View>
            
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>{t('description')}</Text>
              <Text style={styles.detailValue}>{selectedJob.description}</Text>
            </View>
            
            {/* Mini Map UI - Placeholder */}
            <View style={styles.mapContainer}>
              <Text style={styles.mapPlaceholder}>{t('mapView')}</Text>
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => openMapWithRoute(user_data.locality)}
              >
                <MapPin size={16} color="#FFFFFF" />
                <Text style={styles.mapButtonText}>{t('getDirections')}</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={() => {
                console.log("Accept job:", selectedJob.id);
                console.log("user_data", user_data.id);
                acceptJob(user_data.id, selectedJob.id)}
              }
            >
              <Text style={styles.acceptButtonText}>{t('acceptJob')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Bottom Navigation */}
    </SafeAreaView>
  );
}

// Styles object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // For bottom nav
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  jobinfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobpanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillsLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  skillsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  requiredSkills: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
  },
  profilePicContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileIcon: {
    backgroundColor: '#E6F0FF',
  },
  profileInfo: {
    flex: 1,
  },
  workerName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1A1A1A',
  },
  workerSkill: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF9500',
  },
  jobCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  languageButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#E6F0FF',
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  availabilityLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1A1A1A',
  },
  availableText: {
    color: '#4CAF50',
    fontFamily: 'Poppins-SemiBold',
  },
  unavailableText: {
    color: '#F44336',
    fontFamily: 'Poppins-SemiBold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  jobContent: {
    padding: 16,
  },
  jobTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  jobEmployer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 8,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobDetailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  completedJobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  completedJobContent: {
    padding: 16,
  },
  noJobsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  },withdrawButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  withdrawButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  jobDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    padding: 16,
  },
  jobDetailsContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // For bottom nav
  },
  backButton: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#4A90E2',
  },
  jobDetailsContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  jobDetailsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  jobDetailsEmployer: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 12,
  },
  detailLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1A1A1A',
  },
  mapContainer: {
    height: 150,
    backgroundColor: '#E1E8ED',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholder: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#666666',
  },
  mapButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  mapButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    width: 90,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  acceptButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavButton: {
    borderTopWidth: 3,
    borderTopColor: '#4A90E2',
  },
  navText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  activeNavText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#4A90E2',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  languageOption: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLanguage: {
    backgroundColor: '#E6F0FF',
  },
  languageOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  selectedLanguageText: {
    color: '#4A90E2',
  },
  closeModalButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F0F2F5',
    width: '100%',
    alignItems: 'center',
  },
  closeModalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#666666',
  },
  confirmationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  // Add these new styles to your StyleSheet
confirmationButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 20,
},
confirmationButton: {
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  width: '48%',
  alignItems: 'center',
},
cancelButton: {
  backgroundColor: '#F0F2F5',
},
confirmButton: {
  backgroundColor: '#4CAF50',
},
cancelButtonText: {
  fontFamily: 'Poppins-Medium',
  fontSize: 16,
  color: '#666666',
},
confirmButtonText: {
  fontFamily: 'Poppins-Medium',
  fontSize: 16,
  color: '#FFFFFF',
},
withdrawButton: {
  backgroundColor: '#F44336',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
},
withdrawButtonText: {
  fontFamily: 'Poppins-SemiBold',
  fontSize: 16,
  color: '#FFFFFF',
},
});

export default WorkerHome;