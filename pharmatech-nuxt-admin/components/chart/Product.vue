<template>
    <div class="card">
        <Chart
            type="bar"
            :data="setChartData"
            :options="chartOptions"
            class="h-[30rem]"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import moment from 'moment';


const props = defineProps<{
    data: any;
}>();

onMounted(() => {
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = computed(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: props.data ? props.data?.map((item: any) => item.label) : [],
        datasets: [
            {
                label: 'Les produits les plus commandés',
                data: props.data ? props.data.map((item: any) => item.value) :[],
                fill: true,
                backgroundColor: documentStyle.getPropertyValue('--p-gray-600'),
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
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
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
                    font: {
                        weight: 500,
                    },
                    stepSize: 1,

                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                },
            },
        },
    };
};
</script>
