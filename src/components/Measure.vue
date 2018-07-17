<template>
  <div class="measure">
      <div class="strings" v-for="(string, key) in tab.strings" :key="key">
        <StringComponent :bars="string.bars" :tuning="string.tuning"/>
      </div>
  </div>
</template>

<script>
import StringComponent from "./String.vue";

export default {
  name: "Measure",
  components: {
    StringComponent
  },
  data: function() {
    return {
      tab: {
        strings: [
          {
            tuning: "e",
            bars: [
              {
                notes: ["3", "1", "1", "0"]
              },
              {
                notes: ["3", "1", "1", "0"]
              },
              {
                notes: ["3", "1", "1", "0"]
              },
              {
                notes: ["3", "1", "1", "0"]
              }
            ]
          },
          {
            tuning: "B",
            bars: [
              {
                notes: ["3", "3", "1", "1"]
              },
              {
                notes: ["3", "3", "1", "1"]
              },
              {
                notes: ["3", "3", "1", "1"]
              },
              {
                notes: ["3", "3", "1", "1"]
              }
            ]
          },
          {
            tuning: "G",
            bars: [
              {
                notes: ["0", "2", "2", "0"]
              },
              {
                notes: ["0", "2", "2", "0"]
              },
              {
                notes: ["0", "2", "2", "0"]
              },
              {
                notes: ["0", "2", "2", "0"]
              }
            ]
          },
          {
            tuning: "D",
            bars: [
              {
                notes: ["0", "0", "3", "2"]
              },
              {
                notes: ["0", "0", "3", "2"]
              },
              {
                notes: ["0", "0", "3", "2"]
              },
              {
                notes: ["0", "0", "3", "2"]
              }
            ]
          },
          {
            tuning: "A",
            bars: [
              {
                notes: ["2", "-", "3", "3"]
              },
              {
                notes: ["2", "-", "3", "3"]
              },
              {
                notes: ["2", "-", "3", "3"]
              },
              {
                notes: ["2", "-", "3", "3"]
              }
            ]
          },
          {
            tuning: "E",
            bars: [
              {
                notes: ["3", "-", "1", "-"]
              },
              {
                notes: ["3", "-", "1", "-"]
              },
              {
                notes: ["3", "-", "1", "-"]
              },
              {
                notes: ["3", "-", "1", "-"]
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

h1 {
  font-size: 48pt;
}

.annotations {
  font-size: 18pt;
  font-family: "Courier New", Courier, monospace;
}
</style>
