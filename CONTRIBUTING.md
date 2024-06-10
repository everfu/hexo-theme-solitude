# 代码贡献指南

1. 首先非常欢迎和感谢对本项目发起 `Pull Request` 的热心小伙伴们。
2. **特别提示：请务必在 `dev` 分支提交 `PR`，`main` 分支目前仅是正式版的代码，即发布正式版本后才会从 `dev` 分支进行合并。**
3. 本项目代码风格为使用2个空格代表一个Tab，因此在提交代码时请注意一下，否则很容易在IDE格式化代码后与原代码产生大量diff，这样会给其他人阅读代码带来极大的困扰。
4. 当你遇到这几种情况，非常欢迎你做出贡献，如纠正拼写错误、损坏的链接、或者是其它较明显的错误，又或者是开始一项别人请求的任务，或者是过去在 `issue` 中早就讨论过的。
5. **提交代码前，请再三检查并测试是否能正常运行，如若有难点无法解决，请在提交时注明情况。并且保证新增加或者修改的方法都有完整的文档说明。**
6. 本项目可以采用两种方式接受代码贡献：
  -  第一种就是基于[Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)开发流程，因此在发起Pull Request的时候请选择dev分支，详细步骤参考后文，推荐使用此种方式贡献代码。
  - 另外一种贡献代码的方式就是加入Solitude开发组，前提是对自己的代码足够自信就可以申请加入，加入之后可以随时直接提交代码，但要注意对所做的修改或新增的代码进行单元测试，保证提交代码没有明显问题。


### PR方式贡献代码步骤

* 在 GitHub 上 `fork` 到自己的仓库，如 `yife68/Hexo-Theme-Solitude`，然后 `clone` 到本地Hexo主题目录，并设置用户信息。

```bash
$ git clone git@github.com:{your-github-username}/hexo-theme-solitude.git themes/solitude
$ cd solitude
$ git config user.name "yourname"
$ git config user.email "your email"
```

* 修改代码后提交，并推送到自己的仓库。

```bash
$ #do some change on the content
$ git commit -am "Fix issue #1: change something"
$ git push
```

* 在 `GitHub` 上提交 `Pull Request`。
* 定期使用项目仓库内容更新自己仓库内容。

```bash
$ git remote add upstream https://github.com/everfu/hexo-theme-solitude
$ git fetch upstream
$ git checkout dev
$ git rebase upstream/dev
$ git push -f origin dev
```

* 不得添加任何第三方的创作