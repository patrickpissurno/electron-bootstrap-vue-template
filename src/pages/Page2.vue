<template>
    <div>
        <navbar active="page2"></navbar>
        <div class="page d-flex flex-column justify-content-center align-items-center">
            <h1>Page 2</h1>
            <p class="mb-0">Async response from Electron: {{ text }}</p>
        </div>
    </div>
</template>

<script>
    const { ipcRenderer } = require('electron');

    let listener;

    function sendEvent(type, data){
        ipcRenderer.send('asynchronous-message', JSON.stringify({
            type: type,
            data: data
        }));
    }

    export default {
        name: "Page2",
        data() {
            return {
                text: ''
            };
        },
        mounted(){
            ipcRenderer.on('asynchronous-reply', this.onReply);
            sendEvent("ping", { hey: 'dude' });
        },
        beforeDestroy(){
            ipcRenderer.removeListener('asynchronous-reply', this.onReply);
        },
        methods: {
            onReply(event, arg){
                let e = JSON.parse(arg);

                switch(e.type){
                    case 'ping':
                        this.text = e.data;
                        break;
                }
            }
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