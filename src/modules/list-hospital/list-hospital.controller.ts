export class ListHospitalController {
    static $inject = ['$http'];
    hospitals: any[] = [];

    listHospitals(){
        this.$http.get('http://localhost:8080/hospital')
            .then(response => {this.hospitals = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Hospitais', error);})
    }

    constructor(private $http : angular.IHttpService){
        this.listHospitals();
    }

    searchName: string = '';

    public findHospitalsByName(){
        if(!this.searchName || this.searchName.trim() === '') {
            this.listHospitals();
            return;
        }

        this.$http.get(`http://localhost:8080/hospital/search/${this.searchName}`)
            .then(response => {this.hospitals = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Hospitais', error);})
    }
}