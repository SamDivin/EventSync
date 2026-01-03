import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

const CheckIcon = () => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="45" fill="#5A8B8B" />
    <Path
      d="M30 50 L45 65 L70 35"
      stroke="#FFFFFF"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function SuccessScreen({ navigation, route }) {
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const action = route?.params?.action || 'registered';

  useEffect(() => {
    // Animate check icon
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();

    // Auto navigate to Home after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Animated Check Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <CheckIcon />
        </Animated.View>

        {/* Success Text */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.subtitle}>
            {action === 'login'
              ? 'You have successfully logged in'
              : 'Your account has been created successfully'}
          </Text>

          {/* Loading indicator */}
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <Animated.View
                style={[
                  styles.loadingProgress,
                  {
                    width: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.loadingText}>Taking you to home...</Text>
          </View>
        </Animated.View>

        {/* Manual Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.continueButtonText}>Continue Now</Text>
        </TouchableOpacity>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decoration1} />
      <View style={styles.decoration2} />
      <View style={styles.decoration3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E090B',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    zIndex: 10,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  loadingBar: {
    width: '80%',
    height: 4,
    backgroundColor: '#1A1A1A',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#5A8B8B',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: '#5A8B8B',
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: '#5A8B8B',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#5A8B8B',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Decorative circles
  decoration1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#5A8B8B',
    opacity: 0.05,
  },
  decoration2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#5A8B8B',
    opacity: 0.05,
  },
  decoration3: {
    position: 'absolute',
    top: '50%',
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#5A8B8B',
    opacity: 0.03,
  },
});