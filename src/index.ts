import * as angular from 'angular';
import 'angular-ui-router';

import { homePageModule } from './home-page/index';
import { registerHospitalModule } from './modules/register-hospital/index';
import { registerPatientModule } from "./modules/register-patient/index";
import { admissionModule } from './modules/admission/index';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name,
  registerHospitalModule.name,
  registerPatientModule.name,
  admissionModule.name
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'src/home-page/home-page.html',
      controller: 'HomePageController',
      controllerAs: 'vm'
    });

    $stateProvider.state('registerHospital', {
      url: '/register-hospital',
      templateUrl: 'src/modules/register-hospital/register-hospital.html',
      controller: 'RegisterHospitalController',
      controllerAs: 'vm'
    });

    $stateProvider.state('registerPatient', {
      url: '/register-patient',
      templateUrl: 'src/modules/register-patient/register-patient.html',
      controller: 'RegisterPatientController',
      controllerAs: 'vm'
    });

    $stateProvider.state('admission', {
      url: '/admission',
      templateUrl: 'src/modules/admission/admission.html',
      controller: 'AdmissionController',
      controllerAs: 'vm'
    })

    $urlRouterProvider.otherwise('/home');
  }
]);
