import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonThumbnail } from "@ionic/react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore"
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter,
    useIonViewDidLeave,
    useIonViewWillEnter,
    useIonViewWillLeave,
} from '@ionic/react';
import '../theme/variables.css';
import '../App.css';
import { refresh, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router';

const HighScoresPage: React.FC = () => {
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
    const [playerList, setPlayerList] = useState([{ playerId: "R4GdkhJeHqDCRfKi8kHvuoNp1yi2", playerPoints: 0 }])
    const [playerId, setPlayerId] = useState(1)
    const [isDataSet, setIsDataSet] = useState(false);

    async function getData() {
        if (!isDataSet) {
            console.log("Pobieram");
            const querySnapshot = await getDocs(collection(db, "players"));
            const tempList = [{ playerId: String, playerPoints: Number }];

            querySnapshot.forEach((doc) => {

                playerList.push({ playerId: doc.id, playerPoints: doc.get("player_points") });

            });
            setIsDataSet(true);
            playerList.sort((a, b) => (a.playerPoints < b.playerPoints) ? 1 : -1)
            console.log("Pobrano")
        }

    }

    async function updateData() {
        let value = 1;
        playerList.forEach(async item => {
            const temp = 'players/' + item.playerId
            const itemToUpdate = doc(db, temp);

            if (item.playerId != "R4GdkhJeHqDCRfKi8kHvuoNp1yi2") {

                await updateDoc(itemToUpdate, {
                    "player_clickcost": 50,
                    "player_clicklevel": 1,
                    "player_keyboard": "img/keyboard.jpg",
                    "player_points": 0,

                    "player_up1": 1,
                    "player_up1cost": 10,
                    "player_up1level": 1,
                    "player_up1state": "img/locked.png",

                    "player_up2": 5,
                    "player_up2cost": 100,
                    "player_up2level": 1,
                    "player_up2state": "img/locked.png",

                    "player_up3": 10,
                    "player_up3cost": 500,
                    "player_up3level": 1,
                    "player_up3state": "img/locked.png",

                    "player_up4": 20,
                    "player_up4cost": 1000,
                    "player_up4level": 1,
                    "player_up4state": "img/locked.png",

                    "player_up5": 50,
                    "player_up5cost": 2000,
                    "player_up5level": 1,
                    "player_up5state": "img/locked.png",

                    "player_up6": 100,
                    "player_up6cost": 5000,
                    "player_up6level": 1,
                    "player_up6state": "img/locked.png",

                    "player_ach1": "Hire 20 students! ❌",
                    "player_ach2": "Hire 50 professors! ❌",
                    "player_ach3": "Get 10000 lines of code! ❌",
                    "player_ach4": "Hire DOGE! ❌"
                })
                console.log("Update No." + value)
                value = value + 1
            }
        });
        console.log("Update")
    }

    function deleteData(itemId: string, itemPlayerPoints: number) {
        const temp = 'players/' + itemId
        const itemToDelete = doc(db, temp);

        const player = { playerId: itemId, playerPoints: itemPlayerPoints }
        const index = playerList.indexOf(player, 0)
        deleteDoc(itemToDelete).then(() => {

            setPlayerList(playerList.filter(obj => obj.playerId !== player.playerId))
            console.log("Usunieto dokument")
        })
    }



    useIonViewDidEnter(() => {
        
    });

    useIonViewDidLeave(() => {
    
    });

    useIonViewWillEnter(() => {
        
        getData().then(() => {
            setPlayerList(playerList.sort((a, b) => (a.playerPoints < b.playerPoints) ? 1 : -1))
            console.log("List");
            console.log(playerList);
            
        });
    });

    useIonViewWillLeave(() => {
        console.log('ionViewWillLeave event fired');
    });
    const history = useHistory();
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar style={{ textAlign: "center", fontSize: 20 }}>
                        
                        All players and their points.
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {playerList.map(item => (
                        <IonItemSliding key={item.playerId}>
                            <IonItem>
                                <IonLabel>{item.playerId} - {item.playerPoints}</IonLabel>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption onClick={() => {
                                    deleteData(item.playerId, item.playerPoints)
                                }}>Delete</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))}
                </IonList>
                <br></br>
                <IonItem color="light" id="up1" className="radius" button onClick={() => { updateData() }}>
                    <IonThumbnail slot="start" style={{ color: "white" }}>
                        <IonIcon style={{ width: 50, height: 50 }} icon={refresh} />
                    </IonThumbnail>

                    <IonLabel >
                        <h1 >Reset All</h1>
                    </IonLabel>

                </IonItem>
                <br></br>
                <IonItem color="light" id="up1" className="radius" button onClick={(event) => { event.preventDefault(); history.push("/login")} }>
                    <IonThumbnail slot="start" style={{ color: "white" }}>
                        <IonIcon style={{ width: 50, height: 50 }} icon={arrowBack} />
                    </IonThumbnail>

                    <IonLabel >
                        <h1>Back</h1>
                    </IonLabel>

                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default HighScoresPage;