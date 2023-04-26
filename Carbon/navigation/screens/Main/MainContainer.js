import React, { useState, useEffect} from 'react';
import { StatusBar, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../../styling/Colors';
import { IconNames } from './IconNames';

import { ScreenNames } from './ScreenNames';

import { HomeScreen, ProgressScreen, ForumScreen, RankingScreen, SettingsScreen, QuizScreen, BrowserScreen, GoalScreen, LoginScreen, SignUpScreen, FoodScreen, TransportationScreen, RecyclingScreen, RecordEmissionScreen} from '../../screens';
import { getToken, setRenderCallback } from '../../../util/LoginManager';
import { PopUpMenu } from '../../../components/PopUpMenu';
import RankCategoryOverlay from '../Ranking/RankCategoryOverlay';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*
    NOTE ON STACK NAVIGATION:
    To be able to add stack navigation for each main screens, the stack navigation
    has to be set within the component of the bottom tab navigation.
    In this case, it's easier to keep the stack navigation on its own function for readability.

    If you need to add more screens to each main screen, just add
        <Stack.Screen name={"NAME_OF_SCREEN"} component={"THE_SCREEN_FUNCTION_IMPORTED"} />
    at the bottom.

    Also it's best to add the screen function inside the index.js so it reduces the lines needed to import screens.
    Just add the function name on the import on top.
*/

// Home screen stack navigation & header
const HomeStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={' '}
                component={HomeScreen}
                options={{
                    headerShown: true,
                    // headerStyle: {
                    //     height: Platform.OS === 'ios' ? 48 : 72,
                    // },
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Image
                            source={require('../../../assets/Carbon_Logo.png')}
                            style={{
                                //TODO: 1080x356 is the current dimension. Find a better way to scale this properly.
                                width: 1080 / 12,
                                height: 356 / 12,
                            }}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.SETTINGS)}>
                            <Ionicons
                                name={IconNames.SETTINGS}
                                size={24}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name={ScreenNames.SETTINGS} component={SettingsScreen} />
            <Stack.Screen name={ScreenNames.RECORD_EMISSION} component={RecordEmissionScreen} />
        </Stack.Navigator>
    );
};

// Progress screen stack navigation & header
const ProgressStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Your Progress'}
                component={ProgressScreen}
                options={{
                    headerShown: true,
                    // headerStyle: {
                    //     height: Platform.OS === 'ios' ? 48 : 72,
                    // },
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <PopUpMenu navigation={navigation}/>
                    ),
                }}
            />
            <Stack.Screen name={ScreenNames.ADD_GOAL} component={GoalScreen} />
            <Stack.Screen name={ScreenNames.RECORD_EMISSION} component={RecordEmissionScreen} />
            <Stack.Screen name={ScreenNames.FOOD} component={FoodScreen} />
            <Stack.Screen name={ScreenNames.TRANSPORTATION} component={TransportationScreen} />
            <Stack.Screen name={ScreenNames.RECYCLING} component={RecyclingScreen} />
        </Stack.Navigator>
    );
};

// Forum screen stack navigation & header
const ForumStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Education'}
                component={ForumScreen}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name={'Quiz'}
                component={QuizScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'Browser'}
                component={BrowserScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};

// Ranking screen stack navigation & header
const RankingStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Rankings '}
                component={RankingScreen}
                options={{
                    headerShown: false,
                    // headerStyle: {
                    //     height: Platform.OS === 'ios' ? 48 : 72,
                    // },
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
};


// Login screen stack navigation & header
const LoginStack = ({ navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={' '}
                component={LoginScreen}
                options={{
                    headerShown: false, // Set to false for now until we need to implement headers for this screen
                }}
            />
            <Stack.Screen
                name={ScreenNames.SIGNUP}
                component={SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default function MainContainer(){
    const [isSignedIn, setIsSignedIn] = useState(false);

    // In order to rerender the maincontainer on signin, we gotta callback and update the state
    setRenderCallback(setIsSignedIn);

    useEffect(() => {
        async function checkSignin() {
            setIsSignedIn(await getToken());
        }

        checkSignin();
    }, []);

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent={true}/>
                <NavigationContainer>
        {isSignedIn ? (
                <>
                    <Tab.Navigator //Sets the default screen for the bottom nav bar (in this case, Home Screen)
                    initialRouteName={ScreenNames.HOME}
                    screenOptions={{
                        headerShown: false, // Hides the default header
                        tabBarLabelStyle: { display: 'none' }, // Hides label text
                        tabBarActiveTintColor: Colors.primary.MINT,
                        tabBarHideOnKeyboard: true,
                    }}
                    >
                        <Tab.Screen
                            name={ScreenNames.HOME}
                            component={HomeStack}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <Ionicons name={IconNames.HOME} size={size} color={color} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name={ScreenNames.PROGRESS}
                            component={ProgressStack}
                            options={screenOptions}
                        />
                        <Tab.Screen
                            name={ScreenNames.FORUM}
                            component={ForumStack}
                            options={screenOptions}
                        />
                        <Tab.Screen
                            name={ScreenNames.RANKING}
                            component={RankingStack}
                            options={screenOptions}
                        />
                    </Tab.Navigator>
                </>
        ) : (
            <LoginStack></LoginStack>
        )}
            </NavigationContainer>
        </SafeAreaView>
    );
};


const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
        case ScreenNames.HOME:
            iconName = IconNames.HOME;
            break;
        case ScreenNames.PROGRESS:
            iconName = IconNames.PROGRESS;
            break;
        case ScreenNames.FORUM:
            iconName = IconNames.FORUM;
            break;
        case ScreenNames.RANKING:
            iconName = IconNames.RANKING;
            break;
        default:
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
});