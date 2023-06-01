import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Istatus } from 'src/commons/interface/status.interface';
import { Status } from 'src/commons/schema/status.schema';
import { HistoryStatusService } from './history-status.service';
import { StatusEnum } from 'src/commons/enum/status.enum';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import { UserService } from './user.service';
import { SendEmailService } from './send-email.service';
import { ResponseBase } from 'src/common/model/response-base.model';



@Injectable()
export class StatusService {
    constructor(
        @InjectModel(Status.name)
        private readonly statusModel: Model<Status>,
        private readonly historyStatusService: HistoryStatusService,
        private readonly userService: UserService,
        private readonly sendMailService: SendEmailService,


    ) { }
    async createStatus(istatus: Istatus) {
        try {
            const lastResult = await this.statusModel.findOne().sort({ $natural: -1 });
            if (!lastResult) {
                await this.statusModel.create(istatus)
            } else {
                await this.statusModel.updateOne(istatus);
            }
            await this.historyStatusService.createHistory({
                currentStatus: istatus.status,
                lastStatus: lastResult == null ? istatus.status : lastResult.status,
                date: new Date()
            });
            return new ResponseBase("OK", "Petición exitosa",{});

        } catch (error) {
        }
    }


    async geStatus() {
        try {
            const lastResult = await this.statusModel.findOne().sort({ $natural: -1 });

            return new ResponseBase("OK", "Estado consultado correctamente",lastResult);

        } catch (error) {

        }
    }
    // @Cron('* * * * * *') // Ejecutar cada 1 minuto
    @Cron('0 */10 * * * *') // Ejecutar cada 10 minutos
    async handleCron() {
        const lastResult = await this.statusModel.findOne().sort({ $natural: -1 });

        const mongoDate = moment.tz(new Date(lastResult["updatedAt"]), process.env.TIMEZOME);
        const currenDate = moment.tz(new Date(), process.env.TIMEZOME);


        const fecha1 = moment(currenDate.format('YYYY-MM-DD HH:mm:ss'));
        const fecha2 = moment(mongoDate.format('YYYY-MM-DD HH:mm:ss'));
        const diferenciaEnHoras = fecha1.diff(fecha2, 'minute');
        console.log(diferenciaEnHoras); // Output: 2
        if (diferenciaEnHoras > 10) {
            let users = await this.userService.getUsers2();
            users.forEach(e => {
                   if(e.status=="DISPONIBLE"){
                    this.sendMailService.sendEMail(e.email, 'Alarma desconectada, por favor revise');
                    this.sendMailService.sendNotification(e.tokenDevice,"Alarma desconectada!", 'Por favor revise','disconnect');
                   }
            });

        }
        if (lastResult.status === StatusEnum.DESCONECTADO) {


        }       

    }

}
