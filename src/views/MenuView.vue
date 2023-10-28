<template>
    <div class="mobileShow">
    <BButton @click="toggleMenu">Menu</BButton>
    <BOffcanvas v-model="showMenu">
        <SideBar />
    </BOffcanvas>
</div>
</template>

<script>

import SideBar from '@/views/SideBar.vue';

export default {
    name: "MenuView",
    components: {
        SideBar
    },
    data() {
        return {
            showMenu: false
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu
        }
    }

}
</script>

<style scoped></style>