export class RegisterAlaController {
    static $inject = ['$http', '$location'];
    alas: any[] = [];
    hospitals: any[] = [];

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

    alaEspecialidade: string = '';
    alaQuantQuartos: number | undefined;
    alaQuantLeitosPorQuarto: number | undefined;

    addAla(){
        if(!this.alaEspecialidade.trim()) return;

        const ala = {
            especialidade: this.alaEspecialidade,
            quantidadeQuartos: this.alaQuantQuartos,
            quantidadeLeitosPorQuarto: this.alaQuantLeitosPorQuarto
        };

        this.$http.post(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/new`, ala)
            .then(() => {
                this.alaEspecialidade = '';
                this.alaQuantQuartos = undefined;
                this.alaQuantLeitosPorQuarto = undefined;
                this.listAlas();
            }).catch(error => {console.error('Erro ao Adicionar Ala', error);});
    }

    // updateHospital(hospitalId: number){
    //     const newName = prompt('Digite o novo nome do hospital');

    //     if(newName === null || newName.trim() === '') return;

    //     const hospitalUpdate = {
    //         nome: newName
    //     };

    //     this.$http.put(`http://localhost:8080/hospital/${hospitalId}`, hospitalUpdate)
    //         .then(() => {this.listHospitals();})
    //         .catch(error => {console.error('Erro ao Atualizar Hospital', error);})
    // }

    deleteAla(alaId: number){
        const confirmar = confirm('Tem certeza que deseja excluir esta ala?');
        if (!confirmar) return;

        this.$http.delete(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/${alaId}/delete`)
            .then(() => {this.listAlas();})
            .catch(error => {console.error('Erro ao Deletar Ala', error);})
    }

    goHome() {
        this.$location.path('/home');
    }

}