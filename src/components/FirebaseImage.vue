<template>
    <img :src="img_url" width="100" />
</template>

<script>
export default {
    name: "FirebaseImage",
    props: ['story'],
    data() {
        return {
            img_url: null
        }
    },
    async created() {
        let src = await this.$store.dispatch('firestore/getImage', this.story)
        //console.log(src)
        this.img_url = src
    }
}
</script>

<style scoped></style>