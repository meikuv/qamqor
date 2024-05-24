export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export const formatTime = (dateString: string) => {
  const date = new Date(dateString)

  // Subtract one hour from the date
  date.setHours(date.getHours() - 1)
  return date.toLocaleTimeString('ru-RU', { hour12: false, hour: '2-digit', minute: '2-digit' })
}
