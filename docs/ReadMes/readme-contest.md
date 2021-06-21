# Roadmap of Contest feature of our App
Here is a roadmap for the contest feature


## 1. Introduction
```
Where home
  if user click "Start contest"
    call_api "/contest/start_contest"
    if result has error
      show error message with popup
    else
      go to the next screen
```

## 2. First Screen: **Countdown**
In this page will be Show a countdown timer, 3 seconds
- Blue box: “Get ready, Contest match is starting” (like first box of login screen)
- In the center of screen /assets/images/icons/icn_timer.png with 3, 2, 1 (not 0!).
When this countdown is finished go to the next screen (match).


## 3. Match Screen: 1st, …, nth questions
- These are N screens (that are identical) with N questions to show and user will answer in X seconds for each question.  
- This is a scrollable screen (because if there is an image user will scroll down to show all components in screen).  
---
* The first cell is a cell with countdown timer (round with centered text with the seconds remaining). Seconds of the timer can be take in timeout (is a number).  
* The title in the box (ex. “Biologia”) is subject_name and under this there is “Question X of N” where X is current question number (1, …, N) and N is total questions of Contest (can be 1 to n).  
* After this box there is question what can be of maximum 600 characters (so if is too long will be resized automatically).
* Under this can be shown a box of 16:9 image only if question data has image_url.  
* Under question or image we have answers (is an array of N objects, text is to show into every button).
---
* APIs to call:  
/contest/send_contest_answer_and_get_correct_answer  
Required data:  
  - firebase_idToken, 
  - contest_id (taken in /contest/start_contest), 
  - answer_number: (the current question number -1: 0,1,2,3,4, …, N)
  - question_number
  - if timer is finished: { answer_number: -1 , …. }
  - If user clicked an answer before timer is finished: { answer_number: button selected by user (first button: 0, second button: 1, …, n_button: n-1 }
- After the request is sent API will respond with number of correct answer.  
  While the request is sending we have to show yellow button.
- After we have to show correct answer (green button) and possibile wrong answer (red button).  
  If user answered correctly is to show only green button.

> Important thing:  
- questions can have LaTeX tags. You have to check if question or answers text contains $ (multiple of 2, so if has open $ and close $).  
A question for example is “La funzione $f(x)=x^2$ è” (the second screen below), So you have to take f(x)=x^2 and render it with a LaTeX library  
(I suggest to use react-latex library but you can choose what you prefer.  
Maybe we can put a \<Latex\> tag and maybe can render automatically questions texts and answers.  
- And I haven't specified that you must lock back button in Android and hide navigation top bar (like screenshot)
- And if user leave the App you must finish the Contest Match automatically (in the server will be autoclosed after 10 minutes)


## 4. HistoryTab Screen and Recap Screen
These are 2 screen that are scrollable.  
The HistoryTab Screen there are 3 boxes.  
- First box: blue box with `/assets/images/icons/icn_big_trophy_dark.png`,  the text `“Position in scoreboard:”` with User Position (there’s already the API in the code to call `/contest/get_user_position_contest_scoreboard`) and with share `/assets/images/icons/icn_share_white.png`.   
When user click share, is to share only the text `“Hi, I am X° in Contest Scoreboard. Download thefaculty now from the Store. www.thefacultyweb.com"`  
- Second box: `[numbers of answers correct]` of N and `[total_score]`
  (returned by `/contest/finish_contest`) and `/assets/images/icons/icn_arrow_right_white.png`.  
  IF USER CLICK THIS BOX —> OPEN RecapScreen.  
- Third box: a box with image (just like image in questions). 16:9 proportional.  
  It is internal ADS and to get data is to call /ads/get_contest_ad.  
  Get ad_id, redirect_type, image_url and redirect_url. 
  When user click to ADS is to call /ads/add_click_to_ad and redirect_type == 1   
  is to open browser with standard_function.open_browser(redirect_url).

The Recap Screen to show N+1 boxes (N is number of questions of this match).  
- First box: blue box with `/assets/images/icons/icn_cooperate_dark.png`,  
  the text “Match result” with total_scores (taken from screen before)
- Second, …, Nth boxes: a simple recap with:  
  `[question_number]: [subject_name] … [scores in this question]`

