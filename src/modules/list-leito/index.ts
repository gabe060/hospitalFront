import * as angular from 'angular';
import { ListLeitoController } from './list-leito.controller';

export const listLeitoModule = angular.module('listLeitoModule', []);

listLeitoModule.controller('ListLeitoController', ListLeitoController);