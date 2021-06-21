# Roadmap of Signup feature of our App
Here is a roadmap for the signup feature
From now on, I will pay attention to make a documentation for all features.

## 1. First Screen - Terms and Conditions
ToDo:
- First cell: Logo -> blue box (like first box of login screen)  
- Second: a text and checks (with link like image)   
- Third: a text and checks (with link like image)   
- Fourth cell: a text and checks (with link like image)   
  Note: the link you can set google.com at the moment,  
  then I will set correct links  
- Disabled/Enabled Button
  Note: User can proceed ONLY if all checks are checked.  

Working:
- Create Signup directory and necessary things
  * adding _reducer.ts and _actions.ts
    Need to add it to app/redux/reducer.ts
  * adding Screens(1-6)
- Creating UI for the screen

  


## 2. Second Screen - Firstname, Lastname, Gender, Birthday, Birthplace
- First cell: Logo -> blue box (like first box of login screen)  
  !: Logo path -> TECHNICAL -> App -> Grafica -> Resources -> 20191113 -> 06_Resources -> react
  icn_battle.png
- Second cell: Firstname -> an input text (Firstname)
- Third cell: Lastname -> an input text (Firstname and Lastname)
- Fourth cell: Gender -> an input select with options: Male/Female/Other
  !: Gender path -> TECHNICAL -> App -> Grafica -> Resources -> 20191113 -> 06_Resources -> react -> facolta
  icn_facoltà_scienze_formazione_big_dark.png
- Fifth cell: Birthday -> a simple date picker (like examples below)
  @me suggestion: What about put the default year like as CurrentYear-20 (Maybe almost students are in 18-25 years old)?
  @federico: That is a good start But we need something even faster if it is possible
- Sixth cell: Birthplace -> an input text

Working:
- Creating UI for the screen
- Creating UI for the gender/birthday
- Adding Rexud to reflect the state

To be done:
- Need to check UI for gender/birthday on iOS



## 3. Third Screen - Nickname, Password
- First cell: Logo -> green box (like first box of login screen)
  !: Logo path -> TECHNICAL -> App -> Grafica -> Resources -> 20191113 -> 06_Resources -> react
  icn_profile_other.png
- Second cell: Nickname -> an input text (Nickname)
- Third cell: Password -> an input text with secure entry and eye icon (Password)
- Fourth cell: PasswordStatus -> a text with password legend (8 chars, upper/lower case, 1 number)
- Here we need to have API Calls  
  /profile/does_nickname_already_exist —> verify if nickname is already present.

Working:
- Creating UI for the screen
- Adding the keyboard workaround for legend checks  

To be done:
- Implement the API call for the nickname check

## 4. Fourth Screen: Email, Confirm Email
- First cell: Logo -> red box (like first box of login screen)
  !: Logo path -> TECHNICAL -> App -> Grafica -> Resources -> 20191113 -> 06_Resources -> react -> facolta
  icn_facoltà_scienze_formazione_big_dark.png
- Second cell: EnterEmailText -> a text “Insert a not university email”
- Third: Email -> an input text (Email, Confirm Email)
- Fourth cell: ConfirmEmail -> an input text (Email, Confirm Email)
- APIs to call:  
    /profile/does_email_already_exist —> verify if email is already present.
    /profile/is_student_email —> verify if email is a university email. In this case user
    CANNOT proceed because he has to insert a NOT university email.


Working:
- Creating UI for the screen



## 5. Fifth Screen - Major
- First cell: Logo -> red box (like first box of login screen)
  !: Logo path -> TECHNICAL -> App -> Grafica -> Resources -> 20191113 -> 06_Resources -> react -> facolta
  icn_facoltà_scienze_formazione_big_dark.png
- Second cell: EnterMajorText -> a text “Insert and select a major from suggestions”
- Third cell: Major -> an input text with suggestions (Major), user MUST select ONE OF suggestions
- APIs to call:  
    /profile/search_major —> search majors from user’s input, get and save major_id
    of user selection. In this API you have to save also faculties and selected major
    name that will be showed in the next screen.


Working:
- Creating UI for the screen



## 6. Sixth Screen - Faculty
- First cell: Logo -> red box (like first box of login screen)
  !: Logo path -> TECHNICAL -> App -> Grafica -> Resources -> 20191113 -> 06_Resources -> react -> facolta
  icn_facoltà_scienze_formazione_big_dark.png
- Second cell: MajorStatusText -> a text “You have selected this major:”
- Third cell: MajorStatusInputReadOnly -> an input text not editable (to show the selected Major Name)
- Fourth cell: SelectFacultyText -> a text “You will play in this faculty:”
- Firth cell: FacultyList -> N cells: faculties (name and image_url) with check icon to select which one.
- Sixth cell: SwitchableButton -> MOSTRA TUTTE LE FACOLTA  
  If user click to “Show all faculties” (MOSTRA TUTTE LE FACOLTA’) must be shown ALL faculties,
  otherwise must be shown ONLY suggested faculties (taken the screen before).
- APIs to call:
    /profile/get_all_faculties —> get all faculties
    [ to call ONLY if user click on “Show all faculties” ]


Working:
- Creating UI for the screen



## 7. Sign Up APIs:
When user click on “SIGNUP” (ISCRIVITI) button on the sixth screen we must have:
- firebase_idToken
- firstname: [minimum 3 chars]
- lastname: [minimum 3 chars]
- gender: [one of: M/F/O]
- birthday: [format: yyyy-MM-dd’T’HH:mm:ss.SSS’Z']
- birth_place
- is_student: [FALSE]
- daily_mode: [FALSE]
- email: [not university email]
- nickname: [minimum 3 chars]
- major_id: [selected by user]
- faculty_id: [selected by user]
- profile_image_url:
- if gender == “M”: https://firebasestorage.googleapis.com/v0/b/thefacultya498a.appspot.com/o/static_images%2Fico_profile_male.png?alt=media&token=3a6157dc-9d73-45dc-9313-54f1fa61f7a7
- if gender == “F”: https://firebasestorage.googleapis.com/v0/b/thefacultya498a.appspot.com/o/static_images%2Fico_profile_female.png?alt=media&token=10b59cbdd165-4d02-a58d-12d733be0c59
- if gender == “O” : https://firebasestorage.googleapis.com/v0/b/thefacultya498a.appspot.com/o/static_images%2Fico_profile_other.png?alt=media&token=eedba3f3-9f59-42d3-95d8-5866bb689c41

To get FIREBASE ID TOKEN we need to create user on Firebase with SDK function  
createUserWithEmailAndPassword -> email, password  
When all data is setted and it’s all ok:  
/profile/create_standard_account ONLY with all data in this page  
If API respond 200 (‘ok’) —> TO SHOW HOMEPAGE  
If API is not successful —> TO SHOW ERROR  
API Documentation  
https://it.api.testing.thefacultyweb.com/docs/  



Firebase Error codes
auth/email-already-in-use 
Thrown if There already exists an account with the given email address. 

auth/invalid-email 
Thrown if The email address is not valid. 

auth/operation-not-allowed 
Thrown if Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab. 

auth/weak-password 
Thrown if The password is not strong enough. 


