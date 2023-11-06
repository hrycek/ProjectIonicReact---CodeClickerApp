import { useIonToast, IonAlert, IonApp, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonRow, IonThumbnail, IonTitle, IonToolbar, setupIonicReact, IonToast, IonGrid } from '@ionic/react';
import { closeCircle, refresh, home, star, mail, bug, settings, informationCircleOutline, exit } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import './App.css';
import { NewspaperOutline } from 'react-ionicons'
import { IonMenu, IonList, IonRouterOutlet } from '@ionic/react';

/* Ionic storage imports */
import { Storage } from '@capacitor/storage'

/*Firebase imports */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"

/* Authentication imports */
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth"

/* Push notifications and toast import */
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";



/* Core CSS required for Ionic components to work properly Mi dz*/
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { canConstructResponseFromBodyStream } from 'workbox-core/_private';
import { componentOnReady, menuController } from '@ionic/core';
import { useHistory } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotificationsPage from './pages/NotificationsPage'
import HighScoresPage from './pages/HighScoresPage'
import LoginPage from './pages/Login'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd6S3wgg3fseIhaPhGSs9ukGi5EVAPkOY",
  authDomain: "codeclicker-ee42d.firebaseapp.com",
  projectId: "codeclicker-ee42d",
  storageBucket: "codeclicker-ee42d.appspot.com",
  messagingSenderId: "1057391174334",
  appId: "1:1057391174334:web:78e896949b6887685134ef",
  measurementId: "G-5RD5GMPTTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const analytics = getAnalytics(app);


setupIonicReact();

const App: React.FC = () => {
  

  return (
  <IonApp className="centerBody">
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/main" component={MainPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/highscores" component={HighScoresPage} />
        <Route path="/login" component={LoginPage} />
        <Redirect exact from="/" to="/main" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>

  )
};


export default App;
