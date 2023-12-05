
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
     apiKey: "AIzaSyCmiRbSSFJym58537j4MDfOOUH2Ay67INg",
     authDomain: "angel-dodov.firebaseapp.com",
     projectId: "angel-dodov",
     storageBucket: "angel-dodov.appspot.com",
     messagingSenderId: "601808266341",
     appId: "1:601808266341:web:f1411b2f7e2d3a6e42d28c"
   };

// Inicializace Firebase aplikace
const app = initializeApp(firebaseConfig);

// Vytvoření instance úložiště
const storage = getStorage(app);

export { storage };
