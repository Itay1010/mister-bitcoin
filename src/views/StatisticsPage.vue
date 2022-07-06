<template>
    <AppHeader />
    <div class="chart-container full">
        <MarketChart :chartData="priceChartConfig.chartData" :chart-options="priceChartConfig.chartOptions"
            :chartName="'Average price this year'" />
        <MarketChart :chartData="tradeChartConfig.chartData" :chart-options="tradeChartConfig.chartOptions"
            :chartName="'Confirmed transactions this year'" />
    </div>
</template>

<script>
import MarketChart from '@/components/MarketChart.vue'
import { bitcoinService } from '@/services/bitcoin.service'
import AppHeader from '@/components/AppHeader.vue'
export default {
    async created() {
        this.initPriceChart()
        this.initTradeChart()
    },
    data() {
        return {
            priceChartConfig: {
                chartData: {
                    datasets: [
                        {
                            label: 'BTC in USD',
                            backgroundColor: '#f87979',
                            data: [],
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    CoreScaleOptions: {
                        display: false
                    },
                    autoSkip: true,
                    scales: {
                        x: {
                            labels: []
                        }
                    }

                },
            },

            tradeChartConfig: {
                chartData: {
                    datasets: [
                        {
                            label: 'BTC in USD',
                            backgroundColor: '#f8d279',
                            data: [],
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    CoreScaleOptions: {
                        display: false
                    },
                    autoSkip: true,
                    scales: {
                        x: {
                            labels: []
                        }
                    }
                },
            }
        }
    },
    methods: {
        async initPriceChart() {
            const prices = await this.getPrices()
            this.priceChartConfig.chartData.datasets[0].data = prices
            this.priceChartConfig.chartOptions.scales.x.labels = this.monthsForLabels
        },
        async getPrices() {
            const { values } = await bitcoinService.getMarketPrice()
            const filtered = values.filter((value, idx) => idx % 12 === 0)
            return filtered
        },

        async initTradeChart() {
            const transactions = await this.getTransactions()
            this.tradeChartConfig.chartData.datasets[0].data = transactions
            this.tradeChartConfig.chartOptions.scales.x.labels = this.monthsForLabels
        },
        async getTransactions() {
            const { values } = await bitcoinService.getConfirmedTransactions()
            const filtered = values.filter((value, idx) => idx % 12 === 0)
            return filtered
        },
    },
    computed: {
        monthsForLabels() {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
            const currDate = new Date()
            const pastYear = new Date(Date.now() - (1000 * 60 * 60 * 24 * 365))
            const startMonths = monthNames.slice(currDate.getMonth())
            const rest = monthNames.slice(0, (currDate.getMonth() + 1 > 11 ? 0 : currDate.getMonth() + 1))
            const ordered = [...startMonths, ...rest]
            return ordered
        }
    },
    components: {
        MarketChart,
        AppHeader
    }
}
</script>