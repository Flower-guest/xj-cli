
const isWriteFile = {
  type: 'list',
  name: 'isWriteFile',
  message: '已存在项目文件夹,是否覆盖',
  choices: [{ name: "覆盖", value: true },
  { name: "不覆盖", value: false },]
}

const packageInfo = (projectName) => {
  return [{
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: projectName,
    validate(val) {
      if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
        return '项目名称包含非法字符'
      }
      return true;
    }
  }, {
    type: 'input',
    message: '请输入项目简介：',
    name: 'description'
  },]
}



module.exports = {
  isWriteFile,
  packageInfo
}