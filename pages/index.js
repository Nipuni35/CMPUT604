import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [queryInput, setQueryInput] = useState("");
  const [goldQueryInput, setGoldQueryInput] = useState("");
  const [result, setResult] = useState();
  const [output, setOutput] = useState();
  const [goldQuery, setGoldQuery] = useState();
  const [codex, setCodexSelected] = useState(false);
  const [gptDavinci, setGptDavinci] = useState(false);
  const [gptCurie, setGptCurie] = useState(false);

  async function executeQuery(event) {
  console.log("executeQuery method started: " + result)
  event.preventDefault();
        const response = await fetch("/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: result , goldQuery: goldQueryInput}),
        });
      const data = await response.json();
      console.log(data)
      setOutput(data.result);
      data.result.forEach(function(item, index, arr) {
          document.getElementById('outputResponse').innerHTML += '<p>' + item + '<br/>' + '</p>'
          })
      }

  return (
    <div>
      <Head>
        <title>Nurse Scheduling System</title>
        <link rel="icon" href="/img_1.png" />
      </Head>

      <main className={styles.main}>
        <img src="/img_1.png" className={styles.icon} />
        <h3>Nurse Scheduling System</h3>
        <form >
        <label>Number of Nurses</label>
          <input className={styles.submitBtn} type="text" value="0" />
          <br/>
                  <label>Number of Shifts</label>
          <input className={styles.submitBtn} type="text" value="0" />
        </form>
      </main>
      <input className={styles.evaluateBtn} onClick={executeQuery} type="submit" value="Evaluate Query"/>

      <main className={styles.boxResults}>

      <h4 id="outputResponse"></h4>

      </main>
    </div>
  );
}
