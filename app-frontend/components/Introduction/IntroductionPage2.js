import { styled } from 'nativewind';
import { View, Text, Button, ImageBackground, Pressable } from 'react-native';

import bgImg from '../../assets/bg2.png';

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
                            <SView className='h-[6px] w-[24px] bg-white rounded'></SView>
                            <SView className='h-[6px] w-[24px] bg-[#c2c2c2] rounded'></SView>
                        </SView>
                    </SView>

                    <SView className='flex flex-row justify-between'>
                        <SPressable onPress={() => navigation.navigate("Auth")}>
                            <SText className='text-white text-[14px]'>Skip</SText>
                        </SPressable>

                        <SPressable className='flex-row gap-2'
                            onPress={() => navigation.navigate('Intro3')}
                        >
                            <SText className='text-white text-[14px]'>Next</SText>
                            <Icon name='arrow-right' size={14} color='#fff' />
                        </SPressable>
                    </SView>
                </SView>
            </SSafeAreaView>
        </SImageBackground>
    );
}