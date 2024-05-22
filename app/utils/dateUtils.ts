const formatDate = (dateString: Date) => {
  const day = String(dateString.getDate()).padStart(2, '0')
  const month = String(dateString.getMonth() + 1).padStart(2, '0') // getMonth() is zero-based
  const year = dateString.getFullYear()

  return `${day}.${month}.${year}`
}

const formatTime = (dateString: Date) => {
  const hours = String(dateString.getHours()).padStart(2, '0')
  const minutes = String(dateString.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}
