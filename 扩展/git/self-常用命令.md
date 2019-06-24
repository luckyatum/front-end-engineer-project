# git 常用命令

> * git status    查看当前状态
> * git add .    暂存所有文件
> * git add -u    暂存所有更新的文件
> * git add -A    暂存所有已被修改和删除的文件，不包含新文件
> * git commit -m "sss"     提交文件到本地仓库
> * git push    推
> * git pull    拉
> * git branch    查看本地分支
> * git branch -a 查看所有分支
> * git branch -d 'branchname'    删除分支
> * git checkout 'branch-name'    切换分支
> * git checkout -b 'branch-name'    创建并切换分支
> * git log    查看提交历史
> * git reset 'id'    回滚到该id（id通过git log获得）所提交后的状态，但是不修改之后添加的代码
> * git reset --hard 'id'    回滚到该id（id通过git log获得）所提交后的状态，并且新添加的代码会被原代码覆盖掉
> * git checkout -- 'filename'    删除工作区该文件的更改/当文件在工作区被误删时，可通过该命令把文件恢复
> * git reset HEAD 'filename'    删除已暂存的该文件
> * git rm 'filename'    移除工作区、暂存区或者分支上的文件
> * git rm --cached 'filename'    移除暂存区或者分支上的文件
> * git branch --set-upstream-to=origin/'branch' dev-v1        本地分支对应远程分支
> * git fetch 更新远程分支
> * git push --set-upstream origin 'branch-name' git    添加本地分支为远程分支
> * git push origin --delete 'branch-name'    删除远程分支
> * git clean -fd 删除未跟踪文件，包括目录
> * git branch | xargs -I{} git branch -d {} 清理本地分支

## 不常用命令

> * 列出当前配置：git config --list;
> * 列出repository配置：git config --local --list;
> * 列出全局配置：git config --global --list;
> * 列出系统配置：git config --system --list;
> * 
> * 配置用户名：git config --global user.name "your name";
> * 配置用户邮箱：git config --global user.email "youremail@github.com";
> * 
> * 配置解决冲突时使用哪种差异分析工具，比如要使用vimdiff：git config --global merge.tool vimdiff;
> * 配置git命令输出为彩色的：git config --global color.ui auto;
> * 配置git使用的文本编辑器：git config --global core.editor vi;
> * 
> * 创建一个新的本地仓库：git init；
> * 从远程git仓库复制项目：git clone 'url'
> * 从远程git仓库复制项目后指定新的项目名：git clone git://github.com/wasd/example.git mygit；
> * 
> * 提交工作区所有文件到暂存区：git add .
> * 提交工作区中指定文件到暂存区：git add 'file1' 'file2' ...;
> * 提交工作区中某个文件夹中所有文件到暂存区：git add [dir];
> * 
> * 删除工作区文件，并且也从暂存区也删除对应文件的记录：git rm 'file1' 'file2';
> * 从暂存区中删除文件，但是工作区依然还有该文件:git rm --cached 'file';
> * 取消暂存区已经暂存的文件：git reset HEAD 'file'...;
> * 撤销上一次对文件的操作：git checkout --'file'。
> * 
> * 隐藏当前变更，以便能够切换分支：git stash；
> * 查看当前所有的储藏：git stash list；
> * 应用最新的储藏：git stash apply；
> * 如果想应用更早的储藏：git stash apply stash@{2}；
> * 重新应用被暂存的变更，需要加上--index参数：git stash apply --index;
> * 使用apply命令只是应用储藏，而内容仍然还在栈上，需要移除指定的储藏：git stash drop stash{0};
> * 如果使用pop命令不仅可以重新应用储藏，还可以立刻从堆栈中清除：git stash pop;
> * 
> * 应用储藏的修改，在进行了一些其他的修改后，又要取消之前所应用储藏的修改： git stash show -p stash@{0} | git apply -R；
> * 如果沒有指定具体的某个储藏，Git 会选择最近的储藏：git stash show -p | git apply -R；
> * 
> * 重命名文件，并将已改名文件提交到暂存区：git mv [file-original] [file-renamed];
> * 查询当前工作区所有文件的状态：git status;
> * 比较工作区中当前文件和暂存区之间的差异，也就是修改之后还没有暂存的内容：git diff；
> * 指定文件在工作区和暂存区上差异比较：git diff 'file-name';

## 提交文件到版本库

> * 将暂存区中的文件提交到本地仓库中，即打上新版本：git commit -m "commit_info";
> * 将所有已经使用git管理过的文件暂存后一并提交，跳过add到暂存区的过程：git commit -a -m "commit_info";
> * 提交文件时，发现漏掉几个文件，或者注释写错了，可以撤销上一次提交：git commit --amend;

## 查看信息

> * 比较暂存区与上一版本的差异：git diff --cached;
> * 指定文件在暂存区和本地仓库的不同：git diff [file-name] --cached;
> * 查看提交历史：git log；
> * 参数-p展开每次提交的内容差异，用-2显示最近的两次更新，如git log -p -2;

## 打标签

&emsp;&emsp;Git 使用的标签有两种类型：轻量级的（lightweight）和含附注的（annotated）。轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。一般我们都建议使用含附注型的标签，以便保留相关信息；当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。）

> * 列出现在所有的标签：git tag;
> * 使用特定的搜索模式列出符合条件的标签，例如只对1.4.2系列的版本感兴趣：git tag -l "v1.4.2.*";
> * 创建一个含附注类型的标签，需要加-a参数，如git tag -a v1.4 -m "my version 1.4";
> * 使用git show命令查看相应标签的版本信息，并连同显示打标签时的提交对象：git show v1.4;
> * 如果有自己的私钥，可以使用GPG来签署标签，只需要在命令中使用-s参数：git tag -s v1.5 -m "my signed 1.5 tag";
> * 验证已签署的标签：git tag -v [tag-name]，如git tag -v v1.5;
> * 创建一个轻量级标签的话，就直接使用git tag命令即可，连-a,-s以及-m选项都不需要，直接给出标签名字即可，如git tag v1.5;
> * 将标签推送到远程仓库中：git push origin [tag-name]，如git push origin v1.5；
> * 将本地所有的标签全部推送到远程仓库中：git push origin --tags;

## 分支管理

> * 创建分支：git branch [branch-name]，如git branch testing；
> * 从当前所处的分支切换到其他分支：git checkout [branch-name]，如git checkout testing；
> * 新建并切换到新建分支上：git checkout -b [branch-name];
> * 删除分支：git branch -d [branch-name]；
> * 将当前分支与指定分支进行合并：git merge [branch-name];
> * 显示本地仓库的所有分支：git branch;
> * 查看各个分支最后一个提交对象的信息：git branch -v;
> * 查看哪些分支已经合并到当前分支：git branch --merged;
> * 查看当前哪些分支还没有合并到当前分支：git branch --no-merged;
> * 把远程分支合并到当前分支：git merge [remote-name]/[branch-name]
> * 在远程分支的基础上创建新的本地分支：git checkout -b [branch-name] [remote-name]/[branch-name]
> * 在跟踪分支上向远程分支上推送内容：git push。
> * 在跟踪分支上合并远程分支：git pull
