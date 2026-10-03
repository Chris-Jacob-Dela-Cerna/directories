

//  ---  DOM References  ---

const pageDirectories = document.querySelector(".directories__list");
const pageFollowBtn = document.querySelector(".user-profile__follow-btn");
const pageNewDirBtn = document.querySelector(".new-directory__btn");
const pageDialog = document.querySelector(".new-directory__dialog");
const pageDialogForm = document.getElementById("dialog-form");
const pageDialogCloseBtn = document.querySelector(".dialog-header__close-btn");
const pageDialogSubmitBtn = document.querySelector("dialog-form__submit-btn");
const pageDialogInputs = document.querySelectorAll(".dialog-form__input");



//  ---  Directory Object Constructor  ---

function Directory({ name, description=null, tags=null, primaryLanguage=null, url="#", star=false }) {
  if (!new.target) throw Error("cannot create object without [new] declaration.");

  this.name = name;
  this.description = description;
  this.tags = tags;
  this.primaryLanguage = primaryLanguage;
  this.star = star;
  this.url = url;
}

Directory.prototype.toggleStar = function () {
  this.star = !this.star;
}



//  ---  List of Directories  ---

const directoriesData = [
  new Directory({
    "name": "quizpin",
    "description": "Terminal quiz app — create, run, and manage CSV-based quizzes from the command line.",
    "tags": ["python", "cli", "csv", "terminal"],
    "primaryLanguage": { "color": "#3869a8", "language": "Python" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/quizpin", 
  }),
  new Directory({
    "name": "bugtopia",
    "description": "Terminal game — a turn-based bug battle game built in Python.",
    "tags": ["game", "python", "cli", "oop", "terminal-game"],
    "primaryLanguage": { "color": "#3869a8", "language": "Python" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/bugtopia", 
  }),
  new Directory({
    "name": "landing-page",
    "primaryLanguage": { "color": "#75009c", "language": "CSS" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/landing-page", 
  }),
  new Directory({
    "name": "etch-a-sketch",
    "primaryLanguage": { "color": "#75009c", "language": "CSS" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/etch-a-sketch", 
  }),
  new Directory({
    "name": "calculator",

    "primaryLanguage": { "color": "#ebed48", "language": "JavaScript" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/calculator", 
  }),
  new Directory({
    "name": "orion-sign-up",
    "primaryLanguage": { "color": "#ee3008", "language": "HTML" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/orion-sign-up", 
  }),
  new Directory({
    "name": "orion-dashboard",
    "primaryLanguage": { "color": "#75009c", "language": "CSS" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/orion-dashboard", 
  })
]



//  ---  Directory Building Logic  ---

function buildElement(tagName, className, idName) {
  const element = document.createElement(tagName);
  if (className) element.classList.add(className);
  if (idName) element.setAttribute("id", idName);
  return element;
}

function buildDirectoryInfo(currentDir) {
  const dirInfo = buildElement("div", "directory__info");

  const dirNameWrapper = buildElement("h3", "directory__name-wrapper"),
        dirName = buildElement("a", "directory__name");
  dirName.textContent = currentDir.name;
  dirName.setAttribute("href", currentDir.url);
  dirNameWrapper.appendChild(dirName);
  dirInfo.appendChild(dirName);

  if (currentDir.description) {
    const dirDesc = buildElement("p", "directory__description");
    dirDesc.textContent = currentDir.description;
    dirInfo.appendChild(dirDesc);
  }

  if (currentDir.tags) {
    const dirTags = buildElement("ul", "directory__tags");
    for (let dirTagIdx = 0; dirTagIdx < currentDir.tags.length; dirTagIdx++) {
      const currentTag = currentDir.tags[dirTagIdx];
      const dirTagWrapper = buildElement("li", "directory__tag-wrapper"),
            dirTag = buildElement("a", "directory__tag");

      dirTag.textContent = currentTag;
      dirTag.setAttribute("href", `https://github.com/topics/${currentTag}`);

      dirTagWrapper.appendChild(dirTag);
      dirTags.appendChild(dirTagWrapper);
    }
    dirInfo.appendChild(dirTags);
  }

  if (currentDir.primaryLanguage) {
    const dirPrimLang = buildElement("div", "primary-language"),
          dirPrimLangColor = buildElement("div", "primary-language__color"),
          dirPrimLangName = buildElement("p", "primary-language__name");
    dirPrimLangColor.style.backgroundColor = currentDir.primaryLanguage['color'];
    dirPrimLangName.textContent = currentDir.primaryLanguage['language'];

    dirPrimLang.append(dirPrimLangColor, dirPrimLangName);
    dirInfo.append(dirPrimLang);
  }

  return dirInfo;
}

function updateStar(currentDir, dirStarIcon, dirStarText) {
  if (currentDir.star) {
    dirStarIcon.setAttribute("src", "icons/star_rate_half_24dp_DAAA3F_FILL0_wght400_GRAD0_opsz24.svg");
    dirStarIcon.setAttribute("alt", "Starred Icon");
    dirStarText.textContent = "Starred";
  } else {
    dirStarIcon.setAttribute("src", "icons/star_24dp_9198A1_FILL0_wght400_GRAD0_opsz24.svg");
    dirStarIcon.setAttribute("alt", "Star Icon");
    dirStarText.textContent = "Star";
  }
}

function buildDirectoryActions(currentDir) {
  const dirActionsContainer = buildElement("div", "directory__actions-container"),
        dirActions = buildElement("div", "directory__actions"),
        dirStar = buildElement("div", "star"),
        dirStarIcon = buildElement("img", "star__icon"),
        dirStarText = buildElement("p", "star__text"),
        dirMore = buildElement("div", "more"),
        dirMoreIcon = buildElement("img", "more__icon");

  dirStarIcon.classList.add("ghost");
  dirStarText.classList.add("ghost");
  dirMoreIcon.classList.add("ghost");

  updateStar(currentDir, dirStarIcon, dirStarText);
  dirMoreIcon.setAttribute("src", "icons/arrow_drop_down_24dp_9198A1_FILL0_wght400_GRAD0_opsz24.svg");
  dirMoreIcon.setAttribute("alt", "Dropdown Icon");

  dirStar.append(dirStarIcon, dirStarText);
  dirMore.appendChild(dirMoreIcon);
  dirActions.append(dirStar, dirMore);
  dirActionsContainer.appendChild(dirActions);
  return dirActionsContainer;
}



//  ---  Directory Loading Logic  ---

function loadDirectory(currentDir) {
  const directory  = buildElement("div", "directory"),
        dirInfo    = buildDirectoryInfo(currentDir),
        dirActions = buildDirectoryActions(currentDir);

  directory.append(dirInfo, dirActions);
  directory.addEventListener("click", function(event) {
    if (![...event.target.classList].includes("star")) return;
    currentDir.toggleStar();

    const dirStarIcon = directory.querySelector(".star__icon"),
          dirStarText = directory.querySelector(".star__text");
    updateStar(currentDir, dirStarIcon, dirStarText);
  })

  pageDirectories.appendChild(directory);
}

function loadDirectories() {
  pageDirectories.replaceChildren();
  const directories = directoriesData.reverse();

  for (let dirIdx = 0; dirIdx < directories.length; dirIdx++) {
    loadDirectory(directories[dirIdx]);
  }
}



//  ---  Event Listeners  ---

pageFollowBtn.addEventListener("click", function() {
  const followButton = event.target;
  if (followButton.textContent === "Follow") followButton.textContent = "Unfollow";
  else followButton.textContent = "Follow";
})

pageNewDirBtn.addEventListener("click", function() {
  if (pageDialog.open) pageDialog.close();
  else pageDialog.show();
})

pageDialogCloseBtn.addEventListener("click", function() {
  pageDialog.close();
})

pageDialogForm.addEventListener("submit", function(){
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());

  const newDirectory = new Directory(formDataObj);
  directoriesData.push(newDirectory);
  loadDirectories();

  pageDialogInputs.forEach(input => input.value = "");
})



//  ---  Page Initialization  ---

loadDirectories();