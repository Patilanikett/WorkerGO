import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, IndianRupee } from 'lucide-react-native';

const Jobs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Find Jobs</Text>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#666666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search jobs..."
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {['All Jobs', 'Construction', 'Plumbing', 'Electrical', 'Painting'].map((category) =>
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  category === 'All Jobs' && styles.activeCategoryChip,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === 'All Jobs' && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        <View style={styles.jobsList}>
          {[1, 2, 3, 4, 5].map((job) => (
            <TouchableOpacity key={job} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View>
                  <Text style={styles.jobTitle}>Construction Worker</Text>
                  <Text style={styles.companyName}>ABC Constructions</Text>
                </View>
                <View style={styles.salaryTag}>
                  <IndianRupee size={14} color="#4A90E2" />
                  <Text style={styles.salaryText}>500/day</Text>
                </View>
              </View>

              <View style={styles.jobDetails}>
                <View style={styles.detailItem}>
                  <MapPin size={16} color="#666666" />
                  <Text style={styles.detailText}>Mumbai, Maharashtra</Text>
                </View>
                <Text style={styles.jobType}>Full Time</Text>
              </View>

              <Text style={styles.description}>
                Looking for experienced construction workers for a 3-month project. Must have 2+ years of experience.
              </Text>

              <View style={styles.footer}>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Apply Now</Text>
                </TouchableOpacity>
                <Text style={styles.postedTime}>Posted 2 days ago</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: '#4A90E2',
  },
  categoryText: {
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  jobsList: {
    gap: 16,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  companyName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4A90E2',
  },
  salaryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  salaryText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 4,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  jobType: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  postedTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default Jobs;