const url = 'ws://159.89.15.214:8080/'

let socket = null

connect()

socket.onopen = () => {
  console.log('[open] Connection established')
}

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
  } else {
    console.log('[close] Connection died')
    connect()
  }
}

socket.onerror = (error) => {
  console.error(`[error] ${error.message}`)
}


export function connect() {
  try {
    socket = new WebSocket(url)
  } catch (e) {
    console.error('[error connecting ws]', e)
  }
}

function waitForConnection() {
  return new Promise((resolve, reject) => {
    if (socket.readyState === 1) resolve()
    if (socket.readyState !== 0) reject()
    const type = 'open'
    const listener = () => {
      socket.removeEventListener(type, listener)
      resolve()
    }
    socket.addEventListener(type, listener)
    setTimeout(() => {
      socket.removeEventListener(type, listener)
      reject()
    }, 1000 * 60)
  })
}

export async function sendMessage(message) {
  if (!socket || [2, 3].includes(socket.readyState)) {
    connect()
  }
  await waitForConnection()
  socket.send(
    JSON.stringify(message)
  )
}

export function addSocketEventListener(type, listener) {
  socket.addEventListener(type, listener)
}

export function removeSocketEventListener(type, listener) {
  socket.removeEventListener(type, listener)
}

export function closeConnection() {
  socket.close()
}
