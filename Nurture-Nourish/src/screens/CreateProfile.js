import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function CreateProfileScreen() {
    const navigation = useNavigation();
    const [gender, setGender] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{ backgroundColor: 'white', flex: 1, padding: 30 }}>
                    <Pressable
                        onPress={() => navigation.navigate('Welcome')}
                        style={{ marginTop: 30, width: 40, paddingVertical: 5 }}>
                        <AntDesign name="arrowleft" size={25} color="black" />
                    </Pressable>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 30 }}>
                            Set up my
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 30 }}>
                            profile!
                        </Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 18 }}>
                            Name
                        </Text>
                        <TextInput
                            // value={name}
                            // onChangeText={(name) => setName(name)}
                            placeholder={'Enter your name'}
                            style={{
                                backgroundColor: "white",
                                paddingVertical: 10,
                                fontSize: 16,
                                fontFamily: "Poppins-Regular",
                                borderBottomWidth: 1,
                                borderBottomColor: 'rgb(203 213 225)'
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 18 }}>
                            Gender
                        </Text>
                        <View style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: 'rgb(203 213 225)',
                            borderRadius: 15
                        }}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                                style={{ height: 50, width: '100%', fontFamily: "Poppins-Regular" }}
                            >
                                <Picker.Item label="Female" value="female" />
                                <Picker.Item label="Male" value="male" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 18 }}>
                            Birth Date
                        </Text>
                        <TextInput
                            // value={birthDate}
                            // onChangeText={(birthDate) => setBirthDate(birthDate)}
                            placeholder={'Enter your birthDate'}
                            style={{
                                backgroundColor: "white",
                                paddingVertical: 10,
                                fontSize: 16,
                                fontFamily: "Poppins-Regular",
                                borderBottomWidth: 1,
                                borderBottomColor: 'rgb(203 213 225)'
                            }}
                        />
                    </View>
                    <Pressable style={{ backgroundColor: 'black', marginTop: 50, padding: 12, borderRadius: 15 }} onPress={() => { navigation.navigate('CreateProfile') }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', color: "white", fontSize: 16 }}>
                            Submit
                        </Text>
                    </Pressable>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
