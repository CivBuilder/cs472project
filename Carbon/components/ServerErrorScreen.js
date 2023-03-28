
//Angel Quintanilla
import React from 'react';
import { View, ScrollView, RefreshControl, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../colors/Colors'
const ICON_SIZE = 75;

/**
 * 
 * @param onRefresh - async function for user to pass - Likely one to wait on a server request 
 * @returns - Screen with Sad face prompting user to refresh the page.
 */

export default function serverErrorScreen({onRefresh, errorMessage}){

    return (
        <ScrollView 
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        >
          <View
            style = {{
              padding : 75,
              flex : 1,
              justifyContent : 'space-between',
              alignItems : 'center',
              color : Colors.secondary.NYANZA
            }}
          >
            <Ionicons name="sad-outline" size = {75}></Ionicons>
            <Text
              onPress={() => fetchUserRank()}
            >
              {errorMessage}{"\n"}
              Error Getting Data - Swipe Down to Refresh Page
            </Text>
          </View>

        </ScrollView>
    )    
}