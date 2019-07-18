<template>
  <div class="flex text-center flex-row flex-wrap justify-center container">
    <div class="bg-blue-500 h-56 w-1/6 m-5" v-for="(card, index) in cards" :key="index">
      <card :card="card" @click.native="selectCard(card)" />
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
      hand: new Hand([])
    };
  },

  methods: {
    ...mapActions(["startGame"]),
    ...mapMutations(["setPlayer1Hand"]),

    selectCard(card) {
      if (this.hand.cards.length < 5 && !card.selected) {
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
      this.setPlayer1Hand(this.hand);
      this.startGame();
    }
  }
};
</script>
