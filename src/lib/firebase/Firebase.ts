import { initializeApp } from 'firebase/app';  // Přidání funkce pro Inicializaci Firebase
import { getStorage } from 'firebase/storage';  // Přidání funkce pro práci s Daty, Foto, Soubory atp
import { getDatabase } from 'firebase/database'; // Přidání funkce pro práci s Realtime databází
import { getAuth } from 'firebase/auth';         // Přidání funkce pro práci s Přihlášením


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
const auth = getAuth(app);

// Vytvoření instance úložiště
const storage = getStorage(app);

// Vytvoření instance Realtime databáze
const db = getDatabase(app);

	export { storage, db, app, auth }; // Export instance úložiště a databáze pro použití v komponentách
 // Export instance úložiště a databáze pro použití v komponentách + přihlášení.
