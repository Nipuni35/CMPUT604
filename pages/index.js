import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState();
  const [output, setOutput] = useState();
  const [nurses, setNurses] = useState('');
  const [shifts, setShifts] = useState('');

  async function executeSheduler(event) {
  console.log("executeSheduler method started: Nurses: " + nurses , " and Shifts: " + shifts)
  event.preventDefault();
        const response = await fetch("/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noOfNurses: nurses , noOfShifts: shifts}),
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
        <br/>

      </main>
            <main className={styles.userInputs}>
            <div className={styles.nursesBox}>
       <label>Number of Nurses     </label>
                <input type="number" value={nurses} onChange={(event)=>setNurses(event.target.value)} className={styles.inputStyle}
         />

                        <label>Number of Shifts       </label>
                <input type="number" value={shifts} onChange={(event)=>setShifts(event.target.value)}  className={styles.inputStyle}/>
                                                      <input className={styles.evaluateBtn} onClick={executeSheduler} type="submit" value="Make Schedule"/>

                </div>

                </main>
<div>
      <h4 id="outputResponse" className={styles.boxResults} hidden={output == null}></h4>
        <img src="/schedule.png" className={styles.result_image} hidden={output == null} />
</div>
    </div>
  );
}
