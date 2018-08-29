<template>
    <div>
        <navbar active="home"></navbar>
        <div class="page d-flex flex-column justify-content-center align-items-center">
            <h1>Electron Bootstrap-vue Template</h1>
            <p class="mb-0">Yes, it works! Now you can start developing your next project with ease</p>
        </div>
    </div>
</template>

<script>
    const { remote } = require('electron');
    const controller = remote.require('./main.js');

    export default {
        name: "Home",
        data() {
            return {

            };
        }
    };
</script>

<style scoped>
    .page {
        min-height: calc(100vh - 98px);
        margin-top: 98px;
    }
    h1 {
        font-weight: 300;
        font-size: 2.4rem;
        user-select: none;
        cursor: default;
    }
</style>