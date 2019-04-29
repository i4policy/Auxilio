
# Auxilio: i4Policy's Participatory Agenda-Setting Tool
## (29/4/2019)
## v1.2 
<br>


## Introduction

Auxilio is an agenda setting tool that enables distributed groups to collaboratively develop agendas. 
<br><br>
The tool provides a series of agenda cards on which topics of discussion can be defined by participants. Under each defined topic, comments and supporting documents can be exchanged amongst participating individuals. The tool also features a voting module which participants can use to vote a topic or comment up or down, which are aggregated in real-time to highlight the most important conversations based on user perception. The platform frontend is built using Veu.JS and the backend uses node.js under the loopback API generator frame work for back end. To keep records this tool uses mongo db.

![Screen Shot 2019-04-29 at 1 11 35 AM](https://user-images.githubusercontent.com/43605024/56871272-c8fa0300-6a1b-11e9-9539-0580a4ea5f89.png)
Source: Most images are examples from a live deployment of the current version of the tool as of 29/4/2019 for i4Policy's community to inclusively and collaboratively develop the agenda for revising v1.2 of the Africa Innovation Policy Manifesto: https://auxilio.i4policy.org/
<br><br><br>

### 1. Auxilio Tool

This component of the tool is complete with a landing page and an authentication module that allows the user to sign-up directly. It has a dynamic localization module which allow any developer to translate the key words into a language of their choosing using a single translation spread sheet. Currently the tool is offered in English and French.
<br><br>
Once users are logged in they can view and add agendas for discussion.
 
![image](https://user-images.githubusercontent.com/43605024/56872047-031bd280-6a25-11e9-94b3-8bd703f4aff0.png)
<br>

Users can **engage in conversation** and **vote** on comments made by their peers
![image](https://user-images.githubusercontent.com/43605024/56872076-63ab0f80-6a25-11e9-9d69-4dddbcd73001.png)
Source: This image is a sample conversation from beta testing.
<br>

Users can **upload documents and links** to their conversations
![image](https://user-images.githubusercontent.com/43605024/56872227-da94d800-6a26-11e9-8783-a054a33df749.png)
<br>

Users can review their personal activity and engagement, provide feedback on the tool, and send an issue report to the moderators.
![image](https://user-images.githubusercontent.com/43605024/56872599-44af7c00-6a2b-11e9-8f35-e91e78b129af.png)
<br>

Users can also send a specific delete request to the moderators, if they believe a statement or topic violates community standards.
![image](https://user-images.githubusercontent.com/43605024/56872625-99eb8d80-6a2b-11e9-9d02-40919089d09f.png)
<br>

### 2. Auxilio Admin Panel

This sub component of the consultation tool allows the administrator to add categories, review moderator roles, see feedback on the tool, and review issue reports.
![image](https://user-images.githubusercontent.com/43605024/56872696-4e85af00-6a2c-11e9-82f9-e810105df352.png)
<br><br>

## How to build
1. Clone this repository
2. `cd Auxilio`
3. `make build`

## Acknowledgements

The Auxilio tool was developed with funding from Open Society in West Africa (OSIWA).

[AhadooTec](https://www.ahadootec.com/), an Ethiopian software development firm, has led the technical development of these i4Policy tools.

The team from [Le Wagon](https://www.lewagon.com/casablanca) in Casablanca developed a landing page and translated the tool into French for a deployment to support co-creation at the agenda-setting stage of developing a national Startup Act for Morocco.
