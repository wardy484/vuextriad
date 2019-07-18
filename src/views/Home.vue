<template>
  <div class="flex h-screen w-screen content-center justify-center flex-wrap pt-10">
    <card-select class="mt-10" v-if="!inGame" />

    <div v-else class="w-full container">
      <h1 class="text-3xl w-full text-center">Player: {{ currentPlayer }}</h1>

      <div class="flex container text-center">
        <div class="w-2/12">
          <div
            class="bg-blue-500 w-full h-48 mb-5"
            v-for="(card, index) in player1Hand.cards"
            :key="card.id"
          >
            <card :card="card" @click.native="selectCard({ index, hand: 1})" />
          </div>
        </div>

        <div class="flex w-8/12 p-5 flex-wrap content-center justify-center">
          <div v-for="(row, x) in board.rows" :key="x" class="flex w-full">
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
          <div
            class="bg-blue-500 w-full h-48 mb-5"
            v-for="(card, index) in player2Hand.cards"
            :key="card.id"
          >
            <card :card="card" @click.native="selectCard({ index, hand: 2})" />
          </div>
        </div>
      </div>
      <div class="container flex justify-between">
        <div class="text-2xl text-bold">Score: {{ player1Score }}</div>
        <div class="text-2xl text-bold">Score: {{ player2Score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from "@/components/Cell";
import Card from "@/components/Card";
import CardSelect from "@/components/CardSelect";

import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "home",

  components: {
    Cell,
    Card,
    CardSelect
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions(["selectCard", "playSelectedCard", "startGame"])
  },

  computed: {
    ...mapState([
      "selectedCard",
      "board",
      "currentPlayer",
      "player1Hand",
      "player2Hand",
      "inGame"
    ]),
    ...mapGetters(["player1Score", "player2Score"])
  }
};
</script>
