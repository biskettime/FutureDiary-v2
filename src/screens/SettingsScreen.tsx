import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {generateSampleData, deleteSampleData} from '../utils/storage';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
  showArrow?: boolean;
}

const SettingsScreen: React.FC = () => {
  const handleAccountLogin = () => {
    Alert.alert('계정 로그인', '계정 로그인 기능은 준비 중입니다.');
  };

  const handleSync = () => {
    Alert.alert('동기화', '동기화 기능은 준비 중입니다.');
  };

  const handleTheme = () => {
    Alert.alert('다이어리 테마', '테마 설정 기능은 준비 중입니다.');
  };

  const handleSecretStore = () => {
    Alert.alert('비밀 일기 스토어', '비밀 일기 스토어 기능은 준비 중입니다.');
  };

  const handleDeleteSampleData = () => {
    Alert.alert(
      '샘플 데이터 삭제',
      '모든 샘플 일기 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSampleData();
              Alert.alert('완료', '샘플 데이터가 성공적으로 삭제되었습니다.');
            } catch (error) {
              Alert.alert('오류', '샘플 데이터 삭제 중 오류가 발생했습니다.');
            }
          },
        },
      ],
    );
  };

  const handleGenerateSampleData = () => {
    Alert.alert(
      '샘플 데이터 생성',
      '일기 사용법을 익힐 수 있는 샘플 데이터를 생성합니다. 기존 데이터가 있으면 추가되지 않습니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '생성',
          onPress: async () => {
            try {
              await generateSampleData();
              Alert.alert('완료', '샘플 데이터가 성공적으로 생성되었습니다.');
            } catch (error) {
              Alert.alert('오류', '샘플 데이터 생성 중 오류가 발생했습니다.');
            }
          },
        },
      ],
    );
  };

  const settingSections = [
    {
      title: '계정',
      items: [
        {
          id: 'login',
          title: '계정 로그인',
          subtitle: '구글, 애플, 이메일로 로그인',
          icon: '👤',
          onPress: handleAccountLogin,
          showArrow: true,
        },
        {
          id: 'sync',
          title: '동기화',
          subtitle: '클라우드와 데이터 동기화',
          icon: '🔄',
          onPress: handleSync,
          showArrow: true,
        },
      ],
    },
    {
      title: '개인화',
      items: [
        {
          id: 'theme',
          title: '다이어리 테마',
          subtitle: '색상, 폰트, 레이아웃 설정',
          icon: '🎨',
          onPress: handleTheme,
          showArrow: true,
        },
      ],
    },
    {
      title: '데이터 관리',
      items: [
        {
          id: 'delete-sample',
          title: '샘플 데이터 삭제',
          subtitle: '모든 샘플 일기 데이터를 삭제합니다',
          icon: '🗑️',
          onPress: handleDeleteSampleData,
          showArrow: false,
        },
        {
          id: 'generate-sample',
          title: '샘플 데이터 생성',
          subtitle: '일기 사용법을 익힐 수 있는 예시 데이터',
          icon: '📝',
          onPress: handleGenerateSampleData,
          showArrow: false,
        },
      ],
    },
    {
      title: '프리미엄',
      items: [
        {
          id: 'secret-store',
          title: '비밀 일기 스토어',
          subtitle: '프리미엄 기능 및 보안 강화',
          icon: '🔒',
          onPress: handleSecretStore,
          showArrow: true,
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
      activeOpacity={0.7}>
      <View style={styles.settingItemLeft}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      {item.showArrow && <Text style={styles.arrowText}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>설정</Text>
        <Text style={styles.headerSubtitle}>앱 설정 및 개인화</Text>
      </View>

      {settingSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>미래 일기 v1.0.0</Text>
        <Text style={styles.footerSubtext}>
          더 나은 일기 경험을 위해 계속 업데이트됩니다.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  arrowText: {
    fontSize: 18,
    color: '#C7C7CC',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#C7C7CC',
    textAlign: 'center',
  },
});

export default SettingsScreen;
