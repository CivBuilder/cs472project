import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { Colors } from '../../../colors/Colors';
import { ScreenNames } from '../Main/ScreenNames';

// =====================
//     Home Screen
// =====================
export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                {/******* CARBON FOOTPRINT SUMMARY *******/}
                <View>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>This Month's Footprint</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.PROGRESS)}>
                                    <Text style={styles.link}>See More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{backgroundColor: "white", borderRadius: 16, height: windowHeight/4, padding: 10}}>
                            <Text>TODO: Carbon Footprint</Text>
                        </View>
                    </View>
                </View>

                {/******* FOR YOU *******/}
                <View>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>For You</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.FORUM)}>
                                    <Text style={styles.link}>Learn More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* TODO: Add dim gradient when there's cards outside of view on both left and right sides */}
                        {/* TODO: Add pagination dots*/}
                        <ScrollView
                            horizontal
                            pagingEnabled
                            snapToInterval={(windowWidth / 2) - (margin * 1.25)}
                            decelerationRate={0.8}
                            contentContainerStyle={styles.cardContainer}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Card containerStyle={{...styles.card, marginLeft: margin}}>
                                <Card.Title>Card Title 1</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={styles.card}>
                                <Card.Title>Card Title 2</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={styles.card}>
                                <Card.Title>Card Title 3</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={styles.card}>
                                <Card.Title>Card Title 4</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={{...styles.card, marginRight: margin}}>
                                <Card.Title>Card Title 5</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                        </ScrollView>
                    </View>
                </View>

                {/******* RANKINGS *******/}
                <View>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>Rankings</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.RANKING)}>
                                    <Text style={styles.link}>See More</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                        <View style={{backgroundColor: "white", borderRadius: 16, height: windowHeight/4, padding: 10}}>
                            <Text>TODO: Add Ranking UI</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;

const styles = StyleSheet.create({
    container: {
        margin: margin,
        backgroundColor: "white",
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: Colors.primary.RAISIN_BLACK,
                shadowOffset: {width: 5, height: 5},
                shadowOpacity: 0.125,
                shadowRadius: 2.5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: margin,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardContainer: {
        marginBottom: 10,
    },
    card: {
        width: (windowWidth / 2) - (margin * 2.75),
        height: windowHeight * 0.3,
        borderRadius: 16,
        marginRight: 0,
    },
    link: {
        color: Colors.primary.MINT,
        fontSize: 12,
    }
});