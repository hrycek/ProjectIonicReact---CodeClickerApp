import React, { useEffect, useState } from "react";
import { IonPage, IonToast } from "@ionic/react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFooter, IonList, IonCard, IonCardContent, IonItem, IonLabel, IonListHeader, IonText, IonButtons, IonMenuButton } from '@ionic/react';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";
import { Capacitor } from '@capacitor/core';
import { useHistory } from 'react-router';
import { refresh, arrowBack } from 'ionicons/icons';
const NotificationsPage: React.FC = () => {

    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

    const nullEntry: any[] = []
    const [notifications, setnotifications] = useState(nullEntry);

    const [showToast2, setShowToast2] = useState(false);
    const [toast2Text, setToast2Text] = useState("");

    const history = useHistory();
    useEffect(() => {
        PushNotifications.checkPermissions().then((res) => {
            if (res.receive !== 'granted') {
                PushNotifications.requestPermissions().then((res) => {
                    if (res.receive === 'denied') {
                        showToast('Push Notification permission denied');
                    }
                    else {
                        showToast('Push Notification permission granted');
                        register();
                    }
                });
            }
            else {
                register();
            }
        });
    }, [])

    const register = () => {
        console.log('Initializing HomePage');
        
        if (isPushNotificationsAvailable) {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();

            // On success, we should be able to receive notifications
            PushNotifications.addListener('registration',
                (token: Token) => {
                    setToast2Text("Push registration succes");
                    setShowToast2(true);
                    showToast('Push registration success');
                }
            );




            // Some issue with our setup and push will not work
            PushNotifications.addListener('registrationError',
                (error: any) => {
                    alert('Error on registration: ' + JSON.stringify(error));
                }
            );

            // Show us the notification payload if the app is open on our device
            PushNotifications.addListener('pushNotificationReceived',
                (notification: PushNotificationSchema) => {
                    setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
                }
            );

            // Method called when tapping on a notification
            PushNotifications.addListener('pushNotificationActionPerformed',
                (notification: ActionPerformed) => {
                    setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
                }
            );
        }
    }

    const showToast = async (msg: string) => {
        await Toast.show({
            text: msg
        })
    }

    return (
        <IonPage id='main'>
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle slot="start">Notifications</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div>
                   

                </div>
                <IonListHeader mode="ios" lines="full">
                    <IonLabel>Notifications</IonLabel>
                </IonListHeader>
                {notifications.length !== 0 &&
                    <IonList>

                        {notifications.map((notif: any) =>
                            <IonItem key={notif.id}>
                                <IonLabel>
                                    <IonText>
                                        <h3 className="notif-title">{notif.title}</h3>
                                    </IonText>
                                    <p>{notif.body}</p>
                                    {notif.type === 'foreground' && <p>This data was received in foreground</p>}
                                    {notif.type === 'action' && <p>This data was received on tap</p>}
                                </IonLabel>
                            </IonItem>
                        )}
                    </IonList>}
                    <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message={toast2Text}
        duration={1500}
      />
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonItem>
                    <IonButton  onClick={(event) => { event.preventDefault(); history.push("/main")}} style={{height: "100%"}} color="light" expand="full">Go back</IonButton>
                    <IonButton style={{height: "100%"}} color="light" slot="end" expand="full" onClick={register}>Register for notifications</IonButton>
                    </IonItem>
                    
                </IonToolbar>
            </IonFooter>

           
        </IonPage >
    )

};

export default NotificationsPage;