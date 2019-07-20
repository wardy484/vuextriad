<template>
  <div class="bg-gray-500 w-1/3 h-48 p-1 border-white border-2 border-white">
    <div v-if="cell.hasCard" class="h-full w-full">
      <transition name="flip" mode="in-out">
        <card :card="cell.card" v-if="cell.card.belongsTo === 1" />
        <card :card="cell.card" v-else />
      </transition>
    </div>
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
    ...mapState(["board"]),

    cell() {
      return this.board.getCell(this.xPosition, this.yPosition);
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

<style>
.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.flip-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>
