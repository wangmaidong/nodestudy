1.在node中每一个模块都是一个js文件

2.包是由多个模块组成的

3.npm init -y 初始化包的信息文件，生成package.json文件

4.包分为全局包和本地包， 代码使用的都是本地包，全局包只能在命令行中使用

5.npm可以直接在命令行中使用是因为npm被放在了path目录下，其他安装的全局包都在npm下，所以可以 

直接当成全局命令来执行

6.开发一个全局包，可以在根目录下创建一个bin文件夹，然后在package.json中添加

```json
"bin": "./www.js"
```

如果想添加多个包的执行命令可以这样写

```json
"bin": {
  "wl": "./bin/wwww.js"
}
```

还需在要执行的文件的首行添加  #！ /user/bin/env node

7.npm link 把当前模块临时放到npm下 ，方便调试使用

8.安装模块（第三方模块）

依赖方式： 

①开发依赖  npm install webpack --save-dev   或者 npm install webpack -D

②项目依赖  npm install jquery --save 或者 npm install jquery -S 或者 npm install jquery

③同版本依赖 peerDependencies

④捆绑依赖 bundledDependencies

⑤可选依赖 optionalDependencies

9.npm install 会安装package.json中所有的依赖，npm install --production 只安装生环境下的项目依赖包

10.版本号 正式版  alpha（预览版）  beta（公测版）  rc（最终测试版）

①^锁定大版本 ^2.0.0 必须以2开头

②~锁定前两位版本  

③无 指定版本







