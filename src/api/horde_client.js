import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export class HordeClient {
  constructor(options = {}) {
    this.options = options
    this.horde_url = 'https://aihorde.net/api/v2/'
    // secours horde_url: 'https://horde.koboldai.net/api/v2/',
    this.client_agent = 'numerai:1.1.0:github.com/scenaristeur/numerai'
    this.horde_api_key = import.meta.env.VITE_HORDE_API_KEY || '0000000000'
    this.langues = { fr: 'french', en: 'english' }
    this.params = {
      n: 1,
      max_context_length: 2048,
      max_length: 200,
      rep_pen: 1.1,
      temperature: 0.7,
      top_p: 0.92,
      top_k: 0,
      top_a: 0,
      typical: 1,
      tfs: 1,
      rep_pen_range: 320,
      rep_pen_slope: 0.7,
      sampler_order: [6, 0, 1, 3, 4, 2, 5],
      use_default_badwordsids: false,
      stop: '.'
    }
    this.models = [
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
    ]
    this.imgen_params = {
      n: 1,
      width: 64 * 8,
      height: 64 * 8,
      steps: 20,
      sampler_name: 'k_euler_a',
      cfg_scale: 7.5,
      denoising_strength: 0.6
    }
    this.workers = []
  }
  async getCompletion(story) {
    let client = this
    console.log('get completion', story)
    let llm_request_message = {
      prompt: this.generatePrompt(story),
      params: this.params,
      models: this.models,
      workers: this.workers
    }

    const headers = {
      Accept: 'application/json',
      apikey: this.horde_api_key,
      'Client-Agent': this.client_agent,
      'Content-Type': 'application/json'
    }
    let start = Date.now()

    let response = await axios({
      method: 'post',
      url: this.horde_url + 'generate/text/async',
      data: llm_request_message,
      headers: headers
    })
    console.log(response, response.data)

    let timer
    timer = await setInterval(async function () {
      let check = await axios({
        method: 'get',
        url: client.horde_url + 'generate/text/status/' + response.data.id,
        // data: message,
        headers: headers
      })
      //this.check = check
      //console.log("check", check, done);
      // done = check.data.done;

      // app.memory[response.data.id].queue_position == undefined ? app.memory[response.data.id].queue_position = check.data.queue_position : "";
      // app.memory[response.data.id].wait_time == undefined ? app.memory[response.data.id].wait_time = check.data.wait_time : "";
      // app.updateCheck(check);
      // app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })

      if (check.data.done == true) {
        //If the current height is not the same as the initial height,
        if (
          check.data.generations[0].text.trim().length > 0 ||
          check.data.generations[0].text.trim() == ']'
        ) {
          let end = Date.now()
          story.messages.push({
            id: uuidv4(),
            text: check.data.generations[0].text
              .replace('[RESPONSE]', '')
              .replace('[/RESPONSE]', '')
              .trim(),
            isUser: false,
            start: start,
            end: end,
            model: check.data.generations[0].model,
            worker_id: check.data.generations[0].worker_id,
            worker_name: check.data.generations[0].worker_name,
            duration: Math.round((end - start) / 1000)
          })
          //app.status = null
          //app.$refs.messages.scroll({ top: app.$refs.messages.scrollHeight, behavior: "smooth" })
        } else {
          console.log('ERROR, should renew Completion request')
          //app.status = "Attends, j'ai du mal à me concentrer, je recommence... "
          //app.input = app.story.messageHistory.pop().text
          //app.transmettre()
        }
        // console.log("it is done", check);
        // app.memory[response.data.id].end = Date.now();
        // app.memory[response.data.id].response = check.data.generations[0].text;
        // app.memory[response.data.id].model = check.data.generations[0].model;
        // console.log("Memory", app.memory);
        clearInterval(timer) //Stop the timer
      } else {
        //app.status = check.data
        console.log(check.data)
      }
    }, 1000)
    //this.$store.commit('core/incrementLevel')
  }
  generatePrompt(story) {
    let locale = story.options.lang
    this.lang = this.langues[locale]
    this.prenom = story.options.heros.prenom
    this.sexe = story.options.heros.sexe
    console.log(this.lang, this.prenom, this.sexe)

    let system_prompt_brut = story.options.mission[1].system_prompt.join('\n')
    console.log('SYSTEM PROMPT BRUT', system_prompt_brut)
    let system_prompt = eval('`' + system_prompt_brut + '`')
    console.log('system_prompt', system_prompt)
    let history = story.messages
      .map((message) => (message.isUser ? `[INST] ${message.text} [/INST]` : `${message.text}`))
      .join('\n')
    return system_prompt + '\n' + history
  }
}
