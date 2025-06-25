import * as angular from 'angular';
import { ListHospitalController } from './list-hospital.controller';

export const registerHospitalModule = angular.module('registerHospitalModule', []);

registerHospitalModule.controller('RegisterHospitalController', ListHospitalController);