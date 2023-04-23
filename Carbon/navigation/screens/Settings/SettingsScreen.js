import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import UsernameInput from '../../../components/UsernameInput';
import PasswordInput from '../../../components/PasswordInput';
import { Colors } from '../../../styling/Colors';
import { logout } from '../../../util/LoginManager';
import ChangeUsernameButton from '../../../components/ChangeUsernameButton';
import ChangePasswordButton from '../../../components/ChangePasswordButton';
import { changeUsername, changePassword } from '../../../util/UpdateAccountSettings';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import pfps from '../../../assets/profile-icons/index'
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';
import Svg, { Defs, Rect }  from 'react-native-svg';
import { Modal } from 'react-native-paper';

const NonBreakingSpace = () => <Text>{'\u00A0'}</Text>;

const USER_API = API_URL + 'user/';

const SettingsScreen = ({ navigation }) => {

    // User data
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // Changing user data
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Change pfp modal
    const [modalVisible, setModalVisible] = useState(false);

    async function handleUsernameChange() {
        await changeUsername(username);
    }
    async function handlePasswordChange() {
        await changePassword(oldPassword, newPassword);
    }

    useEffect(() => {
        if (user == null)
            fetchUser()
    }, [user])


    async function fetchUser() {
        var response = await fetch(USER_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken' : await getToken()
            }
        });

        if (response.status == 200) {
            setUser(await response.json())
            setLoadingUser(false);
        }
    }

    function onChangePFP() {
        setModalVisible(true);
    }

    return (
        <ScrollView scrollEnabled={!modalVisible} style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.profileContainer}>
                {!loadingUser? ( 
                <View style={{borderRadius: 16, paddingVertical: 30}}>
                    <View style={{position: 'absolute', height: '50%', width: '100%', backgroundColor: Colors.primary.MINT, borderTopLeftRadius: 16, borderTopRightRadius: 16}}></View>
                        <TouchableOpacity onPress={onChangePFP}>
                            <Image
                                source={pfps[user.profile_selection]}
                                style={{
                                    height: 100,
                                    width: 100,
                                    alignSelf: 'center',
                                    borderColor: 'black',
                                }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                margin: 10,
                                textAlign: 'center',
                                fontSize: 22,
                                fontWeight: 'bold'
                            }}
                        >
                            Username: {user.email}
                        </Text>
                </View>
                ) : (
                    <Text>Loading</Text>
                )}
            </View>

            {/* Change username */}
            <View style={styles.content}>
                <Text style={styles.generalText}>Change username</Text>
                <UsernameInput testID="usernameInput" onChangeText={un => setUsername(un)} />
            </View>
            <ChangeUsernameButton onPress={() => handleUsernameChange()} />

            {/* Change password */}
            <View style={styles.content}>
                <Text style={styles.generalText}>Change password</Text>
                {/* Change below line to use new api call to check if old password matches */}
                <PasswordInput text="Old Password" testID="OldPassword" onChangeText={pw => setOldPassword(pw)} />
                <PasswordInput text="New Password" testID="NewPassword" onChangeText={pw => setNewPassword(pw)} />
            </View>
            <ChangePasswordButton onPress={() => handlePasswordChange()} />

            {/* Logout */}
            <View style={styles.content}>
                <Button title='logout' onPress={() => { logout() }} />
            </View>

            <Modal transparent={false} visible={modalVisible}
                style={{position: 'absolute', top: -40, width: '100%', alignItems: 'center', alignSelf: 'center'}}>
                <View style={{alignSelf: 'center'}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {pfps.map((item, index) => {
                            return (
                            <TouchableOpacity key={index} onPress={onSetPFP(index)}>
                                <Image source={item} style={{height: 120, width: 120, margin: 8}}/>
                            </TouchableOpacity>
                        )})}
                    </ScrollView>
                </View>
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    generalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary.RAISIN_BLACK,
        textAlign: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: '#F7FCF8',
    },

    content: {
        width: 300,
    },

    profileContainer: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: Colors.primary.RAISIN_BLACK,
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.125,
                shadowRadius: 2.5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});

export default SettingsScreen;