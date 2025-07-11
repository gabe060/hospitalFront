export class RegisterHospitalController {
    static $inject = ['$http', '$location'];
    hospitals: any[] = [];

    listHospitals(){
        this.$http.get('http://localhost:8080/hospital')
            .then(response => {this.hospitals = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Hospitais', error);})
    }

    constructor(private $http : angular.IHttpService, private $location: angular.ILocationService){
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

    hospitalName: string = '';

    addHospital(){
        if(!this.hospitalName.trim()) return;

        const hospital = {
            nome: this.hospitalName
        };

        this.$http.post('http://localhost:8080/hospital/new', hospital)
            .then(() => {
                this.hospitalName = '';
                this.listHospitals();
            }).catch(error => {console.error('Erro ao Adicionar Hospital', error);});
    }

    updateHospital(hospitalId: number){
        const newName = prompt('Digite o novo nome do hospital');

        if(newName === null || newName.trim() === '') return;

        const hospitalUpdate = {
            nome: newName
        };

        this.$http.put(`http://localhost:8080/hospital/${hospitalId}`, hospitalUpdate)
            .then(() => {this.listHospitals();})
            .catch(error => {console.error('Erro ao Atualizar Hospital', error);})
    }

    deleteHospital(hospitalId: number){
        const confirmar = confirm('Tem certeza que deseja excluir este hospital?');
        if (!confirmar) return;

        this.$http.delete(`http://localhost:8080/hospital/${hospitalId}`)
            .then(() => {this.listHospitals();})
            .catch(error => {console.error('Erro ao Deletar Hospital', error);})
    }

    goHome() {
        this.$location.path('/home');
    }

}