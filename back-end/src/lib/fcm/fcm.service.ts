import { Injectable } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

const adminConfig: ServiceAccount = {
  projectId: 'cargle-66563',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNVLToxde+Iv2O\nBdY5Pa3sObUVlo0Re/EWMEieHyzzzEb8UvJKG+SjxZLC/8H4n5gmvlYe108N++fA\nJ5NDXFcQBl+/H4hxIg5kCOfR/UsAfHjOM0ukCc5f+H0oVmFnsgRFYhOdGExTSL85\nGa4Mgvtj4mODFMJQ2hylnpWrT754FH0elTsIxDVDLygQZgoo3K7kotnKzjkLIEbd\nZ5btPY5mCCLrSTCP0qe0uoFN1TteZgUdL5uO1GzIvey8j82I0cc5RzgpNtZNJurA\nMSSjJ/nL0APmbnkHF8y3NQDma7X6VDC5FGnAlisAPbBnc9bDz9HErUNDkCLUCbpQ\n7HcF0qyPAgMBAAECggEAYLejt3lplCA7Oui47aGGCR1tlMujizbMat03d3PL4tK4\nJSaVBh95ZUMtTDjYj1nte2Jwgnp8vGOJ2FNL5JDcWaoG86nQxSl7iddACwO6jnIT\nHV3AJXaRBVew7I0zuHp71IrMHlVRrnE30ZetCiuwam463YWruhXjJIg8i8M2Pqzf\nM8qDAlU2X8Oj3rwNN7LeeJJNe50L6XfFfAvOwWKIERS9iWInkvcDN40Q8nGlHc9q\nRfRv81Y1FC+uNNI6n3OtlLgDA5J2qBxBjc8CAeTYL14BaWt16RGi4mnkVxkHkp5D\nNS71AaVzl+btj1DrlHeQ3uzRdRISSaZ+HwXt6cWgcQKBgQD5sp5GyUBn5IBoJ49Q\nYdmPOVmBnX6TMBygv9cr8Nb1bRj/Ml0hGwtiQuOFMzt7rJlrSv07sUZweUEH9eZ1\n/GFJuZllxWikOtDIOIK4zbr5NLqGXc9OaFMQDGZ7tnrcgg3HsgToA0vXrWvELgEt\nYpM4ChcoIwwLSeSP5+Q7dyh3cwKBgQDSg2tQBrlAhCIKLVaaCNLO5sXeic4Z3jwI\nRWRo0eXH9n1GEf1ibM/6LJebVJzFY0+1wbApO+0EohyHEBDslxW9zFMmbtbZ9ra3\nUdKt1lS4X9XguIfRxCxIIsO3e8JasRlU8mj36EsPwkFAFF/6jiQooIQoNsth7cCX\njE86alRXdQKBgQDiYlkx4GDuULNCuysqO6zeN6a45yvNEr/B1mylQBQEK8eQB/97\ndmOZ0P8q0spJVLE8H578MbulWanmJ8Gskwc5qnYzWQmIbHLCNMn/9zZfnrjF/eNo\nORml4ThBTa6Soa8QsIvWNrbacjbUhMk4drj3A97+2teenH4HIr1AVMZxlQKBgQCh\neHZuysl76B4oCkC8I/p3A2JQ4Qj6pJENkxSCpkWHTNUoUxI1VdttPJkJZyxc52Ez\nvB6AclvKSwJwwu0IXJcrnzdEao5YX7olARkFiDoxtijalxBu4PdKWYggDEi2wdL5\nansDdOVmcA0Wtsor6K1pkD3ujqEQO4qXc+MtnnOVJQKBgFRBZ/ko+K4mQJg3wEzR\n91DMsXJmNvlmekAy//i0zgZea8bclCsa44RTz6R8PWe0pClKoIVexPPGymGLOa9q\namUoXpCr/AY2fcyXtk4j4gDBFrgyf/P1e/ivr7OCRpOMVQD0S7cZ5hRsnxv/2/B8\n+gCI5PYUArKxnudg9wEeeCzT\n-----END PRIVATE KEY-----\n',
  clientEmail: 'firebase-adminsdk-6freo@cargle-66563.iam.gserviceaccount.com',
};

const token = [
  'csOBq9EfTfSdY60Ujorxw6:APA91bFrIU4BktdEUsE5tmViTyq3zEjx6XuybGrBsY-fXdkyFQq2JiPJmJCaorTe0a-BZQsOr-kRqbGNYfcVahKax9rsNRsVV8gbHvSYAe8AjoZlPAfHFrpL1Fkua-6zEf9iGhY5mrvQ',
];
@Injectable()
export class FcmService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
    });
  }

  async sendFCM() {
    const res = await admin.messaging().sendToDevice(token, {
      notification: {
        title: '드디에 성공',
        body: '집에 가자',
      },
    });
    console.log(res);
  }
}
