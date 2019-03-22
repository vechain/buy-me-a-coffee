<template>
  <div class="columns g-font" style="margin-top: 30%">
    <div class="column col-12">
      <h2 class="text-light text-center" style="font-size: 2.3rem">Thanks for supporting</h2>
    </div>
    <div class="column col-12 button">
      <div
        class="btn-support text-center text-dark"
        style="font-size: 0.7rem; line-height: 2rem"
        @click="supportMore"
      >Buy me more</div>
      <div class="text-center text-light">
        interested to bmac?
        <router-link
          class="text-light"
          style="text-decoration: underline;"
          :to="{name: 'Generate'}"
        >create one</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  beforeRouteEnter(to: Route, from: Route, next: (v: any) => void) {
      next((vm: Thanks) => {
          if (from.name === 'Donate') {
              vm.query = from.query
          }
      })
  },
})
export default class Thanks extends Vue {
  query?: any = {}
  created() {
    this.$ga.page('/bmac/thanks')
  }
  supportMore() {
    this.$router.push({ name: 'Donate', query: this.query })
  }
}
</script>

