
// 允许node.js脚本在命令行上呈现unicode辅助表 https://www.npmjs.com/package/cli-table
const Table = require('cli-table');
const tips = require('./tips');

var table = new Table({
  head: ['name', 'description', 'gitUrl'],
  style: {
    head: ['cyan']
  }
});

module.exports = (config) => {
  console.log('config====', config);
  const keys = Object.keys(config);

  if (keys.length) {
    // 将插入的写入到table
    keys.forEach((key) => {
      table.push(
        [`${key}`, config[key].description, config[key].url]
      )
    });

    const list = table.toString();
    if (list) {
      tips.info('模板列表是: ')
      console.log(`${list}\n`);
    } else {
      tips.fail('模板不经存在!');
    }
  } else {
    tips.fail('模板不存在!');
  }
};
