<template>
    <div class="navbar-holder">
        <b-navbar type="dark" variant="primary" toggleable>
            <b-navbar-nav>
                <b-nav-item v-for="page in pages" :key="page.path" :href="'#' + page.path" :active="active.toLowerCase() == page.path.toLowerCase().substring(1, page.path.length)">{{ page.name }}</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>
<script>
    export default {
        props: [ 'active' ],
        data(){
            return {
                pages: []
            }
        },
        mounted(){
            this.pages = this.$router.options.routes.filter(x => x.navbar);
        }
    }
</script>
<style scoped>
    .navbar-holder {
        position: fixed;
        min-width: 100%;
        z-index: 100;
        top: 0;
    }
</style>

<style>
    .navbar, .navbar *{
        user-select: none;
    }
</style>
