import * as angular from 'angular';
import { RegisterHospitalController } from './register-hospital.controller';

export const registerHospitalModule = angular.module('registerHospitalModule', []);

registerHospitalModule.controller('RegisterHospitalController', RegisterHospitalController);