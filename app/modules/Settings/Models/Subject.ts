class Subject {
  last_update_date: string = '';
  legacy_id: number = 0;
  name: string = '';
  subject_id: string = '';
  topics: any = {};

  data: any = {};

  constructor(params) {
    this.data = params;

    params.last_update_date &&
      (this.last_update_date = params.last_update_date);
    params.legacy_id && (this.legacy_id = params.legacy_id);
    params.name && (this.name = params.name);
    params.subject_id && (this.subject_id = params.subject_id);
    params.topics && (this.topics = params.topics);
  }

  d(key) {
    return this.data[key];
  }
}

export default Subject;
