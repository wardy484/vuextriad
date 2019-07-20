<template>
  <div class="w-1/6">
    <div class="w-full h-48 mb-1" v-for="(card, index) in hand.cards" :key="card.id">
      <card :card="card" @click.native="selectCard({ index, hand: player})" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    Card
  },

  props: {
    player: {
      type: Number,
      required: true
    }
  },

  methods: {
    ...mapActions(["selectCard"])
  },

  computed: {
    hand() {
      return this.$store.state["player" + this.player + "Hand"];
    }
  }
};
</script>
