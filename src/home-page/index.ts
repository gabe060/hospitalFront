import * as angular from 'angular';
import { HomePageController } from './home-page.controller';

export const homePageModule = angular.module('homePageModule', []);

homePageModule.controller('HomePageController', HomePageController);
