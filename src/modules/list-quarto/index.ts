import * as angular from 'angular';
import { ListQuartoController } from './list-quarto.controller';

export const listQuartoModule = angular.module('listQuartoModule', []);

listQuartoModule.controller('ListQuartoController', ListQuartoController);