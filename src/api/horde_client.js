//import { v4 as uuidv4 } from 'uuid'

export class HordeClient {
  constructor(options = {}) {
    this.options = options
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
    ;(this.imgen_params = {
      n: 1,
      width: 64 * 8,
      height: 64 * 8,
      steps: 20,
      sampler_name: 'k_euler_a',
      cfg_scale: 7.5,
      denoising_strength: 0.6
    }),
      (this.workers = [])
  }
  getCompletion(options) {
    console.log('get completion', options)
  }
}
