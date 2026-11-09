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
// What does the page remember?  Which category of tip is selected
// What does it start at?        "all" (or whatever was saved last time, Step 10)
// What changes it?              Clicking a filter button
// What does the user see?       Only the matching tips, a count, and which button is selected

// STEP 2: Check the connection
console.log("script.js is connected");

// STEP 3: Create the state
// selectedCategory: learners need to see only the kind of tip they're working on
// let selectedCategory = "all";   // STEP 3 version, replaced in STEP 10 below

// STEP 10: Start from the saved choice if there is one, otherwise "all"
let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// Find the elements on the page (same as last week)
const tipList = document.getElementById("tip-list");
const count = document.getElementById("count");
const filterButtons = document.querySelectorAll(".filter-button");

// STEP 4: render() draws the whole page from the state.
// Every time the state changes, we call render(). Nothing else touches the page.
function render() {
  // Clear the old cards, so we don't add duplicates on every click
  tipList.innerHTML = "";

  // STEP 6: Count from the data, not from text we typed
  let shown = 0;

  // STEP 4: Loop over the tips (the Assignment 6 pattern)
  tips.forEach((tip) => {
    // STEP 5: Read the state and decide whether this tip belongs on the page
    if (selectedCategory === "all" || tip.category === selectedCategory) {
      const card = document.createElement("article");
      card.classList.add("tip");

      const tag = document.createElement("span");
      tag.classList.add("tip-tag");
      tag.textContent = tip.category;

      const title = document.createElement("h2");
      title.textContent = tip.title;

      const description = document.createElement("p");
      description.textContent = tip.description;

      card.appendChild(tag);
      card.appendChild(title);
      card.appendChild(description);
      tipList.appendChild(card);

      shown = shown + 1;
    }
  });

  // STEP 6: Show the count
  count.textContent = "Showing " + shown + " of " + tips.length + " tips";

  // STEP 8: The selected button comes from the state too
  filterButtons.forEach((button) => {
    if (button.dataset.filter === selectedCategory) {
      button.classList.add("is-selected");
    } else {
      button.classList.remove("is-selected");
    }
  });
}

// STEP 7: One click handler for every filter button
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Change the state...
    selectedCategory = button.dataset.filter;
    console.log("selectedCategory:", selectedCategory);

    // STEP 10: ...remember it for next time...
    localStorage.setItem("selectedCategory", selectedCategory);

    // ...then redraw the page from it
    render();
  });
});

// STEP 5: Draw the page once at the start, so it matches the starting state
render();

// STEP 9: Break it on purpose
// - Click the same filter 10 times. Do the cards duplicate? (No: render() clears first.)
// - Switch filters quickly. Does the count ever disagree with the cards?
// - Refresh the page. Before Step 10, your choice was lost. Why?
