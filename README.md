
## child_process node 子进程

- * child_process.exec(command[, options][, callback]) 启动 
  子进程来执行shell命令,可以通过回调参数来获取脚本shell执行结果
- * child_process.execfile(file[, args][, options][, callback])  
  与exec类型不同的是，它执行的不是shell命令而是一个可执行文件
- * child_process.spawn(command[, args][, options])
  仅仅执行一个shell命令，不需要获取执行结果
- * child_process.fork(modulePath[, args][, options])可以用node 
  执行的.js文件，也不需要获取执行结果。fork出来的子进程一定是node进程

**如果使用execfile()执行可执行文件，那么头部一定是#!/usr/bin/env node**
