import React, { useState } from 'react';
import { 
  View, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  StatusBar,
} from 'react-native';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Types for props
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Neural-Note' }) => {
  // State for sidebar menu
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Toggle sidebar menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  
  // Handle profile press
  const handleProfilePress = () => {
    // Navigate to profile or show profile modal
    console.log('Profile pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        backgroundColor="#f8f9fa" 
        barStyle="dark-content" 
      />
      
      {/* Main Container */}
      <View style={styles.container}>
        {/* Navbar */}
        <Navbar 
          onMenuPress={toggleMenu} onLogout={undefined} />
        
        {/* Content Area */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          {children}
        </ScrollView>
      </View>
      
      {/* Sidebar */}
      <Sidebar 
        isVisible={menuVisible} 
        onClose={toggleMenu} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  }
});

export default Layout;