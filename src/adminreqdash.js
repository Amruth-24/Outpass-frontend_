import {
    initializeApp
} from 'firebase/app'
import {
    getFirestore,collection,getDocs,onSnapshot,
    query,where
} from 'firebase/firestore'
import { firebaseConfig } from "./firebase-config.js";
//init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef_requests = collection(db,'requests')

// fetch data
const q = query(colRef_requests,where('status','==', 'pending')) ;
onSnapshot(q,(snapshot) => {  //function to verify role of user and redirect based on it

    let details = []
    console.log(snapshot)
    snapshot.docs.forEach((doc) => {
        details.push({...doc.data()})
    })
    console.log(details)
    sessionStorage.clear()
    sessionStorage.setItem('requests',JSON.stringify(details))
})
var requests = JSON.parse(sessionStorage.getItem('requests'))
console.log(requests)

var leaveData = requests
const tableBody = document.getElementById('leaveTableBody');

// Function to render the table based on sorting
function renderTable(data_array) {

    tableBody.innerHTML = '';  // Clear existing table rows
    for (let i = 0; i<data_array.length;i++){ // loop through the details array stored in session storage

        const student = data_array[i]
        console.log(student)
        const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" class="approve-checkbox" checked></td>
                <td style="display: none;">${student.id}</td>
                <td>${i+1}</td>
                <td>${student.name}</td>
                <td>${student.dept}</td>
                <td>${student.year}</td>
                <td>${student.leaveDateTime}</td>
                <td>${student.returnDateTime}</td>
                <td>${student.reason}</td>
                <td>${student.location}</td>
                <td>${student.remarks}</td>
    
            `;
            tableBody.appendChild(row);
        // Object.keys(data).forEach((student, index) => {
            
        // });
    }
}

//function for approving selected requests

function approveRequests(){

    // checking selections
    const table = document.getElementById('leaveTableBody')
    const rows = table.rows
    rows.forEach((row)=>{
        if(row[0].checked === true){
            console.log("yes")
        }
    })

}




// On page load, render table
window.onload = function () {
    renderTable(leaveData);  // Initial render
};