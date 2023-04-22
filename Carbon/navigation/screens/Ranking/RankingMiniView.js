import * as React from 'react';
import { useState, useEffect } from 'react';
import {Colors} from "../../../colors/Colors";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { API_URL } from '../../../config/Api';
import { getAuthHeader } from '../../../util/LoginManager';
import {StyleSheet, Text, View, Image} from 'react-native';
import { AvatarView } from '../../../util/AvatarProfileMap';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';


const API_Entry_RANK_URL = API_URL + "user/testrank/";


export default function MiniRanking() {

    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(false);

    useEffect(() => {
        getRankAndTitles(setRank, setSustainabilityScore, setLoading, setAvatar);
    }, []);

    useEffect( () => {
        if(sustainability_score != null) ;
    }, [sustainability_score]);

    

    if(rank && sustainability_score!=null && avatar) 
      return (
            <View style = {styles.miniRankContainer}>
              <View style = {styles.imageContainer}>
                <Image 
                  source = {SustainabilityScoreProfileView[sustainability_score].picture}
                  style={styles.profileImage}
                  resizeMode = "contain"
                />

                <View style = {styles.rankSphere}>            
                  <Text style = {styles.rankText}>
                    {rank}
                  </Text>
                </View>

                <Image 
                  source = {AvatarView[avatar]}
                  style={styles.profileImage}
                  resizeMode = "contain"
                />
              </View>
              <Text style = {styles.titleText}>{SustainabilityScoreProfileView[sustainability_score].title}</Text>
            </View>
      )
    else return (<LoadingIndicator loading={loading}/>)
}


const styles = StyleSheet.create({

  miniRankContainer : { 
    flex : 1
  },
  imageContainer  : { 
    flexDirection : 'row',
    flex : 2
  },
  profileImage : {
    width : '100%',
    height : '100%',
    flex : 1 
  },
  rankSphere : { 
    width: 125, 
    height: 125, 
    backgroundColor : Colors.secondary.NON_PHOTO_BLUE,
    borderRadius : 100,
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth : 4,
    borderColor : Colors.primary.MINT_CREAM,
  },


  rankText: {
    color: Colors.secondary.LIGHT_MINT,
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 45,
  },

  titleText : { 
    color: Colors.primary.RAISIN_BLACK,
    fontWeight: 'bold',
    flex : 1,
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 30,
  }
});


/**
 * 
 * @param {*} setRank - State changing function to get the users rank 
 * @param {*} setSustainabilityProfile - State changing function to get the users Profile from the sustatinabilityScore
 * @param {*} setLoading - State changing function to set a loading screen
 */
async function getRankAndTitles(setRank, setSustainabilityScore, setLoading, setAvatar){
  setLoading(true);
  console.log(`Fetching from ${API_Entry_RANK_URL}`);

  //Get result from Server via Fetch
  try { 

    // Changing rank to use the new JWT
    const response = await fetch(API_Entry_RANK_URL, await getAuthHeader());

    //Set Rank and first table to load on the "Like You" page for the table
    if(response.status === 200) {
      const response_content = await response.json(); 
      console.log(response_content);
      
      setRank(response_content.ranking);
      setSustainabilityScore(response_content.sustainability_score);
      setAvatar(response_content.avatar_index);
      console.log(`Fetch from ${API_Entry_RANK_URL} was a success!`);
    }
    //Handle Error thrown from Server
    else if (response.status === 404) {
      setRank(null);
      setSustainabilityScore(null);
      console.log(`Fetch from ${API_Entry_RANK_URL} Failed, 404: bad ID`);
    }
  } 
  //Handle any other errors not necessarily from Server
  catch(err) {
    setRank(null);
    setSustainabilityScore(null);
    console.log(`Fetch from ${API_Entry_RANK_URL} Failed: ${err.message}`);
  }
  setLoading(false);
}


