import * as angular from 'angular';
import { RegisterAdmissionController } from './register-admission.controller';

export const registerAdmissionModule = angular.module('registerAdmissionModule', []);

registerAdmissionModule.controller('RegisterAdmissionController', RegisterAdmissionController);