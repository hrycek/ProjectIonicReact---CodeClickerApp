import React, { useEffect, useState } from "react";
import { IonAlert, IonButton, IonContent, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonThumbnail, IonToast } from "@ionic/react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore"
import { useHistory } from 'react-router';
import { refresh, arrowBack, arrowForward } from 'ionicons/icons';
const LoginPage: React.FC = () => {

    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();

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
  

    async function checkData() {
        
            console.log("Pobieram");
            const docRef = doc(db, "admin", "adminId");
            const querySnapshot = await getDoc(docRef).then((result) => {
                
                if(login == result.get("login") && password == result.get("password")){
                    history.push("/highscores")
                }else{
                    setShowAlert(true);
                }
              }
               
            );
            
        

    }

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonInput value={login} placeholder="Enter login" onIonChange={e => setLogin(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput type="password" value={password} placeholder="Enter password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>
                </IonList>
                <br></br>
                <IonItem color="light" id="up1" className="radius" button onClick={() => { 
                    checkData();
                 }}>
                    <IonThumbnail slot="start" style={{ color: "white" }}>
                        <IonIcon style={{ width: 50, height: 50 }} icon={arrowForward} />
                    </IonThumbnail>

                    <IonLabel >
                        <h1 >Log in</h1>
                    </IonLabel>

                </IonItem>
                <br></br>

                <IonItem color="light" id="up1" className="radius" button onClick={(event) => { event.preventDefault(); history.push("/main")} }>
                    <IonThumbnail slot="start" style={{ color: "white" }}>
                        <IonIcon style={{ width: 50, height: 50 }} icon={arrowBack} />
                    </IonThumbnail>

                    <IonLabel >
                        <h1>Back</h1>
                    </IonLabel>

                </IonItem>
            </IonContent>
            <IonToast
        cssClass={"myToast"}
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message="Wrong login or password!"
        duration={2000}
      />
        </IonPage>
    );
};

export default LoginPage;