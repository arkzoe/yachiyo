<template>
  <div class="etcha-page">
      <div class="bbs-header" style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 24px; color: #333; border-bottom: 2px dashed #79ACC5; padding-bottom: 10px;"> ◆ 茶绘 ◆ </h1>
        <p><img src="/images/tsuku_ball.gif"/>这是一个可以实时绘图和交流的空间。<img src="/images/tsuku_ball.gif"/></p>
      </div>

      <div class="etcha-container">
        <OekaPainter />
        <div class="chat-container">
          <div class="chat-header">☆ 实时聊天室 ☆</div>
          <div class="chat-messages" id="chat-messages" ref="chatMessages">
            <p 
              v-for="(msg, index) in messages" 
              :key="index"
              :style="{ color: msg.type === 'welcome' ? 'red' : msg.type === 'whisper' ? '#0078FF' : '' }"
            >
              <span 
                :style="{ 
                  fontWeight: msg.isAdmin ? 'bold' : '',
                  color: getUserNameColor(msg)
                }"
              >
                {{ msg.name }}: 
              </span>
              {{ msg.content }}
            </p>
          </div>
          <div class="chat-input-area">
            <input 
              type="text" 
              v-model="userName" 
              placeholder="名字"
            >
            <textarea 
              v-model="userMessage" 
              placeholder="请输入内容..." 
              rows="3"
              :disabled="isMuted"
              :placeholder="isMuted ? '聊天已被禁言。' : '请输入内容...'"
              @keydown.enter.exact="handleKeydown"
            ></textarea>
            <button 
              id="send-btn" 
              @click="sendMessage"
              :disabled="isMuted"
            >
              发送
            </button>
          </div>
        </div>
      </div>

      <footer class="etcha-footer" style="margin-top:16px;text-align:center;font-size:12px;color:#555;flex-shrink:0;">
        <small>
          Based on PaintBBS NEO by funige.<br>
          本页面参考yachiyo.net的绘茶功能实现，模拟了一个简单的在线绘图和聊天环境。<br>
        </small>
      </footer>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import OekaPainter from '@/components/OekaPainter.vue';
// 响应式数据
const userName = ref('');
const userMessage = ref('');
const messages = ref([]);
const chatMessages = ref(null);
const container = ref(null);
const currentLogIndex = ref(0);
const profanityCount = ref(0);
const chatSpeedMultiplier = ref(1.0);
const isMuted = ref(false);

// 屏蔽词设置
const profanities = ["笨蛋", "傻瓜", "骂人", "废话"];
const defaultChatLogs = [
  { n: '众神883', m: 'ㅇㅅㅇ' },
  { n: '众神135', m: '这居然真的能用？' },
  { n: '众神654', m: '八百万神明（Yaoyoro）~' },
  { n: '管理员 八千代', m: '欢迎新朋友~' },
  // ... 更多消息
];
// 模拟聊天日志（实际项目中应该从外部导入）
const chatLogs = typeof window !== 'undefined' && window.chatLogs ? window.chatLogs : defaultChatLogs;

// 生成随机用户名
onMounted(() => {
  // 初始化用户名
  userName.value = `众神${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  
  // 添加欢迎消息
  addMessage("管理员 八千代", "请保持礼貌交流哦~ (❁´◡`❁)", 'welcome');
  
  // 启动模拟聊天
  startSimulation();
  
  // 检查绘图工具加载状态
  setTimeout(() => {
    const root = document.getElementById('oeka-toolbar-root');
    if (root && !root.querySelector('.tool-group')) {
      root.innerHTML = '<p style="padding:12px;color:#c00;font-size:14px;">绘图工具加载失败。请通过本地服务器运行（例如：npx serve）</p>';
    }
  }, 3000);
});

// 添加消息到聊天框
const addMessage = (name, content, type = 'normal') => {
  if (!content || !content.trim()) return;
  
  const isAdmin = name === '管理员 八千代';
  messages.value.push({
    name,
    content,
    type,
    isAdmin
  });
  
  // 滚动到底部
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
};

// 获取用户名颜色
const getUserNameColor = (msg) => {
  if (msg.isAdmin) {
    return msg.type === 'welcome' ? 'red' : 'black';
  }
  return '#000080';
};

