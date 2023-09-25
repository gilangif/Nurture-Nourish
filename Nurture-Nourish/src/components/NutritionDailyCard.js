import { Pressable, Text, View } from "react-native";
import { FontAwesome5, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function NutritionDailyCard() {
    const navigation = useNavigation()
    return (
        <Pressable
            onPress={() => { navigation.navigate('NutritionDetail'); console.log('clicked') }}
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
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ backgroundColor: 'rgb(226 232 240)', width: 7, height: 45, borderRadius: 10, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'rgb(239 68 68)', width: '100%', height: '70%', borderRadius: 10 }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>
                            25 g
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>
                            Protein
                        </Text>
                    </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ backgroundColor: 'rgb(226 232 240)', width: 7, height: 45, borderRadius: 10, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'rgb(139 92 246)', width: '100%', height: '80%', borderRadius: 10 }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>
                            25 g
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>
                            Karbo
                        </Text>
                    </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ backgroundColor: 'rgb(226 232 240)', width: 7, height: 45, borderRadius: 10, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'rgb(16 185 129)', width: '100%', height: '30%', borderRadius: 10 }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>
                            25 g
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>
                            Serat
                        </Text>
                    </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ backgroundColor: 'rgb(226 232 240)', width: 7, height: 45, borderRadius: 10, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'rgb(250 204 21)', width: '100%', height: '50%', borderRadius: 10 }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>
                            25 g
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>
                            Lemak
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
