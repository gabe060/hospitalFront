import * as angular from 'angular';
import { RegisterPatientController } from './register-patient.controller';

export const registerPatientModule = angular.module('RegisterPatientController', []);

registerPatientModule.controller('RegisterPatientController', RegisterPatientController);