// 惩罚震动效果
const punishmentEffect = () => {
  const containerEl = document.querySelector('.container') || container.value;
  if (!containerEl) return;
  
  containerEl.style.transition = 'transform 0.1s ease-in-out';
  let shakes = 0;
  const shakeInterval = setInterval(() => {
    const x = (shakes % 2 === 0 ? 1 : -1) * 10;
    containerEl.style.transform = `translateX(${x}px)`;
    shakes++;
    if (shakes > 6) {
      clearInterval(shakeInterval);
      setTimeout(() => {
        containerEl.style.transition = 'transform 0.15s ease-out';
        containerEl.style.transform = 'translateY(100px)'; // “敲头”效果
        setTimeout(() => {
          containerEl.style.transition = 'transform 0.8s ease-in-out';
          containerEl.style.transform = 'translateY(0px)';
        }, 200);
      }, 100);
    }
  }, 80);
};

// 发送消息
const sendMessage = () => {
  if (isMuted.value) return;
  
  const name = userName.value || '访客';
  const message = userMessage.value.trim();
  
  if (!message) return;

  // 检测屏蔽词
  const foundProfanity = profanities.some(word => message.includes(word));

  if (foundProfanity) {
    profanityCount.value++;
    punishmentEffect();

    // 根据次数给出不同提示
    if (profanityCount.value === 1) {
      setTimeout(() => {
        addMessage("管理员 八千代", `(悄悄话) "${name}"，不可以乱说话哦~`, 'whisper');
      }, 2500);
    } else if (profanityCount.value === 2) {
      setTimeout(() => {
        addMessage("管理员 八千代", `(悄悄话) "${name}"，八千代会很难过的... (｡•́︿•̀｡)`, 'whisper');
      }, 2500);
    } else if (profanityCount.value >= 3) {
      alert('不可以调皮捣蛋哦~ ^▽^');
      isMuted.value = true;
    }
  } else {
    addMessage(name, message);
  }

  // 清空输入框（未被禁言时）
  if (!isMuted.value) {
    userMessage.value = '';
  }
  
  // 聚焦输入框
  nextTick(() => {
    const textarea = document.getElementById('chat-message');
    if (textarea) textarea.focus();
  });
};

// 处理回车发送
const handleKeydown = (e) => {
  e.preventDefault();
  sendMessage();
};

// 模拟滚动聊天内容
const startSimulation = () => {
  if (!chatLogs || currentLogIndex.value >= chatLogs.length) return;

  const processNext = () => {
    if (currentLogIndex.value >= chatLogs.length) {
      addMessage("管理员 八千代", "捣蛋的孩子太多，先关门啦~ (T_T)");
      return;
    }
    
    const log = chatLogs[currentLogIndex.value];
    addMessage(log.n, log.m);
    currentLogIndex.value++;
    
    let delay = (Math.random() * 4000 + 2000) * chatSpeedMultiplier.value;
    chatSpeedMultiplier.value = Math.max(0.2, chatSpeedMultiplier.value * 0.998);
    
    setTimeout(processNext, delay);
  };

  // 初始加载几条消息
  const initialCount = Math.min(4, chatLogs.length);
  for (let i = 0; i < initialCount; i++) {
    const log = chatLogs[currentLogIndex.value];
    addMessage(log.n, log.m);
    currentLogIndex.value++;
  }
  
  setTimeout(processNext, 2000);
};
</script>

<style scoped>
/* etcha 页面: 桌面端视口固定 */
.etcha-page {     /* 垂直排列子元素 */
  overflow: hidden;
  height: 100%;
}
.etcha-page .container {
  max-height: 100vh;
  overflow: hidden;
}
.etcha-page .main-content {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}
.etcha-page .bbs-header {
  flex-shrink: 0;
}

.etcha-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 40px;
  min-height: 0;              /* 占据剩余所有高度 */
  overflow: hidden;
}

.etcha-oeka-wrap {
  flex: 1;
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.etcha-oeka-wrap .oeka-canvas-panel {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex-shrink: 0;
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 2px outset #ccc;
  background: #c0c0c0;
  padding: 10px;
}

.chat-header {
  font-weight: bold;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: 2px inset #777;
  margin-bottom: 10px;
}

.chat-messages {
  flex-grow: 1;
  background: #fff;
  border: 2px inset #777;
  padding: 10px;
  overflow-y: scroll;
  margin-bottom: 10px;
  font-size: 13px;
}

.chat-messages p {
  margin: 0 0 5px 0;
  line-height: 1.4;
}

.chat-input-area {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.chat-input-area input, .chat-input-area textarea {
  width: 100%;
  border: 2px inset #777;
  padding: 3px;
  box-sizing: border-box;
  font-family: inherit;
}
.chat-input-area button {
  padding: 5px;
  border: 2px outset #f0f0f0;
  background: #c0c0c0;
  font-weight: bold;
  cursor: pointer;
}
.chat-input-area button:active {
  border-style: inset;
}

</style>