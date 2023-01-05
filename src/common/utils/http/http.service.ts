// import { ForbiddenException, Injectable } from '@nestjs/common';
// import { HttpService } from "@nestjs/axios";
// import { catchError, map } from 'rxjs/operators';
// import { ResponseBase } from 'src/common/model/response-base.model';
// import { firstValueFrom } from 'rxjs';
// @Injectable()
// export class ApiService {
//   constructor(
//     protected readonly http: HttpService,
//   ) { }
//   async  get(
//     url: string,
//     body: any
//   ):Promise<any> {

//     const { data } = await firstValueFrom(
//       this.http.post(url,body).pipe(
//         catchError((e) => {

//                    throw new ForbiddenException(new ResponseBase(e.response.data['code'], e.response.data['message'], e.response.data['data']));

//         }),
//       ),
//     );    
//     return data;
//   }

// }
