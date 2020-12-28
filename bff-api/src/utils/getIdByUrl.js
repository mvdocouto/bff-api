const getIdByUrl = (url) => {
  return url
    .substr(0, url.length - 1)
    .split('/')
    .reverse()[0]
}

module.exports = getIdByUrl
