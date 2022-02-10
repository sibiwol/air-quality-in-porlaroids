### 궁금한 점

1. meta 태그는 보통 어떤 프로퍼티를 사용하는가
2. 파비콘은 이미지 파일 .png와 .ico의 차이
3. link 태그 안 type="image/x-icon"의 이미. 꼭 있어야 하는가?
4. `<script>` 위치

### 새로 알게 된 점

1. new! 파비콘 삽입시 shortcut은 브라우저가 무시하므로 이제 사용하면 안된다(출처 MDN)
2. npm cheerio axios
3. 도시의 이름을 가져오기 위해 `구글 클라우드 플랫폼`에서 프로젝트를 만들고 API 키를 만들어야 한다.
4. 위도/경도 유형은 WG84, X/Y좌표 유형은 UTM-K(GRS80)

## 🤦‍♀️ 삽질기록 ...

### 02.07.

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

### 02.08

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

### 02.09

- 위도, 경도를 가져와 시도시를 표시하고 해당 시도시의 미세먼지 농도를 추출하려고 한다.
- [SGIS의 open API 리버스 지오코딩](https://sgis.kostat.go.kr/developer/html/newOpenApi/api/dataApi/addressBoundary.html)에서 도시 이름을 출력하기 위해 통계청에 가입 > 서비스 ID, 보안 Key, Access Token을 받았다...(여기까지도 힘듬)
- javascript를 이용해 위도와 경도를 출력해 소스 예제 실행 했으나 계속 에러 메세지 뜸... 알고보니 위도/경도 유형은 WGS84, X/Y좌표 유형은 UTM-K(GRS80)으로 표기법이 달랐던 것이다... 하하;; 설명서를 잘 읽어보면 금새 알 수 있었을텐데
- 내일 WGS84 -> GRS80으로 변환하는 코드를 사용해 시도시명을 추출하자

### 02.10

- WGS84 -> GRS80으로 변환하기 위해서 블로그에서 하라는대로 proj4 npm 패키지를 설치했다. 문제는 npm은 Node.js에서만 굴러가는 거 같다... 이걸 몰라서 1시간 넘게 삽질했다. 삽질도 문젠데 그... 변환공식이 너무 길어서 뭐라는지 모르겠다ㅠㅠㅠ
- 감정: 멘탈 나갔다. 동공에 초점이 없다.
- 다음 step에서 해야할 것. node.js 강의를 보며 proj4 패키지를 어떻게 사용할지 공부한다.
- 마음챙김: 다음 할 일이 정해졌다. 나는 이걸 하면 된다. 1시간? 문제 없다. 내가 멘탈이 나간 이유는
  - 첫번째, proj4 패키지 설명이 어렵다는 것. 괜찮아!! 지금 가늠하기론 한줄만 제대로 파악하면 이해할 수 있을 거 같아. 유명해서인지 블로그에 설명도 잘 되어 있어! 만약 내가 이걸 제대로 이해하잖아? 그럼 내 블로그에도 올리자! 다음 사람이 더 잘 이해할 수 있돋록!!!!
  - 두 번째 이유, 1시간을 버려서가 아니다. 예전에 node.js강의를 가볍게 들었는데도 헤맸다는 것에 있다. 왜 진작에 생각해내지 못했을까. 그때 복습도 철저히 했는데! 어쩌면 빈도의 문제일 수 있다. 코딩에 손을 놓은지 두달이나 되었다. 까먹고도 충분할 시간이라 생각한다! 꾸준히, 중요한 것은 꾸준히!! 이번엔 포기하지 말자.
  - 처음으로 진행하는 나만의 첫 프로젝트다. 혜림아. 이번엔 진짜 포기하지마. 중요한건 완성하는 것, 즉 끝을 보는 거야. 우리 끝까지 가보자!!! (੭ ˃̶̀ ロ ˂̶́)੭⁾
