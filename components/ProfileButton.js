import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Animated, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const ProfileButton = ({ username = "Gaurav Soni", email = "sonigaurav2021@gmail.com", onLogout, accentColor }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const showModal = () => {
        setModalVisible(true);
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5, // Reduced friction for smoother animation
                tension: 60, // Adjusted tension for better spring feel
                useNativeDriver: true,
                velocity: 3, // Added initial velocity for a more dynamic feel
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400, // Increased duration for smoother fade-in
                useNativeDriver: true,
            })
        ]).start();
    };
    
    const hideModal = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setModalVisible(false);
        });
    };

    return (
        <View>
            {/* Profile Button */}
            <TouchableOpacity
                onPress={showModal}
                style={{
                    padding: 2,
                    borderRadius: 20,
                    overflow: 'hidden',
                }}
            >
                <Animated.View
                    style={{
                        borderWidth: 2,
                        borderColor: accentColor,
                        borderRadius: 18,
                        overflow: 'hidden',
                        shadowColor: accentColor,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 8,
                        elevation: 4,
                    }}
                >
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/152?img=4' }}
                        style={{ width: 32, height: 32, borderRadius: 16 }}
                    />
                </Animated.View>
            </TouchableOpacity>

            {/* AI Status Indicator */}
            <Animated.View style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: accentColor,
                borderWidth: 2,
                borderColor: '#f8f9fa',
                position: 'absolute',
                bottom: 0,
                right: 0,
            }} />

            {/* Profile Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none"
                onRequestClose={hideModal}
            >
                <Pressable 
                    style={{
                        flex: 1,
                        justifyContent: 'center', // Center vertically
                        alignItems: 'center', // Center horizontally
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly darker background for better contrast
                    }}
                    onPress={hideModal}
                >
                    <Animated.View
                        style={{
                            transform: [
                                { scale: scaleAnim },
                                // Slight upward movement during animation for a more pleasing effect
                                { translateY: scaleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [20, 0]
                                })}
                            ],
                            opacity: opacityAnim,
                            width: windowWidth * 0.75,
                            maxWidth: 320,
                            borderRadius: 24, // Slightly more rounded corners
                            overflow: 'hidden',
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            elevation: 10,
                        }}
                    >
                        <BlurView intensity={40} tint="light" style={{ overflow: 'hidden' }}>
                            <LinearGradient
                                colors={['rgba(233, 30, 99, 0.7)', 'rgba(33, 150, 243, 0.7)', 'rgba(76, 175, 80, 0.7)']} // Increased opacity
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    padding: 24, // Increased padding
                                    borderRadius: 24,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.25)',
                                }}
                            >
                                {/* Profile Header */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <Animated.View style={{
                                        borderWidth: 3,
                                        borderColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: 28,
                                        transform: [{ scale: scaleAnim.interpolate({
                                            inputRange: [0.7, 1],
                                            outputRange: [0.9, 1],
                                            extrapolate: 'clamp'
                                        })}]
                                    }}>
                                        <Image
                                            source={{ uri: 'https://i.pravatar.cc/152?img=4' }}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 28,
                                            }}
                                        />
                                    </Animated.View>
                                    <View style={{ marginLeft: 16 }}>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: 'white',
                                            textShadowColor: 'rgba(0, 0, 0, 0.4)',
                                            textShadowOffset: { width: 0, height: 1 },
                                            textShadowRadius: 3,
                                        }}>
                                            {username}
                                        </Text>
                                        <Text style={{
                                            fontSize: 15,
                                            color: 'rgba(255, 255, 255, 0.9)',
                                        }}>
                                            {email}
                                        </Text>
                                    </View>
                                </View>

                                {/* Profile Details */}
                                <View
                                    style={{
                                        borderTopWidth: 1,
                                        borderTopColor: 'rgba(255, 255, 255, 0.2)',
                                        paddingTop: 20,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 18,
                                            paddingVertical: 8,
                                        }}
                                        onPress={() => {}}
                                    >
                                        <Ionicons name="person-outline" size={20} color="white" />
                                        <Text style={{ color: 'white', marginLeft: 12, fontSize: 16 }}>Edit Profile</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 18,
                                            paddingVertical: 8,
                                        }}
                                        onPress={() => {}}
                                    >
                                        <Ionicons name="settings-outline" size={20} color="white" />
                                        <Text style={{ color: 'white', marginLeft: 12, fontSize: 16 }}>Settings</Text>
                                    </TouchableOpacity>
                                    
                                    {/* Logout Button */}
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                            paddingVertical: 12,
                                            paddingHorizontal: 16,
                                            borderRadius: 12,
                                            justifyContent: 'center',
                                            marginTop: 8,
                                        }}
                                        onPress={() => {
                                            hideModal();
                                            if (onLogout) onLogout();
                                        }}
                                    >
                                        <Ionicons name="log-out-outline" size={20} color="white" />
                                        <Text style={{
                                            color: 'white',
                                            marginLeft: 10,
                                            fontWeight: '600',
                                            fontSize: 16,
                                        }}>
                                            Logout
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </BlurView>
                    </Animated.View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default ProfileButton;