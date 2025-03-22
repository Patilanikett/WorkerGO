import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Briefcase as BriefcaseIcon, MessageCircle, Star } from 'lucide-react-native';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'job',
      title: 'New Job Match',
      message: 'A new construction job in Mumbai matches your profile',
      time: '2 hours ago',
      icon: BriefcaseIcon,
      color: '#4A90E2',
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'ABC Constructions sent you a message about your application',
      time: '5 hours ago',
      icon: MessageCircle,
      color: '#34C759',
    },
    {
      id: 3,
      type: 'review',
      title: 'New Review',
      message: 'You received a 5-star rating from your last job',
      time: '1 day ago',
      icon: Star,
      color: '#FF9500',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.notificationsList}>
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <TouchableOpacity key={notification.id} style={styles.notificationCard}>
                <View style={[styles.iconContainer, { backgroundColor: `${notification.color}20` }]}>
                  <Icon size={24} color={notification.color} />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <View style={styles.preferencesList}>
            {[
              { title: 'Job Matches', description: 'Get notified about new job opportunities' },
              { title: 'Messages', description: 'Receive messages from employers' },
              { title: 'Reviews', description: 'Know when you receive new reviews' },
            ].map((preference, index) => (
              <View key={index} style={styles.preferenceItem}>
                <View style={styles.preferenceContent}>
                  <Text style={styles.preferenceTitle}>{preference.title}</Text>
                  <Text style={styles.preferenceDescription}>{preference.description}</Text>
                </View>
                <TouchableOpacity style={styles.toggleButton}>
                  <View style={[styles.toggleIndicator, { backgroundColor: '#4A90E2' }]} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1A1A1A',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  clearButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#666666',
  },
  notificationsList: {
    gap: 16,
    marginBottom: 32,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  notificationTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  preferencesSection: {
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
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  preferencesList: {
    gap: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceContent: {
    flex: 1,
  },
  preferenceTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  toggleButton: {
    width: 48,
    height: 24,
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 2,
  },
  toggleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 24,
  },
});

export default Notifications;