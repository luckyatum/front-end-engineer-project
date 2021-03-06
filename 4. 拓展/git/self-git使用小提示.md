# git使用小提示

[TOC]

## 1、本地代码写一半，需要切换分支或者拉取远程代码时

> 1. `git stash`  —— 将当前本地修改放到暂存区
> 2. 你会发现本地的修改都不见了，现在就可以切换分支或拉取远程代码了
> 3. `git stash list` —— 查看当前暂存区所有的暂存记录（这一步可以忽略，只是用于查看）
> 4. `git stash pop` —— 将最近一次暂存的代码恢复到本地修改，你之前修改的代码就回来了（这里注意**查看当前分支是不是你原来修改代码时候分支**）

## 2、本地修改了代码，提交了commit，结果发现改错分支了

> 1. 在提交commit的分支执行 `git log -3` ，可以看到你最近提交的那个commitID，复制
> 2. 切换到你真正需要改代码的分支
> 3. `git cherry-pick <commitID>` —— 把你刚刚复制的commitID粘贴进去，执行，这时你的修改已经在正确的分支里出现了，可以直接 `git push`
> 4. 如果最开始那个提交了代码的分支不需要那个修改，就再切换回原来那个分支，用 `git reset --hard  <commitID>` 指向**错误commit的<font color=red>前一个commitID</font>**（这里要注意一点，确保错误的那个commit是在错误分支的最后一个提交，不然会把后面提交的commit也删掉，具体可以百度一下`git reset`的用法）

## 3、养成 `git pull` 和 `git push` 后面不要加分支名的习惯（大部分合错分支的原因）

(1) 如果要在本地新建远程已经有的分支

> 1. 直接在当前分支执行一下 `git pull` (用于更新远程分支信息)
> 2. `git checkout <分支名>` —— 已经成功切换到新分支，而且当前本地分支已经跟远程对应分支绑定，后面可以直接 `git pull` 和 `git push` ,而不用在后面指定远程分支

(2) 如果你是建分支的那个人

> 1. <font color=red>切换到 `master` 分支，切换到 `master` 分支，切换到 `master` 分支</font>
> 2. `git pull` —— 更新master分支(这一步主要是为了减少上线时候出现的冲突)
> 3. `git checkout -b <分支名>` —— 新建并切换到新的分支
> 4. `git push -u origin <分支名>` —— 将分支推到远程并将远程分支与本地分支绑定，这样后面就可以直接 `git pull` 和 `git push` ,而不用在后面指定远程分支

`git branch -vv` —— 查看本地分支的绑定关系，可以看到每个分支绑定的远程分支

## 4、跟他人合作在同一个分支开发时， `git push` 提示失败——远程有新的提交

> 1. 这个时候大多数人会执行 `git pull` ，再执行 `git push` ，先说好，这个方法没有错！
> 2. 但是这个方法有一个小瑕疵，就是你在pull代码下来时，会生成一个新的 `merge commit` ，这个commit毫无意义
> 3. 其实优化就是一点，在 `git pull` 时，在后面加一个参数，变成 `git pull --rebase` ，这样就没有那个多余的commit了

## 5、关于冲突

&ensp;&ensp;&ensp;&ensp;**冲突是在两个不同分支（不一定是不同名字的分支，本地和远程同名的分支也属于不同分支）合并的时候产生，产生原因是：两个分支修改了相同地方，git不知道我们想要保留哪个修改**

其实对冲突的看法分为三个阶段：

> 1. 不知道冲突怎么产生的
> 2. 知道冲突的原理，在冲突产生时去找具体的原因
> 3. 管他三七二十一，没冲突就完美，有冲突就解决

这里分享一个个人的经验：当一个文件（尤其是前端文件被格式化后，别问我怎么知道的）冲突很大时，一点头绪都没有，这个时候有个好办法，就是保留别人的那部分，删掉自己修改的那部分，全部删完后，再在页面里面把自己的修改加上去(如何查看自己的修改可以用两种方式：1、记忆力；2、gitlab上面的commit)

## 友情链接

- [git常用语句](https://github.github.com/training-kit/downloads/zh_CN/github-git-cheat-sheet/)
- [廖雪峰的git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
