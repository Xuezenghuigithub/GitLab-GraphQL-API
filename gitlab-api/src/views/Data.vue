<template>
  <v-container v-if="step">
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          GitLab 数据展示页
        </h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <router-link to="/">
          <v-btn rounded color="info">
            返回首页
          </v-btn>
        </router-link>
      </v-col>

      <v-dialog v-model="dialog" persistent max-width="350">
        <v-card>
          <v-card-title class="title">需先前往 GitLab 授权</v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="goToAuthorize">前往授权</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col>
        <v-data-table :headers="headers" v-if="this.projectData" :items="this.projectData.issues.nodes" item-key="title"
          class="elevation-1">
        </v-data-table>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import queriesAPI from "../graphql/queries";

export default {
  name: "Data",
  data: () => ({
    step: true,
    dialog: false,
    projectData: null,
    headers: [
      { text: "标题", align: "start", value: "title" },
      { text: "创建人", value: "author.name" },
      { text: "创建日期", sortable: true, value: "createdAt" }
    ]
  }),
  mounted() {
    this.getToken();
  },
  methods: {
    // 获取 Access Token
    async getToken() {
      const apolloToken = window.localStorage.getItem("apollo-token");

      if (!apolloToken && !this.$route.query.code) {
        // 没有 Token 也没有 code
        this.dialog = true;
        return;
      }
      this.getData();

      if (this.$route.query.code) {
        const { data } = await this.$axios.post("/api/token", {
          code: this.$route.query.code
        });

        if (data.status === 200 && data.result.access_token) {
          window.localStorage.setItem("apollo-token", data.result.access_token);
          this.getData();
        } else {
          console.log("获取 Access Token 失败");
        }
      }
    },
    // 获取请求 code 的 url
    async goToAuthorize() {
      this.dialog = false;
      const params = { state: "Zander" };
      const { data } = await this.$axios.get("/api/codeRequestUrl", { params });

      if (data.status === 200) {
        location.href = data.result;
      } else {
        console.log("获取 url 失败");
      }
    },
    // 获取 API 数据
    async getData() {
      window.localStorage.setItem("apollo-token", "asdadasd");
      const res = await this.$apollo.query({
        query: queriesAPI.project,
        variables: {
          fullPath: "bel-star/mis/rd/eportal"
        }
      });
      this.projectData = res.data.project;
      if (this.projectData) {
        this.projectData.issues.nodes.map(item => {
          // 时间格式转换
          item.createdAt = new Date(+new Date(item.createdAt) + 8 * 3600 * 1000)
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
        });
      }
    }
  }
};
</script>