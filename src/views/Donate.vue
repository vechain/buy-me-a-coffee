<template>
    <div class="columns g-font">
        <div class="column col-12 message">
            <p class="text-light" :title="message">{{message}}</p>
        </div>
        <div class="column col-12 coffee-options">
            <div class="columns">
                <div class="column col-4">
                    <div class="coffee-box" :class="{selected: selected == 0}" @click="selected=0">
                        <div class="coffee">
                            <img src="../assets/1.svg" alt="buy 1 coffee">
                            <p class="text-light">{{amount}} {{unit}}</p>
                        </div>
                    </div>
                </div>
                <div class="column col-4">
                    <div class="coffee-box" :class="{selected: selected == 1}" @click="selected=1">
                        <div class="coffee">
                            <img src="../assets/2.svg" alt="buy 1 coffee">
                            <p class="text-light">{{amount*2}} {{unit}}</p>
                        </div>
                    </div>
                </div>
                <div class="column col-4">
                    <div class="coffee-box" :class="{selected: selected == 2}" @click="selected=2">
                        <div class="coffee">
                            <img src="../assets/3.svg" alt="buy 1 coffee">
                            <p class="text-light">{{amount*3}} {{unit}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column col-12 button">
            <div class="btn-support text-dark" @click="supportMe">Support</div>
            <div class="text-center text-light">interested to bmac?
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
// tslint:disable:max-line-length
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ensure, isAddress } from '../utils'
import BigNumber from 'bignumber.js'

@Component

export default class Donate extends Vue {
    address = ''
    message = ''
    name = ''
    unit = ''
    amount = 0
    selected = 0
    supportEnabled = false

    created() {
        try {
            ensure((typeof this.$route.query.name === 'string') && this.$route.query.name.length > 0, 'validate  name faled')
            ensure((typeof this.$route.query.addr === 'string') && isAddress(this.$route.query.addr), 'validate address failed')
            ensure((typeof this.$route.query.msg === 'string') && this.$route.query.msg.length > 1, 'validate message failed')
            ensure((typeof this.$route.query.unit === 'string') && this.$route.query.unit.length > 0, 'validate unit failed')
            ensure((typeof this.$route.query.amount === 'string') && this.$route.query.amount.length > 0, 'validate amount failed')
            this.address = this.$route.query.addr as string
            this.message = this.$route.query.msg as string
            this.unit = 'VET' // this.$route.query.unit as string
            this.name = this.$route.query.name as string
            const amount = parseInt(this.$route.query.amount as string, 10)
            ensure(!isNaN(amount), 'amount should be an valid number')
            this.amount = parseInt(this.$route.query.amount as string, 10)
            this.supportEnabled = true
        } catch (e) {
            console.error('init failed', e)
        }
    }

    supportMe() {
        if (!window.connex) {
            location.href = 'https://env.vechain.org/r/#' + encodeURIComponent(location.href)
        }
        if (!this.supportEnabled) {
            return
        }
        const signingService = connex.vendor.sign('tx')

        signingService.comment(`Donate ${this.amount * (this.selected + 1)} ${this.unit} to ${this.name}`)
        signingService.request([{
            to: this.address,
            value: '0x' + new BigNumber(this.amount * (this.selected + 1)).multipliedBy(1e18).dp(0).toString(16),
            data: '0x',
        }]).then((ret) => {
            this.$router.push({name: 'thanks'})
        }).catch((e) => {
            console.error(e)
        })
    }

}
</script>
