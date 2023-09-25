import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";

export default function RecipeCard() {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate('RecipeDetail')} style={{ width: 250, paddingBottom: 5, marginRight: 10 }}>
            <View style={{
                borderRadius: 15,
                borderWidth: 1,
                height: 150,
                width: '100%',
                borderColor: 'rgb(226 232 240)',
                marginRight: 10,
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Image resizeMode="cover" style={{
                    width: '100%',
                    height: "100%",
                    position: 'absolute',
                    top: 0,
                    left: 0
                }} source={{ uri: "https://www.marthastewart.com/thmb/9SwNGFbxZv2ttLQ3uvZe_McJChk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-basic-pancakes-horiz-1022_0-f13ba897aba6423db7901ca826595244.jpgitokXQMZkp_j" }} />
                <Text numberOfLines={1} style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 5
                }}>
                    Easy basic pancake
                </Text>
            </View>
        </Pressable>
    )
}
