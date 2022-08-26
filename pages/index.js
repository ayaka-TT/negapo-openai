import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [negativeInput, setNegativeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ negative: negativeInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setNegativeInput("");
  }

  return (
    <div>
      <Head>
        <title>Negaposi</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>NegaPosi dictionally </h3>
        <p>I translate negative words into positive</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="negative"
            placeholder="E.g. Lazy"
            value={negativeInput}
            onChange={(e) => setNegativeInput(e.target.value)}
          />
          <input type="submit" value="Translate" />
        </form>
        <div className={styles.result}>{result}</div>
        <footer>
          <p>
            The translator: <a href="https://beta.openai.com/docs/introduction/key-concepts/">Open AI</a>
          </p>
          <p>
            Inspired by <a href="http://negapositen.web.fc2.com/">ネガポ辞典</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
