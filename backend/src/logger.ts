// src/logger.ts
import { ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common'; // <-- Import ConsoleLoggerOptions
import * as fs from 'fs';
import * as path from 'path';

export class AppFileLogger extends ConsoleLogger {
  private logStream: fs.WriteStream;

  // Use ConsoleLoggerOptions type directly for consistency
  constructor(context?: string, options?: ConsoleLoggerOptions) {
    // Fix: Ensure context is always a string ('')
    // Fix: Ensure options is always a ConsoleLoggerOptions object ({} if undefined)
    super(context || '', options || {});

    const logDir = '/var/log/nestjs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.logStream = fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' });
  }

  log(message: any, context?: string) {
    super.log(message, context || ''); // Ensure context is always a string
    this.writeToStream('LOG', message, context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context || ''); // Ensure context is always a string
    this.writeToStream('WARN', message, context);
  }

  error(message: any, context?: string, trace?: string) {
    super.error(message, context || '', trace); // Ensure context is always a string
    this.writeToStream('ERROR', message, context, trace);
  }

  private writeToStream(level: string, message: any, context?: string, trace?: string) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] [${context || 'App'}] ${message}`;
    this.logStream.write(formattedMessage + '\n');
    if (trace) {
      this.logStream.write(trace + '\n');
    }
  }
}