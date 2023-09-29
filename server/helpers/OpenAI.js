const OpenAI = require("openai")
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

class OpenAIWrapper
{
  static async createChatCompletion(options)
  {
    return openai.chat.completions.create(options);
  }
  static async query(search)
  {
    const chatCompletion = await OpenAIWrapper.createChatCompletion({
      messages: [{ role: "user", content: search }],
      model: "gpt-3.5-turbo",
    })
    return chatCompletion.choices
  }
}


module.exports = OpenAIWrapper;
