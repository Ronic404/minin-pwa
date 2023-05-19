let deferredPrompt
const installButton = document.querySelector('#install-button')

window.addEventListener('beforeinstallprompt', function(event) {
  event.preventDefault()
  deferredPrompt = event
})

installButton.addEventListener('click', async () => {
  deferredPrompt.prompt();
  deferredPrompt = null;
})

window.addEventListener('appinstalled', () => {
  installButton.remove()
  deferredPrompt = null;
});