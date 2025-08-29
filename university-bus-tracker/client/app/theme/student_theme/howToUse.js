// theme/howToUse.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  quickStats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: '60%',
    alignSelf: 'center',
    marginHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  expandArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  sectionContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  contentSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  contentItem: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 4,
  },
  tipsSection: {
    paddingHorizontal: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  tipsContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  tipItem: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 6,
    fontWeight: '500',
  },
  footer: {
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  contactInfo: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: '100%',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactDetail: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
});