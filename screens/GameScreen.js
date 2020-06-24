import React, { useState, useRef, useEffect } from 'react';
import { View,Text, StyleSheet,Button, Alert, ScrollView, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor((Math.random() * (max - min)) + min);
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRounds) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRounds}</BodyText>
        <Text>{value}</Text>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change',updateLayout);
        return (
            Dimensions.removeEventListener('change', updateLayout)
        )
    });

    useEffect(() => {
        if(currentGuess === props.userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert('Dont lie', 'You that is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        } 

        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        } else if(direction === 'greater'){
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currRounds => currRounds + 1);
        setPastGuesses(currPastGuesses => [nextNumber,...currPastGuesses])
    } 

    let listContainerStyle = styles.listContainer;

    if(availableDeviceWidth < 350){
        listContainerStyle = styles.listContainerBig;
    }

    if(availableDeviceHeight < 500){
        return (
            <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's guess</Text>
            <View style={styles.row}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove"/></MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add"/></MainButton>
            </View>
            
            <View style={styles.listContainer}>
                <ScrollView constentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, indexVal) => renderListItem(guess, pastGuesses.length - indexVal))}
                </ScrollView>
            </View>
        </View>
        )
    }

    return(
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove"/></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add"/></MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView constentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, indexVal) => renderListItem(guess, pastGuesses.length - indexVal))}
                </ScrollView>
            </View>
        </View>
    )
};



const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600? 20 : 10,
        width: 300,
        maxWidth: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        width: '60%',
        flex: 1,

    },
    listContainerBig: {
        width: '80%',
        flex: 1,

    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
})

export default GameScreen;