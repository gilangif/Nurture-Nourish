import { Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { FontAwesome5, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import NutritionDailyCard from '../components/NutritionDailyCard';
import BottomComponent from '../components/BottomComponent';
import { useNavigation } from '@react-navigation/native';

export default function NutritionScreen() {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <HeaderComponent
                leftContent={
                    <>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>
                            Asupan
                        </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>
                            Nutrisi Harian
                        </Text>
                    </>}

                rightContent={
                    <>
                        <Pressable onPress={() => navigation.navigate('AddNutrition')}>
                            <MaterialIcons name="add-circle-outline" size={32} color="black" />
                        </Pressable>
                        <Pressable onPress={() => { navigation.navigate('ProfileDetail'); console.log('clicked') }}>
                            <FontAwesome5 name="user-circle" size={28} color="black" />
                        </Pressable>
                    </>}
            />
            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ marginTop: 10 }}>
                    <NutritionDailyCard />
                    <NutritionDailyCard />
                    <NutritionDailyCard />
                    <NutritionDailyCard />
                    <NutritionDailyCard />
                    <NutritionDailyCard />
                    <NutritionDailyCard />
                </View>

                {/* Margin Bottom */}
                <View style={{ height: 25 }} />
            </ScrollView >
            <BottomComponent />
        </View >
    )
}

