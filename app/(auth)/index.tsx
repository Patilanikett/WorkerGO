import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = () => {
  return (
    <LinearGradient
      colors={['#4A90E2', '#357ABD']}
      style={styles.container}
    >
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&q=80&w=800' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>WorkerGo</Text>
        <Text style={styles.subtitle}>Connect with opportunities</Text>
        
        <View style={styles.buttonContainer}>
          <Link href="/worker-signup" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>I'm a Worker</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.languageSelector}>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>हिंदी</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>తెలుగు</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    color: '#FFFFFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
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
  employerButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#357ABD',
  },
  employerButtonText: {
    color: '#FFFFFF',
  },
  languageSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  languageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  languageText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Welcome;