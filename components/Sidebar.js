import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Animated, 
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Sidebar = ({ isVisible, onClose }) => {
  // Animation values
  const translateX = useRef(new Animated.Value(-280)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  // Particle animation states
  const [particles, setParticles] = useState([]);
  
  // Generate random color
  const getRandomColor = () => {
    const colors = ['#FF5252', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0', '#00BCD4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Create particles on mount
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 4 + 2,
        position: Math.random() * 100,
        delay: Math.random() * 2000,
        duration: Math.random() * 3000 + 5000,
        color: getRandomColor()
      });
    }
    setParticles(newParticles);
  }, []);

  // Handle sidebar visibility
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -280,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [isVisible]);

  // Sidebar menu items
  const menuItems = [
    { icon: 'home-outline', label: 'Home' },
    { icon: 'document-text-outline', label: 'Notes' },
    { icon: 'folder-outline', label: 'Categories' },
    { icon: 'star-outline', label: 'Favorites' },
    { icon: 'analytics-outline', label: 'Analytics' },
    { icon: 'cloud-outline', label: 'Cloud Sync' },
    { icon: 'trash-outline', label: 'Trash' },
  ];

  // Settings and tools items
  const settingsItems = [
    { icon: 'settings-outline', label: 'Settings' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
  ];

  // Particle component
  const Particle = ({ item }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Start animation after delay
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.timing(opacity, {
                toValue: 0.7,
                duration: 1000,
                useNativeDriver: true
              }),
              Animated.timing(scale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
              })
            ]),
            Animated.parallel([
              Animated.timing(translateY, {
                toValue: -40,
                duration: item.duration,
                useNativeDriver: true
              }),
              Animated.timing(opacity, {
                toValue: 0,
                duration: item.duration,
                delay: 3000,
                useNativeDriver: true
              }),
              Animated.timing(scale, {
                toValue: 0.5,
                duration: item.duration,
                delay: 3000,
                useNativeDriver: true
              })
            ])
          ])
        ).start();
      }, item.delay);
    }, []);

    return (
      <Animated.View
        style={{
          position: 'absolute',
          width: item.size,
          height: item.size,
          borderRadius: item.size / 2,
          backgroundColor: item.color,
          left: `${item.position}%`,
          bottom: 0,
          opacity,
          transform: [{ translateY }, { scale }]
        }}
      />
    );
  };

  return (
    <>
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
            display: isVisible ? 'flex' : 'none'
          }
        ]}
        pointerEvents={isVisible ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX }]
          }
        ]}
      >
        {/* Light mode background */}
        <LinearGradient
          colors={['#f8f9fa', '#e9ecef']}
          style={styles.background}
        >
          {/* Particles container */}
          <View style={styles.particlesContainer}>
            {particles.map(particle => (
              <Particle key={particle.id} item={particle} />
            ))}
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>🧠</Text>
              <Text style={styles.logoText}>Neural<Text style={styles.logoAccent}>Note</Text></Text>
            </View>
            <Text style={styles.tagline}>AI-Powered Notes</Text>
          </View>

          {/* Menu Items */}
          <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Main Menu</Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={22} color="#333" />
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Settings & Tools</Text>
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={22} color="#555" />
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.upgradeButton} activeOpacity={0.8}>
              <LinearGradient
                colors={['#4d63ff', '#6a11cb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Ionicons name="flash-outline" size={16} color="#fff" />
                <Text style={styles.upgradeText}>Upgrade to Pro</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 280,
    height: '100%',
    zIndex: 20,
    overflow: 'hidden',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  background: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 50
  },
  particlesContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  header: {
    padding: 20,
    paddingBottom: 30
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoEmoji: {
    fontSize: 32,
    marginRight: 8
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  logoAccent: {
    color: '#4d63ff'
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginLeft: 2
  },
  menuContainer: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginLeft: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  iconContainer: {
    width: 32,
    alignItems: 'center'
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 15,
    marginHorizontal: 20
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)'
  },
  upgradeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#6a11cb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12
  },
  upgradeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8
  }
});

export default Sidebar;