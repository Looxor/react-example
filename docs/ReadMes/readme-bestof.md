# Roadmap of BestOf feature of our App
Here is a roadmap for the BestOf feature


## 1. ScontiHome
* Show Coins  
The circle is a progress bar of piggy bank filling
percentage like the image below →
To take users total coins you have to call API:
/coins/get_user_total_coins

* Show Partners' images  
* Ongoing battles
* New battle

## 2. New Battle Screen (FirstScreen)
In this page, user cn start a "BestOf"(battle).  
There are 3 ways to start a BestOf.  

* Friend BestOf
* Random Opponent BestOf
* Sbjects BestOf (not to show for now)


## 3. FriendListScreen
If user clicks the first button ("Friend BestOf") you have to show a new screen with all Friends of the faculty (you can take the list of friends of the same faculty by calling the API **/community/get_faculty_friends**

When user click on a friend you have to start the BestOf with API.
**/bestof/start_bestof**


## 4. Random Opponent BestOf
If user clicks on "Random Opponent BestOf" you have to call only API **/bestof/start_bestof** (without friend_id field) and you have to take the bestof_id that will return the API if starts successfully (otherewise you have to show an error popup).


## 5. Battle Screen 
This is the screen of the Battle (with scores of the Battle who have to play etc).  
This screen can be used also when BestOf is finished (the second image)

