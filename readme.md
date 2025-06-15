# Web Novel translator

Translate Jp novels to Kr using LLM.

## Steps

- Set Novel from URL
  - Get Novel text from chapters
    - Translate text with LLM
    - Write translate note for next chapters

## Requirement

- Google API
- Syosetu URL
- Node.js 22

## To do

- 당연한 정보를 노트에 적는것 방지
- 번역에 도움이 되는 정보만 노트에 기록하기
- 번역 실행과 노트 작성을 분리하기
- 챕터 묶음 번역 지원
- 가타카나의 원단어가 영어일 경우, 원본 영어의 발음을 살려서 번역
  - 인물명, 고유명사의 경우 영어가 아니더라도 원언어를 한국에서 사용하는 발음으로 표시
- Try again if 500 Internal Server Error Gemini
- 사용 방법 작성
