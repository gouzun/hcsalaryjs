import { hcSignOut, hcSignIn, generateProjectList, generateSalarySheet, addNewFBProject, generateWorkerList, addNewFBWorker, addNewFBSalary, loadValue, data } from './db.js';
const email = document.getElementById('loginEmail');
const pw = document.getElementById('loginPassword');
const btnLogin = document.getElementById('loginBtn');
const linkLogOut = document.getElementById('linkLogOut');
const formlogin = document.getElementById('formlogin');
const navheader = document.getElementById('navheader');
const spinner = document.getElementById('spinner');
const formSalarySheet = document.getElementById('formSalarySheet');
const linkSalarySheet = document.getElementById('linkSalarySheet');
const formProject = document.getElementById('formProject');
const btnAddProject = document.getElementById('btnAddProject');
const btnAddWorker = document.getElementById('btnAddWorker');
const linkWorker = document.getElementById('linkWorker');
const formSalary = document.getElementById('formSalary');

let selectAddWorker = document.getElementById('selectAddWorker');
let selectAddProject = document.getElementById('selectAddProject');
let selectSalaryMth = document.getElementById('selectSalaryMth');
let selectSalaryYear = document.getElementById('selectSalaryYear');


function init() {

    if (localStorage.getItem('status')) {
        let name = localStorage.getItem('status');
        console.log(`You ${name} are logged in.`);
        displayMenu();
    }
    else {
        console.log('You are not logged in');
        displayLogin();
    }

}


function displayLogin() {
    formlogin.style.display = "block";
    formlogin.style.animation = "showMe 1.5s forwards";
    navheader.style.animation = "hideMe 1.5s forwards";
    formSalarySheet.style.display = "none";
    formWorker.style.display = "none";
    formProject.style.display = "none";
    formSalary.style.display = "none";
}

function displayMenu() {
    formlogin.style.animation = "hideMe 1.5s forwards";
    navheader.style.display = "block";
    navheader.style.animation = "showMe 1.5s forwards";
    displaySalarySheet();
}

function displaySalarySheet() {
    formlogin.style.display = "none";
    formWorker.style.display = "none";
    formProject.style.display = "none";
    formSalary.style.display = "none";
    formSalarySheet.style.display = "block";
    formSalarySheet.style.animation = "showMe 1.5s forwards";
}

function displayProjectSheet() {
    formlogin.style.display = "none";
    formWorker.style.display = "none";
    formSalarySheet.style.display = "none";
    formSalary.style.display = "none";
    formProject.style.display = "block";
    formProject.style.animation = "showMe 1.5s forwards";
}

function displayWorkerSheet() {
    formlogin.style.display = "none";
    formSalarySheet.style.display = "none";
    formProject.style.display = "none";
    formSalary.style.display = "none";
    formWorker.style.display = "block";
    formWorker.style.animation = "showMe 1.5s forwards";
}

function displaySalary() {
    formlogin.style.display = "none";
    formSalarySheet.style.display = "none";
    formProject.style.display = "none";
    formWorker.style.display = "none";
    formSalary.style.display = "block";
    formSalary.style.animation = "showMe 1.5s forwards";
}

async function generateWorkerDropDown() {
    let searchMarkup = '';
    let tempProjectHolder = '';

    tempProjectHolder = await generateWorkerList().then(function (result) {
        searchMarkup = result.addSalaryMarkup;
    });

    const AddW = document.querySelector('#selectAddWorker');
    AddW.innerHTML = '';
    AddW.insertAdjacentHTML('beforeend', searchMarkup);


}


async function generateProjectDropDown() {
    let searchMarkup = '';
    let tempProjectHolder = '';

    tempProjectHolder = await generateProjectList().then(function (result) {
        searchMarkup = result.viewSalarySheetMarkup;
    });

    const projectddElement = document.querySelector('#projectValue');
    projectddElement.innerHTML = '';
    projectddElement.insertAdjacentHTML('beforeend', searchMarkup);

    const AddP = document.querySelector('#selectAddWProject');
    AddP.innerHTML = '';
    AddP.insertAdjacentHTML('beforeend', searchMarkup);

    const AddS = document.querySelector('#selectAddProject');
    AddS.innerHTML = '';
    AddS.insertAdjacentHTML('beforeend', searchMarkup);
}

async function generateProjectRows() {
    let addViewProjectMarkup = '';
    let tempProjectHolder = '';
    try {
        tempProjectHolder = await generateProjectList().then(function (result) {
            addViewProjectMarkup = result.addViewProjectMarkup;
            const projectddElement = document.querySelector('#projectTableBody');
            projectddElement.innerHTML = '';
            projectddElement.insertAdjacentHTML('beforeend', addViewProjectMarkup);
            let dMessage = "projectListdMessage";
            generateRecordCountMsg(result.rowcount, dMessage);
        });


    } catch (err) {
        console.log(`generateProjectRows():${err.message}`);
    }

}

