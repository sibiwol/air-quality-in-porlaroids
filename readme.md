### 궁금한 점

1. meta 태그는 보통 어떤 프로퍼티를 사용하는가
2. 파비콘은 이미지 파일 .png와 .ico의 차이
3. link 태그 안 type="image/x-icon"의 이미. 꼭 있어야 하는가?

### 새로 알게 된 점

1. new! 파비콘 삽입시 shortcut은 브라우저가 무시하므로 이제 사용하면 안된다(출처 MDN)

### 🤦‍♀️ 문제...

02.07.

- git과 github 연결되어 있지 않음 발견...

```git push -u origin main
// 입력하자 git push --helper 입력해 NOT ABOUT FAST-FORWARDS 읽어라고 나옴
// 아래는 그 내용임
```

NOTE ABOUT FAST-FORWARDS
When an update changes a branch (or more in
general, a ref) that used to point at commit A to
point at another commit B, it is called a
fast-forward update if and only if B is a
descendant of A.

      In a fast-forward update from A to B, the set of
      commits that the original commit A built on top of
      is a subset of the commits the new commit B builds
      on top of. Hence, it does not lose any history.

      In contrast, a non-fast-forward update will lose
      history. For example, suppose you and somebody else
      started at the same commit X, and you built a
      history leading to commit B while the other person
      built a history leading to commit A. The history
      looks like this:

                 B
                /
            ---X---A

      Further suppose that the other person already
      pushed changes leading to A back to the original
      repository from which you two obtained the original
      commit X.

       The push done by the other person updated the
       branch that used to point at commit X to point at
       commit A. It is a fast-forward.

       But if you try to push, you will attempt to update
       the branch (that now points at A) with commit B.
       This does not fast-forward. If you did so, the
       changes introduced by commit A will be lost,
       because everybody will now start building on top of
       B.

       The command by default does not allow an update
       that is not a fast-forward to prevent such loss of
       history.
       If you do not want to lose your work (history from
       X to B) or the work by the other person (history
       from X to A), you would need to first fetch the
       history from the repository, create a history that
       contains changes done by both parties, and push the
       result back.

       You can perform "git pull", resolve potential
       conflicts, and "git push" the result. A "git pull"
       will create a merge commit C between commits A and
       B.

                 B---C
                /   /
            ---X---A
      Updating A with the resulting merge commit will
      fast-forward and your push will be accepted.

      Alternatively, you can rebase your change between X
      and B on top of A, with "git pull --rebase", and
      push the result back. The rebase will create a new
      commit D that builds the change between X and B on
      top of A.

                B   D
               /   /
           ---X---A
      Again, updating A with this commit will
      fast-forward and your push will be accepted.

      There is another common situation where you may
      encounter non-fast-forward rejection when you try
      to push, and it is possible even when you are
      pushing into a repository nobody else pushes into.
      After you push commit A yourself (in the first
      picture in this section), replace it with "git
      commit --amend" to produce commit B, and you try to
      push it out, because forgot that you have pushed A
      out already. In such a case, and only if you are
      certain that nobody in the meantime fetched your
      earlier commit A (and started building on top of
      it), you can run "git push --force" to overwrite
      it. In other words, "git push --force" is a method
      reserved for a case where you do mean to lose
      history.

02.08

- 위 문제를 해결하고자 터미널에 `git pull origin main`을 입력했으나 아래 경고 나옴

```
Need to specify how to reconcile divergent branches.
```

- [문제해결에 도움이 된 블로그](https://synapsis9.tistory.com/entry/git-pull-%EA%B2%BD%EA%B3%A0%EC%97%86%EC%95%A0%EA%B8%B0-Pulling-without-specifying-how-to-reconcile-divergent-branches-is-discouraged)

* [스택오버플로우](https://stackoverflow.com/questions/62653114/how-can-i-deal-with-this-git-warning-pulling-without-specifying-how-to-reconci)

```
git config --global pull.ff only
git pull origin main

// 입력하자 또 경고가 나왔다.
// Fatal: Not possible to fast-forward, abording
```

이쯤되니 문제 정의하기를 할 필요성을 느꼈다. (그 전에, 그러니까 흥미를 잃기 전에 새 코드를 짜야지)
