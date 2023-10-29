<template>
    <div v-if="story!= null">
    <textarea class="form-control" ref="input" v-model="input" rows="6" :placeholder="$t('communiquer')"
        v-on:keyup.enter="onNewUserMessage" id="floatingTextarea" />
        <label for="floatingTextarea">Comments</label>
        <br>
    <div style="text-align:center">
        <button variant="success" @click="onNewUserMessage" class="btn">{{ $t('envoyer') }}</button>
        <button v-if="story.messages.length > 0" variant="success" ref="continue" @click="continuer"
            class="btn">Continue</button>
    </div>
</div>
</template>

<script>
export default {
    name: "ChatInput",
    data() {
        return {
            input: ""
        }
    },
    created() {
        //this.init()
    },
    methods: {
        init() {
            this.input = this.$store.state.core.story.options.mission[1].first_message[this.$i18n.locale]
            console.log(this.input)
        },
        onNewUserMessage() {
            if (this.input.trim().length > 0) {
    
                this.$store.dispatch('core/newUserMessage', this.input)
                this.input = "";
               // this.$store.dispatch('core/getCompletion', this.story)
            }
        },
        continuer() {
            this.input = "continue"
            this.onNewUserMessage()
        },
    },
    watch: {
        story() {
            console.log(this.story)
            if (this.story.messages.length == 0) {
                this.init()
            }
        },
    },
    computed: {
        story() {
            return this.$store.state.core.story
        }
    }
}
</script>

<style scoped></style>