/* 
  questions对象
  回答问题并返回选择答案
*/

const inquirer = require('inquirer');

class Inquirer {
  constructor(questions) {
    this.ques = questions
    this.inquirer = inquirer
  }

  async prompt() {
    const result = await this.inquirer.prompt(this.ques)
    return result[`${this.ques.name}`] ?? result
  }
}

module.exports = Inquirer

