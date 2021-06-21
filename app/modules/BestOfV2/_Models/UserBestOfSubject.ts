class UserBestOfSubject {
  last_update_date: string;
  legacy_id: number;
  name: string;
  subject_id: string;
  topics: any;
  version: number;

  constructor(params) {
    this.last_update_date = params.last_update_date;
    this.legacy_id = params.legacy_id;
    this.name = params.name;
    this.subject_id = params.subject_id;
    this.topics = params.topics;
    this.version = params.version;
  }
}

export default UserBestOfSubject;
