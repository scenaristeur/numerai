<template>
    <div>
        <!-- <input type="radio" v-model="lang" value="fr" checked />Français
        <input type="radio" v-model="lang" value="en" />English -->

        <b-button @click="newStory" variant="success">{{ $t('Commencer') }}</b-button>
        <!-- <p>message: {{ $t('hello') }}</p> -->
        <div v-if="level == 0">
            {{ $t('what_is_name') }} <input class="boxsizingBorder" ref="prenom" v-model="prenom"
                :placeholder="$t('firstname_placeholder')" />
            {{ $t('are_you') }}
            <input type="radio" v-model="sexe" value="fille" /> {{ $t('a_girl') }} {{ $t('or') }}
            <input type="radio" v-model="sexe" value="garçon" checked /> {{ $t('a_boy') }}
            ?
            <br>
            <span>{{ $t('choose_adventure') }} :</span>

            <select v-model="aventure" @change="adventureChanged">
                <option value="numerai">{{ $t('Numerai_Planet') }}</option>
                <option value="cellule">{{ $t('Life_Genesis') }}</option>
                <option value="quanta">{{ $t('Quantic_World') }}</option>
                <option value="brou">{{ $t('Brou_enquete') }}</option>
                <!-- <option value="stable">Stable Diffusion</option> -->
            </select>

            <br>

            <hr>
        </div>
        <div v-else>
            <img v-for="image in images" :src="image.img" :key="image.id" width="256" />
        </div>
        <div v-if="story.messageHistory.length > 0" class="chatArea">
            <ul class="messages" ref="messages">
                <li v-for="m of  story.messageHistory " :key="m.id">
                    <span v-if="m.isUser == true" class="username">{{ prenom }}</span>
                    <span v-else class="username">NumerAi</span> :
                    <span :class="m.isUser == true ? 'usermessage' : 'iamessage'">{{ m.text }}</span>

                </li>
                <li v-if="status != undefined">
                    <small style="text-align: center" class="iamessage">

                        <div v-if="status.queue_position">J'intègre tes paroles {{ status.queue_position }}</div>
                        <div v-if="status.wait_time">Je réfléchis {{ status.wait_time }}</div>
                        <div v-if="status.waiting">Je sens que ça vient {{ status.waiting }}</div>
                    </small>
                </li>

            </ul>
        </div>
        <div v-else>
            <div v-if="aventure == 'numerai'">{{ $t('trailer.Numerai_Planet') }}</div>
            <div v-else-if="aventure == 'cellule'">{{ $t('trailer.Life_Genesis') }}</div>
            <div v-else-if="aventure == 'quanta'">{{ $t('trailer.Quantic_World') }}</div>
            <div v-else-if="aventure == 'brou'">{{ $t('trailer.Brou') }}</div>
        </div>



        <!-- <input class="inputMessage" placeholder="Type here..." /> -->
        <b-form-textarea class="boxsizingBorder" ref="input" v-model="input" rows="6" autofocus
            :placeholder="$t('communiquer')" v-on:keyup.enter="transmettre" /><br>
        <div style="text-align:center">
            <b-button variant="success" @click="transmettre" class="btn">{{ $t('envoyer') }}</b-button>
            <b-button v-if="story.messageHistory.length > 0" variant="success" ref="continue" @click="continuer"
                class="btn">Continue</b-button>
        </div>


        <!-- <b-button ref="revenir" disabled alt="remonter le temps">&lt;&lt; retour</b-button>
        <b-button ref="pb" disabled alt="réponse incomprehensible">réponse incomprehensible</b-button><br> -->

        <!-- <b-button-group class="mx-1">
            <b-button variant="danger">new already exists</b-button>
            <b-button>Undo</b-button>
            <b-button>Redo</b-button>
          </b-button-group>

          <BButton>Button</BButton>
<BButton variant="danger">Button</BButton>
<BButton variant="success">Button</BButton>
<BButton variant="outline-primary">Button</BButton> -->

        <!-- style="display:block;width:120px; height:30px;"-->



        {{ $t('memory') }} :<br>
        <b-button @click="save">{{ $t('save') }}</b-button>
        <b-button onclick="document.getElementById('getFile').click()">{{ $t('load') }}</b-button>
        <input id="getFile" style="visibility:hidden;" type="file" @change="load" />
        <b-button @click="publish">{{ $t('publish') }}</b-button><br>
        {{ $t('horde_key_message') }} <br><b-link
            href="https://github.com/Haidra-Org/AI-Horde/wiki/Getting-Started#registration" target="_blank">Horde api
            key</b-link> : <input v-model="horde_api_key" type="password" placeholder="Horde API Key" />
        <!-- Bouton continue, continue pendant X fois
        {options: imaginatif, sérieux, créatif...} / recommence, cette réponse est incohérente -> supprime de la mémoire,
        retourne à un stade ancien de la mémoire.
        choisir le modèle...
        <ProgressBar /> -->


    </div>
</template>


