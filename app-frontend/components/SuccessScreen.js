import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Button, ImageBackground, Pressable, TextInput, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome';

import bgImg from '../assets/bg1.png';


const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SSafeAreaView = styled(SafeAreaView);
const SImageBackground = styled(ImageBackground);
const SIcon = styled(Icon);
const SImage = styled(Image);

const SInput = styled(TextInput);

export default function SuccessScreen({ setScreen }) {

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

    useEffect(() => {
        handlePresentModalPress();
    }, []);

    return (
        <SImageBackground source={bgImg} className='h-[110%] mt-[-20%]' style={{ transform: "rotateY(180deg)" }}>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={{ alignItems: "center", padding: 24, transform: "rotateY(180deg)" }}>
                        <SImage source={require('../assets/success.png')} style={{ width: 202, height: 168 }} />

                        <SView className='mt-6'>
                            <SText className='text-[32px] font-[600] mb-2 text-[#101010] text-center'>Login Successful</SText>
                            <SText className='font-[500] text-[#878787] text-center'>An event has been created and the invite has been sent to you on mail.</SText>
                        </SView>

                        <SPressable className='mt-8 items-center justify-center bg-[#FE8C00] p-4 rounded-full w-full' onPress={handleNext}>
                            <SText className='font-[500] text-white text-lg'>Logout</SText>
                        </SPressable>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </SImageBackground>
    );
}