import { IonPage, useIonToast, IonAlert, IonApp, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonRow, IonThumbnail, IonTitle, IonToolbar, setupIonicReact, IonToast, IonGrid } from '@ionic/react';
import { closeCircle, refresh, home, star, mail, bug, settings, informationCircleOutline, exit } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

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
import '../theme/variables.css';
import '../App.css';
import { canConstructResponseFromBodyStream } from 'workbox-core/_private';
import { componentOnReady, menuController } from '@ionic/core';
import { useHistory } from 'react-router';

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



const MainPage: React.FC = () => {
    const [currentKeyboardFileName, setCurrentKeyboardFileName] = useState("img/keyboard.jpg");

  const [codePoints, setCodePoints] = useState(0);
  const [clickerLevel, setClickerLevel] = useState(1);
  const [clickerCost, setClickerCost] = useState(50);

  const [up1, setUp1] = useState(1);
  const [up1Cost, setUp1Cost] = useState(10);
  const [up1Level, setUp1Level] = useState(1);
  const [up1State, setUp1State] = useState("img/locked.png")

  const [up2, setUp2] = useState(5);
  const [up2Cost, setUp2Cost] = useState(100);
  const [up2Level, setUp2Level] = useState(1);
  const [up2State, setUp2State] = useState("img/locked.png")

  const [up3, setUp3] = useState(10);
  const [up3Cost, setUp3Cost] = useState(500);
  const [up3Level, setUp3Level] = useState(1);
  const [up3State, setUp3State] = useState("img/locked.png")

  const [up4, setUp4] = useState(20);
  const [up4Cost, setUp4Cost] = useState(1000);
  const [up4Level, setUp4Level] = useState(1);
  const [up4State, setUp4State] = useState("img/locked.png")

  const [up5, setUp5] = useState(50);
  const [up5Cost, setUp5Cost] = useState(2000);
  const [up5Level, setUp5Level] = useState(1);
  const [up5State, setUp5State] = useState("img/locked.png")

  const [up6, setUp6] = useState(100);
  const [up6Cost, setUp6Cost] = useState(5000);
  const [up6Level, setUp6Level] = useState(1);
  const [up6State, setUp6State] = useState("img/locked.png")

  const [ach1, setAch1] = useState("Hire 20 students! ❌");
  const [ach2, setAch2] = useState("Hire 50 professors! ❌");
  const [ach3, setAch3] = useState("Get 10000 lines of code! ❌");
  const [ach4, setAch4] = useState("Hire DOGE! ❌");

  const [animToggle, setAnimToggle] = useState(false);

  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);

  const [showToast1, setShowToast1] = useState(false);
  const [currUpgradeClick, setCurrUpgradeClick] = useState("You need to hire at least one ... first!");
 
  

  const [prevResult, setPrevResult] = useState(false);

  const [playerId, setPlayerId] = useState("");

  const [resetIsOn, setResetIsOn] = useState(false);

  const nullEntry: any[] = []
  const [notifications, setnotifications] = useState(nullEntry);

  const history = useHistory();

  function getPoints() {
    return codePoints
  }

  async function updatePoints() {
    
    if (codePoints >= 10000) {
      setAch3("Get 10000 lines of code! ✔️")
    }
    if (up1Level > 1 && up2Level > 1 && up3Level > 1 && up4Level > 1 && up5Level > 1 && up6Level > 1) {
      setCodePoints(getPoints() + up1 + up2 + up3 + up4 + up5 + up6)
      shakeAnim()
    } else if (up1Level > 1 && up2Level > 1 && up3Level > 1 && up4Level > 1 && up5Level > 1) {
      setCodePoints(getPoints() + up1 + up2 + up3 + up4 + up5)
      shakeAnim()
    } else if (up1Level > 1 && up2Level > 1 && up3Level > 1 && up4Level > 1) {
      setCodePoints(getPoints() + up1 + up2 + up3 + up4)
      shakeAnim()
    } else if (up1Level > 1 && up2Level > 1 && up3Level > 1) {
      setCodePoints(getPoints() + up1 + up2 + up3)
      shakeAnim()
    } else if (up1Level > 1 && up2Level > 1) {
      setCodePoints(getPoints() + up1 + up2)
      shakeAnim()
    } else if (up1Level > 1) {
      setCodePoints(getPoints() + up1)
      shakeAnim()
    } else {

    }

    await addToDb(playerId);
  }

  function shakeAnim() {
    var points = document.getElementById("points");
    if (points) {
      points.style.animation = "1s linear 0s infinite alternate shake"
      points.style.animationPlayState = "running";
      setTimeout(() => {
        turnOffAnim("points");
      }, 1000)
    }
  }
  function upgradeLevelUp(up: Number) {
    switch (up) {
      case 0:
        if (codePoints >= clickerCost) {
          setCodePoints(codePoints - clickerCost)
          setClickerLevel(clickerLevel + 1)
          setClickerCost(clickerCost + 50)
          upgradeAnim("up0");
        }
        if (clickerLevel == 20) {
          setCurrentKeyboardFileName("img/keyboard2.png")
        }
        if (clickerLevel == 40) {
          setCurrentKeyboardFileName("img/keyboard3.png")
        }
        if (clickerLevel == 60) {
          setCurrentKeyboardFileName("img/keyboard4.png")
        }
        if (clickerLevel == 80) {
          setCurrentKeyboardFileName("img/keyboard5.png")
        }
        break;
      case 1:

        if (codePoints >= up1Cost) {
          setCodePoints(codePoints - up1Cost)
          setUp1Level(up1Level + 1);
          setUp1Cost(up1Cost + up1Level * 10)
          setUp1(up1 + up1Level * 2)

          upgradeAnim("up1");
          console.log("Current up1 stats {Level: " + up1Level + ", Cost: " + up1Cost + ", Income: " + up1 + "}")
          if (up1Level == 1) {
            setUp1State("img/unlocked.png")
          }
        }

        if (up1Level == 20) {
          setAch1("Hire 20 students! ✔️")
        }
        break;
      case 2:
        if (codePoints >= up2Cost && up1Level > 1) {
          setCodePoints(codePoints - up2Cost)
          setUp2Level(up2Level + 1);
          setUp2Cost(up2Cost + up2Level * 15)
          setUp2(up2 + up2Level * 3)

          upgradeAnim("up2");
          console.log("Current up2 stats {Level: " + up2Level + ", Cost: " + up2Cost + ", Income: " + up2 + "}")
          if (up2Level == 1) {
            setUp2State("img/unlocked.png")
          }
        } else {
          if (codePoints < up2Cost) {
            setShowToast1(true);
            setCurrUpgradeClick("You need more lines of code!")
          } else {
            setShowToast1(true);
            setCurrUpgradeClick("You need to hire at least one Student first!")
          }

        }

        if (up2Level == 50) {
          setAch2("Hire 50 professors! ✔️")
        }
        break;
      case 3:

        if (codePoints >= up3Cost && up2Level > 1) {
          setCodePoints(codePoints - up3Cost)
          setUp3Level(up3Level + 1);
          setUp3Cost(up3Cost + up3Level * 20)
          setUp3(up3 + up3Level * 4)

          upgradeAnim("up3");
          console.log("Current up3 stats {Level: " + up3Level + ", Cost: " + up3Cost + ", Income: " + up3 + "}")
          if (up3Level == 1) {
            setUp3State("img/unlocked.png")
          }
        } else {

          if (codePoints < up3Cost) {
            setShowToast1(true);
            setCurrUpgradeClick("You need more lines of code!")
          } else {
            setShowToast1(true);
            setCurrUpgradeClick("You need to hire at least one Professor first!")
          }
        }

        break;
      case 4:
        if (codePoints >= up4Cost && up3Level > 1) {
          setCodePoints(codePoints - up4Cost)
          setUp4Level(up4Level + 1);
          setUp4Cost(up4Cost + up4Level * 25)
          setUp4(up4 + up4Level * 5)

          upgradeAnim("up4");
          console.log("Current up4 stats {Level: " + up4Level + ", Cost: " + up4Cost + ", Income: " + up4 + "}")
          if (up4Level == 1) {
            setUp4State("img/unlocked.png")
          }
        } else {
          if (codePoints < up4Cost) {
            setShowToast1(true);
            setCurrUpgradeClick("You need more lines of code!")
          } else {
            setShowToast1(true);
            setCurrUpgradeClick("You need to rent at least one Garage first!")
          }
        }

        break;
      case 5:
        if (codePoints >= up5Cost && up4Level > 1) {
          setCodePoints(codePoints - up5Cost)
          setUp5Level(up5Level + 1);
          setUp5Cost(up5Cost + up5Level * 30)
          setUp5(up5 + up5Level * 6)

          upgradeAnim("up5");
          console.log("Current up5 stats {Level: " + up5Level + ", Cost: " + up5Cost + ", Income: " + up5 + "}")
          if (up5Level == 1) {
            setUp5State("img/unlocked.png")
          }
        } else {
          if (codePoints < up5Cost) {
            setShowToast1(true);
            setCurrUpgradeClick("You need more lines of code!")
          } else {
            setShowToast1(true);
            setCurrUpgradeClick("You need to run at least one Business first!")
          }
        }

        break;
      case 6:
        if (codePoints >= up6Cost && up5Level > 1) {
          setCodePoints(codePoints - up6Cost)
          setUp6Level(up6Level + 1);
          setUp6Cost(up6Cost + up6Level * 35)
          setUp6(up6 + up6Level * 7)

          upgradeAnim("up6");
          console.log("Current up6 stats {Level: " + up6Level + ", Cost: " + up6Cost + ", Income: " + up6 + "}")
          if (up6Level == 1) {
            setUp6State("img/unlocked.png")
            setAch4("Hire DOGE! ✔️")
          }
        } else {
          if (codePoints < up6Cost) {
            setShowToast1(true);
            setCurrUpgradeClick("You need more lines of code!")
          } else {
            setShowToast1(true);
            setCurrUpgradeClick("You need to hire at least one AI first!")
          }
        }


        break;
      default:
        break;

    }
  }

  async function clickFun() {
    turnOffAnim("image");
    upgradeAnim("image");
    setCodePoints(codePoints + clickerLevel * 3)
  }

  function upgradeAnim(name: string) {
    var points = document.getElementById(name);
    if (points) {
      points.style.animation = "0.5s linear 0s infinite alternate upgrade"
      points.style.animationPlayState = "running";
      setTimeout(() => {
        turnOffAnim(name);
      }, 500)
    }
  }

  useEffect(() => {
    const interval = setInterval(function () {
      updatePoints()
    }, 1000);
    return () => { clearInterval(interval); };
  });

  function turnOffAnim(name: string) {
    var points = document.getElementById(name);
    if (points) {
      points.style.animationPlayState = "paused";
    }
  }

  async function getDbData(id: string){
    const typeRef = doc(db, 'players', id);
    const typeResult = await getDoc(typeRef);

    if (typeResult.exists()) {

      setCodePoints(typeResult.get("player_points"))

      setUp1(typeResult.get("player_up1"))
      setUp1Cost(typeResult.get("player_up1cost"))
      setUp1Level(typeResult.get("player_up1level"))
      setUp1State(typeResult.get("player_up1state"))

      setUp2(typeResult.get("player_up2"))
      setUp2Cost(typeResult.get("player_up2cost"))
      setUp2Level(typeResult.get("player_up2level"))
      setUp2State(typeResult.get("player_up2state"))

      setUp3(typeResult.get("player_up3"))
      setUp3Cost(typeResult.get("player_up3cost"))
      setUp3Level(typeResult.get("player_up3level"))
      setUp3State(typeResult.get("player_up3state"))

      setUp4(typeResult.get("player_up4"))
      setUp4Cost(typeResult.get("player_up4cost"))
      setUp4Level(typeResult.get("player_up4level"))
      setUp4State(typeResult.get("player_up4state"))

      setUp5(typeResult.get("player_up5"))
      setUp5Cost(typeResult.get("player_up5cost"))
      setUp5Level(typeResult.get("player_up5level"))
      setUp5State(typeResult.get("player_up5state"))

      setUp6(typeResult.get("player_up6"))
      setUp6Cost(typeResult.get("player_up6cost"))
      setUp6Level(typeResult.get("player_up6level"))
      setUp6State(typeResult.get("player_up6state"))

      setAch1(typeResult.get("player_ach1"))
      setAch2(typeResult.get("player_ach2"))
      setAch3(typeResult.get("player_ach3"))
      setAch4(typeResult.get("player_ach4"))

      setClickerCost(typeResult.get("player_clickcost"))
      setClickerLevel(typeResult.get("player_clicklevel"))
      setCurrentKeyboardFileName(typeResult.get("player_keyboard"))
    }

    
  }

  async function resetGame() {
    setCodePoints(0)
    setClickerLevel(1)
    setClickerCost(50)

    setUp1(1)
    setUp1Cost(10)
    setUp1Level(1)
    setUp1State("img/locked.png")

    setUp2(5)
    setUp2Cost(100)
    setUp2Level(1)
    setUp2State("img/locked.png")

    setUp3(10)
    setUp3Cost(500)
    setUp3Level(1)
    setUp3State("img/locked.png")

    setUp4(20)
    setUp4Cost(1000)
    setUp4Level(1)
    setUp4State("img/locked.png")

    setUp5(50)
    setUp5Cost(2000)
    setUp5Level(1)
    setUp5State("img/locked.png")

    setUp6(100)
    setUp6Cost(5000)
    setUp6Level(1)
    setUp6State("img/locked.png")

    setAch1("Hire 20 students! ❌")
    setAch2("Hire 50 professors! ❌")
    setAch3("Get 10000 lines of code! ❌")
    setAch4("Hire DOGE! ❌")

    setCurrentKeyboardFileName("img/keyboard.jpg")

    await resetToDb(playerId)
    
  }

  



  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setPlayerId(user.uid);
     
          getDbData(uid).then(() => {
            console.log("Get from database")
          });
        
        
      } else {
        // User is signed out
        // ...
        console.log("ELSE")
        signInAnonymously(auth).then(() => {

        })
      }
    });
  }, [])

  window.onload = () => {
  };

  async function addToDb(uid: string) {
    await setDoc(doc(db, "players", uid), {
      player_points: codePoints,
      player_up1: up1,
      player_up1cost: up1Cost,
      player_up1level: up1Level,
      player_up1state: up1State,

      player_up2: up2,
      player_up2cost: up2Cost,
      player_up2level: up2Level,
      player_up2state: up2State,

      player_up3: up3,
      player_up3cost: up3Cost,
      player_up3level: up3Level,
      player_up3state: up3State,

      player_up4: up4,
      player_up4cost: up4Cost,
      player_up4level: up4Level,
      player_up4state: up4State,

      player_up5: up5,
      player_up5cost: up5Cost,
      player_up5level: up5Level,
      player_up5state: up5State,

      player_up6: up6,
      player_up6cost: up6Cost,
      player_up6level: up6Level,
      player_up6state: up6State,

      player_ach1: ach1,
      player_ach2: ach2,
      player_ach3: ach3,
      player_ach4: ach4,

      player_keyboard: currentKeyboardFileName,
      player_clickcost: clickerCost,
      player_clicklevel: clickerLevel
    }).then(() => {
    })
  }

  async function resetToDb(uid: string) {
    await setDoc(doc(db, "players", uid), {
      player_points: 0,

      player_up1: 1,
      player_up1cost: 10,
      player_up1level: 1,
      player_up1state: "img/locked.png",

      player_up2: 5,
      player_up2cost: 100,
      player_up2level: 1,
      player_up2state: "img/locked.png",

      player_up3: 40,
      player_up3cost: 500,
      player_up3level: 1,
      player_up3state: "img/locked.png",

      player_up4: 105,
      player_up4cost: 1000,
      player_up4level: 1,
      player_up4state: "img/locked.png",

      player_up5: 220,
      player_up5cost: 2000,
      player_up5level: 1,
      player_up5state: "img/locked.png",

      player_up6: 550,
      player_up6cost: 5000,
      player_up6level: 1,
      player_up6state: "img/locked.png",

      player_ach1: "Hire 20 students! ❌",
      player_ach2: "Hire 50 professors! ❌",
      player_ach3: "Get 10000 lines of code! ❌",
      player_ach4: "Hire DOGE! ❌",

      player_keyboard: "img/keyboard.jpg",
      player_clickcost: 50,
      player_clicklevel: 1
    }).then(() => {
      console.log("Added to database")
    })
  }
    return (
        <IonPage>
            <IonMenu side="start" content-id="main-content" >
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            CodeClicker v0.1
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem button onClick={() => {
            setShowAlert3(true);
          }}>
            <IonIcon icon={refresh} slot="start" color="bright"></IonIcon>
            <IonLabel>Reset game</IonLabel>
          </IonItem>
          <IonItem button onClick={(event) => { event.preventDefault(); history.push("/notifications")}}>
            <IonIcon icon={bug} slot="start" color="bright"></IonIcon>
            <IonLabel>Notifications</IonLabel>
          </IonItem>
          <IonItem button onClick={(event) => { event.preventDefault(); history.push("/login")}}>
            <IonIcon icon={informationCircleOutline} slot="start" color="bright"></IonIcon>
            <IonLabel>Manage players</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={settings} slot="start" color="bright"></IonIcon>
            <IonLabel>Settings</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={exit} slot="start" color="bright"></IonIcon>
            <IonLabel>Exit</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>

    <div id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton><img id="image2" className="center2" src="img/CodeClicker.png" /></IonMenuButton>
          </IonButtons>
          <IonTitle className='ion-padding-horizontal'>

            <IonButton color="light" className='right' style={{ height: 20 }} onClick={() => {
              setShowAlert1(true)

            }
            }>
              <IonIcon style={{ height: 20 }} icon={star} />
            </IonButton>

          </IonTitle>
        </IonToolbar>
      </IonHeader>
    </div>

    <IonContent className='ion-padding' id="ion-content-overflow">
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass='my-custom-class'
        header={'🏆 Achievements 🏆'}
        message={"<br>" + ach1 + '<br><br>' + ach2 + "<br><br>" + ach3 + "<br><br>" + ach4}
        buttons={['OK']}
      />

      <IonAlert
        isOpen={showAlert2}
        onDidDismiss={() => setShowAlert2(false)}
        cssClass='my-custom-class'
        header={'ℹ️ Information ℹ️'}
        message={"<br>" + currUpgradeClick}
        buttons={['OK']}
      />

      <IonAlert
        isOpen={showAlert3}
        onDidDismiss={() => setShowAlert3(false)}
        cssClass='my-custom-class'
        header={'Warning!'}
        message={'💀 This will wipe your whole <strong>PROGRESS</strong>! 💀'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: blah => {
              console.log('You are scared???');
            }
          },
          {
            text: 'Confirm',
            id: 'confirm-button',
            handler: () => {
              resetGame();
            }
          }
        ]}
      />

      <IonLabel className="align">
        <div id="points">
          <NewspaperOutline
            color={'#00000'}
            title={"Tekst"}
            height="20px"
            width="20px"
          /> {codePoints}
        </div>
      </IonLabel>


      {/* <IonItem color="dark" button onClick={() => {
        clickFun()
      }} detail>
        <IonLabel>
          Click to write line a code
        </IonLabel>
      </IonItem> */}
      <h5 className='align'>Click at keyboard to write line of code</h5>
      <img id="image" className="center" src={currentKeyboardFileName} onClick={() => clickFun()} />
      <br></br><br></br>
      <IonItem id="up0" color="medium" className="radius" style={{ margin: "auto" }} button onClick={() => { upgradeLevelUp(0) }}>
        <IonLabel>
          <p className='align'>Your current skill: {clickerLevel}</p>
          <p className='align'>{clickerCost} <NewspaperOutline
            color={'#00000'}
            title={"Tekst"}
            height="20px"
            width="20px"
          /></p>
        </IonLabel>

      </IonItem>



    </IonContent>

    <IonContent className="border">
      <br></br>
      {/* <IonFooter style={{ height: 250, backgroundColor: "white" }} className="radius"> */}
      <IonLabel>
        <h1 className='align'>Hire ur workers below:</h1>
      </IonLabel>
      <IonRow style={{ color: "black", }}>
        <IonCol>
          <IonItem color="light" id="up1" className="radius" button onClick={() => { upgradeLevelUp(1) }}>
            <IonThumbnail slot="start" style={{ color: "white" }}>
              <img src="img/upgrade1.png" />

            </IonThumbnail>

            <IonLabel>
              <h3>{up1}/sec</h3>
              <p>{up1Cost} <NewspaperOutline
                color={'#00000'}
                title={"Tekst"}
                height="20px"
                width="20px"
              /></p>
              <h3>Students: {up1Level - 1}</h3>
            </IonLabel>
            <IonLabel className="textAlign">
              <img className="lock" src={up1State} />
            </IonLabel>
          </IonItem>
        </IonCol>

      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem color="medium" id="up2" className="radius" button onClick={() => { upgradeLevelUp(2) }}>
            <IonThumbnail slot="start" style={{ color: "white" }}>
              <img src="img/upgrade2.png" />

            </IonThumbnail>

            <IonLabel>
              <h3>{up2}/sec</h3>
              <p>{up2Cost} <NewspaperOutline
                color={'#00000'}
                title={"Tekst"}
                height="20px"
                width="20px"
              /></p>
              <h3>Professors: {up2Level - 1}</h3>
            </IonLabel>
            <IonLabel className="textAlign">
              <img className="lock" src={up2State} />
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow style={{ color: "black" }}>
        <IonCol>
          <IonItem color="light" id="up3" className="radius" button onClick={() => { upgradeLevelUp(3) }}>
            <IonThumbnail slot="start" style={{ color: "white" }}>
              <img src="img/upgrade3.png" />

            </IonThumbnail>

            <IonLabel>
              <h3>{up3}/sec</h3>
              <p>{up3Cost} <NewspaperOutline
                color={'#00000'}
                title={"Tekst"}
                height="20px"
                width="20px"
              /></p>
              <h3>Garages: {up3Level - 1}</h3>
            </IonLabel>
            <IonLabel className="textAlign">
              <img className="lock" src={up3State} />
            </IonLabel>
          </IonItem>
        </IonCol>

      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem color="medium" id="up4" className="radius" button onClick={() => { upgradeLevelUp(4) }}>
            <IonThumbnail slot="start" style={{ color: "white" }}>
              <img src="img/upgrade4.png" />

            </IonThumbnail>

            <IonLabel>
              <h3>{up4}/sec</h3>
              <p>{up4Cost} <NewspaperOutline
                color={'#00000'}
                title={"Tekst"}
                height="20px"
                width="20px"
              /></p>
              <h3>Buisnesses: {up4Level - 1}</h3>
            </IonLabel>
            <IonLabel className="textAlign">
              <img className="lock" src={up4State} />
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow style={{ color: "success" }} >
        <IonCol>
          <IonItem color="light" id="up5" className="radius" button onClick={() => { upgradeLevelUp(5) }}>
            <IonThumbnail slot="start" style={{ color: "white", }}>
              <img src="img/upgrade5.png" />

            </IonThumbnail>

            <IonLabel>
              <h3>{up5}/sec</h3>
              <p>{up5Cost} <NewspaperOutline
                color={'#00000'}
                title={"Tekst"}
                height="20px"
                width="20px"
              /></p>
              <h3>AIs: {up5Level - 1}</h3>
            </IonLabel>
            <IonLabel className="textAlign">
              <img className="lock" src={up5State} />
            </IonLabel>
          </IonItem>
        </IonCol>

      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem color="medium" id="up6" className="radius" button onClick={() => { upgradeLevelUp(6) }}>
            <IonThumbnail slot="start" style={{ color: "white" }}>
              <img src="img/upgrade6.png" />
            </IonThumbnail>

            <IonLabel>
              <h3>{up6}/sec</h3>
              <p>{up6Cost} <NewspaperOutline
                color={'#00000'}
                title={"Tekst"}
                height="20px"
                width="20px"
              /></p>
              <h3>Doges: {up6Level - 1}</h3>
            </IonLabel>
            <IonLabel className="textAlign">
              <img className="lock" src={up6State} />
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      {/* </IonFooter> */}
      <IonToast
        cssClass={"myToast"}
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message={currUpgradeClick}
        duration={1500}
      />
     
    </IonContent>
        </IonPage>
    );
};

export default MainPage;