<template>
  <div class="flex h-screen w-screen content-center justify-center flex-wrap pt-10">
    <h1 class="text-6xl text-black">{{ message }}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["player1Score", "player2Score"]),

    message() {
      if (this.player1Score > this.player2Score) {
        return "Winner!";
      } else if (this.player1Score === this.player2Score) {
        return "Draw!";
      } else {
        return "You lose!";
      }
    }
  }
};
</script>
