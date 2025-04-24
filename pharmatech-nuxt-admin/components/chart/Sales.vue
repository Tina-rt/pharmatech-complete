<template>
    <div class="card">
        <Chart
            type="line"
            :data="setChartData"
            :options="chartOptions"
            class="h-[30rem]"
        />
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { ref, onMounted } from 'vue';

const props = defineProps<{
    data: any;
}>();

onMounted(() => {
    // chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = computed(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: props.data ? props.data?.map((item: any) => moment(item.date).format('MMM D')) : [],
        datasets: [
            {
                label: 'Vente par jour en MGA',
                data: props.data ? props.data.map((item: any) => item.value) :[],
                fill: true,
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                tension: 0.4,
            },
        ],
    };
});
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color',
    );
    const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color',
    );

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
        },
    };
};
</script>
