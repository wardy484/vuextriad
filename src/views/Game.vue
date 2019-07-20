<template>
  <div class="flex h-screen w-screen content-center justify-center flex-wrap pt-10">
    <div class="w-full container">
      <h1 class="text-3xl w-full text-center">Player: {{ currentPlayer }}</h1>

      <div class="flex container text-center">
        <hand :player="1" />

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

        <hand :player="2" />
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
import Hand from "@/components/Hand";

import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { setTimeout } from "timers";

export default {
  components: {
    Cell,
    Card,
    Hand
  },

  methods: {
    ...mapActions(["playSelectedCard"]),
    ...mapMutations(["setGame"])
  },

  computed: {
    ...mapState(["selectedCard", "board", "currentPlayer", "inGame"]),
    ...mapGetters(["player1Score", "player2Score"])
  },

  watch: {
    board: {
      deep: true,
      handler(board) {
        if (board.isFull()) {
          setTimeout(() => {
            this.$router.push({ name: "end" });
            this.setGame(false);
          }, 2000);
        }
      }
    }
  }
};
</script>
