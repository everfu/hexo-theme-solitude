
```bash
$ #do some change on the content
$ git commit -am "Fix issue #1: change something"
$ git push
```

* 在 `GitHub` 上提交 `Pull Request`。
* 定期使用项目仓库内容更新自己仓库内容。

```bash
$ git remote add upstream https://github.com/wleelw/Hexo-theme-solitude
$ git fetch upstream
$ git checkout dev
$ git rebase upstream/dev
$ git push -f origin dev
```

* 不得添加任何第三方的创作，请自行创作插件并`PR`到 `solitude-pugins` 仓库

### 插件创作
* 插件创作

```
$ git clone git@github.com:{your-github-username}/solitude-plugins.git
$ git config user.name "yourname"
$ git config user.email "your email"
```

* 根据 `README` 进行添加。