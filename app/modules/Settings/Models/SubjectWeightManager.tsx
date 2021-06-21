import Numbers from "../../../utils/misc/Numbers";

const F_PERCENT = 0.7;
const N_PERCENT = 0.3;

class SubjectWeightManager {
  f_subjects_weight: Array<{
    subject_id: string;
    value: number;
    calc_value: number;
  }> = [];
  n_subjects_weight: Array<{subject_id: string; calc_value: number}> = [];

  constructor() {}

  init(subjects_weight, type) {
    const _subjects_weight = [];
    subjects_weight.map(subject_w => _subjects_weight.push(subject_w));

    if (type === 'f') this.f_subjects_weight = _subjects_weight;
    if (type === 'n') this.n_subjects_weight = _subjects_weight;
  }

  calculate() {
    this.calculate_f();
    this.calculate_n();
  }

  calculate_f() {
    let sum = 0;
    let check_sum = 0;
    this.f_subjects_weight.map(subject_weight => (sum += subject_weight.value));
    this.f_subjects_weight.map(subject_weight => {
      const sum1 = Numbers.round((subject_weight.value * F_PERCENT) / sum, 5);
      subject_weight.calc_value = sum1;
      check_sum += sum1;
    });
    return sum === check_sum;
  }

  calculate_n() {
    const n_value = Numbers.round(N_PERCENT / this.n_subjects_weight.length, 5);
    this.n_subjects_weight.map(
      subject_weight => (subject_weight.calc_value = n_value),
    );
  }

  getTotalSubjectsWeight() {
    let checksum = 0;
    const result = {};
    this.f_subjects_weight.map(
      sw => (
        (checksum += sw.calc_value),
        sw.calc_value > 0
          ? (result[sw.subject_id] = Numbers.round(sw.calc_value, 5))
          : null
      ),
    );
    this.n_subjects_weight.map(
      sw => (
        (checksum += sw.calc_value),
        sw.calc_value > 0
          ? (result[sw.subject_id] = Numbers.round(sw.calc_value, 5))
          : null
      ),
    );
    if (result) {
      const offset = 1 - checksum;
      result[this.f_subjects_weight[0].subject_id] += offset;
    }
    return result;
  }
}

export default new SubjectWeightManager();
