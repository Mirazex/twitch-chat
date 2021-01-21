import "dotenv/config"

import { Server } from "./classes/Server"

async function bootstrap() {
  const server = new Server()
  
  server.listen(process.env.PORT || 5000)
}

bootstrap()