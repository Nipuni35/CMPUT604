import { PythonShell } from 'python-shell'

export default async function (req, res1) {

    console.log("values passed to execution: " + req.body.noOfNurses +  " and " + req.body.noOfShifts)
    let options = {
        scriptPath: "D:/Alberta/winter-2023/CMPUT604/projects/CMPUT604-NSP/pages/api/",
        args: [req.body.noOfNurses, req.body.noOfShifts, req.body.imageName]
    }
    PythonShell.run("nurse_scheduling.py", options, (err, res) => {
    if (err) console.log(err);
    if (res) {console.log("python script result: " + res);
            return res1.status(200).json({ result: res })
    }
    });
}