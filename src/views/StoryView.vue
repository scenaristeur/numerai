<template>
    <div>
        <h1>STORY VIEW</h1>

        status : {{ story.status }}
        <img v-for="image in story.images" :src="image.img" :key="image.id" width="256" />

        <div v-if="story.messages.length > 0" class="chatArea">
            <ul class="messages" ref="messages">
                <li v-for="m of  story.messages " :key="m.id">
                    <span v-if="m.isUser == true" class="username">{{ story.options.heros.prenom }}</span>
                    <span v-else class="username">NumerAi</span> :
                    <span :class="m.isUser == true ? 'usermessage' : 'iamessage'">{{ m.text }}</span>
                </li>
                <li v-if="story.status != undefined">
                    <small style="text-align: center" class="iamessage">

                        <div v-if="story.status.queue_position">J'intègre tes paroles {{ story.status.queue_position }}</div>
                        <div v-if="story.status.wait_time">Je réfléchis {{ story.status.wait_time }}</div>
                        <div v-if="story.status.waiting">Je sens que ça vient {{ story.status.waiting }}</div>
                    </small>
                </li>

            </ul>
        </div>
        <b-button @click="publish">{{ $t('publish') }}</b-button><br>
        <!-- {{ story }} -->
    </div>
</template>

<script>
export default {
    name: "StoryView",
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
    },
    computed: {
        story() {
            return this.$store.state.core.story
        },
     
    }
}
</script>

<style scoped>
/* Messages */

.chatArea {
    height: 500px;
    /*100%;*/
    /*padding-bottom: 60px;*/
    background-color: rgb(195, 236, 198);
}

.messages {
    height: 500px;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
    list-style-type: none;
    /* Remove bullets */
    padding: 20;
    /* Remove padding */
    margin: 20;
    /* Remove margins */

}

.usermessage {
    color: rgb(0, 17, 94);
    font-size: 20px;
    font-family: "Quartz-Regular";
    src: local("Quartz-Regular"), url(@/fonts/Quartz-Regular.otf) format("truetype");
}

.iamessage {
    /*font-family: "Quartz";*/
    /* src: local("Quartz"), url(@/fonts/Quartz.ttf) format("truetype"); */
    font-size: 20px;
    font-weight: bold;
    color: black;
    /* background-color: rgb(228, 230, 125, 0.5);*/
}

/* .message.typing .messageBody {
    color: rgba(5, 7, 148, 0.767);
} */

.username {
    font-weight: 500;
    overflow: hidden;
    padding-right: 5px;
    text-align: right;
}
</style>