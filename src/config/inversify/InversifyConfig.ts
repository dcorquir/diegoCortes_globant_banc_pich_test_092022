import "reflect-metadata";

import { Container } from "inversify";
import { APPLICATION_TYPES } from "./ApplicationTypes";

import { IMainDAO } from './../../common/dao/IMainDAO';
import { MainDAOImpl } from './../../common/dao/MainDAOImpl';

export const AppContainer = new Container();

/** CONFIG MS GENERAL **/
AppContainer.bind<IMainDAO>(APPLICATION_TYPES.IMainDAO).to(MainDAOImpl).inSingletonScope();
