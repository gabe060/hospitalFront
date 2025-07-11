export class RegisterPatientController {
    static $inject = ['$http', '$location'];
    patients: any[] = [];

    listPatients(){
        this.$http.get('http://localhost:8080/hospital/pacientes')
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    constructor(private $http : angular.IHttpService, private $location: angular.ILocationService){
        this.listPatients();
    }

    searchName: string = '';

    public findPatientsByName(){
        if(!this.searchName || this.searchName.trim() === '') {
            this.listPatients();
            return;
        }

        this.$http.get(`http://localhost:8080/hospital/paciente/search/${this.searchName}`)
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    patientName: string = '';

    addPatient(){
        if(!this.patientName.trim()) return;

        const patient = {
            nome: this.patientName
        };

        this.$http.post('http://localhost:8080/hospital/paciente/new', patient)
            .then(() => {
                this.patientName = '';
                this.listPatients();
            }).catch(error => {console.error('Erro ao Cadastrar Paciente', error);});
    }

    updateHospital(hospitalId: number){
        const newName = prompt('Digite o novo nome do paciente');

        if(newName === null || newName.trim() === '') return;

        const patientUpdate = {
            nome: newName
        };

        this.$http.put(`http://localhost:8080/hospital/${hospitalId}`, patientUpdate)
            .then(() => {this.listPatients();})
            .catch(error => {console.error('Erro ao Atualizar Paciente', error);})
    }

    // deletPatient(patientId: number){
    //     const confirmar = confirm('Tem certeza que deseja excluir este paciente?');
    //     if (!confirmar) return;

    //     this.$http.delete(`http://localhost:8080/hospital/${hospitalId}`)
    //         .then(() => {this.listPatients();})
    //         .catch(error => {console.error('Erro ao Deletar Paciente', error);})
    // }

    goHome() {
        this.$location.path('/home');
    }

}