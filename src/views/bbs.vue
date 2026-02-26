<template>
  <div class="bbs-container">
    <div class="bbs-header">
      <h1
        style="
          font-size: 24px;
          color: #333;
          border-bottom: 2px dashed #79acc5;
          padding-bottom: 10px;
        "
      >
        ◆ お絵描きBBS ◆
      </h1>
      <p>仮想空間「ツクヨミ」へようこそ！自由にお描きください♪</p>
      <a href="#" class="bbs-new-post-btn">[ 新規投稿 (New Post) ]</a>
    </div>

    <div class="bbs-thread" v-for="post in posts" :key="post.id">
      <div class="bbs-post-header">
        <span class="subject">{{ post.subject }}</span> by
        <span class="author">{{ post.author }}</span> - {{ post.date }}
      </div>
      <div class="bbs-post-body">
        <img :src="post.imageSrc" alt="投稿画像" />
        <div class="comment" v-html="post.comment"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const posts = ref([
  {
    id: 1,
    subject: "「三人でずっと一緒にいられたら…」",
    author: "TS_Lunatic",
    date: "2003/10/28 10:47",
    imageSrc: "/bbs/kamigami_178_5.jpg",
    comment:
      "やっと接続できました！初投稿です。<br />映画のあの温かいシーンをイメージして描きました。",
  },
  {
    id: 2,
    subject: "「いろはの手作りパンケーキ食べたい！」",
    author: "Pancake_Master",
    date: "2003/10/28 10:35",
    imageSrc: "/bbs/kamigami_333_4.jpg",
    comment:
      "いろはちゃんを可愛く描けた気がします！<br />パンケーキ同盟募集中（笑）",
  },
  {
    id: 3,
    subject: "「かぐや…？」",
    author: "kamigami_333",
    date: "2003/10/28 10:22",
    imageSrc: "/bbs/kamigami_333_3.jpg",
    comment:
      "かぐやはやっぱり最高！私だけ？ふふっ ☆",
  },
  {
    id: 4,
    subject: "「ふふ…」",
    author: "kamigami_333",
    date: "2003/10/28 10:07",
    imageSrc: "/bbs/kamigami_333_2.jpg",
    comment:
      "落書きだけど頑張って描いた！みんなどう見えるか気になる～ ヾ(＠⌒▽⌒＠)ﾉ",
  },
  {
    id: 5,
    subject: "「いろp～」",
    author: "kamigami_333",
    date: "2003/10/28 10:01",
    imageSrc: "/bbs/kamigami_333_1.jpg",
    comment:
      "いろp～見たくて描いた！また今度アップするね！(*´∀`*)",
  },
  {
    id: 6,
    subject: "「カミサマ方、お久しぶりです！」",
    author: "八千代",
    date: "2003/10/27 00:15",
    imageSrc: "/bbs/oeka3.jpeg",
    comment:
      "八千代がキリ番纪念絵を描きました！<br />ついに…10000HIT达成です！感動！感謝！",
  },
  {
    id: 7,
    subject: "「懐かしの接続」",
    author: "访问者A",
    date: "2003/10/26 10:00",
    imageSrc: "/bbs/oeka2.jpeg",
    comment:
      "久しぶりに接続しました。このBBSの雰囲気、映画公开当时を思い出します。",
  },
  {
    id: 8,
    subject: "「無題」",
    author: "八千代",
    date: "2003/10/13 18:30",
    imageSrc: "/bbs/oeka1.jpg",
    comment:
      "やっほ～！みんな元気？ヤチヨ久しぶりに筆を握ったよ！絵を描くのって楽しいね！๑(◕‿◕)๑ 楽しんで見てね～！",
  },
]);
</script>

<style scoped>
.bbs-container {
  padding: 20px;
}
.bbs-header {
  text-align: center;
  margin-bottom: 20px;
}
.bbs-new-post-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: 2px outset #ccc;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  margin-bottom: 20px;
}
.bbs-new-post-btn:hover {
  background-color: #d0d0d0;
  border-style: inset;
}
.bbs-thread {
  border: 1px solid #aaa;
  background-color: #fff;
  margin-bottom: 15px;
  padding: 10px;
}
.bbs-post-header {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
}
.bbs-post-header .subject {
  font-weight: bold;
  font-size: 16px;
  color: #880000;
}
.bbs-post-header .author {
  color: #006600;
  font-weight: bold;
}
.bbs-post-body {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.bbs-post-body img {
  max-width: 150px;
  border: 1px solid #ddd;
}
.bbs-post-body .comment {
  font-size: 15px;
}
</style>
