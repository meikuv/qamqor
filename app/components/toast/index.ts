import Toast from 'react-native-toast-message'

export function showToast(type: any, title = '', content = '') {
  Toast.show({
    type: type,
    text1: title,
    text1Style: {
      fontSize: 15,
    },
    text2Style: {
      fontSize: 12,
    },
    text2: content,
  })
}
