<template>
    <div>

    </div>
</template>

<script>
// https://www.reddit.com/r/programmingquestions/comments/10rrqez/listing_file_names_from_a_folder_in_vue/
// const files = require.context('@/stories', false, /.json$/)
import * as stories from "@/stories/";
console.log(stories)
//const fileNames = files.keys().map(key => key.slice(2))


    export default {
        name:"StorySelect"
    }
</script>

<style scoped>

</style>