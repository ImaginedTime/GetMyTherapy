import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styled } from 'nativewind';
import { useState } from 'react';
import { View, Text, Button, ImageBackground, Pressable, TextInput, Image, ToastAndroid, ActivityIndicator } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getItem, setItem } from '../utils/asyncStorage.js';


const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SSafeAreaView = styled(SafeAreaView);
const SIcon = styled(Icon);
const SImage = styled(Image);

const SInput = styled(TextInput);

export default function LoginScreen({ setScreen }) {
    const [hidePassword, setHidePassword] = useState(true);

    const icon = hidePassword ? require('../assets/eye-off.png') : require('../assets/eye.png');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const login = async () => {
        if(email === '' || password === '') {
            ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("/user/login", { email, password });
            if(response.status === 200) {
                ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
                setItem('token', response.data.token);
                setItem('email', response.data.email);
                setScreen('success');
            } else {
                ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
            }
        }
        catch(err) {
            console.log(err.response.data.error);
            ToastAndroid.show(err.response.data.error || 'Some Error occurred', ToastAndroid.SHORT);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <SView className='pt-4 w-full h-full'>
            <SView>
                <SText className='text-[32px] font-[600] mb-2 text-[#101010]'>Login to your account</SText>
                <SText className='font-[500] text-[#878787]'>Please sign in to your account</SText>
            </SView>

            <SView className='mt-8'>
                <SView className='mt-[14px]'>
                    <SText className='mb-2 font-[500] text-[#101010]'>Email Address</SText>
                    <SInput
                        className='border border-[#c2c2c2] px-4 py-2 rounded-lg text-[#101010]'
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </SView>

                <SView className='mt-[14px]'>
                    <SText className='mb-2 font-[500] text-[#101010]'>Password</SText>
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
                </SView>

                <SPressable className='mt-6 items-end'
                    onPress={() => setScreen('forgot')}
                >
                    <SText className='font-[500] text-[#FE8C00]'>Forgot Password?</SText>
                </SPressable>

                <SPressable className='mt-6 items-center justify-center bg-[#FE8C00] p-4 rounded-full flex-row' onPress={login}>
                    { !loading && <SText className='font-[500] text-white text-lg'>Sign In</SText> }
                    { loading && <ActivityIndicator size={20} color="#fff" /> }
                </SPressable>

                <SView className='flex-row items-center gap-2 mt-6'>
                    <SView className='h-[2px] bg-[#878787] flex-1'></SView>
                    <SText className='font-[500] text-[#878787]'>Or sign in with</SText>
                    <SView className='h-[2px] bg-[#878787] flex-1'></SView>
                </SView>

                {/* Google Login Button */}
                <SPressable className='mt-6 items-center justify-center'>
                    <SIcon name='google' size={20} color='white' className='bg-[#FE8C00] rounded-full p-4 px-[18px]' />
                </SPressable>

                <SView className='flex flex-row justify-center mt-8'>
                    <SText className='font-[500] text-[#101010]'>Don't have an account? </SText>
                    <SPressable onPress={() => setScreen('signup')}>
                        <SText className='font-[500] text-[#FE8C00]'>Register</SText>
                    </SPressable>
                </SView>
            </SView>
        </SView>
    );
}