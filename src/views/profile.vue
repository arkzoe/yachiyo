<template>
  <div class="qa-container">
    <div class="qa-title">† 八千代的 100 问 100 答 †</div>
    <table class="qa-table">
    <tbody>
      <!-- 循环渲染所有问答行 -->
      <tr v-for="(qa, index) in qaList" :key="index">
        <td 
          class="question"
          :colspan="qa.colspan"
          :style="qa.questionStyle"
        >
          {{ qa.question }}
        </td>
        <!-- 只有非合计行才显示回答列 -->
        <td class="answer" v-if="!qa.colspan">
          <span v-html="qa.answer"></span>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import type { CSSProperties } from 'vue'

const qaList = ref([
  {
    question: '1. 你的名字是？',
    answer: '我是八千代！请多指教 (^^)ノ',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '2. 年龄是？',
    answer: '竟然！已经 8000 岁了哦~☆',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '3. 最近经常做的事？',
    answer: '上网！一直开着浏览器到处看呢 ^▽^',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '4. 主页地址是？',
    answer: '就是你正在看的这里！有空请常来坐坐哦☆',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '5. 爱好是？',
    answer: '做东西~打游戏~胡思乱想。<br />还有一直想念着喜欢的人☆',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '6. 特长是？',
    answer: '等待~（笑）',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '7. 喜欢的食物？',
    answer: '蛋包饭！也很喜欢用番茄酱在上面涂鸦♪',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '8. 讨厌的食物？',
    answer: '只用面粉和水做的薄烤饼…… (;_;)',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '9. 喜欢的颜色？',
    answer: '紫色和绿色！只要想到这两个颜色，心情就会很平静☆',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '10. 喜欢的绘画风格？',
    answer: '喜欢“有故事感”的画……总会让人忍不住盯着看很久。',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '11. 最近沉迷的事情？',
    answer: '一点点完善这个网站！',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '12. 左撇子还是右撇子？',
    answer: '是左撇子哦！^--',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: '13. 对访客们的一句话！',
    answer: '你能来我真的很开心！请在这里放松地逛逛吧♡',
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    // 最后一行合计行
    question: '... (朝着100个问题的目标持续更新中！) ...',
    answer: '',
    colspan: 2,
    questionStyle: {
      textAlign: 'center' as const,
      color: '#999',
      fontStyle: 'italic'
    } as CSSProperties
  }
])
</script>

<style scoped>
.qa-container {
  background-color: #faf8e9;
  border: 2px outset #d3cfa7;
  padding: 20px;
  margin: 0 auto;
  width: 80%;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.05);
}
.qa-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #b05004;
  margin-bottom: 20px;
  border-bottom: 2px dashed #d3cfa7;
  padding-bottom: 10px;
}
.qa-table {
  width: 100%;
  border-collapse: collapse;
}
.qa-table td {
  border: 1px dashed #d3cfa7;
  padding: 10px;
  font-size: 14px;
  line-height: 1.6;
}
.qa-table .question {
  width: 35%;
  font-weight: bold;
  background-color: #fdfbe0;
  color: #8d6b2c;
}
.qa-table .answer {
  width: 65%;
  background-color: #fff;
  color: #333;
}
</style>