async function generateWorkerRows() {
    let addWorkerMarkup = '';
    let tempProjectHolder = '';
    try {
        tempProjectHolder = await generateWorkerList().then(function (result) {
            addWorkerMarkup = result.addViewWorkerMarkup;

            const tableElement = document.querySelector('#workerTableBody');
            tableElement.innerHTML = '';
            tableElement.insertAdjacentHTML('beforeend', addWorkerMarkup);
            let dMessage = "workerListdMessage";
            generateRecordCountMsg(result.rowcount, dMessage);
        });


    } catch (err) {
        console.log(`generateWorkerRows():${err.message}`);
    }

}

async function generateSalarySheetRows() {
    let projectValue = document.getElementById('projectValue');
    let mthValue = document.getElementById('mthValue');
    let yearValue = document.getElementById('yearValue');

    let markup = '';
    let tempSalaryHolder = '';
    tempSalaryHolder = await generateSalarySheet(projectValue.value, mthValue.value, yearValue.value).then(function (result) {
        markup = result.markup;
        //generate html with records
        const tableBodyElement = document.querySelector('#tablebody');
        tableBodyElement.innerHTML = '';
        tableBodyElement.insertAdjacentHTML('beforeend', markup);
        let dMessage = "dMessage";
        generateRecordCountMsg(result.rowcount, dMessage);
    });
}

function generateRecordCountMsg(rowcount, dMessage) {

    const totalRowCount = document.querySelector(`#${dMessage}`);
    totalRowCount.innerHTML = '';
    let rowCountMsg = `<h5>Total ${rowcount - 1} record(s) found.</h5>`
    totalRowCount.insertAdjacentHTML('beforeend', rowCountMsg);
}

function addNewProject() {
    let addPName = document.getElementById('addPName');
    let addPLocation = document.getElementById('addPLocation');
    let addPMainCon = document.getElementById('addPMainCon');
    try {
        addNewFBProject(addPName.value, addPLocation.value, addPMainCon.value)
            .then(generateProjectRows());
        addPName.value = '';
        addPLocation.value = '';
        addPMainCon.value = '';
    } catch (err) {
        console.log(`addNewProject():${err.message}`);
    }
}

function addNewWorker() {
    let addWName = document.getElementById('addWName');
    let addWProject = document.getElementById('selectAddWProject');
    let addWScope = document.getElementById('addWScope');
    try {
        addNewFBWorker(addWName.value, addWProject.value, addWScope.value)
            .then(generateWorkerRows());
        addWName.value = '';
        addWProject.value = '';
        addWScope.value = '';
    } catch (err) {
        console.log(`addNewProject():${err.message}`);
    }
}

function addSalary() {
    selectAddWorker = document.getElementById('selectAddWorker');
    selectAddProject = document.getElementById('selectAddProject');

    selectSalaryMth = document.getElementById('selectSalaryMth');
    selectSalaryYear = document.getElementById('selectSalaryYear');
    let addRate = document.getElementById('addRate');
    let d1 = document.getElementById('d01');
    let d2 = document.getElementById('d02');
    let d3 = document.getElementById('d03');
    let d4 = document.getElementById('d04');
    let d5 = document.getElementById('d05');
    let d6 = document.getElementById('d06');
    let d7 = document.getElementById('d07');
    let d8 = document.getElementById('d08');
    let d9 = document.getElementById('d09');
    let d10 = document.getElementById('d10');
    let d11 = document.getElementById('d11');
    let d12 = document.getElementById('d12');
    let d13 = document.getElementById('d13');
    let d14 = document.getElementById('d14');
    let d15 = document.getElementById('d15');
    let d16 = document.getElementById('d16');
    let d17 = document.getElementById('d17');
    let d18 = document.getElementById('d18');
    let d19 = document.getElementById('d19');
    let d20 = document.getElementById('d20');
    let d21 = document.getElementById('d21');
    let d22 = document.getElementById('d22');
    let d23 = document.getElementById('d23');
    let d24 = document.getElementById('d24');
    let d25 = document.getElementById('d25');
    let d26 = document.getElementById('d26');
    let d27 = document.getElementById('d27');
    let d28 = document.getElementById('d28');
    let d29 = document.getElementById('d29');
    let d30 = document.getElementById('d30');
    let d31 = document.getElementById('d31');


    try {
        // let status='';
        // if(btnAddSalary.innerText = "Save"){
        //     status = 'save';
        // }
        // else{
        //     status = 'edit';
        // }

        addNewFBSalary(selectAddWorker.value, selectAddProject.value, addRate.value, selectSalaryMth.value, selectSalaryYear.value, d1.value, d2.value, d3.value, d4.value, d5.value, d6.value, d7.value, d8.value, d9.value, d10.value, d11.value, d12.value, d13.value, d14.value, d15.value, d16.value, d17.value, d18.value, d19.value, d20.value, d21.value, d22.value, d23.value, d24.value, d25.value, d26.value, d27.value, d28.value, d29.value, d30.value, d31.value).then(function () {
            selectAddWorker.value = ""; selectAddProject.value = ""; addRate.value = ""; selectSalaryMth.value = ""; selectSalaryYear.value = ""; d1.value = 0; d2.value = 0; d3.value = 0; d4.value = 0; d5.value = 0; d6.value = 0; d7.value = 0; d8.value = 0; d9.value = 0; d10.value = 0; d11.value = 0; d12.value = 0; d13.value = 0; d14.value = 0; d15.value = 0; d16.value = 0; d17.value = 0; d18.value = 0; d19.value = 0; d20.value = 0; d21.value = 0; d22.value = 0; d23.value = 0; d24.value = 0; d25.value = 0; d26.value = 0; d27.value = 0; d28.value = 0; d29.value = 0; d30.value = 0; d31.value = 0;
            selectAddWorker.focus();
        }

        );


    } catch (err) {
        console.log(`addSalary():${err.message}`);
    }
}

