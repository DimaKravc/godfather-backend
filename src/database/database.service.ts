import { Injectable, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as process from "node:process";

@Injectable()
export class DatabaseService extends PrismaClient {
    async onModuleInit() {
        await this.$connect()
    }
    
    async onModuleDestroy() {
        await this.$disconnect()
    }
    
    async enableShutdowHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        })
    }
} 