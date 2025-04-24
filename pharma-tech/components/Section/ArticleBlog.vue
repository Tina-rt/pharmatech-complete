<template>
    <div class="w-full main-article-blog">
        <h1>Nos Articles et Blog</h1>
        <div class="articles">
            <CardBigArticle
                :title="bigArticle.title"
                :description="bigArticle.description"
                :image="bigArticle.image"
                :date="bigArticle.date"
                :link="bigArticle.link"
                :author="bigArticle.author"
                class="big-article"
            />
            <CardMiniArticle
                v-for="miniarticle in miniArticles"
                :title="miniarticle.title"
                :description="miniarticle.description"
                :image="miniarticle.image"
                :date="miniarticle.date"
                :link="miniarticle.link"
                :author="miniarticle.author"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
const bigArticle = ref({
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc. Nulla nec purus feugiat, molestie ipsum et, eleifend nunc.",
    image: "https://img.20mn.fr/B3Cd1NaVSLmfCC-QJUld_A/1444x920_illustration-plaquettes-medicaments",
    date: "12/12/2021",
    link: "#",
    author: "Doctor John Doe",
});

const miniArticles = ref([
    {
        title: "Discover a treasure trove of practical tips for enhancing",
        description:
            "From nutrition advice to exercise routines, we're here to support your journey toward a healthier",
        image: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "12/12/2021",
        author: "Doctor John Doe",
        link: "#",
    },
    {
        title: "Our patients' journeys are filled with courage, resilience, and triumph.",
        description:
            "In this section, we share inspiring narratives of individuals who have overcome health challenges.",
        image: "https://img.20mn.fr/B3Cd1NaVSLmfCC-QJUld_A/1444x920_illustration-plaquettes-medicaments",
        date: "12/12/2021",
        link: "#",
        author: "Doctor John Doe",
    },
    {
        title: "From organizing health fairs to partnering with local organizations",
        description:
            "Find out how you can participate in community events and contribute to the health.",
        image: "https://img.20mn.fr/B3Cd1NaVSLmfCC-QJUld_A/1444x920_illustration-plaquettes-medicaments",
        date: "12/12/2021",
        link: "#",
        author: "Doctor John Doe",
    },
]);
</script>

<style lang="scss" setup>
h1 {
        font-size: 40px;
        font-weight: 700;
        line-height: 54.56px;
        text-align: left;
    }
.articles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px;
    gap: 1rem;
    justify-items: end;
    padding: 2rem 0rem;

    

    .big-article {
        grid-row: span 3;
		margin-right: 1rem;
    }

    @media screen and (max-width: 786px) {
        grid-template-columns: 1fr;
        padding: 1rem 0rem;
    }
}
</style>
