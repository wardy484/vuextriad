<template>
  <div class="flex h-screen w-screen content-center justify-center flex-wrap">
    <h1 class="text-3xl w-full text-center">Player: {{ currentPlayer }}</h1>

    <div class="flex container text-center">
      <div class="w-2/12">
        <div class="bg-blue-500 w-full h-32 mb-5" v-for="(card, index) in player1" :key="card.id">
          <card :card="card" @click.native="selectCard({ index, hand: 1})" />
        </div>
      </div>

      <div class="flex w-8/12 p-5 flex-wrap content-center justify-center">
        <div v-for="(row, x) in cells" :key="x" class="flex w-full">
          <cell
            v-for="(cell, y) in row"
            :key="y"
            :x-position="x"
            :y-position="y"
            @click.native="playSelectedCard({x, y})"
          />
        </div>
      </div>

      <div class="w-2/12">
        <div class="bg-blue-500 w-full h-32 mb-5" v-for="(card, index) in player2" :key="card.id">
          <card :card="card" @click.native="selectCard({ index, hand: 2})" />
        </div>
      </div>
    </div>
    <div class="container flex justify-between">
      <div class="text-2xl text-bold">Score: {{ player1Score }}</div>
      <div class="text-2xl text-bold">Score: {{ player2Score }}</div>
    </div>
  </div>
</template>

<script>
import Cell from "@/components/Cell.vue";
import Card from "@/components/Card.vue";

import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "home",

  components: {
    Cell,
    Card
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions(["selectCard", "playSelectedCard"])
  },

  computed: {
    ...mapState(["selectedCard", "cells", "currentPlayer"]),
    ...mapGetters(["player1", "player2", "player1Score", "player2Score"])
  }
};
</script>
