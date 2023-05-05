export const swap = object => {
  const result = {}
  for(const key in object) result[object[key]] = key
  return result
}

export const generateRegex = object => {
  const pattern = Object.keys(object).join('|')
  return new RegExp(pattern, "ig")
}