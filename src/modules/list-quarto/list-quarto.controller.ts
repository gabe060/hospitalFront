export class ListQuartoController {
    static $inject = ['$http', '$location'];
    hospitals: any[] = [];
    alas: any[] = [];
    quartos: any[] = [];

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

        listQuartos(){
         if (!this.selectedHospitalId || !this.selectedAlaId) {
        this.quartos = [];
        return;
    }
        this.$http.get(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/${this.selectedAlaId}/quartos`)
            .then(response => {this.quartos = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Quartos', error);})
    }

    constructor(private $http : angular.IHttpService, private $location: angular.ILocationService){
        this.listQuartos();
        this.listAlas();
        this.listHospitals();
    }

    selectedAlaId: number = 0
    selectedHospitalId: number = 0
    searchCode: string = '';

    public findQuartosByCode(){
        if(!this.searchCode || this.searchCode.trim() === '') {
            this.listQuartos();
            return;
        }

        this.$http.get(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/${this.selectedAlaId}/quarto/search/${this.searchCode}`)
            .then(response => {this.quartos = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Quartos', error);})
    }

    goHome() {
        this.$location.path('/home');
    }

}