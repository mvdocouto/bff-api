const validatePayload = (data) => {
  const { category, color } = data
  if (typeof category === 'undefined' || typeof color === 'undefined') {
    return false
  }
  return true
}

module.exports = validatePayload
