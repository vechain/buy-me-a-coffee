<template>
    <div class="cup g-font">
        <p class="to" v-if="name">TO:</p>
        <p class="name" v-if="name">{{name}}</p>
        <p class="name" v-if="!name">Special for you <br/> supporter</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Cup extends Vue {
  @Prop(String)
  name!: string
}
</script>
