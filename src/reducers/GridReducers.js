import ActionTypes from "../constants/ActionTypes";
import GridRows from "../constants/GridRows";
import Scales from "../constants/Scales";
import _ from "lodash";

const gridState = {};

gridRows.forEach((row, index) => {
  _.range(row[0], row[1] + 1).forEach((note, column) => {
    gridState[note] = {
      id: note,
      color: null,
      enabled: false,
      row: index,
      column
    };
  });
});

const initialState = {
  currentColumn: 0,
  scale: scales.cMajorPentatonic,
  params: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.2,
    release: 0.4,
    waveType: "triangle",
    volume: -25
  },
  grid: gridState
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_GRID:
      return { ...state, grid: initialState.grid };

    case types.RESET_PARAMS:
      return { ...state, params: initialState.params };

    case types.TOGGLE_NOTE:
      const enabled = !state.grid[action.note].enabled;
      const color = enabled ? "green" : null;
      const note = state.grid[action.note];
      return { ...state, grid: { ...state.grid, [action.note]: { ...note, enabled, color } } };

    case types.SET_COLOR:
      return { ...state, grid: { ...state.grid, [action.note]: { ...state.grid[action.note], color: action.color } } };

    case types.SELECT_DEVICE:
      return { ...state, launchpad: action.device };

    case types.SET_DEVICE_LIST:
      return { ...state, devices: action.devices };

    case types.SET_NEXT_COLUMN:
      return { ...state, currentColumn: action.column };

    case types.SET_ATTACK:
      synth.set({ envelope: { attack: action.attack } });
      return { ...state, params: { ...state.params, attack: action.attack } };

    case types.SET_DECAY:
      synth.set({ envelope: { sustain: action.decay } });
      return { ...state, params: { ...state.params, decay: action.decay } };

    case types.SET_SUSTAIN: {
      synth.set({ envelope: { sustain: action.sustain } });
      return { ...state, params: { ...state.params, sustain: action.sustain } };
    }
    case types.SET_RELEASE:
      synth.set({ envelope: { release: action.release } });
      return { ...state, params: { ...state.params, release: action.release } };

    case types.SET_WAVE_TYPE:
      synth.set({ oscillator: { type: action.waveType } });
      return { ...state, params: { ...state.params, waveType: action.waveType } };

    case types.SET_VOLUME:
      synth.volume.value = action.volume;
      return { ...state, params: { ...state.params, volume: action.volume } };

    case types.SET_GRID_URL:
      return { ...state, gridUrl: action.url };

    case types.SET_SCALE:
      return { ...state, scale: action.scale };

    default:
      return state;
  }
};

export default gridReducer;