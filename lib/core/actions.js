const fs = require('fs-extra') //读取文件

const Inquirer = require('../utils/Inquirer') //选择

const { isWriteFile } = require('../config/questions') //问题

const Creator = require('./Creator') //下载git仓库代码

const inLoading = require('../utils/loading') //加载

const { primary, error, success } = require('../utils/chalk')  //文字颜色

const createProjectAction = async (project) => {
  try {
    const isHaveFile = await fs.ensureDirSync(project)
    // 如果没有该文件，创建文件夹并下载
    if (isHaveFile) {
      // 删除创建的文件夹
      await fs.remove(project);
      // 下载项目
      new Creator(project).download()
    } else {
      // 选择是否写入
      const answers = await new Inquirer(isWriteFile).prompt();
      // 用户选择是否覆盖已有文件夹
      if (answers) {
        // 覆盖文件加载中
        try {
          await inLoading(`删除文件夹 ${project}, 请稍后`, fs.remove, project)
          new Creator(project).download()
        } catch (err) {
          load.fail('remove failed:' + error(err));
        }
      } else {
        console.log(primary("Cancel"));
        return;
      }
    }
  } catch (err) {
    console.log(error(err))
  }
}

module.exports = { createProjectAction }