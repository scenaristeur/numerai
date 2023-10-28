<template>
    <div>
        Select a mission
        <b-form-select v-model="mission" @change="missionChanged">
            <option v-for="mission in missions" value="mission.id" :key="mission.id">{{ mission.name}} {{ mission.version }}</option>
       
            <!-- <option value="stable">Stable Diffusion</option> -->
        </b-form-select>

        <!-- {{ missions }} -->
        or load yours :
        <b-button onclick="document.getElementById('loadMission').click()">{{ $t('load') }} mission</b-button>
        <input id="loadMission" style="visibility:hidden;" type="file" @change="loadMission" />
    </div>
</template>

<script>
// https://www.reddit.com/r/programmingquestions/comments/10rrqez/listing_file_names_from_a_folder_in_vue/
// const files = require.context('@/stories', false, /.json$/)
import * as missions from "@/missions/";
console.log(missions)
//const fileNames = files.keys().map(key => key.slice(2))

export default {
    name: "MissionSelect",
    data() {
        return {
            missions: [],
            mission: "numerai"
        }
    },
    created() {
        this.missions = Object.values(missions)
    },
    methods: {
        missionChanged(){
            
        },
        loadMission(event) {
            var reader = new FileReader();
            reader.onload = this.onReaderLoad;
            console.log(event)
            reader.readAsText(event.target.files[0]);
        },
        onReaderLoad(event) {
            console.log(event)
            console.log(event.target.result);
            var loaded = JSON.parse(event.target.result);
            console.log(loaded)
            // verify mission
            if (loaded.id != undefined && loaded.name != undefined && loaded.version != undefined) {
                this.missions.push(loaded)
            } else {
                alert('impossible to load this mission, take a look to the doc at https://github.com/scenaristeur/numerai/wiki/Create-your-mission')
            }

            // this.memory = {}
            // loaded.forEach(h => {
            //     console.log(h)
            //     this.memory[h.id] = h
            // })


        },
    }
}
</script>

<style scoped></style>