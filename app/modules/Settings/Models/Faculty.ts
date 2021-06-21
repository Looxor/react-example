import Subject from "./Subject";

class Faculty {
  active: boolean = false;
  faculty_id: string = '';
  faculty_image: string = '';
  image_url: string = '';
  last_update_date: string = '';
  name: string = '';
  subjects: Array<Subject> = [];
  data: any = {};

  constructor(params) {
    this.data = params;
    params.active && (this.active = params.active);
    params.faculty_id && (this.faculty_id = params.faculty_id);
    params.faculty_image && (this.faculty_image = params.faculty_image);
    params.image_url && (this.image_url = params.image_url);
    params.last_update_date &&
      (this.last_update_date = params.last_update_date);
    params.name && (this.name = params.name);
    params.subjects &&
      (this.subjects = params.subjects.map(subject => new Subject(subject)));
  }

  d(key) {
    return this.data[key];
  }

  getSubjectNames() {
    return this.subjects.map(subject => subject.name).join(', ');
  }
}

export default Faculty;
