/* 
  项目下载
*/

const Inquirer = require('../utils/Inquirer') //选择

const fs = require('fs-extra') //读取文件

const { packageInfo } = require('../config/questions')

const { promisify } = require('util') // callback转换为Promise对象

const downloadGitRepo = promisify(require("download-git-repo")); //拉去git仓库

const { downRepo } = require('../config/repo-config') //仓库地址

const inLoading = require('../utils/loading') //加载

const { commandSpawn } = require('../utils/terminal') //执行npm指令

const { success, warning, error, primary } = require('../utils/chalk') //文字颜色

class Creator {
  constructor(project) {
    this.projectName = project
    this.downUrl = `direct:${downRepo}`
    this.downloadGitRepo = downloadGitRepo
  }

  // 拉去仓库代码
  async download() {
    try {
      // 拉去代码
      await inLoading(
        'downloading template, please wait',
        this.downloadGitRepo,
        this.downUrl,
        this.projectName,
        { clone: true }
      );
      // 修改package.json文件信息
      this.editPackageInfo()
    } catch (err) {
      console.log(error(err))
    }
  }

  // 修改packageInfo信息
  async editPackageInfo() {
    try {
      // 读取package.json
      const jsonData = fs.readJsonSync(`./${this.projectName}/package.json`)
      const answers = await new Inquirer(packageInfo(jsonData.name)).prompt();
      Object.keys(answers).forEach(item => {
        if (answers[item] && answers[item].trim()) {
          jsonData[item] = answers[item]
        }
      })
      // 将修改后的package.json对象写入 JSON 文件
      await fs.writeJsonSync(`./${this.projectName}/package.json`, jsonData)
      // 下载依赖
      this.downDependent()
    } catch (err) {
      console.log(error(err))
    }
  }

  // 下载依赖包
  async downDependent() {
    console.log(primary('\n下载依赖中!请稍后\n'))

    // 执行pnpm install
    const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
    await commandSpawn(pnpm, ['install'], { cwd: `./${this.projectName}` })

    console.log(success('\n依赖下载完成! 执行下列命令开始开发：\n'))
    console.log(warning(`cd ${project}`))
    console.log(warning(`pnpm run dev`))
  }
}


module.exports = Creator;