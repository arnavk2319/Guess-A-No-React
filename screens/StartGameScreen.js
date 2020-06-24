import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions,ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [ enteredValue, setEnteredValue ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ selectedNumber, setSelectedNumber ] = useState();
    const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4);

    const updateLayout = ()=> {
        setButtonWidth(Dimensions.get('window').width / 4);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }

        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    
    const confirmInputHander = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 99){
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.', [{text: 'okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = 
            <Card style={styles.summaryContainer}>
                <BodyText> You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber) }>START GAME</MainButton>
            </Card>
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
            <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            }}>
                <View style={styles.screen}>
                    <TitleText style={styles.title}>Start a new game!</TitleText>
                    <Card style={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <BodyText>Select a number</BodyText>
                        <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} value={enteredValue} onChangeText={numberInputHandler}/>
                        <View style={styles.buttonContainer}>
                            <Button style={{width: buttonWidth}} title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                            <Button style={styles.button} title="Confirm" onPress={confirmInputHander} color={Colors.primary}/>
                        </View>
                    </View>
                    </Card>
                    {confirmedOutput}
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer:{
        width: '90%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button :{
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer : {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;