/* 
  加载动画效果与下载项目是否成功日志
*/

const loading = require('loading-cli');

const { success, error } = require('../utils/chalk')

const load = loading('')

// 捕获是否下载成功
async function inLoading(msg, fn, ...arg) {
  load.text = msg;
  load.color = 'blue';
  load.frame(["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"])
  load.start()
  try {
    await fn(...arg)
    load.succeed(success('successful'))
  } catch (err) {
    load.fail('failed:' + error(err));
  }
}

module.exports = inLoading 
