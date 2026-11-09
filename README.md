# Code-Along: Draw Your Page From State

Last week, our lesson tracker remembered one number and changed the page when a button was clicked. That worked, but every part of the page was updated by hand, line by line, inside the click handler. Forget one line and the page stops matching what it remembers.

Today we'll fix that with one idea: **a `render()` function that redraws the page from the state.** We'll use it to build a small library of feedback tips that a learner can filter by category, and then make the page remember their choice even after a refresh.

## The Big Idea: Two Jobs, Kept Apart

Every interactive page does two jobs:

1. **Respond to what happened.** The learner clicked something, so the state changes.
2. **Make the screen match the state.** Show the learner what they should see right now.

Last week, the click handler did both jobs at once. This week, we give each job its own place:

- **The click handler only changes the state.**
- **`render()` only draws the page, using the state.**

Here is the rule for today, and for the rest of the course:

> **Change the state in one place. Draw the page in one place.**

### Last week: patching the page

Here's a shortened version of last week's click handler:

```js
completeButton.addEventListener("click", () => {
  completedSteps = completedSteps + 1;                    // job 1: change the state
  progressText.textContent = completedSteps + " of 3";    // job 2: update this part...
  stepTitle.textContent = steps[completedSteps].title;    // ...and this part...
  message.textContent = "Keep going!";                    // ...and this part
});
```

Each click **patches** the page: it changes the specific things it remembers to change. That works for one button, but it causes three problems as a project grows.

**1. The starting screen isn't drawn from the state.** "0 of 3 steps complete" was typed into `index.html`. The variable said 0 and the HTML happened to say 0 too. Change the starting value and the page is wrong until someone clicks.

**2. Every new action has to repeat the drawing code.** A Reset button would need its own copy of every `textContent` line. So would a Back button, and so would code that restores the learner's progress when the page loads. Each copy is a chance to forget a line.

**3. The order of lines matters, and it's easy to get wrong.** If you check "is this the last step?" before you change the count, the page reacts one click late.

### This week: drawing the page from the state

```js
function render() {
  // Look at the state and draw what should be on the page.
  // Don't ask "what just changed?" Ask "what should the page look like now?"
}

button.addEventListener("click", () => {
  selectedCategory = button.dataset.filter;   // job 1: change the state
  render();                                   // job 2: redraw the page
});

render();   // draw the starting screen the same way
```

`render()` starts from blank and draws the whole page from the state, every time. That solves all three problems:

| Problem | How `render()` solves it |
|---|---|
| The starting screen doesn't match the state | We call `render()` once when the page loads, so the starting screen comes from the variable. The HTML only holds empty containers. |
| Every new action repeats the drawing code | Any new action is just two lines: change the state, then call `render()`. That's why remembering the choice after a refresh takes only a couple of lines at the end. |
| The order of lines matters | The click handler finishes changing the state before `render()` runs, so everything on the page reads the final value. |

You'll see two results of this when you test:

- **Clicking the same button 10 times gives the same page as clicking it once.** The state is the same, so the drawing is the same.
- **The count can't disagree with the cards.** We count the cards as we draw them, instead of keeping a separate number that could drift.

### When you don't need it

A single show/hide toggle with one button is fine the way we did it last week. `render()` pays off once there's **more than one way to change the state** (several buttons, a reset, loading saved progress) or **more than one part of the page that depends on it** (cards, a count, a highlighted button).

## How This Builds on Last Week

| Last week | This week |
|---|---|
| One state variable: `completedSteps` | One state variable: `selectedCategory` |
| One button with one click handler | Four buttons sharing one click handler |
| The click handler changed the state **and** updated each part of the page | The click handler only changes the state, then calls `render()` |
| An `if/else` decided which message to show | An `if` inside a loop decides which tips to show |
| Refresh the page and the progress is gone | The page remembers the choice with `localStorage` |

The loop is the same one you wrote in Assignment 6 to build cards from an array. The difference is that now it runs again every time the state changes.

## Getting Set Up

**1. Click the green "Use this template" button** at the top of this page, then choose **Create a new repository**.

**2. Name your repository** using this convention:

`f26-nyu-codealong-render-lastname-firstname`

**3. Click "Create repository."** Check that the name at the top is yours before continuing.

**4. Click the green "Code" button, open the "Codespaces" tab, and click "Create codespace on main."**

**5. Open your page.** Right-click `index.html` and choose **Open with Live Server**.

**6. Open the Console.** Right-click the page, choose **Inspect**, and click the **Console** tab.

**7. Open `script.js`.** The tips array is already there. Notice that `index.html` has an empty `tip-list`. Every card on the page will come from JavaScript.

> **Coming back later?** Go to your repo, click **Code**, open the **Codespaces** tab, and choose your existing codespace.

## What We're Doing

1. **Plan:** decide what the page needs to remember.
2. **Connect:** confirm that the script is running.
3. **Remember:** store the selected category in a variable.
4. **Render:** write a function that clears the list and loops over the tips to build the cards.
5. **Decide:** inside the loop, show a tip only if it matches the state. Call `render()` once at the start.
6. **Count:** count the tips you actually showed, and put that number on the page.
7. **Respond to clicks:** give every filter button the same click handler: change the state, then call `render()`.
8. **Show the selection:** inside `render()`, mark which button is selected, using the state.
9. **Break it:** click the same button many times, switch quickly, refresh.
10. **Remember across refreshes:** save the state with `localStorage` and read it back when the page loads.

Commit after Steps 5, 7 and 10, so you always have a working version to return to.

## Core Concepts

- **State:** what the page is remembering right now. Here, that's the selected category.
- **Function:** a named block of code you can run whenever you need it. Defining `function render() { … }` doesn't run it; calling `render();` does. We'll go deeper on functions next week.
- **Render:** drawing the page from the state. A good `render()` doesn't care what happened before. It looks at the state and draws the page to match.
- **Loop + condition:** `forEach` visits every item in the array, and an `if` inside it decides what to do with each one.
- **`data-` attributes:** `data-filter="kind"` stores a value on an HTML element. JavaScript reads it as `button.dataset.filter`.
- **`localStorage`:** a small storage space in the browser that keeps text after the page is closed. `setItem` saves a value and `getItem` reads it back.

The pattern from last week gets one more rule:

**The user acts → the state changes → `render()` redraws the page**

Change the state in one place, and draw the page in one place. If the screen is ever wrong, you only have two places to look.

## Why This Matters

Most learning interactions show the learner a slice of something larger: the questions they haven't answered, the lessons in one unit, the resources for their role. Each one is a list filtered by what the page remembers about the learner.

Drawing the page from state also makes interactions easier to trust. If the count is computed from the cards that were actually drawn, it can't disagree with them. And because the page can be redrawn from the state at any time, remembering the learner's place after a refresh takes only a couple of lines.

You'll use this pattern in your own project this week.

## If You Get Stuck

- **Nothing shows up at all:** check that `render();` is called at the bottom of the script. Defining a function doesn't run it.
- **Cards duplicate on every click:** `tipList.innerHTML = "";` needs to come first in `render()`, before the loop.
- **The Console shows the new category, but the page doesn't change:** you changed the state but didn't call `render()` afterwards.
- **A filter shows nothing:** compare the button's `data-filter` with the tip's `category`. They have to match exactly, including capital letters.
- **The saved choice won't go away while testing:** in the Console, run `localStorage.clear()` and refresh.
- **You fell behind:** `completed-script.js` has the finished code. Use it to compare with yours, but type your own version so the logic is yours.
