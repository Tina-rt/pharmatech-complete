<template>
    <div class="mini-article">
        <div class="img-container">
            <img :src="props.image" alt="" />
        </div>
        <div class="flex flex-col gap-1 justify-between">
            <div class="flex gap-2 w-full justify-evenly">
                <div class="author">{{ props.author }}</div>
                <div class="date flex items-center gap-1">
                    <Icon name="material-symbols:calendar-month-outline" />
                    <span>{{ props.date }}</span>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <h1 class="title">{{ props.title }}</h1>
                <p>{{ props.description }}</p>
                <div class="actions">
                    <div class="btn btn-primary btn-little h-5">Lire plus</div>
                </div>
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

<style lang="scss" scoped>
.mini-article {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    max-height: 200px;
    background-color: #f2f8ff;

    .actions {
        display: flex;
        // justify-content: flex-end;

        .btn {
            @media screen and (max-width: 786px) {
                width: 100%;
            }
        }
    }

    .img-container {
        min-width: 40%;
        max-height: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        overflow: hidden;
        display: flex;
        align-items: center;
        border-radius: 14px 0px 0px 14px;
        img {
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            border-radius: 14px 0px 0px 14px;
            object-fit: cover;
        }

        @media screen and (max-width: 786px) {
            display: none;
        }
    }

    h1.title {
        font-size: 20px;
        font-weight: 500;
        line-height: 27.28px;
        text-align: left;
    }

    .author {
        color: var(--vert-principal);
        text-align: center;
    }
    p {
        // font-family: Poppins;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
    }
}
</style>
