import * as angular from 'angular';
import { ListAlaController } from './list-ala.controller';

export const listAlaModule = angular.module('listAlaModule', []);

listAlaModule.controller('ListAlaController', ListAlaController);