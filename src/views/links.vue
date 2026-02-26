<template>
  <div class="header-section">
    <div class="header-top-row">
      <img src="/images/logo_left.gif" alt="Logo1" class="logo-side" />
      <img src="/images/title_text.png" alt="八千代的小屋" class="title-img" />
      <img src="/images/logo_right.gif" alt="Logo2" class="logo-side" />
    </div>

    <div class="welcome-msg">
      ★★★ 欢迎光临！本站是由管理员 ☽八千代☾ 运营的以二次创作为中心的插画交流站
      ★★★
    </div>
  </div>

  <div class="content-container" style="padding: 20px">
    <h1 style="padding-left: 10px">Links / 友链</h1>
    <p class="section-description">
      这些都是八千代非常珍惜的宝藏链接。<br />
      要不要一起出发，去探索充满回忆与灵感的地方呢？☆
    </p>

    <section class="link-category">
      <h2 style="color: #ff69b4">☆ 好友网站 ☆</h2>
      <div
        class="notice-box retro-notice"
        style="border: 2px dashed #ffb6c1; padding: 15px; background: #fff5f7"
      >
        <div class="notice-title" style="font-weight: bold; color: #ff69b4">
          ◆ <b>维护中</b> ◆
        </div>
        <div class="notice-content" style="font-size: 13px; margin-top: 5px">
          朋友们的网站好像正在休息中呢…… (´;ω;｀)<br />
          八千代偶尔也会去串门，一直期待着它们回归的那天。
        </div>
      </div>
    </section>

    <section class="link-category" style="margin-top: 30px">
      <h2 style="color: #79acc5">☆ 资料室 / 实用工具 ☆</h2>
      <ul class="retro-list" style="line-height: 1.8">
        <li>
          <a href="https://xiyung.cn/" target="_blank">XIYUNG.CN</a>
          <p style="font-size: 12px; color: #666; margin: 0 0 10px 0">
            一个分享前后端，游戏服务器和日常等内容的博客！
          </p>
        </li>
        <li>
          <a href="https://www.w3schools.com/html/" target="_blank"
            >HTML/CSS 基础讲座 (W3Schools)</a
          >
          <p style="font-size: 12px; color: #666; margin: 0 0 10px 0">
            想要亲手制作网页的话就从这里开始吧！
          </p>
        </li>
        <li>
          <a href="https://www.dafont.com/" target="_blank"
            >精美字体馆 (DaFont)</a
          >
          <p style="font-size: 12px; color: #666; margin: 0 0 10px 0">
            能瞬间改变网站氛围的个性字体！记得查看使用说明。
          </p>
        </li>
      </ul>
    </section>

    <section class="link-category" style="margin-top: 30px">
      <h2 style="color: #880000">☆ 插画同好 & 素材参考 ☆</h2>
      <ul class="retro-list" style="line-height: 1.8">
        <li>
          <a href="https://www.tinami.com/" target="_blank">★ TINAMI</a>
          <p style="font-size: 12px; color: #666; margin: 0 0 10px 0">
            日本知名的动画/漫画插画投稿站！非常有参考价值。
          </p>
        </li>
        <li>
          <a href="https://www.deviantart.com/" target="_blank">DeviantArt</a>
          <p style="font-size: 12px; color: #666; margin: 0 0 10px 0">
            可以看到全世界画师的各种创作！
          </p>
        </li>
      </ul>
    </section>
  </div>

  <footer
    style="
      text-align: center;
      padding: 20px 0;
      border-top: 2px dashed #ffc0cb;
      font-size: 12px;
      color: #888;
      margin-top: 40px;
    "
  >
    <p>&copy; 2003 Yachiyo. All Rights Reserved.</p>
    <p>无论何时都非常感谢各位**众神大人**的到访！</p>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.content-container {
  padding: 20px;
}

.retro-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.retro-list li {
  margin-bottom: 15px;
  border-bottom: 1px dotted #a0c0d0;
  padding-bottom: 15px;
}

.retro-list li:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.retro-list li a {
  font-family: "Gulim", "굴림", "Dotum", "돋움", sans-serif;
  color: #007bff;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  transition: color 0.2s ease-in-out;
}

.retro-list li a:hover {
  color: #ff69b4;
  text-decoration: underline;
}

.retro-list li p {
  font-size: 0.9em;
  color: #555;
  margin-top: 5px;
  line-height: 1.5;
}

.retro-notice {
  background-color: #fff0f5;
  border: 1px solid #ffb6c1;
  padding: 15px 20px;
  text-align: center;
  border-radius: 5px;
  margin-top: 10px;
}

.retro-notice .notice-title {
  font-weight: bold;
  color: #e91e63;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.retro-notice .notice-content {
  font-size: 0.95em;
  color: #555;
  line-height: 1.6;
}
.link-category {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px dashed #ffc0cb;
  padding: 25px 30px;
  margin-bottom: 30px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.link-category h2 {
  font-family: "Gulim", "굴림", "Dotum", "돋움", sans-serif;
  color: #d17a8c;
  font-size: 1.5em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ffe6f0;
  letter-spacing: 1px;
}
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 2px;
  text-align: center;
}

.header-top-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-bottom: 30px;
}
.logo-side {
  max-width: 80px;
  height: auto;
}
.title-img {
  max-width: 450px;
}
.welcome-msg {
  font-weight: bold;
  margin-top: 0;
  color: #333;
  font-size: 16px;
  text-shadow: 1px 1px 0 #fff;
}
.content-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-container h1 {
  font-family: "Gulim", "굴림", "Dotum", "돋움", sans-serif;
  color: #4a4a4a;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 2.5em;
  text-shadow: 2px 2px 0px #ffe0e0;
}
.section-description {
  text-align: center;
  margin-bottom: 40px;
  font-size: 0.95em;
  color: #666;
  line-height: 1.6;
}

</style>
