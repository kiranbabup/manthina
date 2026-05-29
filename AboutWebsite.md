Its Panigrahi's Wedding invitation
My self the Groom Panigrahi Kiran Babu
weds Bride Panda Bindusri
Getting married on 1:35 PM, 22nd June 2026, at Mandasa Village, Srikakulam district, Andhra Pradesh
So I have planned the journy from my home town Gopalapatnam, Visakhapatnam to Mandasa by Bus Journy on 22nd june morning 4am so that we can reach by 10am.
and my marriage 

Pages in website are
Home page : 
- Welcome message to all the guests and relatives
- 1st event is on 13th May 2026 it is Pandiri Rata from 7am to 10am at my home in Gopalapatnam, Visakhapatnam 

- 2nd event is on 21st June 2026 it is Haldi Function at 7am at my home in Gopalapatnam, Visakhapatnam 

- 3rd event is on 22nd June 2026 it is Marriage (wedding cerymony) it will start from 11am onwards at mandasa village & the Muhurtham is at 1:35 Pm.
- marriage venue location of map = https://maps.app.goo.gl/QG3iyZXtNn55HxSx9

- 4th event starts at 7Pm on 25th June 2026 It is Reception at V Function Hall, simhapuri colony, simhachalam old gosala to vepagunta BRTS road, Simhachalam, Visakhapatnam.
- Reception venue location of map = https://maps.app.goo.gl/79oFL9N6KrUgDeWm7

- reavealation of 2nd to 4th events on 13th May 8am. mark a count down for revealing those.
  
- after revealing those need to start count down timer for 1:35Pm - 22nd june 2026 for marraige time.
- Schedule of events with locations & displays wedding card images in assets with names
a. wedding_card_cover_pic.png
b. english_inner_card.png
c. telugu_inner_card.png

(if time completes then mark the event as successfully completed and display it in bottom )

- Display a Travelling to wedding cermony card 
with
- Bus schedule to departure from Gopalapatnam Kiran's home to Mandasa wedding location on 22nd june 2026 morning between 4am to 5pm
and a view more button (redirect to Transportaion page when click on view more button) 


Transportaion page:
- Display a bus with 40 seats
1+2 front
2+2 for 8 rows 
5 in last row
total 40

and need own vehicle 1, own vehicle 2 own vehicle 3 etc... cards for who will come in own transoport to marriage below the bus seates completion

if user wants to add the details to bus then option to store details
1. seat_no
2. Name 
3. Relation with Groom

in vehicles collection of firebase db other people will store own transport details who will attend to marriage
by adding
1. Vehical type own car or train or rtc bus
2. Group members names with addmore button to add names 1 or more then one person
3. contact_number

on click of each seat of bus shows the following details
1. seat_no
2. Name 
3. Relation with Groom

on click of own transport it shows the details like
1. Vehical type own car or train or rtc bus
2. Group members names with addmore button to add names 1 or more then one person
3. contact_number


MembersData page:
i will be having a page to add members who are willing to travel in the bus
in MembersData.jsx page
Adding fields are
1. Name
2. Relation with Groom
3. seat_no
to be added in bus collection of firebase db
and display then in a table format to view for me and edit option too.

So Pages are
1. HomePage.jsx (route "/")
2. Transportation.jsx (route "/transportation")
3. MemberVehicalAddingPage.jsx (route "/members-vehical")
4. MembersDataMyPage.jsx (route "/members-data")

Create a best wedding invitation website
using MUI with Firbase db

create a popup after 30 sec of opening using useEffect Hook in the "/" home page
WishCoupleModal.jsx
having
Title: Wish the upcoming Couple
Enter Your Name:
Enter Your Contact:
Enter Wishes:
Status : true as default value
Likes: 0 default value
store them in the firebase db as collection wishes
having name, contact, wishes, status true or false, Likes.

Create a WishManagerPage.jsx
Displays all the wishes from the firebase db
It is only for me to view the wishes and make them active or inactive.

Create a ViewWishesPage.jsx
It is public page where all the active wishes are displayed as width:300px cards 
with the format of Name &
Wishes with like button below each card. 
on click of like button it increment the likes count by 1
