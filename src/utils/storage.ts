import AsyncStorage from '@react-native-async-storage/async-storage';
import {DiaryEntry} from '../types';

const DIARY_ENTRIES_KEY = 'DIARY_ENTRIES';

export const saveDiaryEntries = async (
  entries: DiaryEntry[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(DIARY_ENTRIES_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('일기 저장 중 오류:', error);
    throw error;
  }
};

export const loadDiaryEntries = async (): Promise<DiaryEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(DIARY_ENTRIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('일기 불러오기 중 오류:', error);
    return [];
  }
};

export const saveDiaryEntry = async (entry: DiaryEntry): Promise<void> => {
  try {
    const entries = await loadDiaryEntries();
    const existingIndex = entries.findIndex(e => e.id === entry.id);

    if (existingIndex >= 0) {
      entries[existingIndex] = {...entry, updatedAt: new Date().toISOString()};
    } else {
      entries.push(entry);
    }

    entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    await saveDiaryEntries(entries);
  } catch (error) {
    console.error('일기 항목 저장 중 오류:', error);
    throw error;
  }
};

export const deleteDiaryEntry = async (id: string): Promise<void> => {
  try {
    const entries = await loadDiaryEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    await saveDiaryEntries(filteredEntries);
  } catch (error) {
    console.error('일기 삭제 중 오류:', error);
    throw error;
  }
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const migrateLegacyTags = async (): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(DIARY_ENTRIES_KEY);
    if (!existingData) return;

    const entries: DiaryEntry[] = JSON.parse(existingData);
    let hasChanges = false;

    const migratedEntries = entries.map(entry => {
      if (entry.tags && entry.tags.length > 0) {
        const migratedTags = entry.tags.map(tag => {
          if (typeof tag === 'string') {
            hasChanges = true;
            return {
              name: tag,
              icon: '🏷️',
              color: '#6c757d',
            };
          }
          return tag;
        });

        return {
          ...entry,
          tags: migratedTags,
        };
      }
      return entry;
    });

    if (hasChanges) {
      await AsyncStorage.setItem(
        DIARY_ENTRIES_KEY,
        JSON.stringify(migratedEntries),
      );
      console.log('Legacy tags migrated successfully');
    }
  } catch (error) {
    console.error('Error migrating legacy tags:', error);
  }
};

