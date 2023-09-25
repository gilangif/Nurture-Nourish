import { Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { FontAwesome5, Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import NutritionSubDetail from '../components/NutritionSubDetail';

export default function NutritionDetailScreen() {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <HeaderComponent
                leftContent={
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left-circle" size={30} color="black" />
                    </Pressable>}
                centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Detail Nutrisi</Text>}
                rightContent={<FontAwesome5 name="user-circle" size={28} color="black" />}
            />
            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ marginTop: 10 }}>
                    <View
                        style={{
                            backgroundColor: "white", padding: 15, gap: 10, borderRadius: 20, marginBottom: 10, borderWidth: 2,
                            borderColor: 'rgb(203 213 225)'
                        }}
                    >
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <View style={{ alignItems: "center" }}>
                                {/* <Entypo name="squared-cross" style={{ color: "red" }} size={39} color="black" /> */}
                                <FontAwesome name="check-square-o" style={{ color: "green" }} size={40} color="black" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={1} style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -5 }}>
                                    17 Agustus 2023
                                </Text>
                                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>
                                    200gr ayam, 300gr nasi, 100gr bayam
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: "rgb(203 213 225)", height: 2, marginBottom: 10, marginHorizontal: -15 }} />
                        <View
                            style={{
                                gap: 15, borderRadius: 20, marginBottom: 10,
                            }}
                        >
                            <NutritionSubDetail name={'Protein'} percentage={'85%'} color={'rgb(239 68 68)'} imgUrl={require('../images/protein.png')} />
                            <NutritionSubDetail name={'Karbohidrat'} percentage={'65%'} color={'rgb(239 168 68)'} imgUrl={require('../images/protein.png')} />
                        </View>
                    </View>
                </View>

                {/* Margin Bottom */}
                <View style={{ height: 30 }} />
            </ScrollView >
        </View >
    )
}

