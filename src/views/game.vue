<template>
    <div class="main-content-area">
        <div class="bbs-header" style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 24px; color: #333; border-bottom: 2px dashed #79ACC5; padding-bottom: 10px; display: flex; align-items: center; justify-content: center;">
                <img src="/images/old_under_construction_yachiyo.gif" alt="-" style="height:24px; vertical-align:middle; margin-right: 10px;">
                游戏角 · 施工中
                <img src="/images/old_under_construction_yachiyo.gif" alt="-" style="height:24px; vertical-align:middle; margin-left: 10px;">
            </h1>
            <p style="font-size: 1.1em; color: #555;">非常抱歉！页面正在全力准备中。请再稍等一下下！</p>
        </div>

        <div style="text-align: center; padding: 20px;">

            <img src="/images/construction.gif" alt="施工中" style="max-width: 100%; height: auto; border: 2px dotted #ffb6c1; padding: 5px;">

            <div class="admin-letter-container">
                <div class="admin-letter-title">来自站长的消息 ☽</div>
                <p class="admin-letter-text">
                    这里原本打算放一些八千代制作的小游戏，<br>
                    或者是向大家推荐的游戏心得……<br>
                    但由于站长目前正沉迷于“虚拟空间”的调试，<br>
                    这里的进度落后了（> < ;）<br><br>
                    我会尽快完成的！<br>
                    在那之前，请先去 <b>BBS</b> 或者 <b>绘茶室</b> 玩耍吧☆
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.construction-page-container {
    background-color: #f0f8ff;
    border: 2px outset #add8e6;
    padding: 20px;
    margin: 0 auto;
    width: 80%;
    text-align: left;
    line-height: 1.6;
    font-size: 14px;
    color: #333;
}
.construction-page-title {
    font-size: 28px;
    font-weight: bold;
    color: #ff69b4;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: 2px dashed #ffb6c1;
    padding-bottom: 10px;
    text-shadow: 2px 2px #fff;
}
.construction-content {
    text-align: center;
    margin-top: 20px;
}
.construction-image {
    margin: 20px 0;
    border: 2px dotted #ffb6c1;
    padding: 5px;
}
.admin-letter-container {
    border: 2px dashed #ff69b4;
    padding: 20px;
    margin: 30px auto;
    max-width: 500px;
    background-color: #fff;
    text-align: center;
}
.admin-letter-title {
    font-size: 20px;
    font-weight: bold;
    color: #ff69b4;
    margin-bottom: 15px;
}
.admin-letter-text {
    font-size: 14px;
    line-height: 1.8;
    color: #333;
}
</style>