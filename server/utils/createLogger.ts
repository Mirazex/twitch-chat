import chalk, { Level } from "chalk"

enum LevelColors {
  trace = 'red',
  debug = 'magenta',
  info = 'blue',
  warn = 'yellow',
  error = 'red',
  fatal = 'bgRed'
}

type LevelType = keyof typeof LevelColors
export type LoggerType = {
  [logType: string]: (...messages: any[]) => void
}

// Create logger
export const createLogger = (): LoggerType => {
  const log = (level: LevelType) => (...messages: any[]) => {
    console.log(chalk.grey(`[${formatDate(new Date())}]`), chalk[LevelColors[level]](level), ...messages)
  }
  
  return {
    trace: log("trace"),
    debug: log("debug"),
    info: log("info"),
    warn: log("warn"),
    error: log("error"),
    fatal: log("fatal")
  }
}

function formatDate(date: Date) {
  let hours: any = date.getHours();
  let mins: any  = date.getMinutes();

  hours = (hours < 10 ? "0" : "") + hours;
  mins = (mins < 10 ? "0" : "") + mins;

  return `${hours}:${mins}`;
}
