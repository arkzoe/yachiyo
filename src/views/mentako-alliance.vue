<template>
  <div class="view-content mentako-alliance-view">
    <div class="alliance-site-frame">
      <div class="alliance-site-header">
        <div class="alliance-site-title">★ メンタコ同盟 公式サイト ★</div>
        <span class="alliance-site-badge"
          >← ヤチヨの部屋からリンクで来ました</span
        >
      </div>
      <div class="alliance-stats">
        Since 2003.10 ｜ 同盟メンバー 010名 ｜ メンタコは…愛です
      </div>

      <div class="mentako-container">
        <div class="mentako-header">
          <h1 class="mentako-title">
            。.:☆*:･'(*ﾟ▽ﾟ*)'･:*☆:.｡.<br />メンタコ同盟へようこそ！
          </h1>
        </div>

        <div class="section">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="4"
            style="font-weight: bold; color: #191970"
          >
            ♡♥ メンタコは…愛です… ♡♥ ふわふわ…深海のアイドル…メン.ダ.コ…
          </marquee>
        </div>

        <img src="/images/mendako.png" alt="メンタコ！" class="main-image" />

        <div class="section">
          <h2 class="section-title">【 最新ニュース 】</h2>
          <div class="news-item">
            <span class="news-date">[2003/10/25]</span>
            第1回メンタコ描き大会開催！景品は管理人手作りメンタコ人形？！詳しくは<router-link
              to="/bbs"
              data-link
              >BBS</router-link
            >で！
          </div>
          <div class="news-item">
            <span class="news-date">[2003/10/24]</span>
            同盟メンバー10名突破！ありがとう！☆感謝記念☆メンタコ画像大放出！
          </div>
          <div class="news-item">
            <span class="news-date">[2003/10/22]</span>
            深海生物図鑑サイト「ディープブルー」さんと相互リンク締結！
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">【☆ 同盟メンバーの作品 ☆】</h2>
          <div class="gallery-container">
            <figure class="gallery-item">
              <img src="/images/mendako1.jpeg" alt="メンバー作品1" />
              <figcaption>by. アクアマリン</figcaption>
            </figure>
            <figure class="gallery-item">
              <img src="/images/mendako2.jpeg" alt="メンバー作品2" />
              <figcaption>by. 深海探検家</figcaption>
            </figure>
            <figure class="gallery-item">
              <img src="/images/mendako3.jpeg" alt="メンバー作品3" />
              <figcaption>by. ふにゃふにゃ</figcaption>
            </figure>
          </div>
        </div>

        <div class="section join-us">
          メンタコを愛するあなた！今すぐ同盟に参加しよう！<br />
          BBSに「&lt;メンタコ同盟入会希望&gt;」と残してくれればOK！
        </div>

        <div class="footer">
          <router-link to="/" data-link>[ ヤチヨの部屋に戻る ]</router-link>
        </div>

        <div class="back-link-box">
          ↑
          <router-link to="/" data-link>ヤチヨの部屋</router-link> から来ました
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* .mentako-alliance-view { background-image: url('/images/bg_blue.jpg'); background-repeat: repeat; min-height: 100vh; width: calc(100% + 80px); margin-left: -40px; margin-top: -30px; padding: 30px 40px; box-sizing: border-box; } */
.mentako-alliance-view .alliance-site-frame {
  width: 820px;
  margin: 0 auto;
  border: 3px outset #5f9ea0;
  background: #f0f8ff;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
}
.mentako-alliance-view .alliance-site-header {
  background: linear-gradient(180deg, #b0e0e6 0%, #add8e6 100%);
  border-bottom: 3px double #4682b4;
  padding: 12px 20px;
  text-align: center;
}
.mentako-alliance-view .alliance-site-title {
  font-size: 14px;
  color: #191970;
  font-weight: bold;
  letter-spacing: 2px;
}
.mentako-alliance-view .alliance-site-badge {
  display: inline-block;
  margin-top: 6px;
  padding: 3px 10px;
  font-size: 11px;
  color: #000080;
  background: #e6e6fa;
  border: 1px dashed #6495ed;
}
.mentako-alliance-view .alliance-stats {
  text-align: center;
  padding: 8px;
  font-size: 12px;
  color: #191970;
  border-bottom: 1px dotted #4682b4;
}
.mentako-container {
  width: 780px;
  margin: 0 auto;
  padding: 25px 20px;
  border: none;
  background-color: #f0f8ff;
  font-family: "Gulim", "Dotum", sans-serif;
  color: #191970;
}
.mentako-header {
  text-align: center;
  border-bottom: 3px double #4682b4;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.mentako-title {
  font-size: 32px;
  font-weight: bold;
  color: #000080;
  text-shadow: 2px 2px 3px #add8e6;
}
.mentako-alliance-view .main-image {
  display: block;
  margin: 0 auto 20px auto;
  border-radius: 50%;
  border: 5px groove #4682b4;
}
.mentako-alliance-view .section {
  margin-bottom: 25px;
  border: 1px dashed #6495ed;
  padding: 15px;
  background-color: #e6e6fa;
}
.mentako-alliance-view .section-title {
  font-size: 20px;
  font-weight: bold;
  color: #0000cd;
  background-color: #add8e6;
  padding: 5px 10px;
  border: 1px solid #4682b4;
  margin-bottom: 15px;
  text-align: center;
}
.mentako-alliance-view .news-item {
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 3px solid #4169e1;
}
.mentako-alliance-view .news-date {
  font-weight: bold;
  color: #4169e1;
}
.mentako-alliance-view .gallery-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.mentako-alliance-view .gallery-item {
  text-align: center;
  margin: 10px;
}
.mentako-alliance-view .gallery-item img {
  border: 2px solid #4682b4;
  padding: 3px;
  background-color: #fff;
  width: 120px;
  height: 120px;
}
.mentako-alliance-view .gallery-item figcaption {
  font-size: 13px;
  margin-top: 5px;
  color: #191970;
}
.mentako-alliance-view .join-us {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  padding: 15px;
  background-color: #add8e6;
  border: 2px dotted #000080;
}
.mentako-alliance-view .footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 3px double #4682b4;
}
.mentako-alliance-view .footer a {
  color: #0000cd;
  text-decoration: underline;
  font-weight: bold;
}
.mentako-alliance-view .back-link-box {
  margin-top: 16px;
  padding: 12px;
  background: #e6e6fa;
  border: 2px inset #6495ed;
  text-align: center;
  font-size: 13px;
}
.mentako-alliance-view .back-link-box a {
  color: #4169e1;
}
.mentako-alliance-view .back-link-box a:hover {
  color: #000080;
}
</style>
