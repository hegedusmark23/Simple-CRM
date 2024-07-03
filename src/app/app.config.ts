import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-893be","appId":"1:985860430849:web:d72162faa90ffa69c1b400","storageBucket":"simple-crm-893be.appspot.com","apiKey":"AIzaSyBozDdAzPhZhBm7FSLi1pzWGRehcr8aU2M","authDomain":"simple-crm-893be.firebaseapp.com","messagingSenderId":"985860430849"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-59d2a","appId":"1:509999607231:web:82356c78d29fca0232850a","storageBucket":"simple-crm-59d2a.appspot.com","locationId":"europe-west","apiKey":"AIzaSyDW7th9LU7gOicYLk_uBcO7BVJH0si4KFA","authDomain":"simple-crm-59d2a.firebaseapp.com","messagingSenderId":"509999607231","measurementId":"G-TGDSNF0WET"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())]
};
