const program = require('commander');
const pkg = require('../../package.json');

program
  .version(pkg.version);

program
  .command('init')
  .description('生成一个项目')
  .alias('i')
  .action(() => {
    require('../cmd/init')();
  });

program
  .command('add')
  .description('添加新模板')
  .alias('a')
  .action(() => {
    require('../cmd/add')();
  });

program
  .command('delete')
  .description('删除模板')
  .alias('d')
  .action(() => {
    require('../cmd/delete')();
  });

program
  .command('list') // fe list
  .description('查看模板列表')
  .alias('l') // 简写
  .action(() => {
    require('../cmd/list')();
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help()
}