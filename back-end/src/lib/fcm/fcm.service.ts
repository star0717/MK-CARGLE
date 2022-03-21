import { Injectable, BadRequestException } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
import config from 'src/config/configuration';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  MessagingDevicesResponse,
  MessagingPayload,
  MessagingOptions,
  NotificationMessagePayload,
  DataMessagePayload,
} from 'firebase-admin/lib/messaging/messaging-api';
import { Messaging } from 'firebase-admin/lib/messaging/messaging';
import { FindParameters } from 'src/models/base.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UserAuthority } from 'src/constants/model.const';

@Injectable()
export class FcmService {
  private readonly envConfig = config();
  private readonly fcmConfig: ServiceAccount = {
    projectId: this.envConfig.fcm.projectID,
    privateKey: this.envConfig.fcm.privateKey.replace(/\\n/g, '\n'),
    clientEmail: this.envConfig.fcm.clientEmail,
  };

  private readonly _fcm: Messaging;

  constructor(readonly usersService: UsersService) {
    admin.initializeApp({
      credential: admin.credential.cert(this.fcmConfig),
    });
    this._fcm = admin.messaging();
  }

  async sendToMyCompany(
    token: AuthTokenInfo,
    auth?: UserAuthority,
    payload?: MessagingPayload,
  ): Promise<MessagingDevicesResponse> {
    let fParams: FindParameters = {
      page: 1,
      take: 100,
      projection: '-_id fcmToken',
    };
    if (auth) fParams.filter = { auth } as Partial<User>;

    if (!payload) payload = this._testPayload;

    const users = await this.usersService.findByOptions(token, fParams);

    if (!users) throw new BadRequestException();
    let tokens: string[] = [];

    users.docs.map((user) => {
      if (user.fcmToken && user.fcmToken != '' && user.fcmToken != undefined)
        tokens.push(user.fcmToken);
    });

    return await this._sendToDevice(tokens, payload);
  }

  async _sendToDevice(
    tokens: string[],
    payload: MessagingPayload,
    options?: MessagingOptions,
  ): Promise<MessagingDevicesResponse> {
    if (tokens.length == 0) {
      throw new BadRequestException();
    }

    const res: MessagingDevicesResponse = await this._fcm.sendToDevice(
      tokens,
      payload,
      options,
    );
    return res;
  }

  private readonly _testNoti: NotificationMessagePayload = {
    title: '테스트 노티 타이틀',
    body: '테스트 노티 바디',
  };

  private readonly _testData: DataMessagePayload = {
    key1: '테스트1',
    key2: '테스트2',
  };

  private readonly _testPayload: MessagingPayload = {
    notification: this._testNoti,
    data: this._testData,
  };
}
