<template>
  <v-container v-if="step">
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          首页
        </h1>
      </v-col>
      
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-5" cols="12">
        <router-link to="data">
          <v-btn @click="hide" rounded color="info">
            跳转至 GitLab API 数据展示页
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    step: true
  }),
  methods: {
    hide(){
      this.step = !this.step;
    }
  },
};
</script>