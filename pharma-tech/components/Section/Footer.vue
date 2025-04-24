<template>
    <div class="w-full footer-main mt-9">
        <div
            class="grid grid-cols-1 items-center lg:items-start xl:items-start md:items-start md:flex lg:flex xl:flex gap-2 w-full md:justify-between lg:justify-between xl:justify-between px-4"
        >
            <div class="footer-col ">
                <h1>Contact</h1>
                <div class="adresse">
                    <Icon name="material-symbols:location-on" />{{
                        contacts.adresse
                    }}
                </div>
                <div class="phone">
                    <Icon name="bx:bxs-phone-call" />{{ contacts.phone }}
                </div>
                <div class="email">
                    <Icon name="bx:bxs-envelope" />{{ contacts.email }}
                </div>
            </div>
            <div class="footer-col">
                <h1>Lien Rapides</h1>
                <div class="lg:flex-col md:flex-col xl:flex-col flex flex-wrap">
                    <a class="" href="#">Accueil</a>
                    <a class="" href="#">A propos</a>
                    <a class="" href="#">Services</a>
                    <a class="" href="#">Produits</a>
                    <a class="" href="#">Contact</a>
                </div>
            </div>
            <div class="footer-col">
                <h1>Catégories</h1>
                <div class="lg:flex-col md:flex-col xl:flex-col flex flex-wrap">
                    <a
                        class=""
                        :href="categorie.link"
                        v-for="categorie in categories"
                        >{{ categorie.title }}</a
                    >
                </div>
            </div>
            <div class="footer-col">
                <h1>Services</h1>
                <div class="lg:flex-col md:flex-col xl:flex-col flex flex-wrap">
                    <a class="" v-for="service in services">{{ service }}</a>
                </div>
            </div>
            <div class="footer-col">
                <h1>Social Media</h1>
                <div class="flex gap-2">
                    <div class="flex flex-wrap">
                        <a
                            class="social-link"
                            :href="social.link"
                            v-for="social in socials"
                        >
                            <Icon :name="social.icon" size="20" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const contacts = {
    adresse: "Antsirabe, Madagascar ",
    phone: "+261 34 26 393 25",
    email: "flamingogirlsforchange@gmail.com",
};

const categories = [
    {
        title: "Soins",
        link: "#",
    },
    {
        title: "Bébé et enfants",
        link: "#",
    },
    {
        title: "Aliments",
        link: "#",
    },
    {
        title: "Matériels Médicals",
        link: "#",
    },
    {
        title: "Médicaments",
        link: "#",
    },
];

const services = [
    "Livraison",
    "Conseils",
    "Préscription",
    "Médical",
    "Urgence",
];

const socials = [
    {
        icon: "ri:facebook-fill",
        link: "facebook.com",
    },
    {
        icon: "ri:linkedin-fill",
        link: "linkedin.com",
    },
    {
        icon: "ri:instagram-line",
        link: "instagram.com",
    },
    {
        icon: "ri:youtube-line",
        link: "youtube.com",
    },
];
</script>

<style lang="scss" scoped>
.footer-main {
    background-color: var(--vert-fonce);
    color: white;
    padding: 2rem;

    .footer-col {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;

        * {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        h1 {
            font-size: 20px;
        }
    }
    .social-link {
        border: 2px solid white;
        border-radius: 50%;
        padding: 0.4rem;
        font-weight: 600;
    }
}
</style>
