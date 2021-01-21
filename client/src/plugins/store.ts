import { createLogger, createStore } from "vuex";
import modules from "../store";

export const store = createStore({
  strict: true,
  plugins: [createLogger()],
  modules,
});
