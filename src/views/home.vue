<template>
  <div class="header-section">
    <div class="header-top-row">
      <img src="/images/logo_left.gif" alt="Logo" class="logo-side" />
      <img src="/images/title_text.png" alt="八千代的小屋" class="title-img" />
      <img src="/images/logo_right.gif" alt="Logo" class="logo-side" />
    </div>

    <div class="welcome-msg">
      ★★★ 欢迎光临！本站由站长 ☽八千代☾ 运营，是一个以二次创作为主的插画交流网站
      ★★★
    </div>
  </div>

  <div class="warning-bar">
    <marquee direction="right">
      <span class="star-orange">★</span><span class="star-green">★</span
      ><span class="star-purple">★</span>
      &nbsp; 未经许可严禁擅自转载或使用本站内容 &nbsp;
      <span class="star-purple">★</span><span class="star-green">★</span
      ><span class="star-orange">★</span>
    </marquee>
  </div>

  <div class="counter-area">
    <Counter />
    <div style="font-size: 14px; margin-top: 5px">
      <span class="tooltip-container">
        踩中整百号（纪念番号）
        <div class="tooltip-content">
          <strong>[ 什么是踩号报告？ ]</strong><br />
          当计数器达到 600、700 等整百数字时，<br />
          请向站长报告，可以获得点图奖励哦！
        </div>
      </span>
      请通过
      <span class="tooltip-container">
        <router-link to="/webclap">Web拍手</router-link>
        <div class="tooltip-content">
          <strong>[ Web拍手 ]</strong><br />
          不需要写长篇大论，点一下就能传达支持！<br />
          匿名留言也大欢迎☆
        </div>
      </span>
      或 <router-link to="/bbs">BBS</router-link> 联系我
    </div>
  </div>

  <div class="center-area">
    <div class="illust-container">
      <img src="/images/main_illust.jpg" alt="本月插画" class="main-illust" />
      <div style="font-size: 13px; text-align: center; margin-top: 5px">
        本月插画/作者：ほげほげ 老师
      </div>
    </div>

    <!-- 更新日志区域 -->
    <div class="log-container">
      <div class="update-box">
        <ul>
          <li v-for="(log, index) in updateLogs" :key="index">
            <span class="date">{{ log.date }}</span> {{ log.content }}
          </li>
        </ul>
      </div>

      <div class="web-clap-area">
        <router-link to="/webclap">
          <span class="web-clap-btn">Web 拍手</span>
        </router-link>
        <div class="clap-sub-text">★ 欢迎留下应援留言或感想 ★</div>
        <div class="clap-highlight-text">
          ★ <span style="color: rgb(182, 0, 254)">联合茶绘</span>举办日程请点击
          <router-link to="/etcha-schedule" class="clap-link">这里</router-link> ★
        </div>
      </div>
    </div>
  </div>
  <!-- 公告区域 -->
  <div class="notice-box">
    <div class="notice-title">◆ <b>公告事项</b> ◆</div>
    <div class="notice-content" v-html="noticeContent"></div>
  </div>

  <!-- 页面信息表格 -->
  <table class="info-table">
    <thead>
      <tr>
        <th style="width: 25%; text-align: center">页面</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in pageInfoList" :key="index">
        <td class="col-page">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </td>
        <td>{{ item.description }}</td>
      </tr>
    </tbody>
  </table>

  <!-- 同盟链接区域 -->
  <div class="alliance-section">
    <div class="alliance-title"><strong>★参加同盟一览★</strong></div>
    <div class="alliance-links">
      <router-link
        :to="alliance.path"
        class="alliance-link"
        v-for="(alliance, index) in allianceList"
        :key="index"
      >
        <img :src="alliance.imageSrc" :alt="alliance.alt" />
        <span class="alliance-text">{{ alliance.text }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore
import Counter from "@/components/Counter.vue";
// ========== 1. 更新日志数据 ==========
const updateLogs = ref([
  { date: "2003年10月15日", content: "与参与联盟的连接恢复☆" },
  { date: "2003年10月14日", content: "“画廊”加载速度提升☆" },
  { date: "2003年10月13日", content: "“画廊”新增了1张插画！" },
  { date: "2003年10月12日", content: "“友链合集”添加了新的链接！" },
  { date: "2003年10月11日", content: "更换了 Web拍手 的谢礼图！" },
  { date: "2003年10月10日", content: "首页设计大翻新！" },
  { date: "···", content: "" },
]);

// ========== 2. 公告内容 ==========
const noticeContent = ref(`
  天气渐渐转凉了，神明大人们过得还好吗？<br />
  （八千代因为是重度家里蹲，完全不知道外面的气温呢 > < ;）<br />
  近期计划对网站进行改版更新！具体时间临近时会再通知。<br />
  互换友链招募中 ☆ 请在 BBS 联系我♪
`);

// ========== 3. 页面信息列表（表格数据） ==========
const pageInfoList = ref([
  { path: "/", name: "首页", description: "就是这里哦~ ♪" },
  {
    path: "/profile",
    name: "自我介绍",
    description: "看了这个就能了解站长 ☽八千代☾ 的一切！必看☆",
  },
  {
    path: "/gallery",
    name: "画廊",
    description: "展示从各位**神明大人**那里收到的超棒插画！一定要看哦！",
  },
  {
    path: "/bbs",
    name: "绘图板 / BBS",
    description: "意见和感想请移步留言板♪ 绘图留言板正在征集大家的才艺神作！",
  },
  {
    path: "/etcha",
    name: "绘茶",
    description:
      "聚在一起边画画边聊天的地方。为了大家能友好相处，请先阅读利用规约☆",
  },
  {
    path: "/music",
    name: "音乐室",
    description: "收录了《超时空辉夜姬》中八千代最喜欢的 BGM，欢迎收听。",
  },
  {
    path: "/links",
    name: "友链合集",
    description: "本站链接自由。Banner 请保存后使用，严禁盗链☆",
  },
]);

// ========== 4. 同盟链接数据 ==========
const allianceList = ref([
  { imageSrc: "/images/omelet2.png", alt: "蛋包饭", text: "★蛋包饭真爱同盟★" ,path: "/omelet-alliance"},
  { imageSrc: "/images/mentako.png", alt: "面蛸", text: "★面蛸同盟★" ,path: "/mentako-alliance"},
  { imageSrc: "/images/moon.png", alt: "★月球", text: "★想回月球联盟★" ,path: "/moon-alliance"},
]);
</script>

<style scoped>
.alliance-section {
  margin-top: 40px;
  text-align: center;
}

.alliance-title {
  font-size: 20px;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 20px;
}
.alliance-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.alliance-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 150px;
}

