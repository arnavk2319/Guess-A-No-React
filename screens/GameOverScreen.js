import React from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions,ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The game is over!</TitleText>
                <View style={styles.imageContainer}>
                    {/* <Image source={require('../assets/original.png')} style={styles.image} resizeMode="cover"/> */}
                    <Image source={{uri: 'https://cdn.pixabay.com/photo/2019/01/22/18/30/summit-3948706_960_720.jpg'}} style={styles.image} resizeMode="cover" fadeDuration={300}/>
                </View>
                <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
                <BodyText>Number was: {props.userNumber}</BodyText>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
        
    )
}

const styles=  StyleSheet.create({
    screen :{
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center'
    }, 
    image : {
        width: '100%',
        height: '100%',
    }, 
    imageContainer: {
        width: Dimensions.get('window').width * 0.70,
        height: Dimensions.get('window').width * 0.70,
        borderRadius: Dimensions.get('window').width * 0.70 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 20
    }
})

export default GameOverScreen;