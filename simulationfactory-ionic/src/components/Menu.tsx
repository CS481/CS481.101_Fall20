import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { addCircleOutline, addCircleSharp, archiveOutline, archiveSharp, bookmarkOutline, caretForwardCircleOutline, caretForwardCircleSharp, caretForwardSharp, heartOutline, heartSharp, homeOutline, homeSharp, informationCircleOutline, logInOutline, logInSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, personCircleOutline, personCircleSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Create Simulation',
    url: '/page/factory',
    iosIcon: addCircleOutline,
    mdIcon: addCircleSharp
  },
  {
    title: 'Join Simulation',
    url: '/page/player',
    iosIcon: caretForwardCircleOutline,
    mdIcon: caretForwardCircleSharp
  },
  {
    title: 'Login & Create Account',
    url: '/page/loginsignup',
    iosIcon: logInOutline,
    mdIcon: logInSharp
  },
  {
    title: 'Your Account',
    url: '/page/account',
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp
  },
  {
    title: 'About',
    url: '/page/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="page-list">
          <IonListHeader>YCP Social Dilemma</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
