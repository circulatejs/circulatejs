<template>
    <div class="menu">
        <div class="upper-menu">
            <div class="menu-button" @click="setMobileMenu"></div>
        </div>
        <div class="menu-link__wrap">
            <router-link v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.path">
                {{ menuItem.menu }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            menuItems: [],
            mobileMenuActive: false
        }
    },
    mounted() {
        this.$router.options.routes.forEach(route => {
            this.menuItems.push(route)
        })
    },
    methods: {
        setMobileMenu() {
            this.mobileMenuActive ? false : true
        }
    }
}
</script>

<style lang="postcss" scoped>
.menu {
    display: none;
    width: 300px;
    height: 100vh;
    padding: 70px 15px 15px;
    background: rgb(35, 97, 211);
    color: white;
}
.menu a {
    font-size: 1.2em;
    color: white;
}
.upper-menu {
    position: fixed;
    top: 0;
    left: 300px;
    height: 55px;
    width: 100%;
    background: white;
    border-bottom: 1px solid #ccc;
}
.menu-link__wrap {
    display: flex;
    flex-direction: column;
}
.menu-button {
    color:aqua;
    height: 30px;
    width: 30px;
}

@screen md {
    .menu {
        display: block;
    }
}
</style>
