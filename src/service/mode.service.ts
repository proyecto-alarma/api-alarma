import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from 'src/commons/schema/mode.schema';
import { HistoryModeService } from './history-mode.service';
import { Imodo } from 'src/commons/interface/modo.interface';
import { Model } from 'mongoose';
import { ModoEnum } from 'src/commons/enum/modo.enum';
import { SendEmailService } from './send-email.service';
import { UserService } from './user.service';
import { ResponseBase } from 'src/common/model/response-base.model';
import { log } from 'console';

@Injectable()
export class ModeService {

    constructor(
        @InjectModel(Mode.name)
        private readonly modeModel: Model<Mode>,
        private readonly historyStatusService: HistoryModeService,
        private readonly sendMailService: SendEmailService,
        private readonly userService: UserService,

    ) { }
    async createMode(istatus: Imodo) {
        try {
          const lastResult = await this.modeModel.findOne().sort({ $natural: -1 });
      
          if (!lastResult) {
            await this.modeModel.create(istatus); // Save the first record regardless of the status
          } else {
            if(istatus.modo==ModoEnum.INTRUSO && lastResult.modo==ModoEnum.OBSERVADOR){

            }
            if(istatus.modo==ModoEnum.VIGILANTE || istatus.modo==ModoEnum.OBSERVADOR){
                await this.modeModel.updateOne(istatus); 

            }
            if(istatus.modo==ModoEnum.INTRUSO && lastResult.modo==ModoEnum.VIGILANTE){
                let users = await this.userService.getUsers2();
      
                  users.forEach(e => {
                    if (e.status == "DISPONIBLE") {
                      this.sendMailService.sendEMail(e.email, 'Alarma activada, por favor revise');
                      this.sendMailService.sendNotification(e.tokenDevice, "Alarma activada!", 'Por favor revise', 'alert');
                    }
                  });
        
                await this.modeModel.updateOne(istatus); 
            }
            if(istatus.modo==ModoEnum.INTRUSO && lastResult.modo==ModoEnum.INTRUSO){
                let users = await this.userService.getUsers2();
      
                  users.forEach(e => {
                    if (e.status == "DISPONIBLE") {
                      this.sendMailService.sendEMail(e.email, 'Alarma activada, por favor revise');
                      this.sendMailService.sendNotification(e.tokenDevice, "Alarma activada!", 'Por favor revise', 'alert');
                    }
                  });
        
                await this.modeModel.updateOne(istatus); 
            }
          }
      
          await this.historyStatusService.createHistory({
            currentMode: istatus.modo,
            lastMode: lastResult == null ? istatus.modo : lastResult.modo,
            date: new Date()
          });
      
          return new ResponseBase("OK", "Petición exitosa", {});
        } catch (e) {
          console.log(e);
        }
      }
      
      
    // async createMode(istatus: Imodo) {
    //     try {


    //         const lastResult = await this.modeModel.findOne().sort({ $natural: -1 });
    //         if (!lastResult) {
    //             if (istatus.modo == ModoEnum.INTRUSO) {
    //                 let users = await this.userService.getUsers2();
    //                 if (lastResult.modo !== ModoEnum.OBSERVADOR) {
    //                     console.log('010101010101012');

    //                     users.forEach(e => {
    //                         if (e.status == "DISPONIBLE") {
    //                             this.sendMailService.sendEMail(e.email, 'Alarma activada, por favor revise');
    //                             this.sendMailService.sendNotification(e.tokenDevice, "Alarma activada!", 'Por favor revise', 'alert');
    //                         }
    //                     });
    //                 }

    //             }
    //             if (lastResult.modo != ModoEnum.OBSERVADOR) {
    //                 await this.modeModel.create(istatus)
    //             }
    //         } else {
    //             if (istatus.modo == ModoEnum.INTRUSO) {
    //                 let users = await this.userService.getUsers2();
    //                 if (lastResult.modo !== ModoEnum.OBSERVADOR) {
    //                     console.log('01010101010101');

    //                     users.forEach(e => {
    //                         if (e.status == "DISPONIBLE") {
    //                             this.sendMailService.sendEMail(e.email, 'Alarma activada, por favor revise');
    //                             this.sendMailService.sendNotification(e.tokenDevice, "Alarma activada!", 'Por favor revise', 'alert');
    //                         }
    //                     });
    //                 }

    //             }
    //             if (lastResult.modo != ModoEnum.OBSERVADOR) {

    //                 await this.modeModel.updateOne(istatus);
    //             }
                
    //         }

    //         await this.historyStatusService.createHistory({
    //             currentMode: istatus.modo,
    //             lastMode: lastResult == null ? istatus.modo : lastResult.modo,
    //             date: new Date()
    //         });
    //         return new ResponseBase("OK", "Petición exitosa", {});
    //     } catch (e) {

    //         console.log(e);

    //     }
    // }


    async geMode() {
        try {
            const lastResult = await this.modeModel.findOne().sort({ $natural: -1 });

            return new ResponseBase('OK', 'Modo consultado correctamentoe', lastResult);

        } catch (error) {

        }
    }
}
