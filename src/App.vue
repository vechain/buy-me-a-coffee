<template>
    <div id="app" class="container">
        <div class="columns">
            <div class="column col-10 col-mx-auto col-md-11 col-xl-8">
                <div class="columns">
                    <div class="column col-4 col-md-12 g-font">
                        <cup :name="name"/>
                    </div>
                    <div class="column col-8 col-md-12" :class="{main: $route.name === 'Donate'}">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
@Component
export default class App extends Vue {
    public name: string = ''
    created() {
        this.updateName(this.$route.name)
    }

    updateName(name: string | undefined) {
        switch (name) {
            case 'Generate':
                this.name = ''
                break
            case 'Donate':
                this.name = this.$route.query.name as string || 'Author'
                break
            case 'Thanks':
                this.name = 'A byte a head'
                break
            default:
                break
        }
    }

    @Watch('$route')
    routed(to: Route, from: Route) {
        this.updateName(to.name)
    }
}
</script>


<style>
#app {
    margin-top: 10%;
    max-width: 1100px;
}

.g-font {
    font-family: "Gloria Hallelujah";
}

.cup {
    background: url("./assets/coffee.svg");
    height: 403px;
    width: 170px;
    margin: auto;
    font-size: 0.75rem;
}

.cup .to {
    position: relative;
    top: 225px;
    left: 20px;
    margin-bottom: 0;
}

.cup .name {
    position: relative;
    top: 240px;
    left: 20px;
    width: 128px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.main {
    margin-top: 8%;
}

.message p {
    font-size: 1.5rem;
    margin: 1rem auto 1.5rem auto;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.coffee-box {
    display: flex;
    cursor: pointer;
    border: 1px solid #fff5e3;
    border-radius: 10px;
    max-width: 130px;
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

.coffee-box.selected {
    background-color: #8a6f46;
    border: none;
}

.button {
    margin-top: 1 rem;
}

.btn-support {
    margin-top: 1rem;
    cursor: pointer;
    background: #fff5e3;
    color: #8a6f46;
    border: none;
    text-align: center;
    text-decoration: none;
    width: 180px;
    height: 40px;
    border-radius: 20px;
    font-size: 1.25rem;
    margin: 2rem auto 2rem auto;
}

@media (max-width: 840px) {
    .donate {
        margin-top: 10%;
    }
    .cup {
        background: url("./assets/coffee-mini.svg");
        height: 218px;
        width: 166px;
        margin: auto;
    }
    .cup .to {
        top: 65px;
        left: 15px;
    }

    .cup .name {
        top: 70px;
        left: 15px;
        width: 128px;
    }
    .main {
        margin-top: 0%;
    }
    .message {
        max-width: 600px !important;
        margin: auto;
    }
    .coffee-options .columns {
        max-width: 540px;
        margin: auto;
    }
    .coffee-box {
        margin: auto;
        width: 105px;
        height: 105px;
    }
    .coffee-box img {
        height: 50px;
    }
    .message p {
        text-align: center;
        font-size: 1rem;
    }
    .btn-support {
        font-size: 1rem;
        line-height: 40px;
    }
}
</style>

