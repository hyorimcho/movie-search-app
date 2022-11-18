# :clapper: movie-search-app

OMDb API 기반 영화 검색 사이트 만들기

### 배포 사이트

https://scenarihy0.netlify.app/

### ⚙️ 어려웠던 부분 && 아쉬웠던 부분

- 기획 없이 무작정 만들다 보니 디자인적으로도 아쉬웠고 중복되는 코드가 많아지게 되었습니다.
- 영화 검색은 잘 되지만 마지막에 `TypeError: movies is not iterable` 오류가 뜹니다. 오류를 없애고자 `try/catch` 를 사용해 보았으나 제대로 실행되지 않았습니다.
- 모듈을 적용해 보고자 하였으나 스크립트를 나누면 오류가 발생하여 하나의 스크립트로 진행하였습니다.
- `search` 버튼을 두 번 이상 누르면 끝까지 로딩되는 현상이 발생합니다. 왜 이런 현상이 발생하는지 잘 모르겠습니다.

---

### :exclamation: 필수

- [x] 영화 제목으로 검색 가능하고 검색된 결과의 영화 목록이 출력돼야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 스타일(CSS) 라이브러리나 프레임워크 사용은 자유입니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### :grey_question: 선택

- [x] 한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.
- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [ ] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [ ] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있도록 만들어보세요.
- [ ] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 영화 상세정보 포스터를 고해상도로 출력해보세요.(실시간 이미지 리사이징)
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 영화와 관련된 기타 기능도 고려해보세요.
