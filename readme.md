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

- 번역 실행과 노트 작성을 분리하기
  - 인물 핵심 특징 내용 개선
- 챕터 정보 주는 방법을 개선
  - 챕터 묶음 번역 고려
- 번역 어미 통일(했다 O, 했어 X)
- 줄 바꿈 강제
- Thingking 기능 사용 퍼포먼스 비교. 필요한 경우 ON/OFF 기능 지원
- 속담
  - 한국에 같은 뜻의 속담이 있는 경우 해당 속담 사용
  - 없는 경우 속담 문장을 직역한 뒤 주석 추가
- 가타카나의 원단어가 영어일 경우, 원본 영어의 발음을 살려서 번역
  - 인물명, 고유명사의 경우 영어가 아니더라도 원언어를 한국에서 사용하는 발음으로 표시
- Try again if 500 Internal Server Error Gemini
- 사용 방법 작성
