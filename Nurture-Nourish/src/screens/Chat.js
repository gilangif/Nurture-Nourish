import { StyleSheet, View } from "react-native"
import * as TalkRn from "@talkjs/expo"

export default function Chat() {
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
      <TalkRn.Session appId="t0qA0gWk" me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
})
