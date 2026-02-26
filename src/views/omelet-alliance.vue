<template>
  <div class="view-content omelet-alliance-view">
    <div class="alliance-site-frame">
      <div class="alliance-site-header">
        <div class="alliance-site-title">★ オムライス愛好同盟 公式サイト ★</div>
        <span class="alliance-site-badge"
          >← ヤチヨの部屋からリンクで来ました</span
        >
      </div>
      <div class="alliance-stats">
        Since 2003.10 ｜ 同盟メンバー 002名 ｜ オムライスは正義
      </div>

      <div class="alliance-container">
        <div class="alliance-header">
          <h1 class="alliance-title">★☆ オムライス愛好同盟 ☆★</h1>
        </div>

        <img
          src="/images/omelet2.png"
          alt="オムライス愛！"
          class="main-image"
        />

        <div class="section">
          <p class="welcome-text">
            ようこそ！ここはオムライスをとってもとっても愛する人たちの秘密基地、<br />
            ♡オムライス愛好同盟♡ です！<br />
            ふわふわ卵と甘酸っぱいケチャップライスのハーモニー…<br />
            考えただけでよだれが出ませんか？ (>_<)<br />
            オムライスへのあなたの熱い想いを見せてください！
          </p>
        </div>

        <div class="section">
          <h2 class="section-title">† 同盟のルール †</h2>
          <ul class="rules-list">
            <li>オムライスを見るとドキドキする。</li>
            <li>ケチャップで絵を描くのが好き。（描けなくてもOK！）</li>
            <li>少なくとも週に一度はオムライスが食べたくなる。</li>
            <li>「好きな食べ物は？」の質問に「オムライス！」と答える。</li>
            <li>
              同盟の証として自分のホームページにバナーを貼る。（バナー準備中！）
            </li>
          </ul>
        </div>

        <div class="section">
          <h2 class="section-title">♡ 同盟メンバーリスト ♡</h2>
          <ul class="members-list">
            <li>No.001 管理人 ☽ヤチヨ☾（サイト主）</li>
            <li>No.002 ホゲゲさん（メインイラスト作家）</li>
            <li>…メンバー募集中！あなたも同盟に参加してみて！</li>
          </ul>
        </div>

        <div class="footer">
          <RouterLink to="/" data-link>[ ヤチヨの部屋に戻る ]</RouterLink>
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
.view-content {
  z-index: 0; /* 确保内容在伪元素上方 */
}
.omelet-alliance-view {
  position: relative; /* 成为伪元素的定位参考 */
  background: transparent; /* 移除原来的背景图 */
  min-height: 100vh; /* 仍可保持最小高度 */
  width: 100%;
  padding: 20px 0; /* 保留原有内边距（可根据需要调整） */
  /* 其他原有样式保持不变 */
}

.omelet-alliance-view::before {
  content: "";
  position: absolute;
  top: -30px; /* 向上覆盖父容器上 padding */
  left: -40px; /* 向左覆盖父容器左 padding */
  right: -40px; /* 向右覆盖父容器右 padding */
  bottom: -30px; /* 向下覆盖父容器下 padding */
  background-image: url("/images/bg_yellow.jpg");
  background-repeat: repeat;
  z-index: -1; /* 放在内容下方 */
  pointer-events: none; /* 确保不干扰点击事件 */
}
.omelet-alliance-view .alliance-site-frame {
  width: 820px;
  margin: 0 auto;
  border: 3px outset #deb887;
  background: #fff8dc;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.15);
}
.omelet-alliance-view .alliance-site-header {
  background: linear-gradient(180deg, #ffe4b5 0%, #ffdead 100%);
  border-bottom: 3px double #ffa500;
  padding: 12px 20px;
  text-align: center;
}
.omelet-alliance-view .alliance-site-title {
  font-size: 14px;
  color: #8b4513;
  font-weight: bold;
  letter-spacing: 2px;
}
.omelet-alliance-view .alliance-site-badge {
  display: inline-block;
  margin-top: 6px;
  padding: 3px 10px;
  font-size: 11px;
  color: #a0522d;
  background: #fffacd;
  border: 1px dashed #d2691e;
}
.omelet-alliance-view .alliance-stats {
  text-align: center;
  padding: 8px;
  font-size: 12px;
  color: #8b4513;
  border-bottom: 1px dotted #deb887;
}
.alliance-container {
  width: 780px;
  margin: 0 auto;
  padding: 25px 20px;
  border: none;
  background-color: #ffffe0;
  font-family: "Gulim", "Dotum", sans-serif;
  color: #8b4513;
}
.alliance-header {
  text-align: center;
  border-bottom: 2px dashed #ffa500;
  padding-bottom: 12px;
  margin-bottom: 20px;
}
.alliance-title {
  font-size: 28px;
  font-weight: bold;
  color: #ff4500;
  text-shadow: 2px 2px 0px #ffd700;
}
.omelet-alliance-view .main-image {
  display: block;
  margin: 0 auto 20px auto;
  border: 3px double #ffa500;
}
.omelet-alliance-view .section {
  margin-bottom: 25px;
  border: 1px solid #f4a460;
  padding: 15px;
  background-color: #fffacd;
}
.omelet-alliance-view .section-title {
  font-size: 20px;
  font-weight: bold;
  color: #a0522d;
  border-bottom: 1px solid #f4a460;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.omelet-alliance-view .welcome-text {
  text-align: center;
  font-size: 16px;
  line-height: 1.6;
}
.omelet-alliance-view .rules-list,
.omelet-alliance-view .members-list {
  list-style-type: "★ ";
  padding-left: 20px;
}
.omelet-alliance-view .rules-list li,
.omelet-alliance-view .members-list li {
  margin-bottom: 8px;
}
.omelet-alliance-view .footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 14px;
  border-top: 2px dashed #ffa500;
}
.omelet-alliance-view .footer a {
  color: #ff4500;
  text-decoration: underline;
  font-weight: bold;
}
.omelet-alliance-view .back-link-box {
  margin-top: 16px;
  padding: 12px;
  background: #fffaf0;
  border: 2px inset #deb887;
  text-align: center;
  font-size: 13px;
}
.omelet-alliance-view .back-link-box a {
  color: #cd853f;
}
.omelet-alliance-view .back-link-box a:hover {
  color: #ff4500;
}
</style>
