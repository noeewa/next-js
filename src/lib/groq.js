import Groq from "groq-sdk";
require('dotenv').config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
    const stream = await getGroqChatStream();
    for await (const chunk of stream) {
      // Print the completion returned by the LLM.
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  }
  
export async function getGroqChatStream() {
    return groq.chat.completions.create({

      //
      messages: [
       
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        // Set a user message for the assistant to respond to.
        {
          role: "user",
          content: "Explain the importance of fast language models",
        },
      ],
  
      model: "openai/gpt-oss-20b",
  

      temperature: 0.5,
  

      max_completion_tokens: 1024,
  
      top_p: 1,
  
      stop: null,

      stream: true,
    });
  }
  
  main();