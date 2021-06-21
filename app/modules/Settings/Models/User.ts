class User {
  birth_place: string = '';
  birthday: string = '';
  contact_email: string = '';
  country: string = '';
  daily_mode: boolean = false;
  education_level: string = '';
  email: string = '';
  esselunga_verified_customer: boolean = false;
  faculty_id: string = '';
  faculty_name: string = '';
  faculty_subjects: Array<any>;
  firstname: string = '';
  gender: string = '';
  graduation_year: string = '';
  hometown: string = '';
  high_school_name: string = '';
  high_school_year: string = '';
  is_student: boolean = false;
  lastname: string = '';
  major_name: string = '';
  nickname: string = '';
  notification_level: number = 0;
  primary_color: string = '';
  profile_image_url: string = '';
  rewards: any = {};
  resident_student: boolean = false;
  stars: number = 0;
  studytown: string = '';
  student_email: string = '';
  subjects_weight: Array<any>;
  university_id: string = '';
  university_name: string = '';
  university_year: string = '';
  user_id: string = '';
  user_type: string = '';
  useMainEmail: boolean = false;
  emailVerifyInProgress: boolean = false;
  cardVerifyInProgress: boolean = false;

  data: any;

  constructor(params) {
    this.data = params;
    params.birth_place && (this.birth_place = params.birth_place);
    params.birthday && (this.birthday = params.birthday);
    params.contact_email && (this.contact_email = params.contact_email);
    params.country && (this.country = params.country);
    params.daily_mode && (this.daily_mode = params.daily_mode);
    params.education_level && (this.education_level = params.education_level);
    params.email && (this.email = params.email);
    params.esselunga_verified_customer &&
      (this.esselunga_verified_customer = params.esselunga_verified_customer);
    params.faculty_id && (this.faculty_id = params.faculty_id);
    params.faculty_name && (this.faculty_name = params.faculty_name);
    params.faculty_subjects &&
      (this.faculty_subjects = params.faculty_subjects);
    params.firstname && (this.firstname = params.firstname);
    params.gender && (this.gender = params.gender);
    params.graduation_year && (this.graduation_year = params.graduation_year);
    params.hometown && (this.hometown = params.hometown);
    params.high_school_name &&
      (this.high_school_name = params.high_school_name);
    params.high_school_year &&
      (this.high_school_year = params.high_school_year);
    params.is_student && (this.is_student = params.is_student);
    params.lastname && (this.lastname = params.lastname);
    params.major_name && (this.major_name = params.major_name);
    params.nickname && (this.nickname = params.nickname);
    params.notification_level &&
      (this.notification_level = params.notification_level);
    params.primary_color && (this.primary_color = params.primary_color);
    params.profile_image_url &&
      (this.profile_image_url = params.profile_image_url);
    params.stars && (this.stars = params.stars);
    params.rewards && (this.rewards = params.rewards);
    params.resident_student &&
      (this.resident_student = params.resident_student);
    params.studytown && (this.studytown = params.studytown);
    params.student_email && (this.student_email = params.student_email);
    params.subjects_weight && (this.subjects_weight = params.subjects_weight);
    params.university_id && (this.university_id = params.university_id);
    params.university_name && (this.university_name = params.university_name);
    params.user_id && (this.user_id = params.user_id);
    params.user_type && (this.user_type = params.user_type);
    params.university_year && (this.university_year = params.university_year);
    this.useMainEmail = this.contact_email === this.email;
    this.emailVerifyInProgress = false;
    this.cardVerifyInProgress = false;
  }

  d(key) {
    return this.data[key];
  }

  getID() {
    return this.user_id;
  }

  getName() {
    return `${this.firstname} ${this.lastname}`;
  }

  getAge() {
    return Math.floor(
      (+new Date() - +new Date(this.birthday)) / 1000 / 3600 / 24 / 365,
    );
  }

  isStudent() {
    return this.is_student;
  }

  getProfileProgress() {
    let progress = 0;
    if (this.gender) progress += 10;
    if (this.contact_email) progress += 10;
    if (this.birthday) progress += 10;
    if (this.faculty_id) progress += 30;
    if (this.user_type) progress += 40;
    return progress;
  }
}

export default User;
