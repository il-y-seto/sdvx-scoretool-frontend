<template>
  <v-container>
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="playerName1"
              label="Player 1"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="playerName2"
              label="Player 2"
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="1"
          >
            <v-btn
              color="primary"
              rounded
              outlined
            >
              Compare
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  components: {
    Logo
  },

  data: () => ({
    playerName1: '',
    playerName2: '',
  }),
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
