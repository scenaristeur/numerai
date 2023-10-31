<template>
    <div v-if="story != null">
        <textarea class="form-control" ref="input" v-model="input" rows="6" :placeholder="$t('communiquer')"
            v-on:keyup.enter="onNewUserMessage" id="floatingTextarea" />
        <label for="floatingTextarea">Comments</label>
        <br>
        <div style="text-align:center">
            <button variant="success" @click="onNewUserMessage" class="btn btn-success">{{ $t('envoyer') }}</button>
            <span v-if="story.messages.length > 0">
                <button variant="success" ref="continue" @click="continuer" class="btn btn-success">Continue</button>


                


                <button v-if="user != null" @click="publish" class="btn" :disabled="user==null">{{ $t('publish') }}</button>
              
            </span>
        </div>
        <UserView />
    </div>
</template>

<script>

import UserView from '@/views/UserView.vue';

export default {
    name: "ChatInput",
    components: {
    UserView,/* MainView, ChatInput, StoryView*/
  },
    data() {
        return {
            input: ""
        }
    },
    created() {
        //this.init()
    },
    methods: {
        publish() {
            let storyName = prompt("Please enter a name for your story", Date.now());
            // let story = {
            //     id: uuidv4(),
            //     name: storyName,
            //     date: Date.now(),
            //     likes: 0,
            //     adventure: this.aventure,
            //     messages: this.story.messageHistory
            // }
            this.$store.dispatch('core/publishStory', storyName)
        },
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
        },

        user() {
            return this.$store.state.firestore.user
        }

    }
}
</script>

<style scoped></style>