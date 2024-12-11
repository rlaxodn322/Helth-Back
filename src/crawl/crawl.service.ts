import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlService {
  async getHypertensionData(): Promise<string[]> {
    try {
      const response = await axios.get(
        'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ssc=tab.nx.all&query=%EA%B3%A0%ED%98%88%EC%95%95%EC%97%90+%EC%A2%8B%EC%9D%80+%EC%9D%8C%EC%8B%9D&oquery=%EA%B3%A0%ED%98%88%EC%95%95&tqi=i1CZPlqps8wsshbOZkCsssssst4-476725',
      );

      const $ = cheerio.load(response.data);
      const results: string[] = [];

      // 불필요한 부분 제거: 원하는 요소들만 추출
      $(
        '#main_pack > section.sc_new.sp_ntotal._sp_ntotal._fe_root_ksn_sitd > div > ul > li > div.bx_snippet',
      ).each((index, element) => {
        const text = $(element).text().trim();

        // 텍스트에서 고혈압과 관련된 음식만 추출
        const foodItems = text.match(/[\d]+\.\s?([^\d]+)/g);
        if (foodItems) {
          // 음식 항목만 정리
          foodItems.forEach((item) => {
            const cleanItem = item.replace(/^\d+\.\s?/, '').trim(); // 숫자와 점 제거
            if (cleanItem) {
              // 불필요한 부분 (문서 저장, 링크 등) 제거
              const cleanedItem = cleanItem
                .replace(
                  /(문서 저장하기.*|Keep.*|관련 링크.*|https:\/\/.*\.com|코메디닷컴kormedi.com›고혈압에 좋음 음식|-)/g,
                  '',
                )
                .trim();
              if (cleanedItem) {
                results.push(cleanedItem);
              }
            }
          });
        }
      });

      return results; // 필요한 음식 목록만 반환
    } catch (error) {
      console.error('ERROR fetching hypertension data', error);
      return ['고혈압 정보 Get 문제 발생'];
    }
  }
  async getDiabetesData(): Promise<string[]> {
    try {
      const response = await axios.get(
        'https://search.naver.com/search.naver?query=당뇨',
      );
      const $ = cheerio.load(response.data);
      const results: string[] = [];

      // 검색 결과 중 필요한 정보를 추출 (예시: .api_txt_lines 클래스를 가진 요소에서 텍스트를 추출)
      $('div.api_txt_lines').each((index, element) => {
        results.push($(element).text().trim());
      });

      return results;
    } catch (error) {
      console.error('Error fetching diabetes data:', error);
      return ['당뇨에 대한 정보를 가져오는 데 문제가 발생했습니다.'];
    }
  }
}
