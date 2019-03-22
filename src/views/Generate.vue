<template>
    <div class="generate">
        <div class="form-group column col-12">
            <label class="form-label" for="name">Your name</label>
            <input class="form-input" autocomplete="off" type="text" id="name" placeholder="...">
        </div>
        <div class="form-group column col-12">
          <label class="form-label" for="address">Donation address</label>
            <input class="form-input" autocomplete="off" type="text" id="address" placeholder="...">
        </div>
        <div class="form-group column col-12">
          <label class="form-label" for="Amount">Amount(VET/Cup)</label>
            <input class="form-input" autocomplete="off" type="text" id="Amount" placeholder="...">
        </div>
        <div class="form-group column col-12">
          <label class="form-label" for="message">Message to supporter</label>
            <textarea class="g-font" maxlength="100" autocomplete="off" id="message" rows="5"></textarea>
        </div>
        <div class="form-group column col-12 g-font">
            <div class="btn-support text-dark" style="font-size: 0.7rem; line-height: 2rem; width: 250px" @click="createUrl">Generate/copied to clipboard</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Generate extends Vue {
  createUrl() {
    alert(1)
  }
}
</script>
<style>
.generate {
  margin-left: 50px;
}
.generate label{
  color: #fff;
  font-size: 0.8rem;
}
.generate input:focus,
.generate input,
.generate textarea {
  outline: none;
  border: none;
  box-shadow: none;
  color: #fff;
  background-color: transparent;
  border-bottom: 1px solid #949494;
  resize: none;
}
.generate textarea {
  font-size: 0.7rem;
  width: 100%;
  border: 1px solid #949494;
}
</style>
