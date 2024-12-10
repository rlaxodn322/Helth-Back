import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { executablePath } from 'puppeteer';

@Injectable()
export class HealthNewsService {
  async getHealthNews(): Promise<any> {
    const browser = await puppeteer.launch({
      headless: true, // 백그라운드 모드
      executablePath: executablePath('chrome'),
    });
    const page = await browser.newPage();
    // 페이지 이동 후 기다리기
    await page.goto(
      'https://www.healthfocus.co.kr/news/articleList.html?page=1&total=8569&sc_section_code=S1N5&sc_sub_section_code=&sc_serial_code=&sc_area=&sc_level=&sc_article_type=&sc_view_level=&sc_sdate=&sc_edate=&sc_serial_number=&sc_word=&box_idxno=0&sc_multi_code=&sc_is_image=&sc_is_movie=&sc_user_name=&sc_order_by=E&view_type=sm',
      {
        waitUntil: 'load', // 페이지가 완전히 로드될 때까지 대기
      },
    );

    // 페이지가 동적으로 로드되거나 요소가 추가될 때까지 기다리기
    await page.waitForSelector('#section-list', {
      timeout: 60000, // 기다릴 시간 늘리기 (예: 60초)
    });
    // 뉴스 제목과 URL을 정확히 크롤링할 수 있는 선택자 사용
    const news = await page.evaluate(() => {
      const baseUrl = 'https://www.healthfocus.co.kr/';
      const articles = Array.from(
        document.querySelectorAll('#section-list > ul > li '),
      ); // 각 기사 내 링크 선택자

      return articles.map((article: any) => {
        const linkElement = article.querySelector('h2 a'); // 링크 요소
        const imgElement = article.querySelector('a img'); // 이미지 요소
        const imgSrc = imgElement ? imgElement.getAttribute('src') : ''; // 이미지 경로

        return {
          title: linkElement ? linkElement.textContent.trim() : '', // 뉴스 제목
          url: linkElement ? baseUrl + linkElement.getAttribute('href') : '', // 링크 URL
          imgUrl: imgSrc.startsWith('http') ? imgSrc : baseUrl + imgSrc, // 절대/상대 경로 처리
        };
      });
    });
    await browser.close();
    return news;
  }
}
