export class ListLeitoController {
    static $inject = ['$http', '$location'];
    hospitals: any[] = [];
    alas: any[] = [];
    quartos: any[] = [];
    leitos: any[] = [];
    logs: any[] = [];

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

    listLeitos(){
         if (!this.selectedHospitalId || !this.selectedAlaId || !this.selectedQuartoId) {
        this.leitos = [];
        return;
    }
        this.$http.get(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/${this.selectedAlaId}/quarto/${this.selectedQuartoId}/leitos`)
            .then(response => {this.leitos = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Leitos', error);})
    }

    constructor(private $http : angular.IHttpService, private $location: angular.ILocationService){
        this.listQuartos();
        this.listAlas();
        this.listHospitals();
        this.listLeitos();
    }

    selectedQuartoId: number = 0
    selectedAlaId: number = 0
    selectedHospitalId: number = 0
    searchLeitoCode: string = '';
    showLogs: boolean = false;

    public findLeitosByCode(){
        if(!this.searchLeitoCode || this.searchLeitoCode.trim() === '') {
            this.listLeitos();
            return;
        }

        this.$http.get(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/${this.selectedAlaId}/quarto/${this.selectedQuartoId}/leito/search/${this.searchLeitoCode}`)
            .then(response => {this.leitos = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Leitos', error);})
    }

    logLeito(leitoId: number){
        this.$http.get(`http://localhost:8080/hospital/${this.selectedHospitalId}/log/leito/${leitoId}`)
            .then(response => {this.logs = response.data as any;
                                this.showLogs = true;
            })
            .catch (error => {console.error('Erro ao Buscar Logs', error);})
    }

    clearLogs() {
        this.logs = [];
        this.showLogs = false;
}

    goHome() {
        this.$location.path('/home');
    }

}