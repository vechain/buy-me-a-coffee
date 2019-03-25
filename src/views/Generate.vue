<template>
    <div class="generate">
        <div class="toast-tip toast toast-success" v-if="show">Copied to clipboard</div>
        <div class="form-group column col-12">
            <label class="form-label" for="name">Your name</label>
            <input
                ref="name"
                class="form-input"
                v-model="name"
                required
                autocomplete="off"
                type="text"
                id="name"
                maxlength="30"
                placeholder="..."
                @change="check('name')"
            >
        </div>
        <div class="form-group column col-12">
            <label class="form-label" for="address">Donation address</label>
            <input
                ref="address"
                class="form-input"
                v-model="address"
                required
                autocomplete="off"
                type="text"
                id="address"
                pattern="^0x[a-fA-F0-9]{40}$"
                placeholder="..."
                @change="check('address')"
            >
        </div>
        <div class="form-group column col-12">
            <label class="form-label" for="Amount">Amount(VET/Cup)</label>
            <input
                class="form-input"
                required
                ref="amount"
                v-model="amount"
                autocomplete="off"
                type="text"
                id="Amount"
                pattern="^-?[0-9]+$"
                placeholder="..."
                @change="check('amount')"
            >
        </div>
        <div class="form-group column col-12">
            <label class="form-label" for="message">Message to supporter</label>
            <textarea
                class="form-input"
                ref="message"
                placeholder="..."
                required
                v-model="message"
                maxlength="100"
                autocomplete="off"
                id="message"
                @change="check('message')"
                rows="5"
            ></textarea>
            <div class="text-light text-right" style="font-size: 0.6rem">{{message.length}}/100</div>
        </div>
        <div class="form-group column col-12 g-font">
            <div
                class="btn-support text-dark"
                style="font-size: 0.7rem; line-height: 2rem; width: 250px"
                @click="createUrl"
            >Generate & Copy</div>
        </div>
        <div v-show="showUrl" class="form-group column col-12">
            <label class="form-label" for="generatedUrl">Url</label>
            <a :href="generatedUrl" class="text-light" style="float: right; margin-top: -30px; text-decoration: underline;" target="_blank">Preview</a>
            <textarea
                v-model="generatedUrl"
                ref="url"
                autocomplete="off"
                id="generatedUrl"
                rows="5"
                readonly
            ></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Generate extends Vue {
    show = false
    showUrl = false
    generatedUrl = ''
    name = ''
    address = ''
    amount = ''
    message = ''

    created() {
        this.$ga.page('/bmac/generate')
    }

    check(ref: string) {
        const ele = this.$refs[ref] as HTMLInputElement
        if (!ele.checkValidity()) {
            ele.parentElement!.classList.add('error')
        } else {
            ele.parentElement!.classList.remove('error')
        }
    }

    validate() {
        const keys = Object.keys(this.$refs)
        const elems = keys.map((item) => {
            return this.$refs[item] as any
        })
        elems.forEach((item: HTMLInputElement) => {
            if (!item.checkValidity()) {
                item.parentElement!.classList.add('error')
            } else {
                item.parentElement!.classList.remove('error')
            }
        })
        return !elems.some((item) => {
            return item.validity.valid === false
        })
    }
    async createUrl() {
        if (!this.validate()) {
            return
        }
        const query = `name=${this.name}&addr=${this.address}&amount=${this.amount}&msg=${this.message}`
        this.generatedUrl = encodeURI(window.location.origin + `/donate?${query}`)
        this.showUrl = true
        await this.$nextTick()
        const urlEle = this.$refs.url as HTMLInputElement
        urlEle.select()
        document.execCommand('copy')
        this.show = true
        setTimeout(() => {
            this.show = false
        }, 3000)
    }
}
</script>
<style>
.generate {
    margin-left: 50px;
}
.generate label {
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
.generate textarea:focus,
.generate textarea {
    font-size: 0.7rem;
    width: 100%;
    border: 1px solid #949494;
}
.toast-tip {
    width: 300px !important;
    position: fixed;
    top: 50px;
}
.form-group.error .form-input:not(:placeholder-shown):invalid:focus,
.form-input:not(:placeholder-shown):invalid:focus {
    background-color: transparent !important;
}

.form-group.error .form-input {
    background-color: coral;
}
.form-input:not(:placeholder-shown):invalid {
    background-color: coral !important;
}
.form-input:not(:placeholder-shown):valid {
    background-color: transparent !important;
}
</style>
