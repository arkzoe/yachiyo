<template>
  <div class="header-section">
    <div
      style="
        font-size: 28px;
        font-weight: bold;
        color: #333;
        border-bottom: 2px solid #79acc5;
        padding-bottom: 10px;
        display: inline-block;
      "
    >
      ◆ 音乐放置处 (Music Room) ◆
    </div>
    <p
      style="font-weight: bold; color: #333; font-size: 16px; margin-top: 15px"
    >
      ★ 收录电影《超时空辉夜姬》内八千代最喜欢的曲目 ★
    </p>
  </div>

  <div class="player-deck">
    <div class="player-screen">
      <!-- 响应式绑定播放状态和颜色 -->
      <div class="status-dot" :style="{ color: statusColor }">
        ● {{ statusText }}
      </div>
      <div class="track-display">{{ currentTrackName }}</div>
    </div>

    <div style="text-align: center; margin-bottom: 20px">
      <!-- Vue 事件绑定 -->
      <button class="ctrl-btn" @click="togglePlay">Play / Pause</button>
      <button class="ctrl-btn" @click="stopMusic">Stop</button>
    </div>

    <table class="playlist-table">
      <thead>
        <tr>
          <th width="60">NO.</th>
          <th>TRACK NAME</th>
          <th width="100">SOURCE</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for 渲染播放列表，绑定选中状态 -->
        <tr
          v-for="(track, index) in playlist"
          :key="index"
          @click="loadTrack(track.name, track.src, index)"
          :class="{ 'is-playing': activeIndex === index }"
        >
          <td>{{ (index + 1).toString().padStart(2, "0") }}</td>
          <td>{{ track.name }}</td>
          <td>Cloud</td>
        </tr>
      </tbody>
    </table>
    <!-- 音频元素 ref 引用 -->
    <audio ref="audioRef"></audio>
  </div>

  <div
    style="
      margin-top: 40px;
      font-size: 14px;
      color: #444;
      text-align: center;
      border-top: 2px dotted #79acc5;
      padding-top: 20px;
    "
  >
    Select a track to start playback ♪<br />
    <span style="color: #999; font-family: monospace">
      (C) 2003-2026 Yachiyo Archive Center
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ========== 响应式数据 ==========
// 音频元素引用
const audioRef = ref<HTMLAudioElement | null>(null);
// 当前播放曲目名称
const currentTrackName = ref("SYSTEM READY...");
// 播放状态文本（STOPPED/PLAYING/PAUSED）
const statusText = ref("STOPPED");
// 播放状态颜色（红/绿/黄）
const statusColor = ref("#FF0000");
// 当前选中的曲目索引
const activeIndex = ref(-1);

// 播放列表数据（抽离成数组，便于维护）
const playlist = ref([
  {
    name: "瞬間、シンフォニー",
    src: "https://music.163.com/song/media/outer/url?id=3340113701.mp3",
  },
  {
    name: "ray（超かぐや姫！版）",
    src: "https://music.163.com/song/media/outer/url?id=3340114786.mp3",
  },
  {
    name: "Ex-Otogibanashi",
    src: "https://music.163.com/song/media/outer/url?id=3340107500.mp3",
  },
  {
    name: "Reply 超かぐや姫！",
    src: "https://music.163.com/song/media/outer/url?id=3340114785.mp3",
  },
  {
    name: "星降る海",
    src: "https://music.163.com/song/media/outer/url?id=3340112782.mp3",
  },
  {
    name: "ワールドイズマイン Remix",
    src: "https://music.163.com/song/media/outer/url?id=3342070213.mp3",
  },
]);

// ========== 核心方法 ==========
/**
 * 加载并播放指定音频
 * @param {string} trackName - 音频名称
 * @param {string} trackSrc - 音频文件路径
 * @param {number} index - 选中的曲目索引
 */
const loadTrack = (trackName: string, trackSrc: string, index: number) => {
  // 获取音频元素
  const audio = audioRef.value as HTMLAudioElement;
  if (!audio) return;

  // 更新选中索引（替代原生的 class 操作）
  activeIndex.value = index;

  // 设置音频信息并播放
  currentTrackName.value = trackName;
  audio.src = trackSrc;
  audio.play().catch((err: any) => {
    console.error("播放失败:", err);
    alert("音频播放失败，请检查网络或链接是否有效");
  });

  // 更新播放状态
  statusText.value = "PLAYING";
  statusColor.value = "#32ff32";
};

/**
 * 切换音频播放/暂停状态
 */
const togglePlay = () => {
  const audio = audioRef.value as HTMLAudioElement;
  if (!audio || !audio.src) return;

  if (audio.paused) {
    // 暂停 → 播放
    audio.play().catch((err: any) => {
      console.error("播放失败:", err);
    });
    statusText.value = "PLAYING";
    statusColor.value = "#32ff32";
  } else {
    // 播放 → 暂停
    audio.pause();
    statusText.value = "PAUSED";
    statusColor.value = "#FFFF00";
  }
};

/**
 * 停止音频播放（暂停并重置进度）
 */
const stopMusic = () => {
  const audio = audioRef.value as HTMLAudioElement;
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0; // 重置播放进度
  statusText.value = "STOPPED";
  statusColor.value = "#FF0000";
};
</script>

<style scoped>
.menu-header {
  font-family: "宋体", "SimSun", sans-serif;
  font-size: 22px;
  color: #000;
  line-height: 1.2;
  letter-spacing: -1px;
}
.menu-sub-header {
  font-family: "宋体", "SimSun", sans-serif;
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}
.main-content {
  flex: 1;
  padding: 50px;
  background-color: #d0f0f5;
  background-image: url("images/bg_blue.jpg");
  background-repeat: repeat;
  border-left: 7px solid #d3d3d3;
  box-shadow: inset 2px 0 0 #808080;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}
.header-section {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}
.player-deck {
  background: #c0c0c0;
  border: 3px outset #eee;
  padding: 20px;
  width: 100%;
  max-width: 750px;
  box-sizing: border-box;
  box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 20px auto 0 auto;
}
.player-screen {
  background: #000;
  border: 3px inset #fff;
  padding: 20px;
  margin-bottom: 20px;
  color: #32ff32;
  font-family: "DSEG7-Classic", monospace;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(50, 255, 50, 0.2);
}
.track-display {
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
}
.status-dot {
  color: #ff0000;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}
.playlist-table {
  width: 100%;
  background: #fff;
  border-collapse: separate;
  border-spacing: 2px;
  font-size: 16px;
  border: 1px solid #000;
}
.playlist-table th {
  background: #487a8a;
  color: white;
  padding: 10px;
  border: 1px solid #fff;
}
.playlist-table td {
  border: 1px solid #eee;
  padding: 12px;
  cursor: pointer;
  color: #333;
}
.playlist-table tr:hover {
  background: #fdfac8;
}
.is-playing {
  background: #ffe4b5 !important;
  color: #d26432;
  font-weight: bold;
}
.ctrl-btn {
  background: #c0c0c0;
  border: 3px outset #fff;
  padding: 10px 25px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}
.ctrl-btn:active {
  border-style: inset;
  background: #b0b0b0;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.new-tag {
  color: red;
  font-size: 14px;
  font-weight: bold;
  animation: blink 1s step-end infinite;
}
</style>
