<template>
    <Transition name="slide">
        <div v-if="msg.txt" :class="msgClass" class="user-msg"
            @mouseover="showBtn = true" 
            @mouseleave="showBtn = false">
                <Transition name="fade">
                    <button @click="closeMsg" v-if="showBtn">x</button>
                </Transition>
                <p>{{msg.txt}}</p>
        </div>
    </Transition>
</template>

<script>
    import { eventBus } from '@/services/eventBus.service.ts'
    export default {
        data(){
            return {
                msg: { txt: '' },
                showBtn: false,
            }
        },
        methods:{
            showMsg(msg){
                this.msg = msg
                this.timeout = setTimeout(() => this.msg.txt = '', this.msg.timeout)
            },
            closeMsg(){
                clearTimeout(this.timeout)
                this.msg.txt = ''
            }
        },
        computed:{
            msgClass(){
                return { [this.msg.type]: true, center: true }
            }
        },
        created(){
            this.unsub = eventBus.on('user-msg', (msg) => this.showMsg(msg) )
        },
        unmounted(){
            this.unsub()
        }
    }
</script>

<style lang="scss">
.user-msg{
    position: absolute;
    inset: 88px 40px auto auto;

    min-width: 200px;
    height: 40px;
    background-color: lightslategray;
    color: beige;
    border-radius: 10px;
    padding: 10px;

    button{
        position: absolute;
        top: -4px;
        left: -4px;

        border: 1px solid darkgray;
        border-radius: 50%;
        background-color: lightgray;
    }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(150%);
}

.fade-enter-active{
    transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.success{
    background-color: rgb(79, 122, 79);
}
.fail{
    background-color: rgb(177, 94, 94);
}
</style>