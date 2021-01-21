export const tmi = {
  options: {
    clientId: process.env["TWITCH_CLIENT_ID"] || "",
    debug: false
  },
  connection: {
    reconnect: true,
    secure: true
  }
}