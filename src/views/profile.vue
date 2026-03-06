<template>
  <div class="qa-container">
    <div class="qa-title">{{ t('profile.title') }}</div>
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

import { ref,computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const qaList = computed(() =>[
  {
    question: t('profile.qa1.q'),
    answer: t('profile.qa1.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa2.q'),
    answer: t('profile.qa2.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa3.q'),
    answer: t('profile.qa3.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa4.q'),
    answer: t('profile.qa4.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa5.q'),
    answer: t('profile.qa5.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa6.q'),
    answer: t('profile.qa6.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa7.q'),
    answer: t('profile.qa7.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa8.q'),
    answer: t('profile.qa8.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa9.q'),
    answer: t('profile.qa9.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa10.q'),
    answer: t('profile.qa10.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa11.q'),
    answer: t('profile.qa11.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa12.q'),
    answer: t('profile.qa12.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    question: t('profile.qa13.q'),
    answer: t('profile.qa13.a'),
    colspan: 0,
    questionStyle: {} as CSSProperties
  },
  {
    // 最后一行合计行
    question: t('profile.questions'),
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
