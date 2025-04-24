<template>
    <div class="big-article">
        <div class="img-section">
            <img :src="props.image" alt="image" />
        </div>
        <div class="flex gap-2 w-full justify-evenly">
            <div class="author">{{ props.author }}</div>
            <div class="date flex items-center gap-1">
                <Icon name="material-symbols:calendar-month-outline" />
                <span>{{ props.date }}</span>
            </div>
        </div>
        <div class="px-4 flex flex-col gap-2">
            <div class="title">
                <h1>{{ props.title }}</h1>
            </div>
            <p>
                {{ props.description }}
            </p>
            <div class="action">
                <div class="btn btn-primary">Lire plus</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string;
    description: string;
    image: string;
    date: string;
    link: string;
    author: string;
}>();
</script>

<style scoped lang="scss">
.big-article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #f2f8ff;

    border-radius: 14px 14px 0px 0px;

    .img-section {
        border-radius: 14px 14px 0px 0px;
        max-width: 100%;
        img {
            border-radius: 14px 14px 0px 0px;
        }
    }

    h1 {
        font-size: 36px;
        font-weight: 500;
        line-height: 49.1px;
        text-align: left;
    }

    .author {
        color: var(--vert-principal);
        text-align: center;
    }
}
</style>
