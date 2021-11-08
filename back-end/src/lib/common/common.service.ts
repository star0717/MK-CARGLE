import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Address } from 'nodemailer/lib/mailer';

@Injectable()
export class CommonService {

    constructor(private readonly mailerService: MailerService) { }

    async sendMail(address: string | Address | (string | Address)[], subject: string, html: string) {
        if (!address) {
            return false;
        }

        try {
            await this.mailerService.sendMail({
                to: address,
                subject,
                html
            })
        } catch (err) {
            console.log(err);
        }
    }
}
