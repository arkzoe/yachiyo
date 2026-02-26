<template>
    <div class="header-section">
        <div class="header-top-row">
            <img src="/images/logo_left.gif" alt="ロゴ1" class="logo-side">
            <img src="/images/title_text.png" alt="合同絵茶 開催予定" class="title-img">
            <img src="/images/logo_right.gif" alt="ロゴ2" class="logo-side">
        </div>
    </div>
    <div class="content-container">
        <h1>合同絵茶 開催予定</h1>
        <p class="section-description">
            <span class="clap-purple">合同絵茶</span>の開催予定をお知らせするページです。
        </p>
        <div class="link-category">
            <h2>現在の予定</h2>
            <ul class="retro-list">
                <li>
                    <RouterLink to="/">予定1：2003年10月15日（水）20:00～</RouterLink>
                    <p>テーマ：秋の合同絵茶！紅葉のようにきれいな絵を楽しみにしています！</p>
                </li>
                <li>
                    <RouterLink to="/">予定2：2003年11月1日（土）19:00～</RouterLink>
                    <p>テーマ：ハロウィン記念絵茶！ちょっと怖くて楽しい絵を描いてみよう。</p>
                </li>
            </ul>
        </div>
        <div class="link-category">
            <h2>過去の絵茶記録</h2>
            <ul class="retro-list">
                <li>
                    <RouterLink to="/">2003年9月20日 櫛祭り記念絵茶</RouterLink>
                    <p>京都で行われた櫛祭りにちなんで、美しい髪飾りをテーマに絵を描きました！</p>
                </li>
                <li>
                    <RouterLink to="/">2003年8月10日 夏休み特別絵茶</RouterLink>
                    <p>暑い夏に涼しい絵と一緒に！</p>
                </li>
            </ul>
        </div>
        <p><RouterLink to="/etcha" data-link>← 絵茶へ</RouterLink></p>
    </div>
</template>

<script setup lang="ts">

</script>

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