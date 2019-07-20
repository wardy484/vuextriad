<template>
  <div class="flex text-center flex-row flex-wrap justify-center container">
    <div class="h-56 w-1/6 m-5" v-for="(card, index) in cards" :key="index">
      <card :card="card" @click.native="selectCard(card)" />
    </div>

    <div class="container flex justify-center">
      <div
        class="text-red-600"
        v-if="showError && !this.hasSelectedFiveCards"
      >You must select 5 cards to continue...</div>
    </div>

    <div class="container flex justify-end">
      <button
        @click="start"
        class="bg-blue-500 py-3 px-5 text-white border-2 border-blue-300 shadow hover:bg-blue-700"
      >Start match!</button>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import Hand from "@/app/Hand";
import Cards from "@/data/cards.json";

import { mapMutations, mapActions } from "vuex";

export default {
  components: {
    Card
  },

  data() {
    return {
      cards: Cards,
      hand: new Hand([]),
      showError: false
    };
  },

  methods: {
    ...mapActions(["startGame"]),
    ...mapMutations(["setPlayer1Hand"]),

    selectCard(card) {
      if (!this.hasSelectedFiveCards && !card.selected) {
        card.belongsTo = 1;

        this.hand.addCard(card);

        card.selected = true;
      } else {
        this.hand.removeCardByName(card);
        card.selected = false;
        card.belongsTo = null;
      }
    },

    start() {
      if (this.hasSelectedFiveCards) {
        this.setPlayer1Hand(this.hand);
        this.startGame();
        this.$router.push({ name: "game" });
      } else {
        this.showError = true;
      }
    }
  },

  computed: {
    hasSelectedFiveCards() {
      return this.hand.cards.length >= 5;
    }
  }
};
</script>