export const generateSampleData = async (): Promise<void> => {
  try {
    const existingEntries = await loadDiaryEntries();
    if (existingEntries.length > 0) {
      console.log('샘플 데이터가 이미 존재합니다.');
      return;
    }

    const currentDate = new Date();
    const sampleEntries: DiaryEntry[] = [];

    // 과거 2년 전 데이터 (결과와 피드백 포함)
    const twoYearsAgo = new Date(currentDate);
    twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);

    sampleEntries.push({
      id: generateId(),
      title: '첫 직장 면접 도전',
      content:
        '드디어 꿈꾸던 회사에 면접을 보러 갔다. 정말 긴장되었지만 최선을 다했다. 준비한 질문들을 다시 한번 점검하고, 자신감을 가지고 임했다.',
      date: new Date(twoYearsAgo.getFullYear(), 2, 15)
        .toISOString()
        .split('T')[0],
      mood: 'anxious',
      selectedCompany: ['meeting'],
      selectedPeople: ['alone'],
      actualResult:
        '합격했다! 정말 꿈만 같다. 준비한 것들이 도움이 되었고, 면접관들도 좋은 반응을 보여주셔서 감사했다.',
      resultStatus: 'realized',
      createdAt: new Date(twoYearsAgo.getFullYear(), 2, 15).toISOString(),
      updatedAt: new Date(twoYearsAgo.getFullYear(), 2, 15).toISOString(),
    });

    sampleEntries.push({
      id: generateId(),
      title: '친구들과 제주도 여행',
      content:
        '대학 친구들과 함께 제주도 여행을 다녀왔다. 맛있는 음식도 먹고, 아름다운 바다도 보고, 오랜만에 모든 걱정을 잊고 즐거운 시간을 보냈다.',
      date: new Date(twoYearsAgo.getFullYear(), 7, 20)
        .toISOString()
        .split('T')[0],
      mood: 'excited',
      selectedTravel: ['airplane'],
      selectedPeople: ['friends'],
      selectedFood: ['korean'],
      actualResult:
        '날씨가 좀 흐렸지만 정말 즐거웠다. 친구들과 함께한 시간이 너무 소중했고, 맛있는 흑돼지도 먹고 한라산도 올랐다!',
      resultStatus: 'realized',
      createdAt: new Date(twoYearsAgo.getFullYear(), 7, 20).toISOString(),
      updatedAt: new Date(twoYearsAgo.getFullYear(), 7, 20).toISOString(),
    });

    sampleEntries.push({
      id: generateId(),
      title: '토익 900점 도전',
      content:
        '토익 900점을 넘기 위해 도전했다. 매일 단어 100개씩 외우고, 듣기 문제 풀이도 꾸준히 했다. 목표를 이루면 자격급여도 올라갈 수 있을 것 같았다.',
      date: new Date(twoYearsAgo.getFullYear(), 10, 8)
        .toISOString()
        .split('T')[0],
      mood: 'content',
      selectedPeople: ['alone'],
      actualResult:
        '결과는 870점... 목표에는 못 미쳤지만 이전보다 200점이나 올랐다! 꾸준히 공부한 보람이 있었다.',
      resultStatus: 'not_realized',
      createdAt: new Date(twoYearsAgo.getFullYear(), 10, 8).toISOString(),
      updatedAt: new Date(twoYearsAgo.getFullYear(), 10, 8).toISOString(),
    });

    // 과거 1년 전 데이터 (결과와 피드백 포함)
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    sampleEntries.push({
      id: generateId(),
      title: '새로운 취미 시작',
      content:
        '요가를 시작했다. 몸과 마음의 건강을 위해서, 그리고 스트레스 해소를 위해서도 좋을 것 같아서 도전했다. 주 3회 정도 꾸준히 해보기로 했다.',
      date: new Date(oneYearAgo.getFullYear(), 4, 10)
        .toISOString()
        .split('T')[0],
      mood: 'content',
      selectedPeople: ['alone'],
      actualResult:
        '처음엔 힘들었지만 지금은 정말 좋아하게 되었다. 몸도 유연해지고 마음도 평온해진 것 같다. 계속 이어나가고 있다.',
      resultStatus: 'realized',
      createdAt: new Date(oneYearAgo.getFullYear(), 4, 10).toISOString(),
      updatedAt: new Date(oneYearAgo.getFullYear(), 4, 10).toISOString(),
    });

    sampleEntries.push({
      id: generateId(),
      title: '가족과의 특별한 저녁 식사',
      content:
        '오랜만에 가족 모두가 모였다. 엄마의 정성스러운 요리와 함께 즐거운 시간을 보냈다. 이런 순간들이 정말 소중하다는 것을 느꼈다.',
      date: new Date(oneYearAgo.getFullYear(), 9, 5)
        .toISOString()
        .split('T')[0],
      mood: 'happy',
      selectedPeople: ['family'],
      selectedFood: ['korean'],
      actualResult:
        '정말 따뜻하고 행복한 시간이었다. 가족들과 많은 이야기를 나누었고, 서로를 더 이해하게 되었다.',
      resultStatus: 'realized',
      createdAt: new Date(oneYearAgo.getFullYear(), 9, 5).toISOString(),
      updatedAt: new Date(oneYearAgo.getFullYear(), 9, 5).toISOString(),
    });

    sampleEntries.push({
      id: generateId(),
      title: '새로운 프로젝트 시작',
      content:
        '회사에서 중요한 신규 프로젝트에 투입되었다. 새로운 기술 스택도 배워야 했고 책임감도 무거웠지만, 성장할 수 있는 좋은 기회라고 생각했다.',
      date: new Date(oneYearAgo.getFullYear(), 11, 12)
        .toISOString()
        .split('T')[0],
      mood: 'anxious',
      selectedCompany: ['project'],
      selectedPeople: ['acquaintance'],
      actualResult:
        '힘들었지만 프로젝트를 성공적으로 마쳤다. 새로운 기술도 많이 배웠고, 팀워크의 중요성도 다시 한번 느꼈다.',
      resultStatus: 'realized',
      createdAt: new Date(oneYearAgo.getFullYear(), 11, 12).toISOString(),
      updatedAt: new Date(oneYearAgo.getFullYear(), 11, 12).toISOString(),
    });

    // 최근 과거 데이터 (결과와 피드백 포함)
    sampleEntries.push({
      id: generateId(),
      title: '중요한 프레젠테이션 준비',
      content:
        '회사에서 중요한 프레젠테이션을 맡았다. 많은 사람들 앞에서 발표하는 것이라 긴장되었지만, 열심히 준비했다.',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 18)
        .toISOString()
        .split('T')[0],
      mood: 'anxious',
      selectedCompany: ['presentation'],
      selectedPeople: ['acquaintance'],
      actualResult:
        '생각보다 잘 해냈다! 떨렸지만 준비한 대로 차근차근 설명했고, 동료들과 상사분들도 좋은 반응을 보여주셨다.',
      resultStatus: 'realized',
      createdAt: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 2,
        18,
      ).toISOString(),
      updatedAt: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 2,
        18,
      ).toISOString(),
    });

    sampleEntries.push({
      id: generateId(),
      title: '새로운 카페 탐방',
      content:
        '친구가 추천해준 신상 카페에 다녀왔다. 인테리어도 예쁘고 커피 맛도 정말 좋았다. 조용해서 독서하기에도 안성맞춤이었다.',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 5)
        .toISOString()
        .split('T')[0],
      mood: 'happy',
      selectedPeople: ['friends'],
      selectedDrink: ['coffee'],
      selectedWeather: ['sunny'],
      actualResult:
        '정말 좋은 장소를 발견했다. 이제 단골카페가 하나 더 생겼다. 친구에게 고마웠다.',
      resultStatus: 'realized',
      createdAt: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        5,
      ).toISOString(),
      updatedAt: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        5,
      ).toISOString(),
    });

    // Today 일기 추가
    const todayLocal = new Date(currentDate);
    const todayDateString = `${todayLocal.getFullYear()}-${String(
      todayLocal.getMonth() + 1,
    ).padStart(2, '0')}-${String(todayLocal.getDate()).padStart(2, '0')}`;

    sampleEntries.push({
      id: generateId(),
      title: '새로운 시작의 하루',
      content:
        '오늘은 정말 특별한 하루였다. 새로운 마음가짐으로 하루를 시작했고, 평소보다 더 의미있는 시간들을 보냈다. 작은 변화들이 모여서 큰 변화를 만들어낸다는 것을 다시 한번 느꼈다.',
      date: todayDateString, // 로컬 시간대 기준 오늘 날짜
      mood: 'content',
      selectedPeople: ['alone'],
      selectedWeather: ['sunny'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    sampleEntries.push({
      id: generateId(),
      title: '동료와 함께한 점심 모임',
      content:
        '오늘 점심시간에 동료들과 함께 새로 생긴 맛집에 가봤다. 맛있는 파스타와 함께 즐거운 대화를 나누었다. 업무 스트레스도 잠시 잊고 웃으며 시간을 보낼 수 있어서 좋았다.',
      date: todayDateString,
      mood: 'happy',
      selectedPeople: ['acquaintance'],
      selectedFood: ['western'],
      selectedCompany: ['work'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    sampleEntries.push({
      id: generateId(),
      title: '저녁 운동과 건강한 식단',
      content:
        '오늘 저녁에는 헬스장에 가서 운동을 했다. 러닝머신으로 30분, 근력운동 1시간 정도 했다. 운동 후 집에서 직접 만든 샐러드와 닭가슴살로 건강한 저녁을 먹었다. 몸도 마음도 한결 가벼워진 기분이다.',
      date: todayDateString,
      mood: 'content',
      selectedPeople: ['alone'],
      selectedFood: ['western'],
      selectedWeather: ['cloudy'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 미래 일기 (이미 일어난 것처럼 작성)
    const futureDate1 = new Date(currentDate);
    futureDate1.setDate(currentDate.getDate() + 7);

    sampleEntries.push({
      id: generateId(),
      title: '주말 등산 모임',
      content:
        '친구들과 함께 북한산에 올랐다. 맑은 날씨 덕분에 정상에서 서울 전경을 한눈에 볼 수 있었다. 힘들었지만 정말 상쾌하고 기분 좋은 하루였다.',
      date: futureDate1.toISOString().split('T')[0],
      mood: 'happy',
      selectedPeople: ['friends'],
      selectedWeather: ['sunny'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const futureDate2 = new Date(currentDate);
    futureDate2.setDate(currentDate.getDate() + 14);

    sampleEntries.push({
      id: generateId(),
      title: '새로운 카페에서의 독서 시간',
      content:
        '동네에 새로 생긴 카페에서 오랜만에 책을 읽었다. 아늑한 분위기와 맛있는 커피 향이 어우러져 정말 평화로운 시간을 보냈다. 이런 여유로운 시간이 더 자주 있었으면 좋겠다.',
      date: futureDate2.toISOString().split('T')[0],
      mood: 'content',
      selectedPeople: ['alone'],
      selectedDrink: ['coffee'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const futureDate3 = new Date(currentDate);
    futureDate3.setMonth(currentDate.getMonth() + 1);

    sampleEntries.push({
      id: generateId(),
      title: '가족 여행으로 부산 다녀왔다',
      content:
        '가족들과 함께 부산으로 2박 3일 여행을 다녀왔다. 해운대 바다를 보며 산책하고, 맛있는 밀면과 돼지국밥도 먹었다. 가족들과 함께한 소중한 시간이었다.',
      date: futureDate3.toISOString().split('T')[0],
      mood: 'excited',
      selectedPeople: ['family'],
      selectedTravel: ['train'],
      selectedFood: ['korean'],
      selectedWeather: ['sunny'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await saveDiaryEntries(sampleEntries);
    console.log('샘플 데이터가 성공적으로 생성되었습니다.');
  } catch (error) {
    console.error('샘플 데이터 생성 중 오류:', error);
    throw error;
  }
};

export const deleteSampleData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(DIARY_ENTRIES_KEY);
    console.log('샘플 데이터가 성공적으로 삭제되었습니다.');
  } catch (error) {
    console.error('샘플 데이터 삭제 중 오류:', error);
    throw error;
  }
};
