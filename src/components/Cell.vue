<template>
  <div class="bg-gray-500 w-1/3 h-48 p-2 border-white border-4 border-white">
    <card :card="cell.card" v-if="cell.hasCard" />
  </div>
</template>

<script>
import Card from "@/components/Card";
import { mapState } from "vuex";

export default {
  components: {
    Card
  },

  computed: {
    ...mapState(["cells"]),

    cell() {
      return this.cells[this.xPosition][this.yPosition];
    }
  },

  props: {
    xPosition: {
      type: Number,
      required: true
    },

    yPosition: {
      type: Number,
      required: true
    }
  }
};
</script>
