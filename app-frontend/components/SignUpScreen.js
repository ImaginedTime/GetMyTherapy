import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { useState } from 'react';
import { View, Text, Button, ImageBackground, Pressable, TextInput, Image, ToastAndroid } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome';


const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SSafeAreaView = styled(SafeAreaView);
const SIcon = styled(Icon);
const SImage = styled(Image);
const SBouncyCheckbox = styled(BouncyCheckbox);

const SInput = styled(TextInput);

export default function SignUpScreen({ setScreen }) {

    const { navigate } = useNavigation();

    const [hidePassword, setHidePassword] = useState(true);

    const icon = hidePassword ? require('../assets/eye-off.png') : require('../assets/eye.png');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const signup = () => {
        if (email === '' || username === '' || password === '') {
            ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
            return;
        }

        if (!isChecked) {
            ToastAndroid.show('Please agree to the terms of service and privacy policy', ToastAndroid.SHORT);
            return;
        }

        // navigate('Home');
        setScreen('success');
    }

    return (
        <SView className='mt-4'>
            <SView>
                <SText className='text-[32px] font-[600] mb-2 text-[#101010]'>Create your new account</SText>
                <SText className='font-[500] text-[#878787]'>Create an account to start looking for the food you like</SText>
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
                    <SText className='mb-2 font-[500] text-[#101010]'>User Name</SText>
                    <SInput
                        className='border border-[#c2c2c2] px-4 py-2 rounded-lg text-[#101010]'
                        placeholder="Enter User Name"
                        value={username}
                        onChangeText={setUsername}
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

                <SView className='flex flex-row mt-[14px] items-center'>
                    <SBouncyCheckbox
                        className=''
                        fillColor="#FE8C00"
                        iconStyle={{ borderRadius: 5 }}
                        innerIconStyle={{ borderRadius: 5 }}
                        onPress={(checked) => setIsChecked(checked)}
                    />
                    <SView className='flex flex-row flex-wrap'>
                        <SText className='font-[500] text-[#101010]'>I agree with </SText>
                        <SPressable>
                            <SText className='font-[500] text-[#FE8C00]'>Terms of Service</SText>
                        </SPressable>
                        <SText className='font-[500] text-[#101010]'> and </SText>
                        <SPressable>
                            <SText className='font-[500] text-[#FE8C00]'>Privacy Policy</SText>
                        </SPressable>
                    </SView>
                </SView>

                <SPressable className='mt-6 items-center justify-center bg-[#FE8C00] p-4 rounded-full' onPress={signup}>
                    <SText className='font-[500] text-white text-lg'>Register</SText>
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
                    <SText className='font-[500] text-[#101010]'>Have an account? </SText>
                    <SPressable onPress={() => setScreen('login')}>
                        <SText className='font-[500] text-[#FE8C00]'>Sign In</SText>
                    </SPressable>
                </SView>
            </SView>
        </SView>
    );
}