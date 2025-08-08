import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { CREDENTIALS, MONGO_URI, ORIGIN } from './config';
import Container, { Service } from 'typedi';
import { join } from 'path';
import { glob } from 'glob';
import { forEach } from 'p-iteration';
import { Routes } from './interfaces/route.interface';

@Service()
class App {
  app: express.Application;

  constructor() {
    this.app = express();

    this.init();
  }

  private init() {
    this.connectDatabase();
    this.config();
    this.initializeAutoDiscoverRoutes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors({
      origin: ORIGIN,
      credentials: CREDENTIALS
    }));
  }

  private connectDatabase(): void {
    mongoose.connect(MONGO_URI)
      .then(() => console.log('MongoDB connected successfully.'))
      .catch(err => console.error('MongoDB connection error:', err));
  }

  private async initializeAutoDiscoverRoutes() {
    const routesDir = join(__dirname, 'routes').replace(/\\/g, '/');
    const files = await glob(`${routesDir}/**/*.ts`);

    console.log(`Discovered ${files.length} route files`);

    await forEach(files, async file => {
      const module = await import(file);

      const routeClasses = Object.values(module).filter(routeClass =>
        Reflect.hasMetadata('Route', routeClass as Object)
      );

      routeClasses.forEach(routeClass => {
        const routeInstance: Routes = Container.get(routeClass as Object);

        this.app.use('/', routeInstance.router);
      })
    });
  }
}

export default new App().app;