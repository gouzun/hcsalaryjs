// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import { CONST_APIKEY, CONST_DOMAIN, CONST_ID, CONST_BUCKET, CONST_SENDERID, CONST_APPID, CONST_MEASUREMENTID } from './external.js';


const firebaseConfig = {
  apiKey: CONST_APIKEY,
  authDomain: CONST_DOMAIN,
  projectId: CONST_ID,
  storageBucket: CONST_BUCKET,
  messagingSenderId: CONST_SENDERID,
  appId: CONST_APPID,
  measurementId: CONST_MEASUREMENTID
};


// Initialize Firebase
export function initializeDb() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
}

function getCurrentDateTime() {
  let currentdate = new Date();
  let datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  return datetime;
}


export async function hcSignIn(email, password) {

  const db = initializeDb();
  const auth = getAuth();

  await signInWithEmailAndPassword(auth, email, password)
    .then(
      function () {
        localStorage.setItem("status", email);
        console.log(`localStorage =${localStorage.getItem("status")}`);
      })
    .catch(function () {
      loginMessage.textContent = `Incorrect user name / password. Please try again.`;
      localStorage.setItem("status", "");
    });
};

export function hcSignOut() {
  const db = initializeDb();
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log(`user logged out.`);
    localStorage.setItem("status", "");
  }).catch((error) => {
    console.log(`Error :${error.code},${error.message}`);
  });
};

export async function addNewFBProject(name, location, maincon) {
  const dbPL = initializeDb();
  //get records for projectlist and generate select option
  const dbProjectList = collection(dbPL, 'ProjectList');


  try {

    //create new doc with custom id;
    const docRef = doc(dbPL, "ProjectList", `${name}-${location}-${maincon}`);

    const newData = {
      Location: location,
      MainConName: maincon,
      ProjectName: name,
      creator: localStorage.getItem('status'),
      createdDate: getCurrentDateTime(),
      lastModifiedDate: getCurrentDateTime()
    }
    // await addDoc(dbProjectList, newData)
    await setDoc(docRef, newData);

  } catch (error) {
    console.log(`Error :${error.code},${error.message}`);
  };
}

export async function addNewFBWorker(name, project, workscope) {
  const dbPL = initializeDb();
  //get records for projectlist and generate select option
  const dbProjectList = collection(dbPL, 'WorkerList');

  try {

    //create new doc with custom id;
    const docRef = doc(dbPL, "WorkerList", `${name}-${project}-${workscope}`);

    const newData = {
      Name: name,
      Project: project,
      WorkScope: workscope,
      creator: localStorage.getItem('status'),
      createdDate: getCurrentDateTime(),
      lastModifiedDate: getCurrentDateTime()
    }
    // await addDoc(dbProjectList, newData)
    await setDoc(docRef, newData);

  } catch (error) {
    console.log(`Error :${error.code},${error.message}`);
  };
}

export async function addNewFBSalary(selectAddWorker, selectAddProject, addRate, selectSalaryMth, selectSalaryYear, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31) {
  const dbPL = initializeDb();
  //get records for projectlist and generate select option
  const dbProjectList = collection(dbPL, 'SalaryList');

  try {

    //create new doc with custom id;
    const docRef = doc(dbPL, "SalaryList", `${selectAddWorker}-${selectAddProject}-${selectSalaryMth}-${selectSalaryYear}`);

    const newData = {
      WorkerName: selectAddWorker,
      Project: selectAddProject,
      DayRate: parseInt(addRate),
      SalaryMth: selectSalaryMth,
      SalaryYear: selectSalaryYear,
      D1: parseInt(d1),
      D2: parseInt(d2),
      D3: parseInt(d3),
      D4: parseInt(d4),
      D5: parseInt(d5),
      D6: parseInt(d6),
      D7: parseInt(d7),
      D8: parseInt(d8),
      D9: parseInt(d9),
      D10: parseInt(d10),
      D11: parseInt(d11),
      D12: parseInt(d12),
      D13: parseInt(d13),
      D14: parseInt(d14),
      D15: parseInt(d15),
      D16: parseInt(d16),
      D17: parseInt(d17),
      D18: parseInt(d18),
      D19: parseInt(d19),
      D20: parseInt(d20),
      D21: parseInt(d21),
      D22: parseInt(d22),
      D23: parseInt(d23),
      D24: parseInt(d24),
      D25: parseInt(d25),
      D26: parseInt(d26),
      D27: parseInt(d27),
      D28: parseInt(d28),
      D29: parseInt(d29),
      D30: parseInt(d30),
      D31: parseInt(d31),
      creator: localStorage.getItem('status'),
      createdDate: getCurrentDateTime(),
      lastModifiedDate: getCurrentDateTime()
    }
    // await addDoc(dbProjectList, newData)
    await setDoc(docRef, newData);

  } catch (error) {
    console.log(`Error :${error.code},${error.message}`);
  };
}

export async function generateProjectList() {
  const dbPL = initializeDb();
  //get records for projectlist and generate select option
  const dbProjectList = collection(dbPL, 'ProjectList');
  const dbProjectDocs = await getDocs(dbProjectList);
  let viewSalarySheetMarkup = ``;
  let addViewProjectMarkup = ``;
  let rowcount = 1;

  const projectRecords = dbProjectDocs.docs.map(function (doc) {
    viewSalarySheetMarkup = viewSalarySheetMarkup + `<option value="${doc.get('ProjectName')}">${doc.get('ProjectName')}</option>`;
    addViewProjectMarkup = addViewProjectMarkup + `<tr><th scope="row">${rowcount}</th>
      <td>${doc.get('ProjectName')}</td>
      <td>${doc.get('Location')}</td>
      <td>${doc.get('MainConName')}</td></tr>`;
    rowcount++;


  });

  // await Promise.all(projectRecords);
  return { viewSalarySheetMarkup, addViewProjectMarkup, rowcount };
}

