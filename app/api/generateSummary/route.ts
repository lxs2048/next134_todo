import openai from '@/openai'
import { NextResponse } from 'next/server'
const buildMessages = (
  todos: { [key in TypedColumn]: number },
  name: stringCommon
): { role: 'system' | 'user'; content: string }[] => {
  return [
    {
      role: 'system',
      content: `回复时，始终称呼用户为${
        name || '先生'
      }，并说欢迎使用Todo App！回复内容不能超过200个字符。`,
    },
    {
      role: 'user',
      content: `嗨，这里是所有待办事项的摘要。计数每个类别中有多少个待办事项，例如待办、进行中和已完成，然后告诉用户祝他过一个充实的一天！以下是数据：${JSON.stringify(
        todos
      )}`,
    },
  ]
}
export async function POST(request: Request) {
  const { todos, name } = await request.json()
  const openaiApiHost = process.env.OPENAI_API_HOST
  const openaiApiKey = process.env.OPENAI_API_KEY
  const chatgptApiModel = 'gpt-3.5-turbo'
  const chatgptApiTemperature = 0.8
  // 国内。。。
  // const response = await openai.createChatCompletion({
  //     model: chatgptApiModel,
  //     messages: buildMessages(todos),
  //     temperature: chatgptApiTemperature,
  //     stream: false,
  // })
  // const { data } = response
  // return NextResponse.json(data.choices[0].message)
  const response = await fetch(`${openaiApiHost}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: chatgptApiModel,
      messages: buildMessages(todos, name),
      temperature: chatgptApiTemperature,
      stream: false,
    }),
  })
  const data = await response.json()
  return NextResponse.json(data?.choices?.[0]?.message)
}
