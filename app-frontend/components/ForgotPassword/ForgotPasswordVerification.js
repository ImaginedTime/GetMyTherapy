import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { View, Text, Button, ImageBackground, Pressable, TextInput, Image, ToastAndroid, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { SafeAreaView } from 'react-native-safe-area-context';

import OTPInput from './OTPInput';

import axios from 'axios';

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

export default function ForgotPasswordVerification({ setScreen, setForgotPage, email }) {
    const { navigate } = useNavigation();

    const hideEmail = (email) => {
        const emailParts = email.split('@');
        const emailLength = emailParts[0].length;
        let stars = "";
        for (let i = 0; i < emailLength / 2; i++) {
            stars += '*';
        }

        const emailHidden = emailParts[0].substring(0, emailLength / 2) + stars + '@' + emailParts[1];
        return emailHidden;
    }

    const [otpCode, setOTPCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 4;

    const [loading, setLoading] = useState(false);

    const [optExpirationTime, setOptExpirationTime] = useState(600000);

    const convertToTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const remainingSeconds = Math.floor((ms % 60000) / 1000);
        // add leading zero
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const handleNext = async () => {
        if (!isPinReady) {
            ToastAndroid.show('Please fill the OTP field', ToastAndroid.SHORT);
            return;
        }
        if (optExpirationTime <= 0) {
            ToastAndroid.show('OTP has expired', ToastAndroid.SHORT);
            setForgotPage("email");
            return;
        }
        if (otpCode === '') {
            ToastAndroid.show('Please fill the OTP field', ToastAndroid.SHORT);
            return;
        }
        if (otpCode.length < maximumCodeLength) {
            ToastAndroid.show('Please enter a valid OTP', ToastAndroid.SHORT);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/user/verify-otp", { email, otp: otpCode }, {
                headers: {
                    Authorization: `Bearer ${await getItem('token')}`
                }
            });
            if (response.status === 200) {
                ToastAndroid.show('OTP Verified Successfully', ToastAndroid.SHORT);
                setItem('token', response.data.token);
                setForgotPage("reset");
            } else {
                ToastAndroid.show('Failed to verify OTP', ToastAndroid.SHORT);
            }
        }
        catch (err) {
            console.log(err);
            ToastAndroid.show(err.response.data.error || 'Some Error occurred', ToastAndroid.SHORT);
        }
        finally {
            setLoading(false);
        }
    }

    useInterval(() => {
        if (optExpirationTime <= 0)
            return;
        setOptExpirationTime(optExpirationTime - 500);
    }, 500);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SView className='flex justify-center p-2 bg-green-500'>
                <SPressable onPress={() => setForgotPage("email")} className='absolute border-2 border-[#EDEDED] px-[10px] py-2 rounded-full z-10'>
                    <SIcon name='chevron-left' size={14} color='#101010' />
                </SPressable>
                <SText className='text-center font-[600] text-[18px]'>OTP</SText>
            </SView>

            <SView className='mt-6'>
                <SText className='text-[32px] font-[600] mb-2 text-[#101010]'>Email verification</SText>
                <SText className='font-[500] text-[#878787]'>Enter the verification code we send you on: </SText>
                <SText className='font-[500] text-[#878787]'>{hideEmail(email)} </SText>
            </SView>

            <OTPInput
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setIsPinReady}
            />

            <SView className='flex-row justify-center items-center mt-6'>
                <SText className='font-[500] text-[#878787] text-center'>Didn't receive the code?</SText>
                <SPressable>
                    <SText className='font-[500] text-[#FE8C00] text-center'>Resend</SText>
                </SPressable>
            </SView>

            <SView className='flex-row justify-center items-center mt-6'>
                <SIcon name='clock-o' size={14} color='#878787' />
                <SText className='ml-2 font-[500] text-[#878787] text-center'>{convertToTime(optExpirationTime)}</SText>
            </SView>


            <SPressable className='mt-8 items-center justify-center bg-[#FE8C00] p-4 rounded-full' onPress={handleNext}>
                { !loading && <SText className='font-[500] text-white text-lg'>Continue</SText> }
                { loading && <ActivityIndicator size={20} color="#fff" /> }
            </SPressable>

        </KeyboardAvoidingView>
    );
}



function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}