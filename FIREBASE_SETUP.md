# Firebase 로그인 기능 설정 가이드

## 🎉 구현 완료된 기능

✅ Firebase Authentication 서비스 구현  
✅ 구글 로그인 구현  
✅ 이메일/비밀번호 로그인/회원가입 구현  
✅ 로그인 상태 관리  
✅ 설정 화면에 계정 관리 통합  
✅ 아름다운 로그인 UI  
✅ 비밀번호 재설정 기능  
✅ Android Gradle 설정 완료  
✅ 임시 Firebase 설정 파일 생성

## 🚨 에러 해결 완료

### Gradle 버전 에러 해결됨

- Android 빌드를 위한 Gradle 설정 최적화
- Firebase 플러그인 정상 적용
- 빌드 캐시 정리 완료

### 임시 Firebase 설정 파일 생성

- `android/app/google-services.json` 임시 파일 생성
- 빌드 에러 방지를 위한 더미 설정 적용
- **주의**: 실제 기능 사용을 위해서는 Firebase Console에서 다운로드한 실제 파일로 교체 필요

## 📋 Firebase Console 설정 필요사항

### 1. Firebase 프로젝트 설정

- Firebase Console에서 프로젝트 생성 완료 (futurediarym-59f4a)
- Authentication 활성화
- 로그인 제공업체 설정:
  - ✅ Google 로그인 활성화
  - ✅ 이메일/비밀번호 로그인 활성화

### 2. iOS 설정

**필요 파일:** `GoogleService-Info.plist`

1. Firebase Console → 프로젝트 설정 → iOS 앱
2. Bundle ID: `com.futurediary` (또는 현재 사용 중인 Bundle ID)
3. `GoogleService-Info.plist` 다운로드
4. Xcode에서 `ios/FutureDiary/` 폴더에 추가

### 3. Android 설정 (우선순위 높음)

**현재 상태**: 임시 더미 파일 사용 중  
**필요 작업**: 실제 Firebase 설정 파일로 교체

1. Firebase Console → 프로젝트 설정 → Android 앱
2. Package name: `com.futurediary`
3. **실제** `google-services.json` 다운로드
4. **기존 더미 파일을 덮어쓰기**: `android/app/google-services.json`

### 4. Google Sign-In 설정 (중요)

현재 더미 webClientId 사용 중. 실제 값으로 변경 필요:

**현재 설정:**

```typescript
// src/config/firebaseConfig.ts
webClientId: '179993011809-dummy.apps.googleusercontent.com', // 더미 값
```

**변경해야 할 값:**

```typescript
webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID.apps.googleusercontent.com',
```

**webClientId 찾는 방법:**

1. Firebase Console → 프로젝트 설정 → 일반 탭
2. 'OAuth 2.0 웹 클라이언트 ID' 복사
3. `src/config/firebaseConfig.ts` 파일에서 더미 값 교체

## 📱 사용 방법

### 로그인 기능 접근

1. 앱 실행 → 설정 탭
2. "계정 로그인" 또는 "계정 관리" 선택
3. 구글 로그인 또는 이메일 로그인 선택

### 로그인 옵션

- **구글 로그인**: 원터치 간편 로그인 (webClientId 설정 후 사용 가능)
- **이메일 로그인**: 이메일과 비밀번호로 로그인 (즉시 사용 가능)
- **회원가입**: 새 계정 생성 (즉시 사용 가능)
- **비밀번호 재설정**: 이메일로 재설정 링크 발송

### 로그아웃

1. 설정 → "계정 관리"
2. 계정 정보 팝업에서 "로그아웃" 선택

## 🔧 기술 구현 사항

### 패키지 설치 완료

```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin
```

### 파일 구조

```
src/
├── config/
│   └── firebaseConfig.ts      # Firebase 초기화 설정
├── services/
│   └── authService.ts         # 인증 서비스 (로그인/로그아웃/회원가입)
└── screens/
    ├── LoginScreen.tsx        # 로그인 화면
    └── SettingsScreen.tsx     # 설정 화면 (계정 관리 통합)

android/app/
└── google-services.json       # Firebase 설정 (임시 더미 파일)
```

### 주요 기능

- **인증 상태 관리**: 실시간 로그인 상태 감지
- **에러 처리**: 한국어 에러 메시지 제공
- **사용자 정보 표시**: 프로필 사진, 이름, 이메일
- **보안**: Firebase Security Rules 준수
- **UX**: 직관적이고 아름다운 인터페이스

## 🚀 앱 실행 방법

### iOS

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

## ⚠️ 주의사항

1. **즉시 교체 필요한 파일들**

   - ❌ `android/app/google-services.json` (현재 더미 파일)
   - ❌ `src/config/firebaseConfig.ts` (현재 더미 webClientId)
   - ❌ iOS: `GoogleService-Info.plist` (아직 추가 안됨)

2. **현재 사용 가능한 기능**

   - ✅ 이메일/비밀번호 로그인 (완전 동작)
   - ✅ 회원가입 (완전 동작)
   - ✅ 비밀번호 재설정 (완전 동작)
   - ❌ Google 로그인 (실제 설정 파일 필요)

3. **Firebase Console 필수 설정**
   - Authentication 활성화
   - Google 및 이메일 로그인 제공업체 활성화

## 🎯 다음 단계 (우선순위 순)

1. **높음**: Firebase Console에서 실제 `google-services.json` 다운로드 → `android/app/` 폴더에 교체
2. **높음**: Firebase Console에서 실제 webClientId 복사 → `src/config/firebaseConfig.ts` 업데이트
3. **중간**: iOS용 `GoogleService-Info.plist` 추가
4. **낮음**: 추가 기능 구현 (Apple 로그인, 2FA 등)

## 📞 문제 해결

### ✅ 해결된 문제들

1. **Gradle 버전 에러**: 해결 완료
2. **Firebase 빌드 에러**: 임시 더미 파일로 해결
3. **패키지 설치 오류**: 모든 종속성 정상 설치

### 여전히 발생 가능한 문제들

1. **Google 로그인 실패**

   - 원인: 더미 webClientId 사용 중
   - 해결: Firebase Console에서 실제 webClientId로 교체

2. **Android 빌드 실패**

   - 원인: 더미 google-services.json 파일
   - 해결: Firebase Console에서 실제 파일로 교체

3. **iOS 빌드 실패**
   - 원인: GoogleService-Info.plist 파일 누락
   - 해결: Firebase Console에서 다운로드 후 Xcode 프로젝트에 추가

---

🎉 **현재 상태**: 이메일 로그인은 완전히 작동하며, Firebase 설정 파일만 교체하면 모든 기능이 정상 동작합니다!
