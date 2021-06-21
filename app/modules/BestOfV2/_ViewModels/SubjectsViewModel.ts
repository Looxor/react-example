import { useViewModel, ViewModelBase } from "../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { UserData } from "../../../config/constants";
import standardFunctions from "../../../utils/app/StandardFunctions";

class SubjectsViewModel extends ViewModelBase {
  facultySubjects: any;
  suggestedSubjects: any;
  selectedSubjects: any;
  loading: boolean;

  initValues() {
    this.facultySubjects = UserData.getUserData().faculty_subjects;
    this.selectedSubjects = [];
    this.loading = false;
  }

  resetValues() {
    this.facultySubjects = UserData.getUserData().faculty_subjects;
    this.selectedSubjects = [];
    this.loading = false;
  }

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

  getSelectedSubjects = () => {
    this.selectedSubjects = UserData.getUserData().bestof_subjects.map(
      s => s.subject_id,
    );
    this.updateView();
  };

  sendDataToServer = async () => {
    this.loading = true;
    this.updateView();

    let new_data = {
      bestof_subjects: this.selectedSubjects,
    };
    const response: any = await CallServerPromise.update_account(new_data);
    this.loading = false;
    this.updateView();
    standardFunctions.add_firebase_event_log('bestofs', 'chd_subjects');
    return response;
  };

  setSelectedSubjects(subjects) {
    this.selectedSubjects = subjects;
    this.updateView();
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

export default useViewModel(new SubjectsViewModel());