function generateSalaryForm() {
    let salaryTableBody = document.getElementById('salaryTableBody');
    let salaryTableMarkup = '';
    ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].forEach(function (day) {

        salaryTableMarkup += `<div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" >DAY ${day}</span>
        </div>
        <input type="number" class="form-control" value="0" id="d${day}">
      </div>`
    });

    salaryTableBody.innerHTML = '';
    salaryTableBody.insertAdjacentHTML('beforeend', salaryTableMarkup);

}

// async function savePdf() {
//     const element = document.getElementById("formSalarySheet");
//     const opt = {
//         margin: 1,
//         filename: "myfile.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
//     };

//     await html2pdf().set(opt).from(element).save();
// }

//EVENTS
// const btnSave = document.getElementById("saveaspdf");
// btnSave.addEventListener('click', async function () {
//     savePdf();
// });

let projectValue = document.getElementById('projectValue');
let mthValue = document.getElementById('mthValue');
let yearValue = document.getElementById('yearValue');

projectValue.addEventListener('change', async function () {
    if (projectValue.value === "Select Project" || mthValue.value === "Select Month") {
    } else {
        generateSalarySheetRows();
    }
});

mthValue.addEventListener('change', async function () {
    if (projectValue.value === "Select Project" || mthValue.value === "Select Month") {
    } else {
        generateSalarySheetRows();
    }
});

yearValue.addEventListener('change', async function () {
    // yearValue = document.getElementById('yearValue');
    // clearGrid();
    generateSalarySheetRows();
});

linkLogOut.addEventListener('click', function () {
    try {
        hcSignOut();
        displayLogin();
        email.value = '';
        pw.value = '';
    } catch (error) {
        console.log(`linkLogOut : ${error.code},${error.message}`);
    }

})

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        let e = email.value;
        let p = pw.value
        spinner.style.display = "inline-block";
        hcSignIn(e, p).then(function () {

            if (localStorage.getItem("status") != "") {
                console.log('You are logged in');
                displayMenu();

            }
            else {
                console.log('You are not logged in');
                displayLogin();
            }
            spinner.style.display = "none";
        });
    } catch (error) {
        console.log(`btnLogin : ${error.code},${error.message}`);
    }
});

linkSalarySheet.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        displaySalarySheet();
        generateProjectDropDown();
        generateSalarySheetRows();

    } catch (error) {
        console.log(`linkSalarySheet : ${error.code},${error.message}`);
    }
})

linkProject.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        displayProjectSheet();
        generateProjectRows();
        // generateProjectDropDown();
        // generateRows();

    } catch (error) {
        console.log(`linkProject : ${error.code},${error.message}`);
    }
});

linkWorker.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        displayWorkerSheet();
        generateProjectDropDown();
        generateWorkerRows();
        // generateRows();

    } catch (error) {
        console.log(`linkWorker : ${error.code},${error.message}`);
    }
});

linkSalary.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        displaySalary();
        generateSalaryForm();
        generateProjectDropDown();
        generateWorkerDropDown();
        // generateRows();

    } catch (error) {
        console.log(`linkWorker : ${error.code},${error.message}`);
    }
})

