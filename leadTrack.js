import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


const firebaseConfig = {
    databaseURL: "https://lead-tracker-app-6d259-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("textBox");
const inputButton = document.getElementById("save-Btn");
const ulEl = document.getElementById("ul-el");

const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
    let listItem = "";
    for (let i = 0; i < leads.length; i++) {
        listItem += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }

    ulEl.innerHTML = listItem;
}
onValue(referenceInDB, function (snapshot) {

    const snapshotDoesExist = snapshot.exists;
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);
        render(leads);
    }
});

deleteBtn.addEventListener("dblclick", function () {
    remove(referenceInDB);
    ulEl.innerHTML = "";
})

inputButton.addEventListener("click", function () {
    push(referenceInDB, inputEl.value);
    inputEl.value = "";
})



