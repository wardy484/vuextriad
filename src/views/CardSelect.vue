<template>
  <div class="flex h-screen w-screen content-center justify-center flex-wrap pt-10">
    <card-select class="mt-10" v-if="!inGame" />
  </div>
</template>

<script>
import CardSelect from "@/components/CardSelect";

import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: {
    CardSelect
  },

  methods: {
    ...mapActions(["startGame"])
  },

  computed: {
    ...mapState(["inGame"])
  }
};
</script>
