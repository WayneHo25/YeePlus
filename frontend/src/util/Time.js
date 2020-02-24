export function getTimePassed (createDateTime) {
  const createTime = new Date(createDateTime).getTime()
  const currentTime = new Date().getTime()

  var difference_ms = currentTime - createTime
  var seconds = Math.floor((difference_ms / 1000) % 60)
  var minutes = Math.floor((difference_ms / 1000 / 60) % 60)
  var hours = Math.floor((difference_ms / (1000 * 60 * 60)) % 24)
  var days = Math.floor(difference_ms / (1000 * 60 * 60 * 24))

  let timeRemaining

  if (days > 0) {
    timeRemaining = days + ' days ago'
  } else if (hours > 0) {
    timeRemaining = hours + ' hours ago'
  } else if (minutes > 0) {
    timeRemaining = minutes + ' minutes ago'
  } else if (seconds > 0) {
    timeRemaining = seconds + ' seconds agot'
  } else {
    timeRemaining = 'less than a second ago'
  }

  return timeRemaining
}
