import { AvailableBedDTO, Page } from './interfaces/bed.types';

export class AdmissionController {
    static $inject = ['$http'];

    admittedPatients: any[] = [];
    patientResults: any[] = [];
    hospitals: any[] = [];

    patientName: string = '';
    selectedPatientId: number | null = null;
    selectedHospitalId: number | null = null;
    selectedSpecialty: string = '';
    availableBeds: any[] = [];
    selectedBedId: number | null = null;

    bedPageNumber: number = 0;
    bedPageSize: number = 5;
    bedTotalPages: number = 0;

    constructor(private $http : angular.IHttpService){
        this.getAdmittedPatients();
        this.loadHospitals();
    }

    getAdmittedPatients(){
        this.$http.get('http://localhost:8080/adm/currently-admitted')
            .then(response => {this.admittedPatients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes Admitidos', error);})
    }

    loadHospitals(){
        this.$http.get('http://localhost:8080/hospitals')
            .then(response => {this.hospitals = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Hospitais', error);})
    }

    selectPatient(patient: any) {
        this.patientName = patient.name;
        this.selectedPatientId = patient.id;
        this.patientResults = [];
    }

    searchPatients(name: string){
        this.$http.get(`http://localhost:8080/patients/search/${name}`)
            .then(response => {this.patientResults = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);});
    }

    loadAvailableBeds() {
        let baseUrl = 'http://localhost:8080';

        let url = '';

        // if (this.selectedHospitalId && this.selectedSpecialty) {
        //     url = `${baseUrl}/beds/available-by-hospital-and-specialty/${this.selectedHospitalId}/${this.selectedSpecialty}`;
        // } else if (this.selectedHospitalId) {
        //     url = `${baseUrl}/beds/available-by-hospital/${this.selectedHospitalId}`;
        // } else {
        //     url = `${baseUrl}/beds/available`;
        // }

        if (this.selectedHospitalId && this.selectedSpecialty) {
            url = `${baseUrl}/beds/available-by-hospital-and-specialty/${this.selectedHospitalId}/${this.selectedSpecialty}`;
        } else {
            url = `${baseUrl}/beds/available`;
        }

        url += `?page=${this.bedPageNumber}&size=${this.bedPageSize}`;

        this.$http.get<Page<AvailableBedDTO>>(url)
            .then(response => {
                this.availableBeds = response.data.content;
                this.bedTotalPages = response.data.totalPages;
            })
            .catch(error => console.error('Erro ao buscar leitos disponíveis', error));
    }


    admitPatient() {
        if (!this.selectedPatientId || !this.selectedBedId) {
            alert('Selecione um paciente e uma cama.');
            return;
        }

        const payload = {
            patientId: this.selectedPatientId,
            bedId: this.selectedBedId
        };

        this.$http.post('http://localhost:8080/adm', payload)
            .then(() => {
                alert('Paciente internado com sucesso!');
                this.clearForm();
                this.getAdmittedPatients();
            })
            .catch(error => {
                console.error('Erro ao internar paciente', error);
                alert('Erro ao internar paciente.');
            });
    }

    clearForm() {
        this.patientName = '';
        this.selectedPatientId = null;
        this.selectedHospitalId = null;
        this.selectedSpecialty = '';
        this.selectedBedId = null;
        this.availableBeds = [];
        this.patientResults = [];
    }

}