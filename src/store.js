import Vue from "vue";
import Vuex from "vuex";
import Cell from "./app/Cell";
// imp
import data from "@/hand.json";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentPlayer: 1,
    selectedCard: null,
    cells: [
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()]
    ]
  },

  getters: {
    player1(state) {
      return state.players[0];
    },

    player2(state) {
      return state.players[1];
    },

    player1Score(state) {
      let score = state.players[0].length;

      state.cells.forEach(row => {
        row.forEach(col => {
          if (col.hasCard && col.card.belongsTo === 1) {
            score++;
          }
        });
      });

      return score;
    },

    player2Score(state) {
      let score = state.players[1].length;

      state.cells.forEach(row => {
        row.forEach(col => {
          if (col.hasCard && col.card.belongsTo === 2) {
            score++;
          }
        });
      });

      return score;
    }
  },

  mutations: {
    setSelectedCard(state, card) {
      state.selectedCard = card;
    },

    removeCardFromHand(state, { player, index }) {
      const newArray = state.players[player - 1].filter(function(value, key) {
        return key !== index;
      });

      Vue.set(state.players, player - 1, newArray);
    },

    updateCell(state, { x, y, card }) {
      const currentHand = state.players[state.currentPlayer - 1];

      state.cells[x][y].placeCard(currentHand[card]);
    },

    setCurrentPlayer(state, newPlayer) {
      state.currentPlayer = newPlayer;
    },

    flipCard(state, { x, y }) {
      let card = state.cells[x][y].card;

      if (card.belongsTo === state.currentPlayer) return;

      if (state.currentPlayer === 1) {
        return (state.cells[x][y].card.belongsTo = 1);
      }

      state.cells[x][y].card.belongsTo = 2;
    }
  },

  actions: {
    selectCard({ state, commit }, { index, hand }) {
      if (state.currentPlayer === hand) {
        commit("setSelectedCard", index);
      }
    },

    nextTurn({ commit, state }) {
      if (state.currentPlayer === 1) {
        return commit("setCurrentPlayer", 2);
      }

      commit("setCurrentPlayer", 1);
    },

    async checkCards({ state, dispatch }, { x, y, cell }) {
      dispatch("checkNewCard", {
        targetX: x - 1,
        targetY: y,
        targetSide: "bottom",
        sourceSide: "top",
        cell
      });

      dispatch("checkNewCard", {
        targetX: x + 1,
        targetY: y,
        targetSide: "top",
        sourceSide: "bottom",
        cell
      });

      dispatch("checkNewCard", {
        targetX: x,
        targetY: y + 1,
        targetSide: "left",
        sourceSide: "right",
        cell
      });

      dispatch("checkNewCard", {
        targetX: x,
        targetY: y - 1,
        targetSide: "right",
        sourceSide: "left",
        cell
      });
    },

    checkNewCard(
      { state, commit },
      { targetX, targetY, targetSide, sourceSide, cell }
    ) {
      const targetRow = state.cells[targetX];

      if (!targetRow) {
        return;
      }

      const targetCell = targetRow[targetY];

      if (typeof targetCell === "undefined" || !targetCell.card) return;

      if (targetCell.card[targetSide] < cell.card[sourceSide]) {
        commit("flipCard", { x: targetX, y: targetY });
      }
    },

    playSelectedCard({ commit, state, dispatch }, { x, y }) {
      if (state.cells[x][y].hasCard || typeof state.selectedCard !== "number") {
        return;
      }

      commit("updateCell", {
        x,
        y,
        card: state.selectedCard
      });

      commit("removeCardFromHand", {
        player: state.currentPlayer,
        index: state.selectedCard
      });

      commit("setSelectedCard", null);

      dispatch("checkCards", {
        x,
        y,
        cell: state.cells[x][y]
      });

      dispatch("nextTurn");
    }
  }
});

Vue.set(store.state, "players", [[...data.player1], [...data.player2]]);

export default store;
