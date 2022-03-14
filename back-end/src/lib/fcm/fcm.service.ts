import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDNEKC8JPc3L_vpToR3-zHbqlOAqVWd0M0',
  authDomain: 'cargle-66563.firebaseapp.com',
  projectId: 'cargle-66563',
  storageBucket: 'cargle-66563.appspot.com',
  messagingSenderId: '374366708364',
  appId: '1:374366708364:web:661800d6120325c057d1a9',
  measurementId: 'G-M4ZNX130SS',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

@Injectable()
export class FcmService {
  sendFCM() {
    var key =
      'AAAAVyn-oow:APA91bEQgKMkCFCFI-lCdSllx8JgJmRjy39cPLERIgXTnFCJDxljXf8kcee71s9HF0NlvLl2vO6mnEJXZWb4KY0IIlAQ4Gzl16uSy5ZFoXtHdSGmxiUQRHWSKiIufK1AISPNwuQUzc5R';
    var to = 'YOUR-IID-TOKEN';
    var notification = {
      title: 'Portugal vs. Denmark',
      body: '5 to 1',
      icon: 'firebase-logo.png',
      click_action: 'http://localhost:8081',
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Authorization: 'key=' + key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notification: notification,
        to: to,
      }),
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
