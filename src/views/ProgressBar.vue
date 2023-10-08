<template>
    <div id="progress-container">
        <div class="shell">
            <div class="bar" :style="{ width: progress + '%' }" >
                <span>{{ progress }}%</span>
            </div>
        </div>
        <button @click="makeProgress">+</button>
    </div>
</template>

<script>
// from https://codepen.io/joshbivens/pen/mPRovV
export default {
    name: "ProgressBar",
    data(){
        return {
            progress: 25
        }
    },
    methods: {
    makeProgress() {
      if(this.progress < 100) {
        this.progress += 5;
      }
    }
  }

}
</script>

<style scoped>
#progress-container {
  height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
  }
  
  .shell {
    height: 20px;
    width: 250px;
    border: 1px solid #aaa;
    border-radius: 13px;
    padding: 3px;
  }
  
  .bar {
    background: linear-gradient(to right, #B993D6, #8CA6DB);
    height: 20px;
    width: 15px;
    border-radius: 9px;
    span {
      float: right;
      padding: 4px 5px;
      color: #fff;
      font-size: 0.7em
    }
  }
  
  button {
    margin: 10px;
    border: 1px solid #aaa;
    background: none;
    border-radius: 50%;
    padding: 5px 8px;
    outline: none;
    cursor: pointer;
  }</style>