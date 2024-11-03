import { Worker } from "worker_threads";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function ProcessPayments() {
    new Worker(__dirname+"/payments.ts", {
      execArgv: ['--loader', 'ts-node/esm'],
    });
}