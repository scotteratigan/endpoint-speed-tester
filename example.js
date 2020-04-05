const getFastestUrl = require('./index');

(async () => {
  const { url, elapsedMS } = await getFastestUrl(["https://www.google.com", "https://www.cnn.com", "https://www.npr.org"])
  console.log(`The fastest url was ${url} responding in ${elapsedMS} ms.`)
  process.exit(0)
})()
