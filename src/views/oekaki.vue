<template>
    <div class="header-section">
        <h1 style="font-size: 24px; color: #333; border-bottom: 2px dashed #79ACC5; padding-bottom: 10px;">お絵かきBBS</h1>
        <p>絵を描いたらBBSにアップしてね！</p>
    </div>
    <p style="padding:20px;"><RouterLink to="/bbs" data-link>← BBSに戻る</RouterLink></p>
    <p style="padding:0 20px;">お絵かき専用ページは準備中です。絵茶で描くか、BBSの新規投稿をご利用ください。</p>
</template>

<script setup lang="ts">

</script>

<style scoped>
.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 2px;
  text-align: center;
}
</style>