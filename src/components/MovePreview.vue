<template>
    <div class="move-preview">
        <p><span>To:</span> {{ move.contact.name }}</p>
        <p><span>Amount:</span> {{ move.amount }} BTC</p>
        <p><span>Date:</span> {{ date }}</p>
    </div>
</template>

<script>
export default {
    props: {
        move: {
            type: Object,
        },
    },
    computed: {
        date() {
            const dateObj = new Date(this.move.date)
            return dateObj.toLocaleString('he-IL')
        }
    }

}
</script>
