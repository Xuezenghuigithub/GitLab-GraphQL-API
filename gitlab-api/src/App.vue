<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-flex class="headline">
        用 GraphQL 玩 GitLab API
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/Xuezenghuigithub/GitLab-GraphQL-API" target="_blank" text>
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
<style>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
