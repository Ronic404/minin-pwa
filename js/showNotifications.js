const randomNotification = (count = 1) => {
  if (count > 3) {
    clearTimeout(notifier)
    return
  }

  const options = {
    body: 'Какой-то текст',
    icon: '../icons/icon-72x72.png',
  }

  new Notification(`Уведомлялка № ${count}`, options)
  const notifier = setTimeout(randomNotification, 5000, ++count)
}

const getAllowNotificationsAccess = () => {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      // randomNotification()
    }
  })
}

// setTimeout(getAllowNotificationsAccess, 3000)
