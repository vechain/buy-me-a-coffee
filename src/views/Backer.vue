<template>
  <div class="backer container">
        <div class="columns">
            <div class="column col-10 col-mx-auto">
                <div class="columns">
                    <div class="column col-4">
                        <div class="cup">
                            <p class="to">TO:</p>
                            <p class="name">{{name}}</p>
                        </div>
                    </div>
                    <div class="column col-8">
                        <div class="columns">
                            <div class="column col-12">
                                <p class="text-light">"If you think my article are awosome, support my work!"</p>
                            </div>
                            <div class="column col-12 coffee-options">
                                <div class="columns">
                                    <div class="column col-3">
                                        <div class="coffee-box" :class="{selected: selected == 0}" @click="selected=0">
                                            <div class="coffee">
                                                <img src="../assets/1.svg" alt="buy 1 coffee">
                                                <p class="text-light">{{amount}} VET</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column col-3">
                                        <div class="coffee-box" :class="{selected: selected == 1}" @click="selected=1">
                                            <div class="coffee">
                                                <img src="../assets/2.svg" alt="buy 1 coffee">
                                                <p class="text-light">{{amount*2}} VET</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column col-3">
                                        <div class="coffee-box" :class="{selected: selected == 2}" @click="selected=2">
                                            <div class="coffee">
                                                <img src="../assets/3.svg" alt="buy 1 coffee">
                                                <p class="text-light">{{amount*3}} VET</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column col-12">
                                <div class="btn-support" @click="supportMe">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component

export default class Backer extends Vue {

    name = ''
    address = ''
    message = ''
    unit = ''
    amount = 0
    selected = 0

    created() {
        this.name = this.$route.query.name as string
        this.address = this.$route.query.addr as string
        this.message = this.$route.query.msg as string
        this.unit = this.$route.query.unit as string
        this.amount = parseInt(this.$route.query.amount as string, 10)
    }

    supportMe() {
        if (!window.connex) {
            location.href = 'https://env.vechain.org/r/#' + encodeURIComponent(location.href)
        }
        const signingService = connex.vendor.sign('tx')

        signingService.comment(`Donate ${this.amount * (this.selected+1)} ${this.unit} to ${this.address}`)
        signingService.request([{
            to: this.address,
            value: this.amount * (this.selected+1),
            data: '0x',
        }]).then(ret => {
            console.log(ret)
        }).catch(e => {
            console.error(e)
        })

    }

}
</script>
<style>
.backer{
    margin-top: 10%;
}

.cup {
    background: url("../assets/coffee.svg");
    height: 475px;
    width: 200px;
    margin: auto;
}

.cup .to{
    position: relative;
    top: 300px;
    left: 30px;
}

.cup .name{
    position: relative;
    top: 280px;
    left: 30px;
    width: 138px;
    text-align: center;
    overflow: hidden;
}

.coffee-box {
    display: flex;
    border: 1px solid #FFF5E3;
    border-radius: 10px;
    width: 130px;
    height: 130px;
    justify-content: center;
    align-items: center;
}

.coffee {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 80px;
    height: 80px;
}

.coffee p {
    margin: 2px 0 0 0;
    text-align: center;
}

.coffee-box.selected{
    background-color: #8A6F46;  
    border : none
}

.btn-support {
    cursor: pointer;
    background: #FFF5E3;
    color: #8A6F46; 
    border: none;
    text-align: center;
    text-decoration: none;
    width: 180px;
    height: 40px;
    border-radius: 17px;
    font-size: 1.25rem;
}
</style>
