import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { GROQ_API_KEY } from 'src/configs';

const model = new ChatGroq({
  // apiKey: process.env.GROQ_API_KEY || GROQ_API_KEY,
  apiKey: GROQ_API_KEY,
});

const outputParser = new StringOutputParser();

const prompt = ChatPromptTemplate.fromMessages([
  ['system', '你是一名专业的助手，请使用中文回答问题'],
  ['human', '{input}'],
]);
export const chain = prompt.pipe(model).pipe(outputParser);
