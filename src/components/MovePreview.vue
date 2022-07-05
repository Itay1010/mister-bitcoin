<template>
    <div class="move-preview">
        <h4><span>To:</span> {{ move.contact.name }}</h4>
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
            return dateObj.toLocaleString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })
        }
    }

}
</script>
