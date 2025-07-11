export class ListAlaController {
    static $inject = ['$http', '$location'];
    hospitals: any[] = [];
    alas: any[] = [];

    listHospitals(){
        this.$http.get('http://localhost:8080/hospital')
            .then(response => {this.hospitals = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Hospitais', error);})
    }
    
    listAlas(){
         if (!this.selectedHospitalId) {
        this.alas = [];
        return;
    }
        this.$http.get(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala`)
            .then(response => {this.alas = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Alas', error);})
    }

    constructor(private $http : angular.IHttpService, private $location: angular.ILocationService){
        this.listAlas();
        this.listHospitals();
    }

    selectedHospitalId: number = 0
    searchEspecialidade: string = '';

    public findAlasByEspecialidade(){
        if(!this.searchEspecialidade || this.searchEspecialidade.trim() === '') {
            this.listAlas();
            return;
        }

        this.$http.get(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/search/${this.searchEspecialidade}`)
            .then(response => {this.alas = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Alas', error);})
    }

    goHome() {
        this.$location.path('/home');
    }
    
}