export async function generateWorkerList() {
  const dbPL = initializeDb();
  //get records for projectlist and generate select option
  const dbList = collection(dbPL, 'WorkerList');
  const dbDocs = await getDocs(dbList);

  let addViewWorkerMarkup = ``;
  let addSalaryMarkup = ``;
  let rowcount = 1;

  const workerRecords = dbDocs.docs.map(function (doc) {

    addViewWorkerMarkup = addViewWorkerMarkup + `<tr><th scope="row">${rowcount}</th>
      <td>${doc.get('Name')}</td>
      <td>${doc.get('Project')}</td>
      <td>${doc.get('WorkScope')}</td></tr>`;

    addSalaryMarkup = addSalaryMarkup + `<option value="${doc.get('Name')}">${doc.get('Name')}</option>`;

    rowcount++;
  });

  return { addViewWorkerMarkup, addSalaryMarkup, rowcount };
}


export async function generateSalarySheet(projectV, mthV, yearV) {
  const dbSL = initializeDb();
  //get records for salarylist
  const dbSalaryList = collection(dbSL, 'SalaryList');
  const dbSalaryDocs = await getDocs(dbSalaryList);

  //retrive data from firebase and generate into html markup

  let rowcount = 1;
  let markup = '';
  let totalAmt = 0;
  await dbSalaryDocs.docs.map(function (doc) {
    // console.log(doc.data());
    // console.log(doc.id);
    // console.log(doc.get('Project'));
    // console.log(doc.get('WorkerName'));
    // console.log(doc.get('DayRate'));
    // console.log(doc.get('SalaryMth'));
    // console.log(doc.get('SalaryYear'));
    // console.log(`${projectV},${mthV},${yearV}`);

    // console.log(`${typeof projectV}===${typeof doc.get('Project')}`);
    // console.log(`${typeof mthV}===${typeof doc.get('SalaryMth')}`);
    // console.log(`${typeof yearV}===${typeof doc.get('SalaryYear')}`);

    if (projectV == doc.get('Project') && (mthV == doc.get('SalaryMth')) && (yearV == doc.get('SalaryYear'))) {


      let totalhr = 0;
      let amt = 0;

      totalhr = doc.get('D1') + doc.get('D2') + doc.get('D3') + doc.get('D4') + doc.get('D5') +
        doc.get('D6') + doc.get('D7') + doc.get('D8') + doc.get('D9') + doc.get('D10') +
        doc.get('D11') + doc.get('D12') + doc.get('D13') + doc.get('D14') + doc.get('D15') +
        doc.get('D16') + doc.get('D17') + doc.get('D18') + doc.get('D19') + doc.get('D20') +
        doc.get('D21') + doc.get('D22') + doc.get('D23') + doc.get('D24') + doc.get('D25') +
        doc.get('D26') + doc.get('D27') + doc.get('D28') + doc.get('D29') + doc.get('D30') +
        doc.get('D31')
      amt = Math.floor(totalhr / 8 * doc.get('DayRate'))

      markup = markup + `<tr>
    <th scope="row">${rowcount}</th>
    <td id="WorkerName">${doc.get('WorkerName')}</td>
    <td>${doc.get('SalaryMth')}</td>
    <td>${doc.get('SalaryYear')}</td>
    <td>${totalhr}</td>
    <td>${amt.toLocaleString("en-US", {
        minimumFractionDigits: 2
      })}</td>
    </tr>`;
      rowcount++;
      totalAmt = totalAmt + amt;
    } else {
      return;
    }
  });

  markup = markup + `<tr>
  <th scope="row"></th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td id="sumAmt">TOTAL  :  ${totalAmt.toLocaleString("en-US", {
    minimumFractionDigits: 2
  })}</td>
</tr>`

  return { markup, rowcount };
}

export let data = [];
export async function loadValue(fbkey) {
  const dbPL = initializeDb();
  //get records for projectlist and generate select option
  const dbList = collection(dbPL, 'SalaryList');
  const dbDocs = await getDocs(dbList);

  let viewSalarySheetMarkup = ``;
  let addViewProjectMarkup = ``;
  let rowcount = 1;
  data=[];

  const docRef = doc(dbPL, 'SalaryList', fbkey);  
  let docSnap = await getDoc(docRef);  
  if (docSnap.exists()) {
    data.push(
      docSnap.get('D1'),
      docSnap.get('D2'),
      docSnap.get('D3'),
      docSnap.get('D4'),
      docSnap.get('D5'),
      docSnap.get('D6'),
      docSnap.get('D7'),
      docSnap.get('D8'),
      docSnap.get('D9'),
      docSnap.get('D10'),
      docSnap.get('D11'),
      docSnap.get('D12'),
      docSnap.get('D13'),
      docSnap.get('D14'),
      docSnap.get('D15'),
      docSnap.get('D16'),
      docSnap.get('D17'),
      docSnap.get('D18'),
      docSnap.get('D19'),
      docSnap.get('D20'),
      docSnap.get('D21'),
      docSnap.get('D22'),
      docSnap.get('D23'),
      docSnap.get('D24'),
      docSnap.get('D25'),
      docSnap.get('D26'),
      docSnap.get('D27'),
      docSnap.get('D28'),
      docSnap.get('D29'),
      docSnap.get('D30'),
      docSnap.get('D31'), docSnap.get('DayRate'))
  };

}

