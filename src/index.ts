import * as angular from 'angular';
import 'angular-ui-router';

import { homePageModule } from './home-page/index';
import { registerHospitalModule } from './modules/register-hospital/index';
import { registerPatientModule } from "./modules/register-patient/index";
import { registerAdmissionModule } from './modules/register-admission/index';
import { listHospitalModule } from './modules/list-hospital/index';
import { registerAlaModule } from './modules/register-ala/index';
import { listAlaModule } from './modules/list-ala/index';
import { listQuartoModule } from './modules/list-quarto/index';
import { listLeitoModule } from './modules/list-leito/index';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name,
  registerHospitalModule.name,
  registerPatientModule.name,
  registerAdmissionModule.name,
  listHospitalModule.name,
  registerAlaModule.name,
  listAlaModule.name,
  listQuartoModule.name,
  listLeitoModule.name
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

    $stateProvider.state('registerAdmission', {
      url: '/register-admission',
      templateUrl: 'src/modules/register-admission/register-admission.html',
      controller: 'RegisterAdmissionController',
      controllerAs: 'vm'
    })

    $stateProvider.state('listHospital', {
      url: '/list-hospital',
      templateUrl: 'src/modules/list-hospital/list-hospital.html',
      controller: 'ListHospitalController',
      controllerAs: 'vm'
    });

    $stateProvider.state('registerAla', {
      url: '/register-ala',
      templateUrl: 'src/modules/register-ala/register-ala.html',
      controller: 'RegisterAlaController',
      controllerAs: 'vm'
    });

     $stateProvider.state('listAla', {
      url: '/list-ala',
      templateUrl: 'src/modules/list-ala/list-ala.html',
      controller: 'ListAlaController',
      controllerAs: 'vm'
    });

      $stateProvider.state('listQuarto', {
      url: '/list-quarto',
      templateUrl: 'src/modules/list-quarto/list-quarto.html',
      controller: 'ListQuartoController',
      controllerAs: 'vm'
    });

      $stateProvider.state('listLeito', {
      url: '/list-leito',
      templateUrl: 'src/modules/list-leito/list-leito.html',
      controller: 'ListLeitoController',
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/home');
  }
]);
