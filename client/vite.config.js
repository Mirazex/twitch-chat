import * as path from "path";
import * as fs from "fs";

const dotenv = require("dotenv")

export default {
  env: dotenv.parse(fs.readFileSync('.env')),
  alias: {
    '@/': path.resolve('./src'),
    vue: "vue/dist/vue.esm-bundler.js",
  },
  optimizeDeps: {
    include: [
      'lodash'
    ]
  }
};
