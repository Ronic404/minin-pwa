import './appInstallation.js'
import './showNotifications.js'

let SUB

window.addEventListener('load', async () => {
  const pushButton = document.querySelector('#push-button')

  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js')
      const sub = await reg.pushManager.getSubscription()
      // await sub
      console.log('SW register success', reg)
    } catch (error) {
      console.log('SW register fail')
    }
  }

  async function subscribe() {
    let sw = await navigator.serviceWorker.ready
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BBxWUrZKjbyWVHfdYFVhhU2i5QsNyhklNX1HScqNEGQiKrGXNP_K70tKhFfGHWyrog3JFnXdgufHII9mPKGYzKo',
    })
    SUB = JSON.stringify(push)
    console.log(SUB)
  }

  pushButton.addEventListener('click', () => {
    subscribe()
  })

  await loadPosts()
})


async function loadPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
  const data = await res.json()

  const container = document.querySelector('#posts')
  container.innerHTML = data.map(toCard).join('\n')
}

function toCard(post) {
  return `
    <div class="card">
      <div class="card-title">
        ${post.title}
      </div>
      <div class="card-body">
        ${post.body}
      </div>
    </div>
  `
}
