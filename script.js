import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDNXIdGU4-ywJ-9T8vuLRNAd8G5F-moRaU",
  authDomain: "wma-11-project.firebaseapp.com",
  projectId: "wma-11-project",
  storageBucket: "wma-11-project.appspot.com",
  messagingSenderId: "417433878984",
  appId: "1:417433878984:web:8445d98e71efc8069f80fd",
  measurementId: "G-YF9N95Z5S3",
};

// Initializing Firebase Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log(db);
let todosCollection = collection(db, "todos");

// Getting html element through dom
const todo_input = document.getElementById("todo_input");
const add_todo = document.getElementById("add_todo");
const todo_list = document.getElementById("todo_list");
add_todo.addEventListener("click", addtodo);
getTodo();

// creating a function for adding todos through addDoc method in firestore collecction
async function addtodo() {
  try {
    const obj = {
      todo: todo_input.value,
      createdAt: new Date().toISOString(),
    };
    todo_input.value = "";
    const docRef = await addDoc(todosCollection, obj);
    console.log("Todo Added");
    getTodo();
  } catch (e) {
    alert("Message on error", e);
  }
}

// creating a function for retrieve todos data through getDocs method
async function getTodo() {
  try {
    const querySnapshot = await getDocs(todosCollection);
    todo_list.innerHTML = "";
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} `);
      const { todo, createdAt } = doc.data();
      const element = `<li id=${
        doc.id
      }>Name : ${todo} ....... Date : ${new Date(
        createdAt
      ).toLocaleDateString()}</li>`;
      todo_list.innerHTML += element;
      console.log(todo, createdAt);
    });
    todo_list.childNodes.forEach((e) => e.addEventListener("click", delTodo));
  } catch (error) {
    alert(error);
  }
}

// creating a function for deleting todo items from todoList through

async function delTodo() {
 try {
  const docId = this.id;
  const docCollection = doc(db, "todos", docId);
  const docRef = await deleteDoc(docCollection);
  console.log("Document item deleted", docRef);
  getTodo();
  
 } catch (e) {
  alert(e)
 }
   
}

// async function addTodo() {
//     try {
//         const docRef = await addDoc(todosCollection,{
//                name: "Ada",
//            });

//         //-------------------- default code imported from firestore docs ----------------------
//         // const docRef = await addDoc(collection(db, "users"), {
//         //   first: "Ada",
//         //   last: "Lovelace",
//         //   born: 1815
//         // });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//         alert(e);
//       }
// }
