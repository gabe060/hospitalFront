import * as angular from 'angular';
import { RegisterAlaController } from './register-ala.controller';

export const registerAlaModule = angular.module('registerAlaModule', []);

registerAlaModule.controller('RegisterAlaController', RegisterAlaController);