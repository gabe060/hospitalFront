export class RegisterAdmissionController {
    static $inject = ['$http', '$location'];
    hospitals: any[] = [];
    alas: any[] = [];
    patients: any[] = [];

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

    listPatients(){
        this.$http.get('http://localhost:8080/hospital/pacientes')
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    constructor(private $http : angular.IHttpService, private $location: angular.ILocationService){
        this.listHospitals();
        this.listAlas();
        this.listPatients();
    }


    selectedHospitalId: number | undefined = undefined
    selectedEspecialidade: any;
    patientName: string = '';

    public findPatientsByName(){
        if(!this.patientName || this.patientName.trim() === '') {
            this.listPatients();
            return;
        }

        this.$http.get(`http://localhost:8080/hospital/paciente/search/${this.patientName}`)
            .then(response => {this.patients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);})
    }

    // alaEspecialidade: string = '';
    // alaQuantQuartos: number | undefined;
    // alaQuantLeitosPorQuarto: number | undefined;

    startAdmission(patientId: number){
        if(!this.selectedHospitalId || this.selectedHospitalId == null) {
             alert('Selecione um hospital');
            return;
        }

        if(!this.selectedEspecialidade || this.selectedEspecialidade.trim() === '') {
             alert('Selecione uma especialidade');
            return;
        }

        const admission = {
            pacienteId: patientId,
            especialidade: this.selectedEspecialidade
        };

        this.$http.post(`http://localhost:8080/hospital/${this.selectedHospitalId}/paciente/internar`, admission)
            .then(() => {
                this.clearForm();
                this.listPatients();
                alert('Paciente internado com sucesso!');
            }).catch(error => {console.error('Erro ao Registrar Internação', error); alert('O Paciente já possui uma internação em andamento');});
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

    // deleteAla(alaId: number){
    //     const confirmar = confirm('Tem certeza que deseja excluir esta ala?');
    //     if (!confirmar) return;

    //     this.$http.delete(`http://localhost:8080/hospital/${this.selectedHospitalId}/ala/${alaId}/delete`)
    //         .then(() => {this.listAlas();})
    //         .catch(error => {console.error('Erro ao Deletar Ala', error);})
    // }

    clearForm() {
        this.patientName = '';
        this.selectedEspecialidade = null;
        this.selectedHospitalId = undefined;
    }

    goHome() {
        this.$location.path('/home');
    }

}