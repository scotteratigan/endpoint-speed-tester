const fetch = require('node-fetch')

const isArrOfStrs = arr => (!!arr && !!arr.length && arr.every(elm => (elm && typeof elm === 'string')))

const getFastestUrl = (urlArray, urlTimeout = 5000, verbose = false) => new Promise(resolve => {
  const startNS = process.hrtime()
  if (!urlArray || !Array.isArray(urlArray) || !isArrOfStrs(urlArray)) {
    throw new Error('Argument must be an array of strings.')
  }
  let fastestUrl = ''
  urlArray.forEach(url => {
    fetch(url).then(res => {
      if (res.status === 200 && !fastestUrl) {
        fastestUrl = url
        const nanoSecondPerMS = 1000000 // a million ns in a ms
        const elapsedMS = process.hrtime(startNS)[1] / nanoSecondPerMS
        if (verbose) {
          console.log(`Fastest response from: ${fastestUrl}, response time: ${elapsedMS} ms.`)
        }
        return resolve({url, elapsedMS})
      }
    })
  })
  setTimeout(() => {
    if (fastestUrl) return
    if (verbose) {
      console.warn(`Warning, no response from any supplied url before timeout of ${urlTimeout} ms.`)
    }
    // Default to first value in case of a timeout:
    resolve({url: urlArray[0], elapsedMS: urlTimeout})
  }, urlTimeout)
})

module.exports = getFastestUrl
