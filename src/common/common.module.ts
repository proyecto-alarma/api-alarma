import { Module } from '@nestjs/common';
// import { HttpModule } from "@nestjs/axios";

import { MongooseModule } from '@nestjs/mongoose';
// import { ApiService } from './utils/http/http.service';

@Module({
    imports: [
        // HttpModule
    ],

    exports: [
        // ApiService
    ],
    providers: [
        // ApiServicekc
    ]
})
export class CommonModule { }