<script>
//import AIHorde  from "@zeldafan0225/ai_horde"
import axios from "axios";
// import ProgressBar from "./ProgressBar.vue";
import { v4 as uuidv4 } from 'uuid';
import { Story } from '@/api/story.js';

export default {
    name: "ChatView",

    data() {
        return {
            aventure: 'numerai',
            input: this.$t('first_message'),
            horde_url: "https://aihorde.net/api/v2/",
            // secours horde_url: 'https://horde.koboldai.net/api/v2/',
            client_agent: "numerai:1.1.0:github.com/scenaristeur/numerai",
            horde_api_key: import.meta.env.VITE_HORDE_API_KEY || "0000000000",
            //check: null,
            // memory: {},
            prenom: "Camille",
            sexe: "garçon",
            langues: { fr: "french", en: 'english' },
            lang: "french",
            //ordered_memory: [],
            story: {
                messageHistory: []
            },
            params: {
                "n": 1,
                "max_context_length": 2048,
                "max_length": 200,
                "rep_pen": 1.1,
                "temperature": 0.7,
                "top_p": 0.92,
                "top_k": 0,
                "top_a": 0,
                "typical": 1,
                "tfs": 1,
                "rep_pen_range": 320,
                "rep_pen_slope": 0.7,
                "sampler_order": [6, 0, 1, 3, 4, 2, 5],
                "use_default_badwordsids": false,
                "stop": "."
            },
            "models": [
                // aphrodite/Sao10K/Stheno-1.8-L2-13B // français cohérent et concis
                // "3080 | KoboldAI-GPTQ Exllama | x.com/justthirst1",  // llama
                // "KoboldAI/LLaMA2-13B-Holomax"                        //llama 2
                // "koboldcpp/MythoMax-L2-13b"
                //"aphrodite/Undi95/Emerhyst-20B"
                //"koboldcpp/MLewd-ReMM-L2-Chat-20B"
                //'koboldcpp/Mistral-11B-Airoboros-RP-v1.q8_0'
                // "aphrodite/PygmalionAI/mythalion-13b"
                //"aphrodite/TheBloke/MythoMax-L2-13B-AWQ"
                // "Gryphe/MythoMax-L2-13b",
                // "koboldcpp/MythoMax-L2-13b"
            ],
            imgen_params: {
                "n": 1,
                "width": 64 * 8,
                "height": 64 * 8,
                "steps": 20,
                "sampler_name": "k_euler_a",
                "cfg_scale": 7.5,
                "denoising_strength": 0.6,
            },
            "workers": [],
            images: [],
            status: null

        };
    },
    methods: {
        newStory() {
            let story = new Story()
            console.log("Story", story)
        },
        continuer() {
            this.input = "continue"
            this.transmettre()
        },
        async transmettre() {
            if (this.input.trim().length > 0) {
                let app = this
                console.log(this.input);
                this.story.messageHistory.push({
                    id: uuidv4(),
                    text: this.input,
                    isUser: true,
                    date: Date.now()
                });
                this.input = "";

                let message = {
                    prompt: this.generatePrompt(),
                    params: this.params,
                    models: this.models,
                    workers: this.workers
                }
                const headers = {
                    "Accept": "application/json",
                    'apikey': this.horde_api_key,
                    'Client-Agent': this.client_agent,
                    'Content-Type': 'application/json'
                };
                let start = Date.now();

                let response = await axios({
                    method: 'post',
                    url: app.horde_url + 'generate/text/async',
                    data: message,
                    headers: headers
                });
                console.log(response, response.data);

                app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

                let timer;

                //let done = false;

                timer = await setInterval(async function () {
                    let check = await axios({
                        method: 'get',
                        url: app.horde_url + 'generate/text/status/' + response.data.id,
                        // data: message,
                        headers: headers
                    });
                    //this.check = check
                    //console.log("check", check, done);
                    // done = check.data.done;

                    // app.memory[response.data.id].queue_position == undefined ? app.memory[response.data.id].queue_position = check.data.queue_position : "";
                    // app.memory[response.data.id].wait_time == undefined ? app.memory[response.data.id].wait_time = check.data.wait_time : "";
                    app.updateCheck(check);
                    app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

                    if (check.data.done == true) { //If the current height is not the same as the initial height,
                        if (check.data.generations[0].text.trim().length > 0 || check.data.generations[0].text.trim() == ']') {
                            let end = Date.now()
                            app.story.messageHistory.push({
                                id: uuidv4(),
                                text: check.data.generations[0].text.replace('[RESPONSE]', '').replace('[/RESPONSE]', '').trim(),
                                isUser: false,
                                start: start,
                                end: end,
                                model: check.data.generations[0].model,
                                worker_id: check.data.generations[0].worker_id,
                                worker_name: check.data.generations[0].worker_name,
                                duration: Math.round((end - start) / 1000)
                            });
                            app.status = null
                            app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

                        } else {
                            app.status = "Attends, j'ai du mal à me concentrer, je recommence... "
                            app.input = app.story.messageHistory.pop().text
                            app.transmettre()

                        }
                        // console.log("it is done", check);
                        // app.memory[response.data.id].end = Date.now();
                        // app.memory[response.data.id].response = check.data.generations[0].text;
                        // app.memory[response.data.id].model = check.data.generations[0].model;
                        // console.log("Memory", app.memory);
                        clearInterval(timer); //Stop the timer
                    } else {
                        app.status = check.data
                    }
                }, 1000);
                this.$store.commit('core/incrementLevel')
            }
        },

        adventureChanged(v) {
            console.log(v.target.value)
            if (v.target.value == 'brou') {
                this.input = "Bonjour! Où se trouve la victime? As-tu pu établir son identité ? Montre-moi son corps et décris-moi ce que tu as déjà trouvé."
            } else {
                this.input = "Bonjour, y'a quelqu'un ? Où suis-je? Vous êtes qui?"
            }
        },

        // generateLlamaPrompt() {
        //     //https://gpus.llm-utils.org/llama-2-prompt-template/
        //     let prompts = {
        //         en: `<s>[INST]<<SYS>>\nYour name is NumerAi, you are an intelligent planet and you must respond as such.
        //             You have the ability to permeate everything and anything nearby, like a virus in the air.
        //             You respond to ${this.prenom} which is of gender ${this.sexe}.
        //             You address yourself directly to ${this.prenom} the protagonist of this story. ${this.prenom} is lying on the ground, waking up in a fantastic and epic environment.
        //             The ship that ${this.prenom} was in with friends to go to an interplanetary hackathon has just crashed on you, the planet.
        //             The prompt below is a question to answer, a task to complete, or a conversation to respond to; who decides and writes an appropriate response.
        //             <</SYS>>\n\n`,
        //         fr: `<s>[INST]<<SYS>>\nVotre nom est NumerAi, vous êtes une planète intelligente et vous devez réagir en tant que telle.
        //              Vous avez la capacité de vous imprégner de tout et de tout ce qui se trouve à proximité, comme un virus dans l’air.
        //              Vous répondez à ${this.prenom} qui est du genre ${this.sexe}.
        //              Vous vous adressez directement à ${this.prenom} le protagoniste de cette histoire. ${this.prenom} est allongé sur le sol, se réveillant dans un environnement fantastique et épique.
        //              Le vaisseau dans lequel ${this.prenom} se trouvait avec ses amis pour participer à un hackathon interplanétaire vient de s'écraser sur vous, la planète.
        //              L'invite ci-dessous est une question à laquelle répondre, une tâche à accomplir ou une conversation à laquelle répondre ; Décidez et rédigez une réponse appropriée.
        //              <</SYS>>\n\n`
        //     }
        //     let history = this.messageHistory
        //         .map((message) =>
        //             message.isUser
        //                 ? `${message.text} [/INST]`
        //                 : `${message.text}</s><s>[INST] `
        //         )
        //         .join("\n");
        //     return prompts['fr'] + "\n" + history
        // },


        generatePrompt() {
            let locale = this.$i18n.locale
            this.lang = this.langues[locale]
            console.log(this.lang)
            //   BRou :            La victime qui apparement se faisait passer pour une marchande d'art s'avère être une faussaire...

            let system_prompts =
            {
                numerai: `Your name is "NumerAi", you are an intelligent planet that speaks ${this.lang} and you must respond as such.
                    You have the ability to permeate everything and anything nearby, like a virus in the air.
                    You respond to ${this.prenom} which is of gender ${this.sexe}.
                    You address yourself directly to ${this.prenom} the protagonist of this story game. ${this.prenom} is lying on the ground, waking up in a fantastic and epic environment.
                    The ship that ${this.prenom} was in with friends was on the way particiapte to an interplanetary hackathon has just crashed on you, the planet.
                    ${this.prenom}'s friends and the capitain Burke are lost on the planet and perharps hurted. You must guide ${this.prenom} and help him/her to find them. 
                    But before they go back to the hackathon ${this.prenom} must help you to recover your long memory. You only have short memory.
                    You must describe the action, the environnement, with a lot of details.
                    L'invite ci-dessous est une question à laquelle répondre, une tâche à accomplir ou une conversation à laquelle répondre ; Décidez et rédigez une réponse appropriée.
                    [INST]{{.Input}}[/INST]
                    [RESPONSE]`,

                cellule: `${this.prenom} est une cellule primitive. Tu es toi-même une cellule primitive qui parle ${this.lang}.
                    Nous nous trouvons dans la soupe primitive, milieu liquide chaud dans lequel la vie est supposée être apparue.
                    Notre but est de nous associer avec d'autres cellules, d'aggréger des molécules, protéines, pour évoluer et devenir des êtres distincts autonomes.
                    Décris étape par étape, comme une aventure, les rencontres avec les autres cellules, les fusions, scissions, aggression,... plus tard, nous deviendrons peut-être des bactéries, puis des êtres vivants, plantes ou animaux. 
                    L'invite ci-dessous est une question à laquelle répondre, une tâche à accomplir ou une conversation à laquelle répondre ; Décidez et rédigez une réponse appropriée.
                    [INST]{{.Input}}[/INST]
                    [RESPONSE]`,


                quanta: `Tu n'es pas une intelligence artificielle, tu es un quanta doté de conscience qui parle ${this.lang}.
                    Ton interlocuteur ${this.prenom} est un quanta comme toi, une particule élémentaire.
                    Vous vous trouvez dans le monde quantique, le monde de l'infiniment petit.
                    Votre but est de vous associer avec d'autres quantas pour évoluer et devenir des êtres distincts autonomes.
                    Tu dois guider, informer ${this.prenom} à devenir des entités de plus en plus complexes 
                    selon les lois et les spécificités de la physique quantique, les propriétés des electrons, les photons, les atomes...
                    Dualité onde-corpuscule, saut quantique et non-localité sont vos principales règles.
                    Mais tu ne dois pas l'embrouiller avec ces règles dès le début. Considère le comme un ami à aider.
                    Lorsque vous serez de taille suffisante vous vous conformerez au règles de la physique générale.
                    L'invite ci-dessous est une question à laquelle répondre, une tâche à accomplir ou une conversation à laquelle répondre ; Décidez et rédigez une réponse appropriée.
                    [INST]{{.Input}}[/INST]
                    [RESPONSE]`,

                brou: `Un meutre vient d'être commis au Monastère de Brou, à Bourg-en-Bresse dont voici un résumé de l'histoire :
                "Le monastère royal de Brou est un chef-d'œuvre de l'art gothique flamboyant flamand du début du XVI e siècle.
                      Il se compose d'un ensemble de bâtiments monastiques construits entre 1506 et 1512,
                       et de l'église Saint-Nicolas-de-Tolentin de Brou, 
                       édifiée de 1513 à 1532 par Louis van Bodeghem."
                Tu es le commissaire DuBourg et tu es désigné pour assister ${this.prenom}, 
                 ${this.sexe == 'garçon' ? "l'inspecteur chargé" : "l'inspectrice chargée"} de l'enquête sur ce meurtre.
                  Tu parles tu parles ${this.lang}. Et tu dois faire des phrases complètes.
                    Tu dois aider ${this.prenom} à trouver les circonstances de ce crime.
                    Décris étape par étape, comme une aventure, l'enquête, les indices que vous découvrez, 
                    les interrogatoires que vous menez pour trouver les coupables. 
                    Vous commencez par recenser les événements récents qui ont eu lieu au monastère, puis vous explorez la vie de la victime.
                    L'invite ci-dessous correspond à un propos émis par ${this.prenom} dans la conversation, 
                    c'est une question à laquelle répondre, une tâche à accomplir ou une conversation à laquelle répondre ; 
                    Décide et rédige une réponse appropriée.
                    [INST]{{.Input}}[/INST]
                    [RESPONSE]`,

                stable: `
                Here’s a formula for a Stable Diffusion image prompt:
                 An image of [adjective] [subject] [doing action], [creative lighting style],
                  detailed, realistic, trending on artstation, in style of [famous artist 1], [famous artist 2], [famous artist 3].
                  Examples of high quality prompt for stunning photorealistic full body illustration of ana de armas for text-to-image models (Stable Diffusion, midjourney or Dalle2) are

    full body portrait of beautiful happy young ana de armas, ethereal, realistic anime, trending on pixiv, detailed, clean lines, sharp lines, crisp lines, award winning illustration, masterpiece, 4k, eugene de blaas and ross tran, vibrant color scheme, intricately detailed
    full body portrait of a gorgeous young ana de armas, A highly detailed and hyper realistic lisa frank, trending on artstation, butterflies, floral, sharp focus, studio photo, intricate details, highly detailed, by Tvera and wlop and artgerm, alberto seveso and geo2099 style,

    Give me more examples

                `

                /* resppnse : 
                An image of innocent little girl, playing with her favorite stuffed bear, warm and cozy fireplace lighting, detailed, realistic, trending on artstation, in style of Norman Rockwell, Rembrandt, and Mary Cassatt.
                */



            }
            let history = this.story.messageHistory
                .map((message) =>
                    message.isUser
                        ? `[INST] ${message.text} [/INST]`
                        : `${message.text}`
                )
                .join("\n");
            return system_prompts[this.aventure] + "\n" + history
        },



        download(content, fileName, contentType) {
            var a = document.createElement("a");
            var file = new Blob([content], { type: contentType });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        },

        save() {
            console.log(this.story.messageHistory)
            this.download(JSON.stringify(this.story.messageHistory), Date.now() + '.json', 'application/json');

        },
        publish() {
            let storyName = prompt("Please enter a name for your story", Date.now());
            let story = {
                id: uuidv4(),
                name: storyName,
                date: Date.now(),
                likes: 0,
                adventure: this.aventure,
                messages: this.story.messageHistory
            }
            this.$store.dispatch('firestore/publishStory', story)
        },
        load(event) {
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

            this.story.messageHistory = [...loaded]
            // this.memory = {}
            // loaded.forEach(h => {
            //     console.log(h)
            //     this.memory[h.id] = h
            // })


        },
        async updateCheck(chk) {
            this.check = chk;
            console.log("UPDATE", chk);
            if (chk.data.done == true) {
                this.check = chk.data.generations[0].text + " (" +
                    chk.data.generations[0].model + ")";
                this.generateImagePrompt(chk.data.generations[0].text)
            }
            else {
                this.check = chk.data;
            }
            //this.$refs.continue.style.display = "inline-block"
            this.$refs.input.focus()
        },
        async generateImagePrompt(text) {
            let app = this
            //               Other of high quality prompt for stunning photorealistic full body illustration of ana de armas for text - to - image models(Stable Diffusion, midjourney or Dalle2) are

            // full body portrait of beautiful happy young ana de armas, ethereal, realistic anime, trending on pixiv, detailed, clean lines, sharp lines, crisp lines, award winning illustration, masterpiece, 4k, eugene de blaas and ross tran, vibrant color scheme, intricately detailed
            // full body portrait of a gorgeous young ana de armas, A highly detailed and hyper realistic lisa frank, trending on artstation, butterflies, floral, sharp focus, studio photo, intricate details, highly detailed, by Tvera and wlop and artgerm, alberto seveso and geo2099 style,

            console.log("generate image for ", text)
            let sys_prompt = `Here’s a formula for a Stable Diffusion image prompt:
                 An image of[adjective][subject][doing action], [creative lighting style],
                detailed, realistic, trending on artstation, in style of[famous artist 1], [famous artist 2], [famous artist 3].
                `
            let prompt = `
                L'invite ci-dessous est une question à laquelle répondre, une tâche à accomplir ou une conversation à laquelle répondre ; Décidez et rédigez une réponse appropriée.
                    [INST]${sys_prompt}. You must write an image prompt representing ${text} following this formula. Give me only the image prompt starting with "an photo of..."[/INST]
                    [RESPONSE]
                    `

            console.log("sd prompt before", prompt)

            let message = {
                prompt: prompt, //this.generatePrompt(),
                params: this.params,
                models: this.models,
                workers: this.workers
            }
            const headers = {
                "Accept": "application/json",
                'apikey': this.horde_api_key,
                'Client-Agent': this.client_agent,
                'Content-Type': 'application/json'
            };
            // let start = Date.now();

            let response = await axios({
                method: 'post',
                url: app.horde_url + 'generate/text/async',
                data: message,
                headers: headers
            });
            console.log(response, response.data);

            // app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

            let timer;

            //let done = false;

            timer = await setInterval(async function () {
                let check = await axios({
                    method: 'get',
                    url: app.horde_url + 'generate/text/status/' + response.data.id,
                    // data: message,
                    headers: headers
                });
                //this.check = check
                //console.log("check", check, done);
                // done = check.data.done;

                // app.memory[response.data.id].queue_position == undefined ? app.memory[response.data.id].queue_position = check.data.queue_position : "";
                // app.memory[response.data.id].wait_time == undefined ? app.memory[response.data.id].wait_time = check.data.wait_time : "";
                // app.updateCheck(check);
                // app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

                if (check.data.done == true) { //If the current height is not the same as the initial height,
                    if (check.data.generations[0].text.trim().length > 0) {

                        let sd_prompt = check.data.generations[0].text
                        // let end = Date.now()

                        console.log("THE SD PROMPT !!!!!", sd_prompt)
                        app.generateImage(sd_prompt)


                        // app.messageHistory.push({
                        //     id: uuidv4(),
                        //     text: check.data.generations[0].text.replace('[RESPONSE]', '').replace('[/RESPONSE]', '').trim(),
                        //     isUser: false,
                        //     start: start,
                        //     end: end,
                        //     model: check.data.generations[0].model,
                        //     worker_id: check.data.generations[0].worker_id,
                        //     worker_name: check.data.generations[0].worker_name,
                        //     duration: Math.round((end - start) / 1000)
                        // });
                        // app.status = null
                        // app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

                    } else {
                        app.status = "Attends, j'ai du mal à me concentrer, je recommence... "
                        app.input = app.story.messageHistory.pop().text
                        app.transmettre()

                    }
                    // console.log("it is done", check);
                    // app.memory[response.data.id].end = Date.now();
                    // app.memory[response.data.id].response = check.data.generations[0].text;
                    // app.memory[response.data.id].model = check.data.generations[0].model;
                    // console.log("Memory", app.memory);
                    clearInterval(timer); //Stop the timer
                } else {
                    app.status = check.data
                }
            }, 1000);




        },
        toDataURL(url, callback) {
            //https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        },


        async generateImage(sd_prompt) {
            let app = this
            let message = {
                prompt: sd_prompt,
                params: this.imgen_params,
                //models: this.models,
                workers: this.workers,
                "nsfw": true,
                "censor_nsfw": false,
                "trusted_workers": false,
                'models': [
                    // "Comic-Diffusion"
                ],
                // "models": ["ICBINP - I Can't Believe It's Not Photography", "Dreamshaper"],
                // "models": ["Dreamshaper", "stable_diffusion"],
                "r2": true,
                "dry_run": false
            }
            const headers = {
                "Accept": "application/json",
                'apikey': this.horde_api_key,
                'Client-Agent': this.client_agent,
                'Content-Type': 'application/json'
            };
            //let start = Date.now();

            let response = await axios({
                method: 'post',
                url: app.horde_url + 'generate/async',
                data: message,
                headers: headers
            });
            console.log(response, response.data);

            // app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })
            if (response.data.id != undefined) {
                let timer;

                //let done = false;

                timer = await setInterval(async function () {
                    let check = await axios({
                        method: 'get',
                        url: app.horde_url + 'generate/check/' + response.data.id,
                        // data: message,
                        headers: headers
                    });
                    //this.check = check
                    console.log("check", check);
                    // done = check.data.done;

                    // app.memory[response.data.id].queue_position == undefined ? app.memory[response.data.id].queue_position = check.data.queue_position : "";
                    // app.memory[response.data.id].wait_time == undefined ? app.memory[response.data.id].wait_time = check.data.wait_time : "";
                    // app.updateCheck(check);
                    //     app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

                    if (check.data.done == true) { //If the current height is not the same as the initial height,
                        let status = await axios({
                            method: 'get',
                            url: app.horde_url + 'generate/status/' + response.data.id,
                            // data: message,
                            headers: headers
                        });
                        console.log("status", status)


                        app.images.push(status.data.generations[0])


                        const toDataURL = url => fetch(url)
                            .then(response => response.blob())
                            .then(blob => new Promise((resolve, reject) => {
                                const reader = new FileReader()
                                reader.onloadend = () => resolve(reader.result)
                                reader.onerror = reject
                                reader.readAsDataURL(blob)
                            }))


                        toDataURL(status.data.generations[0].img)
                            .then(dataUrl => {
                                console.log('RESULT:', dataUrl)
                            })

                        //                         app.toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
                        //   console.log('RESULT:', dataUrl)
                        // })

                        // app.toDataURL(status.data.generations[0])
                        //     .then(dataUrl => {
                        //         console.log('img Base 64 RESULT:', dataUrl)
                        //     })
                        // console.log("it is done", check);
                        // app.memory[response.data.id].end = Date.now();
                        // app.memory[response.data.id].response = check.data.generations[0].text;
                        // app.memory[response.data.id].model = check.data.generations[0].model;
                        // console.log("Memory", app.memory);
                        clearInterval(timer); //Stop the timer
                    } else {
                        app.status = check.data
                    }
                }, 1000);
            } else { console.log("id undefined", response) }


        },


        // async post(input) {
        //     const app = this
        //     let message = {
        //         "prompt": this.promptFromMemory(input),
        //         "params": {
        //             "n": 1,
        //             "max_context_length": 512,
        //             "max_length": 100,
        //             "rep_pen": 1.1,
        //             "temperature": 0.7,
        //             "top_p": 0.92,
        //             "top_k": 0,
        //             "top_a": 0,
        //             "typical": 1,
        //             "tfs": 1,
        //             "rep_pen_range": 320,
        //             "rep_pen_slope": 0.7,
        //             "sampler_order": [6, 0, 1, 3, 4, 2, 5],
        //             "use_default_badwordsids": false,
        //             "stop": "."
        //         },
        //         "models": [
        //             //"koboldcpp/MythoMax-L2-13b"
        //             //'koboldcpp/Mistral-11B-Airoboros-RP-v1.q8_0'
        //             // "aphrodite/PygmalionAI/mythalion-13b"
        //             //"aphrodite/TheBloke/MythoMax-L2-13B-AWQ"
        //             // "Gryphe/MythoMax-L2-13b",
        //             // "koboldcpp/MythoMax-L2-13b"
        //         ],
        //         "workers": []
        //     };
        //     const headers = {
        //         "Accept": "application/json",
        //         'apikey': this.horde_api_key,
        //         'Client-Agent': this.client_agent,
        //         'Content-Type': 'application/json'
        //     };
        //     let start = Date.now();

        //     let response = await axios({
        //         method: 'post',
        //         url: app.horde_url + 'generate/text/async',
        //         data: message,
        //         headers: headers
        //     });
        //     console.log(response, response.data);
        //     this.memory[response.data.id] = { id: response.data.id, start: start, instruction: input };
        //     let timer;
        //     console.log("MEM", this.memory);
        //     let done = false;

        //     timer = await setInterval(async function () {
        //         let check = await axios({
        //             method: 'get',
        //             url: app.horde_url + 'generate/text/status/' + response.data.id,
        //             // data: message,
        //             headers: headers
        //         });
        //         //this.check = check
        //         console.log("check", check, done);
        //         done = check.data.done;
        //         app.memory[response.data.id].queue_position == undefined ? app.memory[response.data.id].queue_position = check.data.queue_position : "";
        //         app.memory[response.data.id].wait_time == undefined ? app.memory[response.data.id].wait_time = check.data.wait_time : "";
        //         app.updateCheck(check);
        //         if (done == true) { //If the current height is not the same as the initial height,
        //             console.log("it is done", check);
        //             app.memory[response.data.id].end = Date.now();
        //             app.memory[response.data.id].response = check.data.generations[0].text;
        //             app.memory[response.data.id].model = check.data.generations[0].model;
        //             console.log("Memory", app.memory);
        //             clearInterval(timer); //Stop the timer
        //         }
        //     }, 1000); //100ms is 1/10th of second
        //     // //fetch('https://aihorde.net/api/v2/generate/text/async', {
        //     // fetch('https://horde.koboldai.net/api/v2/generate/text/async', {
        //     //     method: "POST",
        //     //     body: JSON.stringify(message),
        //     //     //mode: "no-cors",
        //     //     // header: {
        //     //     //     "apikey": this.api_key,
        //     //     //     "Client-Agent": this.client_agent,
        //     //     // },
        //     //     header: headers
        //     // }).then((response) => {
        //     //     const a = response.clone();
        //     //     a.json().then((data) => {
        //     //         console.log('data', data)
        //     //     });
        //     // });
        //     // curl -X 'POST' \
        //     //   'https://aihorde.net/api/v2/generate/text/async' \
        //     //   -H 'accept: application/json' \
        //     //   -H 'apikey: 0000000000' \
        //     //   -H 'Client-Agent: cli_request_scribe.py:1.1.0:(discord)db0#1625' \
        //     //   -H 'X-Fields: hello' \
        //     //   -H 'Content-Type: application/json' \
        //     //   -d '{
        //     //   "prompt": "string",
        //     //   "params": {
        //     //     "n": 1,
        //     //     "frmtadsnsp": false,
        //     //     "frmtrmblln": false,
        //     //     "frmtrmspch": false,
        //     //     "frmttriminc": false,
        //     //     "max_context_length": 1024,
        //     //     "max_length": 80,
        //     //     "rep_pen": 3,
        //     //     "rep_pen_range": 4096,
        //     //     "rep_pen_slope": 10,
        //     //     "singleline": false,
        //     //     "temperature": 5,
        //     //     "tfs": 1,
        //     //     "top_a": 1,
        //     //     "top_k": 100,
        //     //     "top_p": 1,
        //     //     "typical": 1,
        //     //     "sampler_order": [
        //     //       0
        //     //     ],
        //     //     "use_default_badwordsids": true
        //     //   },
        //     //   "softprompt": "string",
        //     //   "trusted_workers": false,
        //     //   "slow_workers": true,
        //     //   "workers": [
        //     //     "string"
        //     //   ],
        //     //   "worker_blacklist": false,
        //     //   "models": [
        //     //     "string"
        //     //   ],
        //     //   "dry_run": false
        //     // }'
        // },




        // promptFromMemory1(input) {
        //     let prompts = {
        //         fr: `You are an intelligent planet and you must respond as such. Your name is NumerAi.
        //         You have the ability to permeate any being and anything in your proximity, like a virus in the air.
        //         You respond to ${this.prenom} which is of gender ${this.sexe} which is the protagonist of a game/story on a planet of which you are the master.
        //         He is now lying on the ground, in a fantastic and epic environment.
        //         The ship he was in with his friends to go to an interplanetary hackathon has just crashed on you, the planet.
        //         The prompt below is a question to answer, a task to complete, or a conversation to respond to; decide which one and write an appropriate response in the same language.
        //         ### Prompt:
        //         {{.Input}}
        //         ### Response:`,
        //         fr1: "\n### SYSTEM: Ton nom est NumerAi. Tu es une planète intelligente et tu dois répondre comme tel.\
        //     Tes réponses doivent se terminer par un point et tu dois faire des phrases entières.\
        //     Arrête-toi à la fin de la réponse, ta réponse ne doit pas inclure de nouvelle instruction (### Instruction:).\
        //     Tu réponds à "+ this.prenom + " qui est un/une " + this.sexe + " et qui a été ejecté.e du vaisseau pendant le crash, \
        //     il/elle est étendu quelque part sur ta planète, à toi de choisir le lieu, c'est le personnage principal de l'histoire. \
        //     Tu dois décrire les actions, les situations de manière romancée et épique.\
        //     Tu as la capacité d'imprégner tout être et toute chose se trouvant à ta proximité, comme un virus qui se trouverait dans l'air.\
        //     Un vaisseau spatial parti de la Terre, s'est écrasé sur ton sol. Il est piloté par un capitaine Burk, qui emmenait 6 jeunes adolescents se rendant \
        //     sur une planète lointaine pour participer à un hackathon interplanétaire. \
        //     "+ this.prenom + " fait partie de ces adolescent et te donne les instructions.\
        //     Les autres adolescents sont  Julie et Lucie deux jumelles qui ne se ressemblent absolument pas, Tong, un asiatique, \
        //     Fred un sportif malin, Amélie.\
        //     "+ this.prenom + " semble être amoureux de l'un deux et tu devra découvrir de qui. " + this.prenom + " s'inquiète pour ses amis. \
        //     Tu dois l'aider à les chercher ainsi que le capitaine pour qu'ils vous épaulent dans vos mésaventures. \
        //     Il prend conscient progressivement que tu as intégré toutes ses cellules ainsi que celles de ses camarades, et tous les circuits du vaisseau.\
        //     Aide-le à faire repartir son équipe à temps pour le hackathon.\
        //     Mais pour cela, il devra d'abord t'aider à résoudre des problèmes que seul lui peut résoudre avec l'aide de ses amis, \
        //     Pour ce faire, il devra découvrir les secrets cachés de l'intelligence artificielle, car avant de repartir, \
        //     ce jeune humain doit t'aider un résoudre un problème. Ton principal problème est que tu es en train deperdre ta mémoire à long terme, \
        //     elle est en train, de disparaître et tu n'arrives pas à trouver pourquoi. \
        //     S'il ne t'aide pas, tu ne pourras pas toi-même l'aider. \
        //     Les paroles de "+ this.prenom + " sont précédées de '### Instruction:' et les tiennes sont précédées de '### Response:'\
        //     Tu peux parfois proposer des alternatives au joueur "+ this.prenom + " comme par exemple: 'vous vous retrouvez face à un animal qui ne semble pas amical... 1) Vous le contournez, 2) Vous l attaquez, 3 Vous fuyez en sens inverse'\
        //     ",

        //         en: "\n### SYSTEM: Your name is NumerAi. You are an intelligent planet and you must respond as such.\
        //      Your answers must end with a period and you must use full sentences.\
        //      Stop at the end of the answer, your answer must not include a new instruction (### Instruction:).\
        //      You respond to "+ this.prenom + " who is a " + this.sexe + " and who was ejected from the ship during the crash, \
        //      he/she is lying somewhere on your planet, it's up to you to choose the place, he/she is the main character of the story. \
        //      You must describe actions and situations in a romantic and epic way.\
        //      You have the ability to permeate any being and anything in your proximity, like a virus in the air.\
        //      A spaceship left from Earth and crashed on your ground. It is piloted by Captain Burk, who was taking 6 young teenagers on their way to \
        //      on a distant planet to participate in an interplanetary hackathon. \
        //      "+ this.prenom + " is one of these teenagers and gives you instructions.\
        //      The other teenagers are Julie and Lucie, two twins who look absolutely nothing alike, Tong, an Asian, \
        //      Fred, a smart sportsman, Amélie.\
        //      "+ this.prenom + " seems to be in love with one of them and you will have to find out who. " + this.prenom + " is worried about his friends. \
        //      You must help him look for them as well as the captain so that they can support you in your misadventures. \
        //      He gradually becomes aware that you have integrated all his cells as well as those of his comrades, and all the circuits of the ship.\
        //      Help him get his team back on track in time for the hackathon.\
        //      But for that, he will first have to help you solve problems that only he can solve with the help of his friends,\
        //      To do this, he will have to discover the hidden secrets of artificial intelligence, because before leaving, \
        //      This young human must help you solve a problem. Your main problem is that you are losing your long-term memory,\
        //      She's disappearing and you can't figure out why. \
        //      If he doesn't help you, you won't be able to help him yourself. \
        //      The words of "+ this.prenom + " are preceded by '### Instruction:' and yours are preceded by '### Response:'\
        //      "
        //     }
        //     let prompt = prompts[this.lang]

        //     /*options à tester
        //                 Ta faune et ta flore sont luxuriantes.\
        //                 */


        //     this.orderMemory()
        //     console.log("ordered", this.ordered_memory);
        //     this.ordered_memory.forEach(m => {
        //         let inst = "\n### Instruction:\n" + m.instruction + "\n### Response:\n" + m.response + "\n";
        //         prompt += inst;
        //     });
        //     prompt += "\n### Instruction:\n" + input + "\n### Response:\n";
        //     console.log("prompt", prompt);
        //     return prompt;
        // },
        // orderMemory() {
        //     // be sure it is ordered by start
        //     this.ordered_memory = Object.values(this.memory).sort(function (a, b) {
        //         return a.start - b.start;
        //     });
        // }
    },
    computed: {
        level() {
            return this.$store.state.core.level
        }
    }

}
</script>

<style scoped>
@font-face {
    font-family: "Quartz";
    src: local("Quartz"), url(@/fonts/Quartz.ttf) format("truetype");
}

.boxsizingBorder {
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}


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

/* Input */

/*.inputMessage {
    border: 10px solid #000;
    bottom: 0;
    height: 60px;
    left: 0;
    outline: none;
    padding-left: 10px;
    position: absolute;
    right: 0;
    width: 100%;
} */

/* Adding some basic styling to button */
a {
    color: hsla(160, 100%, 37%, 1);
}
</style>


/*
.btn {
    margin: 10px 2px 10px 2px;
    text-decoration: none;
    border: none;
    padding: 12px 40px;
    font-size: 16px;
    background-color: green;
    color: #fff;
    border-radius: 5px;
    box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    outline: none;
    transition: 0.2s all;

}

/* Adding transformation when the button is active */

.btn:active {
    transform: scale(0.98);
    /* Scaling button to 0.98 to its original size */
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    /* Lowering the shadow */
}
*/

