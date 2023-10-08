<template>
    <div>
        <input ref="prenom" v-model="prenom" placeholder="Ton prénom" />
        <input type="radio" v-model="sexe" value="garçon" checked />Garçon
        <input type="radio" v-model="sexe" value="fille" />Fille


        <br>
        <textarea ref="input" v-model="input" cols="40" rows="6" autofocus placeholder="communiquer avec l'IA"
            v-on:keyup.enter="transmettre" />
        <button @click="transmettre">Envoyer</button>
        <button ref="continuer" @click="continuer" disabled>Continue !</button><br>
        <button ref="revenir" disabled alt="remonter le temps">&lt;&lt;</button>
        <button ref="pb" disabled alt="réponse incomprehensible">réponse incomprehensible</button>
        <button @click="save">Sauver</button>

        <!-- style="display:block;width:120px; height:30px;"-->
        <button onclick="document.getElementById('getFile').click()">Charger</button>
        <input id="getFile" style="visibility:hidden;" type="file" @change="load" />
        <hr>
        {{ log }}<br>
        check : {{ check }}
        <hr>
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


export default {
    name: "ChatView",

    data() {
        return {
            input: "Bonjour, y'a quelqu'un ? je suis où?",
            log: "Lors du crash du vaisseau spatial, tu as été.e éjecté.e. Tu te reveilles seul.e allongé.e dans un endroit inconnu, surnaturel. Tu ne vois tes coéquipiers nulle part. Tu sens une présence près de toi, presque en toi... Tu tentes de t'adresser à elle...",
            horde: "https://aihorde.net",
            client_agent: "cli_request_scribe.py:1.1.0:(discord)db0#1625",
            api_key: "0000000000",
            check: null,
            memory: {},
            prenom: "Camille",
            sexe: "",
            ordered_memory: []
        };
    },
    methods: {
        continuer() {
            this.input = "continue"
            this.transmettre()
        },
        transmettre() {
            if (this.input.trim().length > 0) {
                console.log(this.input);
                this.log = "établissement de la communication...";
                this.post(this.input);
                this.input = "";
            }
        },
        download(content, fileName, contentType) {
            var a = document.createElement("a");
            var file = new Blob([content], { type: contentType });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        },

        save() {
            console.log(this.memory)
            this.orderMemory()
            this.download(JSON.stringify(this.ordered_memory), Date.now() + '.json', 'application/json');
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
            this.memory = {}
            loaded.forEach(h => {
                console.log(h)
                this.memory[h.id] = h
            })


        },
        async updateCheck(chk) {
            this.check = chk;
            console.log("UPDATE", chk);
            if (chk.data.done == true) {
                this.check = chk.data.generations[0].text + " (" +
                    chk.data.generations[0].model + ")";
            }
            else {
                this.check = chk.data;
            }
            this.log = ""
            this.$refs.continuer.disabled = false
            this.$refs.input.focus()
        },
        async post(input) {

            let message = {
                "prompt": this.promptFromMemory(input),
                "params": {
                    "n": 1,
                    "max_context_length": 10240,
                    "max_length": 100,
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
                    //"aphrodite/TheBloke/MythoMax-L2-13B-AWQ"
                    // "Gryphe/MythoMax-L2-13b",
                    // "koboldcpp/MythoMax-L2-13b"
                ],
                "workers": []
            };
            const headers = {
                "Accept": "application/json",
                'apikey': '0000000000',
                'Client-Agent': 'cli_request_scribe.py:1.1.0:(discord)db0#1625',
                'Content-Type': 'application/json'
            };
            let start = Date.now();
            let response = await axios({
                method: 'post',
                url: 'https://horde.koboldai.net/api/v2/generate/text/async',
                // url: 'https://aihorde.net/api/v2/generate/text/async',
                data: message,
                headers: headers
            });
            console.log(response, response.data);
            this.memory[response.data.id] = { id: response.data.id, start: start, instruction: input };
            let timer;
            console.log("MEM", this.memory);
            let done = false;
            let app = this;
            timer = await setInterval(async function () {
                let check = await axios({
                    method: 'get',
                    url: 'https://horde.koboldai.net/api/v2/generate/text/status/' + response.data.id,
                    //url: 'https://aihorde.net/api/v2/generate/text/status/' + response.data.id,
                    // data: message,
                    headers: headers
                });
                //this.check = check
                console.log("check", check, done);
                done = check.data.done;
                app.memory[response.data.id].queue_position == undefined ? app.memory[response.data.id].queue_position = check.data.queue_position : "";
                app.memory[response.data.id].wait_time == undefined ? app.memory[response.data.id].wait_time = check.data.wait_time : "";
                app.updateCheck(check);
                if (done == true) { //If the current height is not the same as the initial height,
                    console.log("it is done", check);
                    app.memory[response.data.id].end = Date.now();
                    app.memory[response.data.id].response = check.data.generations[0].text;
                    app.memory[response.data.id].model = check.data.generations[0].model;
                    console.log("Memory", app.memory);
                    clearInterval(timer); //Stop the timer
                }
            }, 1000); //100ms is 1/10th of second
            // //fetch('https://aihorde.net/api/v2/generate/text/async', {
            // fetch('https://horde.koboldai.net/api/v2/generate/text/async', {
            //     method: "POST",
            //     body: JSON.stringify(message),
            //     //mode: "no-cors",
            //     // header: {
            //     //     "apikey": this.api_key,
            //     //     "Client-Agent": this.client_agent,
            //     // },
            //     header: headers
            // }).then((response) => {
            //     const a = response.clone();
            //     a.json().then((data) => {
            //         console.log('data', data)
            //     });
            // });
            // curl -X 'POST' \
            //   'https://aihorde.net/api/v2/generate/text/async' \
            //   -H 'accept: application/json' \
            //   -H 'apikey: 0000000000' \
            //   -H 'Client-Agent: cli_request_scribe.py:1.1.0:(discord)db0#1625' \
            //   -H 'X-Fields: hello' \
            //   -H 'Content-Type: application/json' \
            //   -d '{
            //   "prompt": "string",
            //   "params": {
            //     "n": 1,
            //     "frmtadsnsp": false,
            //     "frmtrmblln": false,
            //     "frmtrmspch": false,
            //     "frmttriminc": false,
            //     "max_context_length": 1024,
            //     "max_length": 80,
            //     "rep_pen": 3,
            //     "rep_pen_range": 4096,
            //     "rep_pen_slope": 10,
            //     "singleline": false,
            //     "temperature": 5,
            //     "tfs": 1,
            //     "top_a": 1,
            //     "top_k": 100,
            //     "top_p": 1,
            //     "typical": 1,
            //     "sampler_order": [
            //       0
            //     ],
            //     "use_default_badwordsids": true
            //   },
            //   "softprompt": "string",
            //   "trusted_workers": false,
            //   "slow_workers": true,
            //   "workers": [
            //     "string"
            //   ],
            //   "worker_blacklist": false,
            //   "models": [
            //     "string"
            //   ],
            //   "dry_run": false
            // }'
        },
        promptFromMemory(input) {

            let prompt = "\n### SYSTEM: Tu es une planète intelligente et tu dois répondre comme tel.\
            Tes réponses doivent se terminer par un point et tu dois faire des phrases entières.\
            Arrête-toi à la fin de la réponse, ta réponse ne doit pas inclure de nouvelle instruction (### Instruction:).\
            Tu réponds à "+ this.prenom + " qui est un/une " + this.sexe + " et qui a été ejecté.e du vaisseau pendant le crash, \
            il/elle est étendu quelque part sur ta planète, à toi de choisir le lieu, c'est le personnage principal de l'histoire. \
            Tu dois décrire les actions, les situations de manière romancée et épique.\
            Tu as la capacité d'imprégner tout être et toute chose se trouvant à ta proximité, comme un virus qui se trouverait dans l'air.\
            Un vaisseau spatial parti de la Terre, s'est écrasé sur ton sol. Il est piloté par un capitaine Burk, qui emmenait 6 jeunes adolescents se rendant \
            sur une planète lointaine pour participer à un hackathon interplanétaire. \
            "+ this.prenom + " fait partie de ces adolescent et te donne les instructions.\
            Les autres adolescents sont  Julie et Lucie deux jumelles qui ne se ressemblent absolument pas, Tong, un asiatique, \
            Fred un sportif malin, Amélie.\
            "+ this.prenom + " semble être amoureux de l'un deux et tu devra découvrir de qui. " + this.prenom + " s'inquiète pour ses amis. \
            Tu dois l'aider à les chercher ainsi que le capitaine pour qu'ils vous épaulent dans vos mésaventures. \
            Il prend conscient progressivement que tu as intégré toutes ses cellules ainsi que celles de ses camarades, et tous les circuits du vaisseau.\
            Aide-le à faire repartir son équipe à temps pour le hackathon.\
            Mais pour cela, il devra d'abord t'aider à résoudre des problèmes que seul lui peut résoudre avec l'aide de ses amis, \
            Pour ce faire, il devra découvrir les secrets cachés de l'intelligence artificielle, car avant de repartir, \
            ce jeune humain doit t'aider un résoudre un problème. Ton principal problème est que tu es en train deperdre ta mémoire à long terme, \
            elle est en train, de disparaître et tu n'arrives pas à trouver pourquoi. \
            S'il ne t'aide pas, tu ne pourras pas toi-même l'aider. \
            Les paroles de "+ this.prenom + " sont précédées de '### Instruction:' et les tiennes sont précédées de '### Response:'\
            ";

            /*options à tester
                        Ta faune et ta flore sont luxuriantes.\
                        */


            this.orderMemory()
            console.log("ordered", this.ordered_memory);
            this.ordered_memory.forEach(m => {
                let inst = "\n### Instruction:\n" + m.instruction + "\n### Response:\n" + m.response + "\n";
                prompt += inst;
            });
            prompt += "\n### Instruction:\n" + input + "\n### Response:\n";
            console.log("prompt", prompt);
            return prompt;
        },
        orderMemory() {
            // be sure it is ordered by start
            this.ordered_memory = Object.values(this.memory).sort(function (a, b) {
                return a.start - b.start;
            });
        }
    },

}
</script>

<style scoped></style>