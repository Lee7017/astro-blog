import { useState } from "react";

export default function ReactTTS() {
  const [text, setText] = useState("");

  const run = async () => {
    await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={run}>生成语音</button>
    </div>
  );
}
