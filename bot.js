const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: "dukrum69.aternos.me",
    port: 25854,
    username: "AFK_Bot",
    version: false
  })

  bot.on('spawn', () => {
    console.log("[AFK] Bot connected.")

    // Random movement every 10 seconds
    setInterval(() => {
      if (!bot.player) return

      const actions = ["forward", "back", "left", "right", "jump"]
      const action = actions[Math.floor(Math.random() * actions.length)]

      if (action === "jump") {
        bot.setControlState("jump", true)
        setTimeout(() => bot.setControlState("jump", false), 300)
      } else {
        bot.setControlState(action, true)
        setTimeout(() => bot.setControlState(action, false), 400)
      }

      console.log("[AFK] Movement:", action)
    }, 10000) // every 10 seconds
  })

  bot.on('death', () => {
    console.log("[AFK] Bot died — respawning...")
    setTimeout(() => bot.respawn(), 1000)
  })

  bot.on('end', () => {
    console.log("[AFK] Bot disconnected — reconnecting in 5 seconds...")
    setTimeout(startBot, 5000)
  })

  bot.on('kicked', (reason) => {
    console.log("[AFK] Kicked:", reason)
  })

  bot.on('error', (err) => {
    console.log("[AFK] Error:", err)
  })
}

startBot()
