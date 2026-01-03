import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: "Create & Discover Events You'll Love",
    description:
      'From Concert to Festivals,comedy shows to Local Meetups, you can find all right here. Get ready to explore.',
    image: require('../assets/onboarding3.jpg'),
  },
  {
    id: '2',
    title: 'Buy A Tickets in A Seconds',
    description:
      'Find an Event You Prefer? Cool ! With just a few Taps, you can secure your spot. No Delay,no waiting -just fast,Easy for Ticket Booking.',
    image: require('../assets/onboarding2.jpg'),
  },
  {
    id: '3',
    title: 'Keep Track of Your Events & Tickets',
    description:
      'Access your tickets,check event details,and get reminders about upcoming events in one place .',
    image: require('../assets/onboarding1.jpg'),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('Register');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        {/* Curved bottom overlay */}
        <Svg
          height="120"
          width={width}
          style={styles.curvedOverlay}
          viewBox={`0 0 ${width} 120`}
        >
          <Path
            d={`M 0 0 Q ${width / 2} 120 ${width} 0 L ${width} 120 L 0 120 Z`}
            fill="#000000"
          />
        </Svg>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E090B',
  },
  slide: {
    width: width,
    height: height,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    marginLeft: -1,
    position: 'relative',
    overflow: 'hidden',
    opacity: 0.5,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginBottom: 20,
  },
  activeDot: {
    backgroundColor: '#5A8B8B',
  },
  inactiveDot: {
    backgroundColor: '#4A4A4A',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  button: {
    width: 129,
    height: 40,
    backgroundColor: '#2A4A4A',
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // Shadow for iOS
    shadowColor: '#3d5858ff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    // Shadow for Android
    elevation: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Arial',
  },
});