import { Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { FontAwesome5, Feather, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BottomComponent from '../components/BottomComponent';

export default function ValidationInputFindRecipeScreen() {
    const navigation = useNavigation()
    const [fields, setFields] = useState([{ food: '', value: '' }]);

    const addField = () => {
        setFields([...fields, { food: '', value: '' }]);
    };

    const removeField = () => {
        if (fields.length > 1) {
            const newFields = [...fields];
            newFields.pop();
            setFields(newFields);
        }
    };

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <HeaderComponent
                leftContent={
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left-circle" size={30} color="black" />
                    </Pressable>}
                centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Bahan Makanan</Text>}
                rightContent={
                    <Pressable onPress={() => { navigation.navigate('ProfileDetail'); console.log('clicked') }}>
                        <FontAwesome5 name="user-circle" size={28} color="black" />
                    </Pressable>
                }
            />

            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ marginTop: 10, gap: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, paddingTop: 10, marginBottom: -5, fontSize: 16, fontFamily: "Poppins-SemiBold", borderRadius: 13 }} >Nama Bahan</Text>
                    </View>
                    {fields.map((field, index) => (
                        <View key={index} style={{ gap: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <TextInput
                                    value={field.food}
                                    onChangeText={text => {
                                        const newFields = [...fields];
                                        newFields[index].food = text;
                                        setFields(newFields);
                                    }}
                                    style={{ borderWidth: 1, borderColor: "gray", flex: 1, paddingTop: 10, paddingHorizontal: 10, paddingBottom: 6, fontSize: 16, fontFamily: "Poppins-Medium", borderRadius: 13 }}
                                />
                            </View>
                        </View>
                    ))}
                    <View style={{ flexDirection: "row", marginTop: 10, gap: 5, alignItems: 'center' }}>
                        <Pressable style={{ flex: 1, padding: 10, marginRight: 5, backgroundColor: "black", borderRadius: 12 }} onPress={() => { navigation.navigate('RecipeRecommendation'); console.log('submitted') }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', color: 'white', marginBottom: -3, fontSize: 16 }}>
                                Submit
                            </Text>
                        </Pressable>
                        <Pressable onPress={removeField}>
                            <MaterialCommunityIcons name="minus-box" size={50} color="black" />
                        </Pressable>
                        <Pressable onPress={addField}>
                            <MaterialCommunityIcons name="plus-box" size={50} color="black" />
                        </Pressable>
                    </View>
                </View>

                {/* Margin Bottom */}
                <View style={{ height: 30 }} />
            </ScrollView >
            <BottomComponent />
        </View >
    )
}

