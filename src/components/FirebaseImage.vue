<template>
    <img :src="img_url" width="100" />
</template>

<script>
export default {
    name: "FirebaseImage",
    props: ['story', 'message_id'],
    data() {
        return {
            img_url: null
        }
    },
    async created() {
        try {
            let src = await this.$store.dispatch('firestore/getImage', {story: this.story, message_id: this.message_id})
            //console.log(src)
            this.img_url = src
        } catch (e) {
            console.log("image not found")
        }


    }
}
</script>

<style scoped></style>