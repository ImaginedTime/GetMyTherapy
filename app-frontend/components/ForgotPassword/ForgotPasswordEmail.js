import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styled } from 'nativewind';
import { useState } from 'react';
import { View, Text, Button, ImageBackground, Pressable, TextInput, Image, ToastAndroid, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getItem, setItem } from '../../utils/asyncStorage.js';



const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SSafeAreaView = styled(SafeAreaView);
const SIcon = styled(Icon);
const SImage = styled(Image);
const SBouncyCheckbox = styled(BouncyCheckbox);

const SInput = styled(TextInput);

export default function ForgotPasswordEmail({ setScreen, setForgotPage, email, setEmail }) {
    const { navigate } = useNavigation();

    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        // check validity of email
        if (email === '') {
            ToastAndroid.show('Please fill the email field', ToastAndroid.SHORT);
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/user/forgot-password", { email });
            if (response.status === 200) {
                ToastAndroid.show('OTP Sent to your email', ToastAndroid.SHORT);
                setItem('token', response.data.token);
                setItem('email', response.data.email);
                setForgotPage("verification");
            } else {
                ToastAndroid.show('Failed to send OTP', ToastAndroid.SHORT);
            }
        }
        catch (err) {
            console.log(err.response.data.error);
            ToastAndroid.show(err.response.data.error || 'Some Error occurred', ToastAndroid.SHORT);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SView className='mt-4'>
                <SView>
                    <SText className='text-[32px] font-[600] mb-2 text-[#101010]'>Forgot Password?</SText>
                    <SText className='font-[500] text-[#878787]'>Enter your email address and we'll send you confirmation code to reset your password</SText>
                </SView>

                <SView className='mt-8 justify-between'>
                    <SView className='mt-[14px]'>
                        <SText className='mb-2 font-[500] text-[#101010]'>Email Address</SText>
                        <SInput
                            className='border border-[#c2c2c2] px-4 py-2 rounded-lg text-[#101010]'
                            placeholder="Enter Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </SView>

                    <SPressable className='mt-16 items-center justify-center bg-[#FE8C00] p-4 rounded-full' onPress={handleNext}>
                        {!loading && <SText className='font-[500] text-white text-lg'>Continue</SText>}
                        {loading && <ActivityIndicator size={20} color="#fff" />}
                    </SPressable>
                </SView>
            </SView>
        </KeyboardAvoidingView>
    );
}