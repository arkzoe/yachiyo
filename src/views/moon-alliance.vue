<template>
  <div class="view-content moon-alliance-view full-width-view-content">
    <div class="alliance-site-frame">
      <div class="alliance-site-header">
        <div class="alliance-site-title">
          …… 月に帰りたくなる同盟 公式サイト ……
        </div>
        <span class="alliance-site-badge"
          >← ヤチヨの部屋からリンクで来ました</span
        >
      </div>
      <div class="alliance-stats">
        Since 2003.10 ｜ 居住者 003名 ｜ …静寂を忘れずに
      </div>

      <div class="moon-container">
        <div class="moon-header">
          <h1 class="moon-title">月に帰りたくなることもある</h1>
        </div>

        <img src="/images/moon.png" alt="月…" class="main-image" />

        <div class="section">
          <p class="welcome-text">
            ここは現実の喧騒を背に、<br />
            冷たい月明かりの慰めを求める者たちの安息の地。<br />
            <br />
            あなたの心の奥にも、忘れられた故郷、<br />
            静かな月の海が広がっていますか？<br />
            <br />
            <span class="script">…聞こえますか？あの場所の静寂が…</span>
          </p>
        </div>

        <div class="section">
          <h2 class="section-title">† 我らの誓い †</h2>
          <ul class="creed-list">
            <li>一. 我らは夜の帳を恐れず、むしろその中に安らぎを求める。</li>
            <li>
              一. 我らは偽りの太陽の華やかさより、真実を照らす月の影を信じる。
            </li>
            <li>
              一. 我らは無意味な叫びより、沈黙に込められたより深い響きを聴く。
            </li>
            <li>一. 我らはいつか帰るべきあの場所、月の懐を忘れない。</li>
          </ul>
        </div>

        <div class="section">
          <h2 class="section-title">:: 星の住人たち ::</h2>
          <ul class="members-list">
            <li>第1居住者 : ☽ヤチヨ☾（此処の記録者）</li>
            <li>第2居住者 : Selene（夜の旅人）</li>
            <li>第3居住者 : Endymion（夢の番人）</li>
            <li>…そして、この文を読んでいるあなた。</li>
          </ul>
        </div>

        <div class="footer">
          <RouterLink to="/" data-link>[ …現世への一時帰還 ]</RouterLink>
        </div>

        <div class="back-link-box">
          ↑ <RouterLink to="/" data-link>ヤチヨの部屋</RouterLink> から来ました
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@font-face {
  font-family: "Gungsuh";
  src: local("Gungsuh"), local("궁서");
}
.view-content {
  z-index: 0; /* 确保内容在伪元素上方 */
}
.moon-alliance-view {
  position: relative; /* 成为伪元素的定位参考 */
  background: transparent; /* 移除原来的背景图 */
  color: #c0c0c0;
  font-family: "Gungsuh", "궁서", "serif";
  min-height: 100vh; /* 仍可保持最小高度 */
  width: 100%;
  padding: 20px 0;
}
.moon-alliance-view::before {
  content: "";
  position: absolute;
  top: -30px; /* 向上覆盖父容器上 padding */
  left: -40px; /* 向左覆盖父容器左 padding */
  right: -40px; /* 向右覆盖父容器右 padding */
  bottom: -30px; /* 向下覆盖父容器下 padding */
  background-color: #00001a;
  z-index: -1; /* 放在内容下方 */
  pointer-events: none; /* 确保不干扰点击事件 */
}
.moon-alliance-view .alliance-site-frame {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #4a4a6a;
  background: rgba(15, 15, 35, 0.95);
  box-shadow: 0 0 20px rgba(147, 112, 219, 0.25);
}
.moon-alliance-view .alliance-site-header {
  background: rgba(90, 90, 138, 0.5);
  border-bottom: 1px solid #5a5a8a;
  padding: 12px 20px;
  text-align: center;
}
.moon-alliance-view .alliance-site-title {
  font-size: 13px;
  color: #d8bfd8;
  font-weight: normal;
  letter-spacing: 4px;
}
.moon-alliance-view .alliance-site-badge {
  display: inline-block;
  margin-top: 6px;
  padding: 3px 10px;
  font-size: 11px;
  color: #b0c4de;
  border: 1px dotted #5a5a8a;
}
.moon-alliance-view .alliance-stats {
  text-align: center;
  padding: 8px;
  font-size: 11px;
  color: #778899;
  border-bottom: 1px solid #333366;
  letter-spacing: 1px;
}
.moon-container {
  width: 740px;
  margin: 0 auto;
  padding: 25px 20px;
  border: none;
  background: transparent;
}
.moon-header {
  text-align: center;
  margin-bottom: 30px;
}
.moon-title {
  font-size: 24px;
  font-weight: normal;
  color: #e6e6fa;
  letter-spacing: 4px;
}
.moon-alliance-view .main-image {
  display: block;
  margin: 0 auto 25px auto;
  filter: grayscale(30%) brightness(90%);
}
.moon-alliance-view .section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #333366;
}
.moon-alliance-view .section-title {
  font-size: 18px;
  color: #d8bfd8;
  padding-bottom: 8px;
  margin-bottom: 15px;
  text-align: center;
  letter-spacing: 2px;
}
.moon-alliance-view .welcome-text {
  text-align: center;
  font-size: 15px;
  line-height: 1.8;
  color: #b0c4de;
}
.moon-alliance-view .creed-list,
.moon-alliance-view .members-list {
  list-style: none;
  padding-left: 0;
  text-align: center;
}
.moon-alliance-view .creed-list li,
.moon-alliance-view .members-list li {
  margin-bottom: 12px;
  font-size: 15px;
}
.moon-alliance-view .footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #5a5a8a;
}
.moon-alliance-view .footer a {
  color: #9370db;
  text-decoration: none;
  font-size: 14px;
}
.moon-alliance-view .footer a:hover {
  text-decoration: underline;
  color: #e6e6fa;
}
.moon-alliance-view .script {
  font-style: italic;
  color: #778899;
}
.moon-alliance-view .back-link-box {
  margin-top: 20px;
  padding: 12px;
  text-align: center;
  font-size: 12px;
  color: #778899;
  border: 1px dotted #5a5a8a;
}
.moon-alliance-view .back-link-box a {
  color: #9370db;
}
.moon-alliance-view .back-link-box a:hover {
  color: #e6e6fa;
}
</style>
