const palindrome = (text) => {
  return text.split('').reverse().join('')
}

const average = (array) => {
  const reducer = (sum, number) => {
    return sum += number
  }

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
}

module.exports = {
  palindrome,
  average
}
