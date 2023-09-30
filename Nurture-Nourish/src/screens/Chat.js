import { Pressable, StyleSheet, Text, View } from "react-native"
import * as TalkRn from "@talkjs/expo"
import HeaderComponent from "../components/HeaderComponent"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function Chat() {
  const navigation = useNavigation()
  const me = {
    id: "123456789",
    name: "rama",
    email: "rama@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  }

  const other = {
    id: "987654321",
    name: "Dr. Verdian",
    email: "verdian@doctor.com",
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    welcomeMessage: "Hey, how can I help?",
    role: "default",
  }

  const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other))

  conversationBuilder.setParticipant(me)
  conversationBuilder.setParticipant(other)

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>}
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Chat Counselor</Text>}
        rightContent={
          <Pressable onPress={() => { navigation.navigate('ProfileDetail'); console.log('clicked') }}>
            <FontAwesome5 name="user-circle" size={28} color="black" />
          </Pressable>
        }
      />
      <TalkRn.Session appId="t0qA0gWk" me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
      {/* Margin Bottom */}
      {/* <View style={{ height: 35 }} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
})
