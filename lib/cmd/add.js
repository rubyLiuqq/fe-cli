'use strict'

// 大多数依赖回调或promise等待用户输入，可以使用co-prompt利用ES6的yield关键字, 以一种很好的方式编写非阻塞代码
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');

const table = require('../table');
const tip = require('../tips');
const tmpls = require('../../templates');

const writeFile = (err) => {
  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }

  table(tmpls);
  tip.success('新模板添加成功!');
  process.exit();
};

const resolve = (result) => {
  const { tmplName, gitUrl, branch, description, } = result;

  // 避免重复添加
  if (!tmpls[tmplName]) {
    tmpls[tmplName] = {};
    tmpls[tmplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');  // 过滤unicode字符
    tmpls[tmplName]['branch'] = branch;
    tmpls[tmplName]['description'] = description;
  } else {
    tip.fail('模板已经存在!');
    process.exit();
  };
  // 把模版信息写入 templates.json
  fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(tmpls), 'utf-8', writeFile);
}

module.exports = () => {
  co(function* () {
    // 分步接收用户输入的参数
    const tmplName = yield prompt('模板名字: ');
    const gitUrl = yield prompt('git https 链接：');
    const branch = yield prompt('Git 分支: ');
    const description = yield prompt('模板描述: ');

    return new Promise((resolve, reject) => {
      resolve({
        tmplName,
        gitUrl,
        branch,
        description,
      });
    });
  }).then(resolve);
}
