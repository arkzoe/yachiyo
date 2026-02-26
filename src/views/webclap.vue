<template>
  <div class="clap-container">
    <div class="clap-title">👏 Web拍手・心を残す 👏</div>
    <div class="clap-actions">
      <div class="simple-clap-area">
        <p>サイトをちゃんと見てますという意味で<br />拍手ひとつ！</p>
        <button id="clap-button" @click="sendClap">♡ 拍手を送る ♡</button>
        <p>
          総拍手: <span id="clap-count">{{ clapCount }}</span>
        </p>
      </div>
      <div class="message-form">
        <p>管理人へ応援メッセージを残してね♡</p>
        <input
          type="text"
          id="message-name"
          placeholder="名前（省略時は匿名）"
          v-model="messageName"
        />
        <textarea
          id="message-content"
          placeholder="メッセージを入力..."
          rows="3"
          v-model="messageContent"
        ></textarea>
        <button id="send-message-btn" @click="sendMessage">
          メッセージを送る
        </button>
      </div>
    </div>
    <div class="clap-log-container">
      <div class="clap-log-title">💌 残してくれた心 💌</div>
      <div id="clap-log-list">
        <!-- 加载中状态 -->
        <p v-if="loading" style="color: #999; text-align: center">
          メッセージを読み込み中...
        </p>
        <!-- 无留言状态 -->
        <div
          v-else-if="messages.length === 0"
          style="color: #999; text-align: center"
        >
          まだメッセージがありません
        </div>
        <!-- 留言列表 -->
        <div v-for="msg in messages" :key="msg.id" class="clap-log-entry">
          <div class="entry-header">
            <span class="entry-author">{{ msg.name }}</span>
            <span class="entry-date">{{ formatDate(msg.date) }}</span>
          </div>
          <div class="entry-content">{{ msg.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// 存储键名
const STORAGE_KEY = "webclap-data";

// 响应式数据
const loading = ref(true); // 是否加载中
const clapCount = ref(0); // 总拍手数
const messages = ref<
  Array<{
    id: number | string;
    name: string;
    content: string;
    date: string; // ISO 字符串，便于排序
  }>
>([]);

// 表单绑定
const messageName = ref("");
const messageContent = ref("");

// 格式化日期为 YYYY/MM/DD HH:MM
const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "日付不明";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  } catch {
    return "日付エラー";
  }
};

// 保存数据到 localStorage
const saveToStorage = (): void => {
  try {
    const data = {
      clapTotal: clapCount.value,
      messages: messages.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("保存失败", e);
  }
};

// 从 localStorage 加载数据
const loadFromStorage = (): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // 兼容旧数据，确保字段存在
      clapCount.value = typeof data.clapTotal === "number" ? data.clapTotal : 0;
      if (Array.isArray(data.messages)) {
        // 按日期倒序（最新的在前）
        messages.value = data.messages.sort(
          (
            a: { date: string | number | Date },
            b: { date: string | number | Date },
          ) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      } else {
        messages.value = [];
      }
    } else {
      // 初始化默认数据
      clapCount.value = 0;
      messages.value = [];
    }
  } catch (e) {
    console.error("读取失败，使用默认值", e);
    clapCount.value = 0;
    messages.value = [];
  } finally {
    loading.value = false;
  }
};

// 处理拍手
const sendClap = (): void => {
  clapCount.value++;
  saveToStorage();
};

// 处理留言发送
const sendMessage = (): void => {
  // 验证内容不能为空（忽略空白字符）
  if (!messageContent.value || messageContent.value.trim() === "") {
    alert("メッセージを入力してください");
    return;
  }

  // 处理名字（为空则用匿名）
  const name =
    messageName.value?.trim() || "神明" + Math.floor(Math.random() * 1000); // 随机匿名名，避免重复

  // 创建新留言
  const newMessage = {
    id: Date.now() + "-" + Math.random().toString(36).substr(2, 8), // 简单唯一id
    name: name,
    content: messageContent.value.trim(),
    date: new Date().toISOString(),
  };

  // 插入到数组最前面（最新在上）
  messages.value = [newMessage, ...messages.value];

  // 清空内容输入框，保留名字输入框方便连续留言
  messageContent.value = "";

  // 保存到存储
  saveToStorage();
};

// 组件挂载时读取数据
onMounted(() => {
  loadFromStorage();
});
</script>

<style scoped>
/* 原有样式保持不变 */
.clap-container {
  background-color: #f0f8ff;
  border: 2px outset #add8e6;
  padding: 20px;
  margin: 0 auto;
  width: 80%;
  text-align: center;
}
.clap-title {
  font-size: 22px;
  font-weight: bold;
  color: #4682b4;
  margin-bottom: 20px;
}
.clap-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.simple-clap-area {
  width: 250px;
  padding: 15px;
  border: 2px inset #add8e6;
  background-color: #e6f2ff;
}
.simple-clap-area button {
  padding: 10px 15px;
  border: 2px outset #f0f0f0;
  background: #c0c0c0;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}
.simple-clap-area button:active {
  border-style: inset;
}
#clap-count {
  font-weight: bold;
  font-size: 1.2em;
  color: #d9534f;
}
.message-form {
  width: 400px;
  padding: 15px;
  border: 2px inset #add8e6;
  background-color: #e6f2ff;
}
.message-form input[type="text"],
.message-form textarea {
  width: 90%;
  border: 1px solid #777;
  padding: 5px;
  margin-bottom: 10px;
  font-family: "Gulim", "Dotum", sans-serif;
  font-size: 14px;
}
.message-form button {
  padding: 5px 10px;
  border: 2px outset #f0f0f0;
  background: #e0e0e0;
  cursor: pointer;
}
.message-form button:active {
  border-style: inset;
}
.clap-log-container {
  margin-top: 30px;
  text-align: left;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
.clap-log-title {
  font-weight: bold;
  font-size: 18px;
  color: #4682b4;
  border-bottom: 2px dashed #add8e6;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
.clap-log-entry {
  border: 1px dotted #add8e6;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #faffff;
}
.entry-header {
  font-size: 12px;
  color: #555;
  margin-bottom: 5px;
}
.entry-author {
  font-weight: bold;
  color: #005a9c;
}
.entry-content {
  font-size: 14px;
  color: #333;
  white-space: pre-wrap;
}
.entry-date {
  float: right;
  color: #999;
  font-size: 11px;
}
</style>
