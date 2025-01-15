type ParamsType = {
  func: () => void | Promise<void>;
  processName: string;
  successMessage?: string;
  errorMessage?: string;
  hiddenSuccessMessage?: boolean;
};

export async function logProcessTime({
  func,
  processName,
  successMessage,
  errorMessage,
  hiddenSuccessMessage = false,
}: ParamsType): Promise<number> {
  const start = process.hrtime();

  try {
    await func();

    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(0);

    if (!hiddenSuccessMessage) {
      logSuccessMessage(successMessage || `[${processName}] succeeded in ${durationMs}ms`);
    }

    return parseFloat(durationMs);
  } catch (error) {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(0);

    logErrorMessage(errorMessage || `[${processName}] failed after ${durationMs}ms.`);
    throw new Error(errorMessage || (error as Error).message);
  }
}

export function logSuccessMessage(message: string) {
  console.log(`✨${message}`);
}

export function logErrorMessage(message: string) {
  console.error(`❌${message}`);
}
