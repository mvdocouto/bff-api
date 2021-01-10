const formatColorList = (listColor) => {
  return listColor.reduce(
    (obj, item) => ({ ...obj, [item.category]: item.color }),
    {}
  )
}

module.exports = formatColorList
