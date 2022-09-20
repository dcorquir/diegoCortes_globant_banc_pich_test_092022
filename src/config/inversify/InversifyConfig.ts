import "reflect-metadata";

import { Container } from "inversify";
import { APPLICATION_TYPES } from "./ApplicationTypes";

import { IMainDAO } from './../../common/dao/IMainDAO';
import { MainDAOImpl } from './../../common/dao/MainDAOImpl';
import { IApiService } from './../../service/interfaces/Iapi.service';
import { AppServiceImpl } from './../../service/impl/api.service';
import { IApiDAO } from './../../dao/interfaces/IapiDAO';
import { ApiDAO } from './../../dao/impl/apiDAO';

export const AppContainer = new Container();

/** CONFIG MS GENERAL **/
AppContainer.bind<IMainDAO>(APPLICATION_TYPES.IMainDAO).to(MainDAOImpl).inSingletonScope();
AppContainer.bind<IApiService>(APPLICATION_TYPES.IApiService).to(AppServiceImpl).inSingletonScope();
AppContainer.bind<IApiDAO>(APPLICATION_TYPES.IApiDAO).to(ApiDAO).inSingletonScope();
