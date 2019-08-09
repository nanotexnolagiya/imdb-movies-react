export default str => {
  const params = {}
  str
    .substr(1)
    .split('&')
    .forEach(param => {
      param = param.split('=')
      params[param[0]] = param[1]
    })
  return params
}
