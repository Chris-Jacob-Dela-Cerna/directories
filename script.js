

//  ---  DOM References  ---

const directoryList = document.getElementById("directories__list");
const followBtn = document.getElementById("user-profile__follow-btn");



//  ---  Directory Object Constructor  ---

function Directory({ name, about=null, tags=null, primaryLanguage=null, url="#", star=false }) {
  if (!new.target) throw Error("cannot create object without [new].");

  this.name = name;
  this.about = about;
  this.tags = tags;
  this.primaryLanguage = primaryLanguage;
  this.star = star;
  this.url = url;
}

Directory.prototype.toggleStar = function () {
  this.star = !this.star;
}



//  ---  List of Directories  ---

const directories = [
  new Directory({
    "name": "quizpin",
    "about": "Terminal quiz app — create, run, and manage CSV-based quizzes from the command line.",
    "tags": ["python", "cli", "csv", "terminal"],
    "primaryLanguage": { "color": "#3869a8", "language": "Python" },
    "url": "https://github.com/Chris-Jacob-Dela-Cerna/quizpin", 
  }),
  new Directory({
    "name": "bugtopia",
    "about": "Terminal game — a turn-based bug battle game built in Python.",
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



//  ---  Directory Build Logic  ---

function craftElement(tagName, className, idName) {
  const element = document.createElement(tagName);
  if (className) element.classList.add(className);
  if (idName) element.setAttribute("id", idName);
  return element;
}

function buildDirectoryInfo(currentDir) {
  const dirInfo = craftElement("div", "directory__info");

  const dirNameWrapper = craftElement("h3", "directory__name-wrapper"),
        dirName = craftElement("a", "directory__name");
  dirName.textContent = currentDir.name;
  dirName.setAttribute("href", currentDir.url);
  dirNameWrapper.appendChild(dirName);
  dirInfo.appendChild(dirName);

  if (currentDir.about) {
    const dirAbout = craftElement("p", "directory__about");
    dirAbout.textContent = currentDir.about;
    dirInfo.appendChild(dirAbout);
  }

  if (currentDir.tags) {
    const dirTags = craftElement("ul", "directory__tags");
    for (let dirTagIdx = 0; dirTagIdx < currentDir.tags.length; dirTagIdx++) {
      const currentTag = currentDir.tags[dirTagIdx];
      const dirTagWrapper = craftElement("li", "directory__tag-wrapper"),
            dirTag = craftElement("a", "directory__tag");
      
      dirTag.textContent = currentTag;
      dirTag.setAttribute("href", `https://github.com/topics/${currentTag}`);

      dirTagWrapper.appendChild(dirTag);
      dirTags.appendChild(dirTagWrapper);
    }
    dirInfo.appendChild(dirTags);
  }

  if (currentDir.primaryLanguage) {
    const dirPrimLang = craftElement("div", "primary-language"),
          dirPrimLangColor = craftElement("div", "primary-language__color"),
          dirPrimLangName = craftElement("p", "primary-language__name");
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
  const dirActionsContainer = craftElement("div", "directory__actions-container"),
        dirActions = craftElement("div", "directory__actions"),
        dirStar = craftElement("div", "star"),
        dirStarIcon = craftElement("img", "star__icon"),
        dirStarText = craftElement("p", "star__text"),
        dirMore = craftElement("div", "more"),
        dirMoreIcon = craftElement("img", "more__icon");

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

function loadDirectories() {
  directoryList.replaceChildren();

  for (let dirIdx = 0; dirIdx < directories.length; dirIdx++) {
    const currentDir = directories[dirIdx];
    const directory = craftElement("div", "directory"),
          dirInfo = buildDirectoryInfo(currentDir),
          dirActions = buildDirectoryActions(currentDir);

    directory.append(dirInfo, dirActions);

    directory.addEventListener("click", function(event) {
      if (![...event.target.classList].includes("star")) return;
      currentDir.toggleStar();

      const dirStarIcon = directory.querySelector(".star__icon"),
            dirStarText = directory.querySelector(".star__text");
      updateStar(currentDir, dirStarIcon, dirStarText);
    })

    directoryList.appendChild(directory);
  }
}



//  ---  Event Listeners  ---

followBtn.addEventListener("click", function() {
  const currentTarget = event.currentTarget;
  if (currentTarget.textContent === "Follow") currentTarget.textContent = "Unfollow";
  else currentTarget.textContent = "Follow";
})



//  ---  Page Initialization  ---

loadDirectories();