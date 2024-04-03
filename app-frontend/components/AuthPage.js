import { styled } from 'nativewind';
import { useState } from 'react';
import { View, Text, Button, ImageBackground, Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SuccessScreen from './SuccessScreen';


const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SSafeAreaView = styled(SafeAreaView);

export default function AuthPage({ navigation }) {

    const [screen, setScreen] = useState("login");

    return (
        <>
            <SSafeAreaView className='py-6 px-5 mx-1'>
                {screen == "login" && <LoginScreen setScreen={setScreen} />}
                {screen == "signup" && <SignUpScreen setScreen={setScreen} />}
                {screen == "forgot" && <ForgotPasswordScreen setScreen={setScreen} />}
            </SSafeAreaView>
            {screen == "success" && <SuccessScreen setScreen={setScreen} />}
        </>
    );
}