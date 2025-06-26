import * as angular from 'angular';
import { ListHospitalController } from './list-hospital.controller';

export const listHospitalModule = angular.module('listHospitalModule', []);

listHospitalModule.controller('ListHospitalController', ListHospitalController);