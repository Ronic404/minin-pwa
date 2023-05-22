const push = require('web-push')

// let vapidKeys = push.generateVAPIDKeys()
// console.log(vapidKeys)

// объект берется из консоли в vs code в коде выше
let vapidKeys = {
  publicKey: 'BBxWUrZKjbyWVHfdYFVhhU2i5QsNyhklNX1HScqNEGQiKrGXNP_K70tKhFfGHWyrog3JFnXdgufHII9mPKGYzKo',
  privateKey: 'u0kXBfNIJM7b1Mo9LnmtQ1zOxbVJD7K_6CmpEmidLMc'
}

push.setVapidDetails(
  'mailto:achubukov@htc-cs.ru',
  // 'https://illustrious-vacherin-cbc86a.netlify.app'
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

// Данный объект перется из консоли при срабатывании функции subscribe
let sub = {
  endpoint: "https://fcm.googleapis.com/fcm/send/e3c_h8vjV5U:APA91bG5i_5c4vrQP4Q1d3H_HM4BDk-M1D7U_0d9w6pAESsHJCBEx5tpvyOqI1RUxIe3_OJi6CHgfkPS-gfdptFXN6dS2DimbKyCOKHuT0pp3zufSqhMLoktNqkOK77c9kDGPBo-apb4",
  expirationTime: null,
  keys: {
    p256dh: "BAHWc_eh0SsXC48BAzMYgyQJ2pCQlVdb1SuVVmTkAHDZQ4bqqqLJweFJAtacsdBABSTr7Ji4lj21nfecyKcQxjU",
    auth:"WKVuQSigNlTcsx9WqWRESA"
  }
}

push.sendNotification(sub, 'test message')
