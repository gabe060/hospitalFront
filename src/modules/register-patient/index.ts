import * as angular from 'angular';
import { RegisterPatientController } from './register-patient.controller';

export const registerPatientModule = angular.module('registerPatientModule', []);

registerPatientModule.controller('RegisterPatientController', RegisterPatientController);