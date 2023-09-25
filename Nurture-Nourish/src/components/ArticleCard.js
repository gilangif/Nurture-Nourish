import { Image, Text, View } from "react-native";

export default function ArticleCard() {
    return (
        <View style={{ width: 250, paddingBottom: 5, marginRight: 10 }}>
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
                }} source={{ uri: "https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/24/2020/12/Mucus-Plug.jpg" }} />
                <Text numberOfLines={2} style={{
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
                    borderRadius: 10
                }}>
                    Mengenal Mucus Plug, Sumbat Lendir yang Berperan Penting bagi Bumil
                </Text>
            </View>
        </View>
    )
}
