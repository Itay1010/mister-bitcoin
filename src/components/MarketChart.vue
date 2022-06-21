<template>
    <div class="market-chart-container center">
        <h2>{{name}}</h2>
        <Bar :chart-data="chartData" :chart-options="chartOptions" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

export default {
    created() {
        this.name = this.chartName
    },
    name: '',
    components: { Bar },
    props: {
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            default: () => { }
        },
        chartName: {
            type: String,
            default: 'BarChart',
        }
    },

}
</script>


<style >
.market-chart-container {
    width: 500px;

}
</style>