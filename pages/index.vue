<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <p class="subtitle has-text-grey">
        Nuxt.jsで作るLINEアプリ[LIFF]
      </p>
      <ul>
        <li>
          <p class="subtitle">
            <nuxt-link to="/send_message">
              メッセージ送信
            </nuxt-link>
          </p>
        </li>
        <li>
          <p class="subtitle">
            <nuxt-link to="/show_profile">
              プロフィール表示
            </nuxt-link>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // LIFFの初期化
  mounted() {
    liff.init(function(data) {
      console.log(data)
    })
  }
}
</script>