btnAddProject.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        addNewProject();
    } catch (error) {
        console.log(`btnAddProject : ${error.code},${error.message}`);
    }
});

btnAddWorker.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        addNewWorker();
        generateWorkerDropDown();
        generateProjectDropDown();
    } catch (error) {
        console.log(`btnAddWorker : ${error.code},${error.message}`);
    }
});

btnAddSalary.addEventListener('click', function (e) {
    e.preventDefault();
    try {
        addSalary();
        if (btnAddSalary.innerText = "Save") {
            alert("Salary Record Saved");
            btnAddSalary.innerText = "Add"
        }
        else {
            alert("New Salary Record Added");
        }

    } catch (error) {
        console.log(`btnAddSalary : ${error.code},${error.message}`);
    }
});

// loop all these elements to add the same event listener
[selectAddWorker,
    selectAddProject,
    selectSalaryMth,
    selectSalaryYear].forEach(function (ele) {
        ele.addEventListener('change', async function (e) {
            e.preventDefault();
            try {
                selectAddWorker = document.getElementById('selectAddWorker');
                selectAddProject = document.getElementById('selectAddProject');
                selectSalaryMth = document.getElementById('selectSalaryMth');
                selectSalaryYear = document.getElementById('selectSalaryYear');

                let fbkey = `${selectAddWorker.value}-${selectAddProject.value}-${selectSalaryMth.value}-${selectSalaryYear.value}`;
                await loadValue(fbkey).then(function () {

                    document.getElementById('d01').value = 0;
                    document.getElementById('d02').value = 0;
                    document.getElementById('d03').value = 0;
                    document.getElementById('d04').value = 0;
                    document.getElementById('d05').value = 0;
                    document.getElementById('d06').value = 0;
                    document.getElementById('d07').value = 0;
                    document.getElementById('d08').value = 0;
                    document.getElementById('d09').value = 0;
                    document.getElementById('d10').value = 0;
                    document.getElementById('d11').value = 0;
                    document.getElementById('d12').value = 0;
                    document.getElementById('d13').value = 0;
                    document.getElementById('d14').value = 0;
                    document.getElementById('d15').value = 0;
                    document.getElementById('d16').value = 0;
                    document.getElementById('d17').value = 0;
                    document.getElementById('d18').value = 0;
                    document.getElementById('d19').value = 0;
                    document.getElementById('d20').value = 0;
                    document.getElementById('d21').value = 0;
                    document.getElementById('d22').value = 0;
                    document.getElementById('d23').value = 0;
                    document.getElementById('d24').value = 0;
                    document.getElementById('d25').value = 0;
                    document.getElementById('d26').value = 0;
                    document.getElementById('d27').value = 0;
                    document.getElementById('d28').value = 0;
                    document.getElementById('d29').value = 0;
                    document.getElementById('d30').value = 0;
                    document.getElementById('d31').value = 0;
                    document.getElementById('addRate').value = 0;
                    if (data.length > 0) {
                        document.getElementById('d01').value = data[0];
                        document.getElementById('d02').value = data[1];
                        document.getElementById('d03').value = data[2];
                        document.getElementById('d04').value = data[3];
                        document.getElementById('d05').value = data[4];
                        document.getElementById('d06').value = data[5];
                        document.getElementById('d07').value = data[6];
                        document.getElementById('d08').value = data[7];
                        document.getElementById('d09').value = data[8];
                        document.getElementById('d10').value = data[9];
                        document.getElementById('d11').value = data[10];
                        document.getElementById('d12').value = data[11];
                        document.getElementById('d13').value = data[12];
                        document.getElementById('d14').value = data[13];
                        document.getElementById('d15').value = data[14];
                        document.getElementById('d16').value = data[15];
                        document.getElementById('d17').value = data[16];
                        document.getElementById('d18').value = data[17];
                        document.getElementById('d19').value = data[18];
                        document.getElementById('d20').value = data[19];
                        document.getElementById('d21').value = data[20];
                        document.getElementById('d22').value = data[21];
                        document.getElementById('d23').value = data[22];
                        document.getElementById('d24').value = data[23];
                        document.getElementById('d25').value = data[24];
                        document.getElementById('d26').value = data[25];
                        document.getElementById('d27').value = data[26];
                        document.getElementById('d28').value = data[27];
                        document.getElementById('d29').value = data[28];
                        document.getElementById('d30').value = data[29];
                        document.getElementById('d31').value = data[30];
                        document.getElementById('addRate').value = data[31];
                        console.log(`ok`);

                        btnAddSalary.innerText = "Save";

                    } else {
                        console.log(`empty data`);
                    }
                })

            } catch (error) {
                console.log(`loopElement : ${error.code},${error.message}`);
            }
        })
    });



init();