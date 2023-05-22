let deferredPrompt
const installButton = document.querySelector('#install-button')

function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  if (document.referrer.startsWith('android-app://')) {
    return 'twa'
  } else if (navigator.standalone || isStandalone) {
    return 'standalone'
  }
  return 'browser'
}

// Если открываем не в браузере, то кнопку с установкой приложения удаляем
if (getPWADisplayMode() === 'standalone') {
  installButton.remove()
}

window.addEventListener('beforeinstallprompt', function(event) {
  event.preventDefault()
  deferredPrompt = event
})

installButton.addEventListener('click', async () => {
  deferredPrompt.prompt()
  deferredPrompt = null
})

// Если установили приложение, то кнопку с установкой приложения удаляем
window.addEventListener('appinstalled', () => {
  installButton.remove()
  deferredPrompt = null
})