.alliance-link img {
  height: 31px;
  margin-bottom: 8px;
}

.alliance-text {
  font-size: 14px;
  font-weight: bold;
  color: #0000cd;
  text-decoration: underline;
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
.warning-bar {
  margin-left: -40px;
  margin-right: -40px;
  background-color: #0f5e6d;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 4px 4px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  padding: 1px 40px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 5px;
  border-top: 1px solid #0a4550;
  border-bottom: 1px solid #0a4550;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
}
.star-orange {
  color: #ffad33;
  text-shadow: 1px 1px 0 #333;
}
.star-green {
  color: #00cc66;
  text-shadow: 1px 1px 0 #333;
}
.star-purple {
  color: #aa44dd;
  text-shadow: 1px 1px 0 #333;
}
.counter-area {
  text-align: center;
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 18px;
  position: relative;
  z-index: 10;
}


.tooltip-container {
  position: relative;

  border-bottom: 1px dashed #336699;
  color: #336699;
  display: inline-block;
}
.tooltip-container.btn-mode {
  border-bottom: none;
}

.tooltip-content {
  display: none;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background-color: #fff;
  border: 2px solid #ff9966;
  padding: 10px;
  z-index: 999;
  text-align: left;
  font-size: 13px;
  font-weight: normal;
  color: #555;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  line-height: 1.4;
  white-space: normal;
}

.tooltip-content::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #ff9966 transparent;
}

.tooltip-container:hover .tooltip-content {
  display: block;
}
.center-area {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 40px;
}
.illust-container {
  flex: 0 0 650px;
  text-align: center;
}
.main-illust {
  width: 100%;
  height: auto;
  border: 4px solid #fff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}
.log-container {
  flex: 0 0 450px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.update-box {
  width: 100%;
  height: 160px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  overflow-y: scroll;
  padding: 15px;
  font-size: 14px;
  box-sizing: border-box;
}
.update-box ul {
  padding-left: 10px;
  margin: 0;
  list-style-position: inside;
}
.update-box li {
  white-space: nowrap;
  margin-bottom: 5px;
}
.date {
  color: #333;
  font-family: monospace;
  margin-right: 15px;
}
.web-clap-area {
  text-align: center;
  font-size: 14px;
  color: #333;
  margin-top: 15px;
}

.web-clap-btn {
  background: #fff;
  color: #ff9966;
  padding: 2px 8px;
  border: 2px solid #ff9966;
  font-size: 13px;
  display: inline-block;
  margin-bottom: 3px;
  font-weight: bold;
  text-shadow: 1px 1px 0 #ff9966;
}
.clap-sub-text {
  font-size: 11px;
  color: #444;
  margin-bottom: 5px;
}

.clap-highlight-text {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.clap-purple {
  color: #c71585;
}
.clap-link {
  color: blue;
  text-decoration: underline;
}
.notice-box {
  background-color: transparent;
  border: none;
  padding: 10px;
  text-align: center;
  margin-bottom: 30px;
  color: #224466;
}

.notice-title {
  font-size: 22px;
  font-weight: bold;
  color: black;
}

.notice-content {
  font-size: 14px;
  margin-top: 15px;
  color: black;
}
.info-table {
  width: 55%;

  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 2px;
  background-color: transparent;
  border: 2px solid #487a8a;
  font-size: 13px;
}
.info-table th {
  background-color: transparent;
  color: #000;
  padding: 4px;
  border: 1px solid #487a8a;
  font-weight: bold;
  text-align: center;
}
.info-table td {
  background-color: transparent;
  border: 1px solid #487a8a;
  padding: 5px;
  color: #000;
  font-weight: bold;
}
.col-page-link {
  color: #0000cd;
  text-decoration: underline;
  font-weight: bold;
}

.col-page {
  width: 200px;
  text-align: left;
  vertical-align: top;
}
</style>
