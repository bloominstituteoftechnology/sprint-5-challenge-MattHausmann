//const { HttpStatusCode } = require("axios");

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  let info = document.querySelector('.info');
  let selectedCard;


  const learners = await fetch('http://localhost:3003/api/learners');
  const mentors = await fetch('http://localhost:3003/api/mentors');

  let section = document.querySelector('.cards');

  let mentorsMap = {}
  let learnersMap = {}

  function populateMentorsMap(mentorsJson) {
    for(let i = 0; i < mentorsJson.length; i++) {
      obj = mentorsJson[i];
      mentorsMap[obj.id] = `${obj.firstName} ${obj.lastName}`;
    }
  }

  Promise.all([mentors.json(), learners.json()]).then(([mentorsJson, learnersJson]) => {
    populateMentorsMap(mentorsJson);
    makeCards(learnersJson);
    info.textContent = 'No learner is selected';
  });

  let cards = [];

  function makeCards(objs) {
    for(let i = 0; i < objs.length; i++) {
      learner = objs[i];
      let card = document.createElement('div');
      card.classList.add('card');
      section.appendChild(card);
      let learnerName = document.createElement('h3');
      learnerName.textContent = learner.fullName;
      let learnerEmail = document.createElement('div');
      learnerEmail.textContent = learner.email;
      card.appendChild(learnerName);
      card.appendChild(learnerEmail);

      let mentorsH4 = document.createElement('h4');
      mentorsH4.textContent = 'Mentors';
      mentorsH4.classList.add('closed');
      mentorsH4.addEventListener('click', () => {
        mentorsH4.classList.toggle('closed');
        mentorsH4.classList.toggle('open');
      });
      card.appendChild(mentorsH4);

      let mentorsUl = document.createElement('ul');
      card.appendChild(mentorsUl);

      for(j = 0; j < learner.mentors.length; j++) {
        mentorLi = document.createElement('li');
        let mentorId = learner.mentors[j];
        mentorLi.textContent = mentorsMap[mentorId];
        mentorsUl.appendChild(mentorLi);
      }

      learnersMap[learner.fullName] = learner.id;

      card.addEventListener('click', () => {setSelectedCard(card)});
    }
  }

  function setSelectedCard(card) {
    
    let nameElement = card.querySelector('h3');
    let name = nameElement.textContent;
    if(card != selectedCard) {

      card.classList.add('selected');
      console.log(card);
      console.log(selectedCard);  
      unselectCard(selectedCard);
      selectedCard = card;

      nameElement.textContent = `${name}, ID ${learnersMap[name]}`;
      info.textContent = `The selected learner is ${name}`
    } else {
      unselectCard(selectedCard);
    }
  }

  function unselectCard(card) {
    selectedCard = undefined;
    info.textContent = 'No learner is selected';
    if(card && card.classList.contains('selected')) {
      card.classList.toggle('selected');
      card.querySelector('h3').textContent = card.querySelector('h3').textContent.split(', ID')[0];
    }

  }



  function makeMentorList(learnerMentors) {
    let mentorsUl = document.createElement('ul');
    for(let i = 0; i < learnerMentors.length; i++) {
      let learnerMentor = learnerMentors[i];
      for(mentor in mentorsMap){
        if(mentor.id == learnerMentor) {
          let mentorLi = document.createElement('li');
          mentorLi.textContent = `${mentor.firstName} ${mentor.lastName}`
          mentorsUl.appendChild(mentorLi);
        }
      }
    }
    return mentorsUl;
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`



  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
