export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',    // Chore: 빌드 관련 코드 수정
        'chore',    // Chore: 빌드 관련 코드 수정
        'ci',       // Chore: 빌드 관련 코드 수정
        'docs',     // Docs: 내부 문서 추가/수정
        'feat',     // Feat: 새로운 기능 추가
        'fix',      // Fix: 버그 수정
        'perf',     // Perf: 성능 개선
        'refactor', // Refactor: 코드 리팩토링
        'style',    // Style: CSS 등 디자인 추가/수정
        'test',     // Test: 테스트 추가/수정
        'env',      // Env: 개발 환경 관련 설정
        'design',   // Design: 코드 스타일 수정 (세미 콜론, 인덴트 등의 스타일적인 부분만)
        'comment',  // Comment: 주석 추가/수정
        'rename',   // Rename: 파일 및 폴더명 수정
        'remove'    // Remove: 파일 삭제
      ]
    ],
  },
};
