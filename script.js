

//  ---  DOM References  ---

const pageDirectories = document.getElementById("directories__list");



//  ---  Directory Object Constructor  ---

function Directory(name, about=null, tags=null, primaryLanguage=null) {
  if (!new.target) throw Error("cannot create object without [new].");

  this.name = name;
  this.about = about;
  this.tags = tags;
  this.primaryLanguage = primaryLanguage;
  this.star = false;
}

Directory.prototype.toggleStar = function () {
  this.star = !this.star;
}



//  ---  List of Directories  ---

const directories = [
  new Directory("orion-sign-up", null, null, "HTML"),
  new Directory("orion-dashboard", null, null, "HTML"),
  new Directory("calculator", null, null, "JavaScript"),
  new Directory("etch-a-sketch", null, null, "CSS"),
  new Directory("landing-page", null, null, "CSS"),
  new Directory("bugtopia", "Terminal game — a turn-based bug battle game built in Python.", ["game", "python", "cli", "oop", "terminal-game"], "PYTHON"),
  new Directory("quizpin", "Terminal quiz app — create, run, and manage CSV-based quizzes from the command line.", ["python", "cli", "csv", "terminal"], "PYTHON")
];



//  ---  Utilities  ---

function craftElement(tagName, className, idName) {
  const element = document.createElement(tagName);
  if (className) element.classList.add(className);
  if (idName) element.setAttribute("id", idName);
  return element;
}



//  ---  Directories Display Logic  ---

function buildDirectoryInfo(currentDir) {
  const dirInfo = craftElement("div", "directory__info");

  const dirName = craftElement("h3", "directory__name");
  dirName.textContent = currentDir.name;
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
            dirTag = craftElement("div", "tag"),
            dirTagText = craftElement("p", "tag__text");
      dirTagText.textContent = currentTag;

      dirTag.appendChild(dirTagText);
      dirTagWrapper.appendChild(dirTag);
      dirTags.appendChild(dirTagWrapper);
    }
    dirInfo.appendChild(dirTags);
  }

  if (currentDir.primaryLanguage) {
    const dirPrimaryLanguage = craftElement("p", "directory__primary-language");
    dirPrimaryLanguage.textContent = currentDir.primaryLanguage;
    dirInfo.append(dirPrimaryLanguage);
  }

  return dirInfo;
}

function updateStar(currentDir, dirStarIcon, dirStarText) {
  if (currentDir.star) {
    // dirStarIcon.setAttribute("src", "icons/star-solid");
    // dirStarIcon.setAttribute("alt", "Solid Star");
    dirStarText.textContent = "Starred";
  } else {
    // dirStarIcon.setAttribute("src", "icons/star-empty");
    // dirStarIcon.setAttribute("alt", "Empty Star");
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

  updateStar(currentDir, dirStarIcon, dirStarText);
  // dirMoreIcon.setAttribute("src", "icons/chevron-down");
  // dirMoreIcon.setAttribute("alt", "Downwards Chevron");

  dirStar.append(dirStarIcon, dirStarText);
  dirMore.appendChild(dirMoreIcon);
  dirActions.append(dirStar, dirMore);
  dirActionsContainer.appendChild(dirActions);
  return dirActionsContainer;
}

function loadDirectories() {
  pageDirectories.replaceChildren();

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

    pageDirectories.appendChild(directory);
  }
}



//  ---  Page Initialization  ---

loadDirectories();