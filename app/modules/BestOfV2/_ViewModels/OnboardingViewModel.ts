import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { handleUser } from "../../../utils/firebase/authUtils";
import { auth } from "../../../utils/firebase";

class OnboardingViewModel extends ViewModelBase {
  faculties: any;
  selectedFaculty: any;
  subjects: any;
  suggestedSubjects: any;
  selectedSubjects: any;
  selectedSubjectNames: any;
  loading: boolean;

  initValues() {
    this.faculties = [];
    this.selectedFaculty = '';
    this.subjects = [];
    this.selectedSubjects = [];
    this.selectedSubjectNames = [];
    this.loading = false;
  }

  resetValues() {
    this.faculties = [];
    this.selectedFaculty = '';
    this.subjects = [];
    this.selectedSubjects = [];
    this.selectedSubjectNames = [];
    this.loading = false;
  }

  getFaculties = async () => {
    this.loading = true;
    this.updateView();

    const response: any = await CallServerPromise.get_all_faculties();
    if (response.success) {
      this.faculties = response.data;
    }
    this.loading = false;
    this.updateView();
  };

  getSuggestedSubjects = async () => {
    this.loading = true;
    this.updateView();

    const response: any = await CallServerPromise.get_suggested_subjects();
    if (response.success) {
      this.suggestedSubjects = response.data;
    }
    this.loading = false;
    this.updateView();
  };

  sendDataToServer = async () => {
    this.loading = true;
    this.updateView();

    let new_data = {
      faculty_id: this.selectedFaculty.faculty_id,
      bestof_subjects: this.selectedSubjects,
    };
    const response: any = await CallServerPromise.update_account(new_data);
    if (response.success) {
      await handleUser(auth().currentUser);
    }
    this.loading = false;
    this.updateView();
    return response;
  };

  setSelectedFaculty(faculty) {
    this.selectedFaculty = faculty;
    this.updateView();
  }

  setSelectedSubjects(subjects, subject_names) {
    this.selectedSubjects = subjects;
    this.selectedSubjectNames = subject_names;
    this.updateView();
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

export default useViewModel(new OnboardingViewModel());
