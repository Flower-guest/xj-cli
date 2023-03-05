/* 
  命令颜色
*/
const chalk = require('chalk');

const success = chalk.hex('#67C23A')
const error = chalk.bold.red;
const primary = chalk.bold.blue;
const warning = chalk.hex('#FFA500'); // Orange color

module.exports = {
  success, error, warning, primary
}