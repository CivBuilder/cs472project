import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'


const ChangePasswordButton = ({ onPress }) => {
    return (
        <View >
            <Pressable style={styles.button} onPress={onPress} testID="changePasswordButton">
                <Text style={styles.buttonText}>Change Password</Text>
            </Pressable >
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 40,
        backgroundColor: '#74C69D',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'sans-serif',
    },
})

export default ChangePasswordButton