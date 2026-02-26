<template>
    <div class="rules-container">
        <div class="rules-title">✦ 絵茶利用規約 ✦</div>
        <p>
            こんにちは！ヤチヨの部屋・絵茶へようこそ。<br>
            みんなが楽しく絵を描き、おしゃべりできるよう、いくつか簡単な約束を守ってくださいね。<br>
            以下の規約をよく読んで、楽しい時間を過ごしてください！(*´∀`*)
        </p>

        <div class="rules-section-title">1. マナーある会話</div>
        <ul>
            <li>他の利用者に不快感を与える言動は控えてください。</li>
            <li>誹謗中傷・暴言・差別的な発言などは厳禁です。</li>
            <li>個人情報（実名・連絡先など）の公開や要求はしないでください。</li>
        </ul>

        <div class="rules-section-title">2. 絵に関する規約</div>
        <ul>
            <li>公序良俗に反する絵は描かないでください。</li>
            <li>他人の著作権を侵害する絵は控えてください。</li>
            <li>過度に暴力的・性的な絵は禁止です。</li>
        </ul>

        <div class="rules-section-title">3. 運営者の権限</div>
        <ul>
            <li>規約違反者には警告なく退室・利用制限を行う場合があります。</li>
            <li>運営者は必要に応じて規約を変更でき、変更時はお知らせします。</li>
            <li>みんなに楽しい空間を提供するための措置ですのでご了承ください。</li>
        </ul>

        <p class="important-note">
            利用規約を守ることは、みんなの楽しみのための約束です。<br>
            いつも楽しく平和な絵茶を一緒に作っていきましょう！☆⌒(*＾-゜)v
        </p>
        <p style="margin-top:20px;"><RouterLink to="/etcha" data-link>← 絵茶に戻る</RouterLink></p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.rules-container { background-color: #f0f8ff; border: 2px outset #add8e6; padding: 20px; margin: 0 auto; width: 70%; text-align: left; line-height: 1.6; font-size: 14px; color: #333; }
.rules-title { font-size: 22px; font-weight: bold; color: #4682b4; margin-bottom: 20px; text-align: center; border-bottom: 2px dashed #add8e6; padding-bottom: 10px; }
.rules-section-title { font-size: 16px; font-weight: bold; color: #005a9c; margin-top: 15px; margin-bottom: 8px; border-bottom: 1px dotted #add8e6; padding-bottom: 3px; }
.rules-container ul { list-style-type: disc; margin-left: 20px; padding-left: 0; }
.rules-container li { margin-bottom: 5px; }
.important-note { color: #cc0000; font-weight: bold; text-align: center; margin-top: 25px; padding: 10px; border: 1px dashed #cc0000; background-color: #fffafa; }
</style>


