import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

@Injectable()
export class ChatService {
  async getChatResponse(message: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
   // console.log(apiKey);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response) {
        console.error('API 응답 오류:', error.response.data);
      } else {
        console.error('Axios 오류:', error.message);
      }
      throw new HttpException(
        '챗봇 응답 생성 중 문제가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
