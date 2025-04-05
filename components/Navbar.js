import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileButton from './ProfileButton';

const Navbar = ({ onMenuPress, onLogout, username = "Gaurav Soni", email = "sonigaurav2021@gmail.com" }) => {

    const [logoScale] = useState(new Animated.Value(1));
    const [navbarHeight] = useState(new Animated.Value(64));
    const flashColorAnimation = useRef(new Animated.Value(0)).current;


    const colorAnimation = useRef(new Animated.Value(0)).current;
    const textGlowAnimation = useRef(new Animated.Value(0)).current;


    const getRandomColor = () => {
        const colors = ['#FF5252', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0', '#00BCD4'];
        return colors[Math.floor(Math.random() * colors.length)];
    };


    useEffect(() => {
        Animated.loop(
            Animated.timing(colorAnimation, {
                toValue: 1,
                duration: 15000,
                easing: Easing.inOut(Easing.sin),
                useNativeDriver: false,
            })
        ).start();


        Animated.loop(
            Animated.sequence([
                Animated.timing(logoScale, {
                    toValue: 1.2,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(logoScale, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                })
            ])
        ).start();


        Animated.loop(
            Animated.timing(flashColorAnimation, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();


        Animated.loop(
            Animated.sequence([
                Animated.timing(textGlowAnimation, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: false,
                }),
                Animated.timing(textGlowAnimation, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: false,
                })
            ])
        ).start();

    }, []);


    const bgColor1 = colorAnimation.interpolate({
        inputRange: [0, 0.33, 0.66, 1],
        outputRange: ['#f8f9fa', '#f1f3f5', '#f8f9fa', '#f8f9fa']
    });

    const bgColor2 = colorAnimation.interpolate({
        inputRange: [0, 0.33, 0.66, 1],
        outputRange: ['#e9ecef', '#dee2e6', '#e9ecef', '#e9ecef']
    });

    const accentColor = colorAnimation.interpolate({
        inputRange: [0, 0.33, 0.66, 1],
        outputRange: ['#4d63ff', '#6a11cb', '#3a86ff', '#4d63ff']
    });


    const flashColor = flashColorAnimation.interpolate({
        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
        outputRange: ['#FF9500', '#FF5252', '#2196F3', '#4CAF50', '#9C27B0', '#FF9500']
    });


    const textGlowStrength = textGlowAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 8]
    });


    const Particle = ({ delay = 0, size = 4, position = 10, duration = 7000 }) => {
        const translateY = useRef(new Animated.Value(0)).current;
        const translateX = useRef(new Animated.Value(0)).current;
        const opacity = useRef(new Animated.Value(0)).current;
        const particleColor = getRandomColor();

        useEffect(() => {
            setTimeout(() => {
                Animated.loop(
                    Animated.parallel([
                        Animated.sequence([
                            Animated.timing(opacity, {
                                toValue: 0.7,
                                duration: 1000,
                                useNativeDriver: true
                            }),
                            Animated.timing(opacity, {
                                toValue: 0,
                                duration: duration - 1000,
                                useNativeDriver: true
                            })
                        ]),
                        Animated.timing(translateY, {
                            toValue: -30,
                            duration: duration,
                            useNativeDriver: true
                        }),
                        Animated.timing(translateX, {
                            toValue: Math.random() * 20 - 10,
                            duration: duration,
                            useNativeDriver: true
                        })
                    ])
                ).start();
            }, delay);

            return () => {
                translateY.stopAnimation();
                translateX.stopAnimation();
                opacity.stopAnimation();
            };
        }, []);

        return (
            <Animated.View style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: particleColor,
                left: position + '%',
                bottom: 0,
                opacity,
                transform: [{ translateY }, { translateX }]
            }} />
        );
    };

    return (
        <Animated.View>
            <Animated.View
                style={{
                    height: navbarHeight,
                    overflow: 'hidden',
                }}
            >
                <LinearGradient
                    colors={[bgColor1, bgColor2]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                    }}
                />

                { }
                <Particle delay={100} size={3} position={20} duration={9000} />
                <Particle delay={500} size={2} position={45} duration={7000} />
                <Particle delay={1200} size={4} position={75} duration={8000} />
                <Particle delay={2000} size={2} position={30} duration={6000} />
                <Particle delay={300} size={3} position={60} duration={8500} />
                <Particle delay={1500} size={2} position={10} duration={7200} />

                <View style={{
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                }}>
                    { }
                    <TouchableOpacity
                        onPress={onMenuPress}
                        style={{
                            padding: 8,
                            borderRadius: 12,
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderWidth: 1,
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                        }}
                        activeOpacity={0.7}
                    >
                        <Animated.View style={{
                            shadowColor: flashColor,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                            elevation: 4,
                        }}>
                            <Animated.View style={{ color: flashColor }}>
                                <Ionicons name="document-text-outline" size={22} color={flashColor} />
                            </Animated.View>
                        </Animated.View>
                    </TouchableOpacity>

                    { }
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Animated.Text style={{
                                fontSize: 24,
                                marginLeft: 6,
                                transform: [{ scale: logoScale }],
                            }}>
                                🧠
                            </Animated.Text>
                            <Animated.View style={{
                                shadowColor: accentColor,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: textGlowStrength,
                                elevation: 5,
                            }}>
                                <Animated.Text style={{
                                    color: '#333',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}>
                                    Neural
                                    <Animated.Text style={{
                                        color: accentColor,
                                        textShadowColor: accentColor,
                                        textShadowOffset: { width: 0, height: 0 },
                                        textShadowRadius: textGlowStrength,
                                    }}>
                                        Note
                                    </Animated.Text>
                                </Animated.Text>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>

                    { }
                    <ProfileButton
                        username={username}
                        email={email}
                        onLogout={onLogout}
                        accentColor={accentColor}
                    />
                </View>
            </Animated.View>
        </Animated.View>
    );
};

export default Navbar;