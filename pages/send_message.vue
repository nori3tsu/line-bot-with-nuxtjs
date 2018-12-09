<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <p class="subtitle has-text-grey">
        LINEメッセージングAPI
      </p>
      <div>
        <textarea
          v-model="message"
          class="textarea"
          placeholder="トークルームに送信する内容"
        />
        <br>
        <button
          class="button is-info is-block is-large is-fullwidth"
          @click="send()"
        >
          送信
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    send() {
      if (this.message == '') return

      liff
        .sendMessages([
          {
            type: 'text',
            text: this.message
          }
        ])
        .then(function() {
          liff.closeWindow()
        })
        .catch(function(error) {
          liff.closeWindow()
        })
    }
  }
}
</script>
