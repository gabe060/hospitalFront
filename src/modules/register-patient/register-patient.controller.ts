export class RegisterPatientController {
    static $inject = ['$http'];
    patients: any[] = [];

    listPatients(){
        this.$http.get('http://localhost:8080/patients')
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    constructor(private $http : angular.IHttpService){
        this.listPatients();
    }

    searchName: string = '';

    public findPatientsByName(){
        if(!this.searchName || this.searchName.trim() === '') {
            this.listPatients();
            return;
        }

        this.$http.get(`http://localhost:8080/patients/search/${this.searchName}`)
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    patientName: string = '';

    addPatient(){
        if(!this.patientName.trim()) return;

        const patient = {name: this.patientName};

        this.$http.post('http://localhost:8080/patients', patient)
            .then(() => {
                this.patientName = '';
                this.listPatients();
            }).catch(error => {console.error('Erro ao Adicionar Paciente', error);});
    }

    updatePatient(patient: any){
        const newName = prompt('Digite o novo nome do paciente');

        if(newName === null || newName.trim() === '') return;

        const patientUpdate = {name: newName};

        this.$http.put(`http://localhost:8080/patients/${patient.id}`, patientUpdate)
            .then(() => {this.listPatients();})
            .catch(error => {console.error('Erro ao Atualizar Paciente', error);})
    }

    deletePatient(patientId: number){
        const confirmar = confirm('Tem certeza que deseja excluir este paciente?');
        if (!confirmar) return;

        this.$http.delete(`http://localhost:8080/patients/${patientId}`)
            .then(() => {this.listPatients();})
            .catch(error => {console.error('Erro ao Deletar Paciente', error);})
    }
}