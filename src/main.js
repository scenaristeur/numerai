import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
const locale = navigator.language
console.log(locale)

const i18n = createI18n({
  // something vue-i18n options here ...
  locale: locale || 'en', // set current locale

  messages: {
    fr: {
      //   hello: 'Salut！',
      Numerai_Planet: 'Planète Numerai',
      epopee: "L'épopée des aventuriers du numérique et de l'IA.",
      Life_Genesis: 'Génèse de la vie',
      Quantic_World: 'Monde quantique',
      Brou_enquete: 'Meurtre au Monastère de Brou',
      what_is_name: 'Pour commencer, quel est ton prénom?',
      firstname_placeholder: 'Ton prénom',
      are_you: 'Es-tu',
      a_girl: 'une fille',
      a_boy: 'un garçon',
      or: 'ou',
      choose_adventure: 'Choisis une aventure',
      trailer: {
        Numerai_Planet: `Lors du crash du vaisseau spatial, tu as été.e éjecté.e.
        Tu te reveilles seul.e allongé.e dans un endroit inconnu, surnaturel.
        Tu ne vois tes coéquipiers nulle part.
        Tu sens une présence près de toi, presque en toi...
        Tu tentes de t'adresser à elle...`,
        Life_Genesis: `Tu es est une cellule primitive et tu rencontres un autre cellule primitive.
        Vous vous trouvez dans la soupe primitive, milieu liquide chaud dans lequel la vie est supposée être apparue.
        Votre but est de vous associer avec d'autres cellules, d'aggréger des molécules, protéines, pour évoluer et devenir des êtres distincts autonomes.
        Deviendrez-vous des bactéries, puis des êtres vivants, plantes ou animaux ?`,
        Quantic_World: `Tu es un quanta, une particule élémentaire, comme un électron, et tu rencontre un autre quanta, comme toi.
        Vous vous trouvez dans le monde quantique, le monde de l'infiniment petit.
        Votre but est de vous associer avec d'autres quantas pour évoluer et devenir des êtres distincts autonomes.
        Vous devez tenter de devenir des entités de plus en plus complexes 
        selon les lois et les spécificités de la physique quantique, les propriétés des electrons, les photons, les atomes...
        Dualité onde-corpuscule, saut quantique et non-localité sont vos principales règles.
        Lorsque vous serez de taille suffisante vous vous conformerez au règles de la physique générale.`,
        Brou: `Un meurtre vient d'être commis au Monastère Royal de Brou.
        Tu es l'inspecteur chargé de l'enquête.
        La victime qui apparement se faisait passer pour une marchande d'art s'avère être une faussaire...
        Avec l'aide de ton assistant numérique intelligent, tu devras trouver qui l'a tuée, pour quelle raison et dans quelles circonstances...`
      },
      first_message: "Bonjour, y'a quelqu'un ? Où suis-je? Vous êtes qui?",
      communiquer: 'Comminiquer avec la présence ressentie...',
      envoyer: 'Envoyer',
      memory: 'Gestion de la mémoire',
      save: 'sauver',
      load: 'charger',
      horde_key_message: 'Pour générer les messages plus vite, tu peux obtenir une',
      home: 'Accueil',
      about: 'A propos',
      disclaimer:
        "Disclaimer : Cette aventure utilise des models de language, les réponse et propos qu'il fournit peuvent être sans fondement et totalement farfelus ! ",
      context_title: 'Le Contexte',
      context_content:
        "A la suite d'un malencontreux accident, tu te retrouveres sur la planète Num 7 erAi, une terre inexplorée où l'intelligence artificielle règne en maître.Ton objectif sera de découvrir les secrets cachés de cette planète afin de permettre à ton équipe de repartir à temps et de participer au hackathon interplanétaire sur l'IA.",
      adventure_title: "L'aventure",
      adventure_content:
        "Ne manque pas cette occasion incroyable de te lancer dans l'aventure du siècle et de découvrir les merveilles de l'intelligence artificielle. Embarque dès maintenant dans la navette spatiale et prépare-toi à être fasciné par les trésors cachés de Num 7 erAi !",
      collab_title: 'La Collaboration',
      collab_content:
        "N'hésite pas à partager cette aventure avec tes amis pour qu'ils t'aident dans cette aventure et à les inviter à rejoindre notre communauté d'explorateurs d'AI. Nous sommes ravis de t'accueillir dans ce monde unique et poussif, où les limites sont celles que tu te donneras."
    },
    en: {
      //   hello: 'Hello!',
      Numerai_Planet: 'Numerai Planet',
      epopee: 'The epic tale of digital and AI adventurers.',
      Life_Genesis: 'Life Genesis',
      Quantic_World: 'Quantic World',
      what_is_name: 'To begin with, what is your first name?',
      firstname_placeholder: 'Your firstname',
      are_you: 'Are you',
      a_girl: 'a girl',
      a_boy: 'a boy',
      or: 'or',
      choose_adventure: 'Choose an adventure',
      trailer: {
        Numerai_Planet: `When the spaceship crashed, you were ejected. You wake up alone, lying in an unknown, supernatural place. You don't see your teammates anywhere. You feel a presence near you, almost within you... You try to speak to it...`,
        Life_Genesis: `You are a primitive cell and you meet another primitive cell.
        You find yourself in the primitive soup, a warm liquid medium in which life is supposed to have appeared.
        Your goal is to associate with other cells, to aggregate molecules, proteins, to evolve and become distinct autonomous beings.
        Will you become bacteria, then living beings, plants or animals?`,
        Quantic_World: `You are a quanta, an elementary particle, like an electron, and you encounter another quanta, like you.
        You find yourself in the quantum world, the world of the infinitely small.
        Your goal is to associate with other quanta to evolve and become autonomous, distinct beings.
        You must try to become more and more complex entities
        according to the laws and specificities of quantum physics, the properties of electrons, photons, atoms...
        Wave-particle duality, quantum jump and non-locality are your main rules.
        When you are of sufficient size you will conform to the rules of general physics.`
      },
      first_message: 'Hello, is anyone there? Where am I? Who are you?',
      communiquer: 'Communicate with the felt presence...',
      envoyer: 'Send',
      memory: 'Memory management:',
      save: 'save',
      load: 'load',
      horde_key_message: 'To generate messages faster, you can get a',
      home: 'Home',
      about: 'About',
      disclaimer:
        'Disclaimer: This adventure uses language models, the answers and statements it provides may be unfounded and totally crazy!',
      context_title: 'The Context',
      context_content:
        'Following an unfortunate accident, you will find yourself on the planet Num 7 erAi, an unexplored land where artificial intelligence reigns supreme. Your goal will be to discover the hidden secrets of this planet in order to allow your team to leave in time and participate in the interplanetary AI hackathon.',
      adventure_title: 'The Adventure',
      adventure_content:
        "Don't miss this incredible opportunity to embark on the adventure of the century and discover the wonders of artificial intelligence. Board the space shuttle now and prepare to be fascinated by the hidden treasures of Num 7 erAi!",
      collab_title: 'Collaboration',
      collab_content:
        "Don't hesitate to share this adventure with your friends so that they can help you in this adventure and invite them to join our community of AI explorers. We are delighted to welcome you into this unique and windy world, where the limits are those that you give yourself."
    },
    ja: {
      //   hello: 'こんにちは！',
      what_is_name: 'まず、あなたの名前は何ですか?'
    }
  }
})

app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
