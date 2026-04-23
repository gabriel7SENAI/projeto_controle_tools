import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJ7z3xgMFvL_U1hYQQ8YfQNZ6hyweoBAc",
  authDomain: "controleoficina-ef15d.firebaseapp.com",
  databaseURL: "https://controleoficina-ef15d-default-rtdb.firebaseio.com",
  projectId: "controleoficina-ef15d",
  storageBucket: "controleoficina-ef15d.firebasestorage.app",
  messagingSenderId: "465011293322",
  appId: "1:465011293322:web:d06c29a2f6be4e68b6c173",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
