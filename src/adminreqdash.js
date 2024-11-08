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

var requests = JSON.parse(sessionStorage.getItem('requests'))
console.log(requests)

var leaveData = requests
const tableBody = document.getElementById('leaveTableBody');

// Function to render the table based on sorting
function renderTable(data) {

    tableBody.innerHTML = '';  // Clear existing table rows

    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="approve-checkbox" checked></td>
            <td style="display: none;">${student.id}</td>
            <td>${index+1}</td>
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
    });
}






// On page load, render table
window.onload = function () {
    renderTable(leaveData);  // Initial render
};

var getrows;
const table = document.getElementById('leaveTableBody');
getrows = table.rows;
setTimeout(approveRequests,1000)
//function for approving selected requests

function approveRequests(){
    var i;
    // checking selections
    console.log(rows)
    console.log(getrows.length)
    var rows = Array(getrows)
    console.log(rows[0])

}

