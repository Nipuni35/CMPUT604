import { PythonShell } from 'python-shell'

export default async function (req, res1) {

    let options = {
        scriptPath: "D:/Alberta/winter-2023/CMPUT604/projects/CMPUT604-NSP/pages/api/",
        args: [3, 11]
    }
    PythonShell.run("nurse_scheduling.py", options, (err, res) => {
    if (err) console.log(err);
    if (res) {console.log("python script result: " + res);
            return res1.status(200).json({ result: res })
    }
    });
}