import * as angular from 'angular';
import { AdmissionController } from './admission.controller';

export const admissionModule = angular.module('admissionModule', []);

admissionModule.controller('AdmissionController', AdmissionController);