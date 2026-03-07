import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#00000080',
    borderColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 0.3,
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    width: '100%',
  },
  cardContent: {
    flexGrow: 0,
    flexShrink: 1,
    gap: 16,
  },
  cardImagePlaceholder: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: '100%',
    width: 100,
  },
  headerContainer: {
    paddingVertical: 100,
  },
  headerText: {},
  listContainer: {
    gap: 16,
    width: '100%',
  },
  scrollContainer: {
    paddingVertical: 12,
    width: '100%',
  },
});
