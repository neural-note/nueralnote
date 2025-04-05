import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: '#aaa' }}>Start building the AI note editor here 🛠️📝</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // dark mode vibes
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
