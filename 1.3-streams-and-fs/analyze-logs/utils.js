const getPercentRatio = (total, part) => `${(part / total).toFixed(2)*100}%`
const checkWin = (line) => line.includes('win');
const checkLoose = (line) => line.includes('loose')

module.exports = {
  getPercentRatio,
  checkWin,
  checkLoose
}