import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import HomeContent from '../components/HomeContent';
import './Page.css';

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
      param: 'player',
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
    }
  ];
  
  let title = titles.find(title => title.param === name)
  console.log(title);
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title?.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HomeContent />
      </IonContent>
    </IonPage>
  );
};

export default Page;
