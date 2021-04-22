import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import HomeContent from '../components/HomeContent';
import FactoryContent from '../components/FactoryContent';
import AboutContent from '../components/AboutContent';
import AccountContent from '../components/AccountContent';
import './Page.css';
import PlayerId from '../components/PlayerId';
import PlayerContent from '../components/PlayerContent';
import SignInContent from '../components/SignInContent';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  interface Title {
    param: string;
    title: string;
  }

  const titles: Title[] = [
    {
      param: 'home',
      title: 'Home'
    },
    {
      param: 'factory',
      title: 'Create Simulation'
    },
    {
      param: 'playerid',
      title: 'Join Simulation'
    },
    {
      param: 'loginsignup',
      title: 'Login or Create Account'
    },
    {
      param: 'account',
      title: 'Your Account'
    },
    {
      param: 'about',
      title: 'About'
    },
    {
      param: 'player',
      title: 'Simulation Player'
    }
  ];
  
  let title = titles.find(title => title.param === name)
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      {name === 'home' &&
        <HomeContent />
      }
      {name === 'factory' &&
        <FactoryContent />
      }
      {name === 'about' &&
        <AboutContent />
      }
      {name === 'account' &&
        <AccountContent />
      }
      {name === 'playerid' &&
        <PlayerId />
      }
      {name === 'loginsignup' &&
        <SignInContent />
      }
      {name == 'player' &&
        <PlayerContent/>
      }

      </IonContent>
    </IonPage>
  );
};

export default Page;
