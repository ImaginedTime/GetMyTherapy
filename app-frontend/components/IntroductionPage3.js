import { styled } from 'nativewind';
import { View, Text, Button, ImageBackground, Pressable, Image } from 'react-native';

import bgImg from '../assets/bg3.png';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome';


const SView = styled(View);
const SText = styled(Text);
const SPressable = styled(Pressable);
const SImageBackground = styled(ImageBackground);
const SSafeAreaView = styled(SafeAreaView);

export default function IntroductionPage3({ navigation }) {
    return (
        <SImageBackground source={bgImg} style={{ flex: 1 }}>
            <SSafeAreaView className='flex-1 flex justify-end'>
                <SView className='bg-[#FE8C00] rounded-[48px] p-8 mx-auto mb-[10vw] w-5/6 h-[400px] justify-between'>
                    <SView>
                        <SText className='text-white text-[32px] text-center mb-4'>We serve incomparable delicacies</SText>
                        <SText className='text-white text-[14px] text-center px-8'>All the best restaurants with their top menu waiting for you, they cant wait for your order</SText>

                        <SView className='h-[6px] flex flex-row space-x-1 mx-auto mt-4'>
                            <SView className='h-[6px] w-[24px] bg-[#c2c2c2] rounded'></SView>
                            <SView className='h-[6px] w-[24px] bg-[#c2c2c2] rounded'></SView>
                            <SView className='h-[6px] w-[24px] bg-white rounded'></SView>
                        </SView>
                    </SView>

                    <SView className='flex flex-row justify-between'>
                        <SPressable className='flex justify-center items-center mx-auto'
                            onPress={() => navigation.navigate('Auth')}
                        >
                            <SView className='w-[94px] h-[94px] rotate-45 flex justify-center items-center p-4 border-2 border-white border-l-[#c2c2c2] rounded-[47px]'>
                                <SView className='bg-white w-full h-full rounded-full flex justify-center items-center'>
                                    <Image source={require('../assets/arrow-up-right.png')} style={{width: 24, height: 24}}/>
                                </SView>
                            </SView>
                        </SPressable>
                    </SView>
                </SView>
            </SSafeAreaView>
        </SImageBackground>
    );
}