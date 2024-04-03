import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { View, Text, Button, ImageBackground, Pressable, TextInput, Image, ToastAndroid, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome';
import OTPInput from './OTPInput';
import axios from 'axios';

import { getItem, setItem } from '../../utils/asyncStorage.js';



const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SSafeAreaView = styled(SafeAreaView);
const SIcon = styled(Icon);
const SImage = styled(Image);
const SBouncyCheckbox = styled(BouncyCheckbox);

const SInput = styled(TextInput);

export default function ResetPassword({ setScreen, setForgotPage, email, handlePresentModalPress }) {
    const { navigate } = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);
    const icon = hidePassword ? require('../../assets/eye-off.png') : require('../../assets/eye.png');
    const [password, setPassword] = useState('');

    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const iconConfirm = hideConfirmPassword ? require('../../assets/eye-off.png') : require('../../assets/eye.png');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);


    const handleNext = async () => {
        if (password === '' || confirmPassword === '') {
            ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/user/reset-password", { email, password }, {
                headers: {
                    Authorization: `Bearer ${await getItem('token')}`
                }
            });
            if (response.status === 200) {
                ToastAndroid.show('Password reset Successfully', ToastAndroid.SHORT);
                handlePresentModalPress();
            } else {
                ToastAndroid.show('Failed to reset password', ToastAndroid.SHORT);
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%', height: '100%' }}
        >
            <SView className='flex justify-center p-2'>
                <SPressable onPress={() => setForgotPage("email")} className='absolute border-2 border-[#EDEDED] px-[10px] py-2 rounded-full z-10'>
                    <SIcon name='chevron-left' size={14} color='#101010' />
                </SPressable>
                <SText className='text-center font-[600] text-[18px]'>OTP</SText>
            </SView>

            <SView className='mt-6'>
                <SText className='text-[32px] font-[600] mb-2 text-[#101010]'>Reset Password</SText>
                <SText className='font-[500] text-[#878787]'>Your new password must be different from the previously used password</SText>
            </SView>

            <SView className='mt-[16px]'>
                <SText className='mb-2 font-[500] text-[#101010]'>New Password</SText>
                <SView className='flex-row items-center border border-[#c2c2c2] rounded-lg'>
                    <SInput
                        className='px-4 py-2 text-[#101010] flex-1 border-0'
                        placeholder="Enter Password"
                        secureTextEntry={hidePassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <SPressable onPress={() => setHidePassword((prev) => !prev)}>
                        <SImage source={icon} className='w-6 h-6 mr-2 rotate-180' />
                    </SPressable>
                </SView>
                <SText className='text-[#878787] mt-2'>Must be at least 8 character</SText>
            </SView>

            <SView className='mt-[14px]'>
                <SText className='mb-2 font-[500] text-[#101010]'>Confirm Password</SText>
                <SView className='flex-row items-center border border-[#c2c2c2] rounded-lg'>
                    <SInput
                        className='px-4 py-2 text-[#101010] flex-1 border-0'
                        placeholder="Enter Password"
                        secureTextEntry={hideConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <SPressable onPress={() => setHideConfirmPassword((prev) => !prev)}>
                        <SImage source={iconConfirm} className='w-6 h-6 mr-2 rotate-180' />
                    </SPressable>
                </SView>
                <SText className='text-[#878787] mt-2'>Both password must match</SText>
            </SView>


            <SPressable className='mt-8 items-center justify-center bg-[#FE8C00] p-4 rounded-full' onPress={handleNext}>
                { !loading && <SText className='font-[500] text-white text-lg'>Verify Account</SText> }
                { loading && <ActivityIndicator size={20} color="#fff" /> }
            </SPressable>

        </KeyboardAvoidingView>
    );
}