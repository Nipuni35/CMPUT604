import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState();
  const [output, setOutput] = useState();
  const [initialConstraints, setInitialConstraints] = useState(false);
  const [threeConstraints, setThreeConstraints] = useState(false);
  const [fourConstraints, setFourConstraints] = useState(false);
  const [nurses, setNurses] = useState('');
  const [shifts, setShifts] = useState('');
  const [conflictGroupOne, setConflictGroupOne] = useState('');
  const [conflictGroupTwo, setConflictGroupTwo] = useState('');

  const handleInitialConstraint = () => {
      setInitialConstraints(!initialConstraints);
    };
  const handleThreeConstraints = () => {
      setThreeConstraints(!threeConstraints);
    };
  const handleFourConstraints = () => {
      setFourConstraints(!fourConstraints);
    };

  async function executeSheduler(event) {
  console.log("executeSheduler method started: Nurses: " + nurses , " and Shifts: " + shifts)
        setOutput(null);
         document.getElementById('outputResponse').innerHTML = "";
               var image = document.getElementById('res_image');
          image.src = null;
        event.preventDefault();
        let constraintType;
         if (initialConstraints == true) {
                constraintType = "1"
            }
            else if (threeConstraints == true) {
                constraintType = "2"
            }
            else if (fourConstraints == true) {
                constraintType = "3"
            }
        var imageFileName = "schedule" + Date. now() + ".png";
        const response = await fetch("/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noOfNurses: nurses , noOfShifts: shifts, imageName: imageFileName,
          typeOfConstraints: constraintType, conflictGroup1: conflictGroupOne, conflictGroup2: conflictGroupTwo}),
        });
      const data = await response.json();
      console.log(data)
      setOutput(data.result);
      data.result.forEach(function(item, index, arr) {
          document.getElementById('outputResponse').innerHTML += '<p>' + item + '<br/>' + '</p>'
          })
          console.log(imageFileName);
      image.src = "/" + imageFileName;
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
      <main className={styles.checkboxes}>
<label htmlFor="initialConstraint">
           <input type="checkbox" id="initialConstraints" name="Initial Constraints" value="yes" checked={initialConstraints}
           onChange={handleInitialConstraint}/>  Initial Constraints
        </label>
        <label htmlFor="threeConstraints">
                   <input type="checkbox" id="threeConstraints" name="Three Constraints with at least 2 Nurses" value="yes"  checked={threeConstraints}
                   onChange={handleThreeConstraints}/>  Modified Three Constraints
        </label>
        <label htmlFor="fourConstraints">
                   <input type="checkbox" id="fourConstraints" name="Four Constraints" value="yes" checked={fourConstraints}
                   onChange={handleFourConstraints}/>  Four Constraints
        </label>
      </main>
            <main className={styles.userInputs}>
            <div className={styles.nursesBox}>
       <label>Number of Nurses     </label>
                <input type="number" value={nurses} onChange={(event)=>setNurses(event.target.value)} className={styles.inputStyle}
         />

                        <label>Number of Days       </label>
                <input type="number" value={shifts} onChange={(event)=>setShifts(event.target.value)}  className={styles.inputStyle}/>
                <label>Conflict Group 1 (eg: 0,1,2)     </label>
                                <input type="text" value={conflictGroupOne} onChange={(event)=>setConflictGroupOne(event.target.value)}  className={styles.inputStyle}/>

              <label>Conflict Group 2 (eg: 3,4,5)     </label>
                                             <input type="text" value={conflictGroupTwo} onChange={(event)=>setConflictGroupTwo(event.target.value)}  className={styles.inputStyle}/>

                           <input className={styles.evaluateBtn} onClick={executeSheduler} type="submit" value="Make Schedule"/>

                </div>

                </main>
<div>
      <h4 id="outputResponse" className={styles.boxResults} hidden={output == null}></h4>
        <img id="res_image" className={styles.result_image} hidden={output == null} />
</div>
    </div>
  );
}
