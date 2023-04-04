import { PythonShell } from 'python-shell'

export default async function (req, res1) {

    console.log("values passed to execution: " + req.body.noOfNurses +  " and " + req.body.noOfShifts)
    let options = {
        scriptPath: "D:/Alberta/winter-2023/CMPUT604/projects/CMPUT604-NSP/pages/api/",
        args: [req.body.noOfNurses, req.body.noOfShifts, req.body.imageName, req.body.conflictGroup1, req.body.conflictGroup2]
    }
    var pythonProgram;
    if (req.body.typeOfConstraints == "1") {
        pythonProgram="nurse_scheduling_initial.py"
    } else if (req.body.typeOfConstraints == "2") {
        pythonProgram="nurse_scheduling.py"
    } else {
        pythonProgram="nurse_scheduling_conflicted.py"
    }
    PythonShell.run(pythonProgram, options, (err, res) => {
    if (err) console.log(err);
    if (res) {console.log("python script result: " + res);
            return res1.status(200).json({ result: res })
    }
    });
}