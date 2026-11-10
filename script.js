// The lesson content (same lesson as last week, now with a category on each tip)
const tips = [
  {
    title: "Be specific",
    description:
      'Point to one exact moment in the work. "The second example made this click" helps more than "Nice job."',
    category: "specific",
  },
  {
    title: "Quote their words",
    description:
      "Repeat the exact sentence you're responding to, so they know which part you mean.",
    category: "specific",
  },
  {
    title: "Focus on the work",
    description:
      'Describe what the work does, not who the person is. "This paragraph buries the main idea" gives them something to change.',
    category: "kind",
  },
  {
    title: "Start with what works",
    description:
      "Name one thing that's already working before you name what isn't. It tells them what to keep.",
    category: "kind",
  },
  {
    title: "Suggest a next step",
    description:
      'Finish with one action they can take. "Try opening with your conclusion" tells them where to start.',
    category: "actionable",
  },
  {
    title: "Pick one thing",
    description:
      "Give the most important change first. Five suggestions at once usually means none get made.",
    category: "actionable",
  },
];

// STEP 1: Name the state (no code, just the plan)
// What does the page remember? which button is clicked/which category of tip did I selected
// What does it start at? "All"
// What changes it? Clicking on a filter button
// What does the user see? Only the tips that matches the filter button

// STEP 2: Check the connection


// STEP 3: Create the state


// Find the elements on the page
const tipList = document.getElementsByID('tip-list');
const count = document.getElementsByID('count');
const filterButtons = document.querySelectorAll('.filter-button');

// STEP 4: Write render(): clear the list, then loop over the tips
function render(){

  let shown = 0

  tipList.innerHTML = "";

  tips.forEach((tip) => {
    if(selectedCategory == "all" || tip.category == selectedCategory ){

    const card = document.createElement("article");
    card.classList.add("tip");

    const tag = document.createElement("span");
    tag.classList.add("tip-tag");
    tag.texContent = tip.category;

    const title = document.createElement("h2");
    title.textContent = tip.title;

    const description = document.createElement("p");
    description.textContent = tip.description;

    card.appendChild(tag);
    card.appendChild(title); 
    card.appendChild(description); 
    tipList.appendChild(card);

    shown = shown +1;

    };
  });
}
// STEP 5: Inside the loop, decide whether each tip belongs on the page
//         Then call render() once at the bottom of this file

// STEP 6: Count the tips you showed, and put the count on the page

// STEP 7: Give every filter button one click handler: change the state, then call render()

// STEP 8: Inside render(), mark which button is selected
filterButtons.forEach((button) => {
  if(button.dataset.filter == selectedCategory){
    button.classList.add("is-selected");
  } else{
    button.classList.remove("is-selected");
  }
});

filterButtons.forEach((button) =>{
  button.addEventListener("click", () => {
   selectedCategory = button.dataset.filter;
   render();
  });
});


// STEP 9: Break it on purpose

// STEP 10: Remember the choice after a refresh
