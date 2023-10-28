<template>
    <div>
        Selectionne une mission
        <b-form-select v-model="mission" @change="missionChanged">
            <option v-for="mission, id in Object.entries(missions)" :value="mission" :key="id">
                {{ mission[1].name[$i18n.locale] }}
            </option>

            <!-- <option value="stable">Stable Diffusion</option> -->
        </b-form-select>


  

        <div v-if="mission != null">

{{ mission[1].trailer[$i18n.locale] }}
<br>

            {{ $t('what_is_name') }} <input class="boxsizingBorder" ref="prenom" v-model="prenom"
                :placeholder="$t('firstname_placeholder')" /><br>
            {{ $t('are_you') }}<br>

            <b-form-radio name="sexe" style="display: inline-block" v-model="sexe" value="fille"> {{ $t('a_girl') }}
                {{ $t('or') }}</b-form-radio>
            <b-form-radio name="sexe" style="display: inline-block" v-model="sexe" value="garçon"> {{ $t('a_boy')
            }}</b-form-radio>

            <br>

            <b-button :disabled="prenom.length == 0" @click="createStory">Démarrer l'aventure</b-button>
        </div>
        <div v-else>
            ou charge la tienne :
            <b-button size="sm" onclick="document.getElementById('loadMission').click()">{{ $t('load') }} mission</b-button>
            <input id="loadMission" style="visibility:hidden;" type="file" @change="loadMission" />
        </div>




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
            mission: null,
            prenom: 'Camille',
            sexe: 'garçon'
        }
    },
    created() {
        this.missions = missions
    },
    methods: {
        createStory() {
            let options = {
                lang : this.$i18n.locale,
                mission: this.mission,
                heros: { prenom: this.prenom, sexe: this.sexe }
            }
            this.$store.commit('core/createStory', options)
            this.mission = null
        },
        missionChanged(v) {
            console.log(v)
            this.mission = v
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