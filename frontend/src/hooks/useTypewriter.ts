import { useEffect, useState } from "react";

export function useTypewriter(text: string, speedMs = 35, startDelayMs = 0) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOutput("");
    setDone(false);
    let i = 0;
    let interval: number;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speedMs, startDelayMs]);

  return { output, done };
}
