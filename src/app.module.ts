import * as AdminJSPrisma from '@adminjs/prisma';
import { PrismaService } from './prisma/prisma.service';
import AdminJS from 'adminjs';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DMMFClass } from '@prisma/client/runtime';
import { AdminModule } from '@adminjs/nestjs';
import { PrismaClient } from '@prisma/client';

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: () => {
        const prisma = new PrismaClient();
        const dmmf = (prisma as any)._baseDmmf as DMMFClass;
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: { model: dmmf.modelMap.products, client: prisma },
                options: {
                  navigation: {
                    name: null,
                    icon: null,
                  },
                },
              },
              {
                resource: {
                  model: dmmf.modelMap.category_products,
                  client: prisma,
                },
                options: {
                  navigation: {
                    name: null,
                    icon: null,
                  },
                },
              },
              {
                resource: { model: dmmf.modelMap.categories, client: prisma },
                options: {
                  navigation: {
                    name: null,
                    icon: null,
                  },
                },
              },
            ],
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
