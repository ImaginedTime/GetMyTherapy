import { styled } from 'nativewind';
import { useCallback, useMemo, useRef, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text, Button, ImageBackground, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForgotPasswordEmail from './ForgotPassword/ForgotPasswordEmail';
import ForgotPasswordVerification from './ForgotPassword/ForgotPasswordVerification';
import ResetPassword from './ForgotPassword/ResetPassword';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator();


const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SSafeAreaView = styled(SafeAreaView);
const SImage = styled(Image);

export default function ForgotPasswordScreen({ setScreen }) {

    const [forgotPage, setForgotPage] = useState('email');
    const [email, setEmail] = useState('someone@gmail.com');


    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['55%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const handleNext = () => {
        setScreen("login");
    }


    return (
        <BottomSheetModalProvider>
            <SView>
                {forgotPage == "email" && <ForgotPasswordEmail setScreen={setScreen} setForgotPage={setForgotPage} email={email} setEmail={setEmail} />}
                {forgotPage == "verification" && <ForgotPasswordVerification setScreen={setScreen} setForgotPage={setForgotPage} email={email} />}
                {forgotPage == "reset" && <ResetPassword setScreen={setScreen} setForgotPage={setForgotPage} email={email} handlePresentModalPress={handlePresentModalPress} />}
            </SView>
            
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={{ alignItems: "center", padding: 24 }}>
                    <SImage source={require('../assets/success.png')} style={{ width: 202, height: 168 }} />

                    <SView className='mt-6'>
                        <SText className='text-[32px] font-[600] mb-2 text-[#101010] text-center'>Password Changed</SText>
                        <SText className='font-[500] text-[#878787] text-center'>Password changed successfully, you can login again with a new password</SText>
                    </SView>

                    <SPressable className='mt-8 items-center justify-center bg-[#FE8C00] p-4 rounded-full w-full' onPress={handleNext}>
                        <SText className='font-[500] text-white text-lg'>Go To Login</SText>
                    </SPressable>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}