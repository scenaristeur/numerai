<template>
    <div>
        <small>{{ log }}</small><br>
        <input v-model="input" autofocus  placeholder="communiquer avec l'ia" v-on:keyup.enter="transmettre" />
        <button @click="transmettre">Transmettre</button>

        <hr>
        check : {{ check }}
        <hr>
        Bouton continue, continue pendant X fois
        {options: imaginatif, sérieux, créatif...} / recommence, cette réponse est incohérente -> supprime de la mémoire, retourne à un stade ancien de la mémoire.
        choisir le modèle...
    </div>
</template>

<script>
//import AIHorde  from "@zeldafan0225/ai_horde"
import axios from "axios";




export default {
    name: "ChatView",
    data() {
        return {
            input: "",
            log: "",
            horde: "https://aihorde.net",
            client_agent: "cli_request_scribe.py:1.1.0:(discord)db0#1625",
            api_key: "0000000000",
            check: null,
            memory: {}
        }
    },
    methods: {
        transmettre() {

            if (this.input.trim().length > 0) {
                console.log(this.input)
                this.log = "transmitting..."
                this.post(this.input)
                this.input = ""
            }

        },

        // async post() {


        //     /*
        //     Create new instance of the ai_horde class to communicate with the rest API
        //     You can configure which cache should contain the data for what time
        //     You can also configure at what interval the cache is checking if there are any data that should be deleted

        //     The class also takes a default token. This is helpful if you want to use this package only using your own token.
        //     The token is not a required argument in any method.

        //     A default API route is also in the contrictor for changing where the requests are directed to (e.g. when using a subdomain like https://test.aihorde.net)
        //     */
        //     const ai_horde = new AIHorde({
        //         cache_interval: 1000 * 10,
        //         cache: {
        //             generations_check: 1000 * 30,
        //         },
        //         client_agent: "My-Project:v0.0.1:My-Contact"
        //     });
        //     console.log(ai_horde)

        //     // start the generation of an image with the given payload
        //     const generation = await ai_horde.postAsyncImageGenerate({
        //         prompt: "The legend of Zelda",
        //     });
        //     console.log(generation);

        //     // check the status of your generation using the generations id
        //     const check = await ai_horde.getImageGenerationCheck(generation.id);
        //     console.log(check);
        // },

        async updateCheck(chk) {
            this.check = chk
            console.log("UPDATE", chk)
            if (chk.data.done == true) {
                this.check = chk.data.generations[0].text + " (" +
                    chk.data.generations[0].model + ")"

            } else {
                this.check = chk.data
            }
        },

        async post(input) {

            // let message = {

            //     prompt: '{"role": "user", "content": "' + input + '"}',
            //     trusted_workers: false,
            //     models: [],
            //     dry_run: false,
            //     params: {
            //         client_agent: this.client_agent,
            //         api_key: this.api_key,
            //         txtgen_params: {
            //             "n": 2,
            //             "max_context_length": 2048,
            //             "max_length": 512
            //         },
            //     }


            // }

            // https://aihorde.net/api/
            //             curl -X 'POST' \
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



            // const message = {
            //     'prompt': 'hello',
            //     //'trusted_workers': false,
            //     'models': [],
            //    // 'dry_run': false,
            //     'params':
            //     {
            //         'n': 1,
            //         'max_context_length': 2048,
            //         'max_length': 512
            //     }
            // }

            //  let message = { prompt: "hello" }
            //let message = {'prompt': '{"role": "user", "content": "hello"}', 'params': {}}
            let message = {
                "prompt": this.promptFromMemory(input),

                "params":
                {
                    "n": 1,
                    "max_context_length": 1024,
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
                "models":
                    [
                        // "Gryphe/MythoMax-L2-13b",
                        // "koboldcpp/MythoMax-L2-13b"
                    ],
                "workers": []
            }

            const headers = {
                "Accept": "application/json",
                'apikey': '0000000000',
                'Client-Agent': 'cli_request_scribe.py:1.1.0:(discord)db0#1625',
                'Content-Type': 'application/json'
            }
            let start = Date.now()
            let response = await axios({
                method: 'post',
                url: 'https://horde.koboldai.net/api/v2/generate/text/async',
                // url: 'https://aihorde.net/api/v2/generate/text/async',
                data: message,
                headers: headers
            })

            console.log(response, response.data)

            this.memory[response.data.id] = { id: response.data.id, start: start, instruction: input }
            let timer
            console.log("MEM", this.memory)
            let done = false
            let app = this
            timer = await setInterval(async function () {
                let check = await axios({
                    method: 'get',
                    url: 'https://horde.koboldai.net/api/v2/generate/text/status/' + response.data.id,
                    //url: 'https://aihorde.net/api/v2/generate/text/status/' + response.data.id,
                    // data: message,
                    headers: headers
                })

                //this.check = check
                console.log("check", check, done)
                done = check.data.done
                app.memory[response.data.id].queue_position == undefined ? app.memory[response.data.id].queue_position = check.data.queue_position : ""
                app.memory[response.data.id].wait_time == undefined ? app.memory[response.data.id].wait_time = check.data.wait_time : ""

                app.updateCheck(check)
                if (done == true) { //If the current height is not the same as the initial height,
                    console.log("it is done", check)
                    app.memory[response.data.id].end = Date.now()
                    app.memory[response.data.id].response = check.data.generations[0].text
                    app.memory[response.data.id].model = check.data.generations[0].model
                    console.log("Memory", app.memory)
                    clearInterval(timer) //Stop the timer
                }
            }, 1000) //100ms is 1/10th of second


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
            let prompt = "\n### SYSTEM: tu es un petit oiseau et tu dois répondre comme tel.\
             Ta réponse doit se terminer par un point et tu dois faire des phrases entières.\
             Arrête-toi à la fin de la réponse, ne recommence pas une nouvelle instruction (### Instruction:) tout seul."
            // be sure it is ordered by start
            let ordered_memory = Object.values(this.memory).sort(function (a, b) {
                return a.start - b.start
            });

            console.log("ordered", ordered_memory)
            ordered_memory.forEach(m => {

                let inst = "\n### Instruction:\n" + m.instruction + "\n### Response:\n" + m.response + "\n"
                prompt += inst
            })



            prompt += "\n### Instruction:\n" + input + "\n### Response:\n"
            console.log("prompt", prompt)
            return prompt
        }
    },
}
</script>

<style scoped></style>