

//  ---  DOM References  ---

const pageDirectories = document.getElementById("directories");



//  ---  Directory Object Constructor  ---

function Directory(name, about=null, tags=[], primaryLanguage=null) {
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
  new Directory("orion-sign-up", null, [], "HTML"),
  new Directory("orion-dashboard", null, [], "HTML"),
  new Directory("calculator", null, [], "JavaScript"),
  new Directory("etch-a-sketch", null, [], "CSS"),
  new Directory("landing-page", null, [], "CSS"),
  new Directory("bugtopia", "Terminal game — a turn-based bug battle game built in Python.", ["game", "python", "cli", "oop", "terminal-game"], "PYTHON"),
  new Directory("quizpin", "Terminal quiz app — create, run, and manage CSV-based quizzes from the command line.", ["python", "cli", "csv", "terminal"], "PYTHON")
];



//  ---  Directories Display Logic  ---

function buildDirectoryInfo(currentDir) {
  const dirInfo = document.createElement("div"),
        dirName = document.createElement("h3"),
        dirAbout = document.createElement("p"),
        dirTags = document.createElement("ul"),
        dirPrimaryLanguage = document.createElement("p");

  dirName.textContent = currentDir.name;
  dirAbout.textContent = currentDir.about;
  //  ---  Directory Tags  ---
  for (let dirTagIdx = 0; dirTagIdx < currentDir.tags.length; dirTagIdx++) {
    const currentTag = currentDir.tags[dirTagIdx];
    const dirTag = document.createElement("li"),
          dirTagWrapper = document.createElement("div"),
          dirTagText = document.createElement("p");
    dirTagText.textContent = currentTag;

    dirTagWrapper.appendChild(dirTagText);
    dirTag.appendChild(dirTagWrapper);
    dirTags.appendChild(dirTag);
  }
  dirPrimaryLanguage.textContent = currentDir.primaryLanguage;

  dirInfo.appendChild(dirName);
  dirInfo.appendChild(dirAbout);
  dirInfo.appendChild(dirTags);
  dirInfo.appendChild(dirPrimaryLanguage);

  return dirInfo;
}

function buildDirectoryActions(currentDir) {
  const dirActions = document.createElement("div"),
        dirActionsWrapper = document.createElement("div"),
        dirStar = document.createElement("div"),
        dirStarIcon = document.createElement("img"),
        dirStarText = document.createElement("p"),
        dirMore = document.createElement("div"),
        dirMoreIcon = document.createElement("div");

  //  ---  Directory Star Status  ---
  if (currentDir.star) {
    // dirStarIcon.setAttribute("src", "icons/star-solid");
    // dirStarIcon.setAttribute("alt", "Solid Star");
    dirStarText.textContent = "Starred";
  } else {
    // dirStarIcon.setAttribute("src", "icons/star-empty");
    // dirStarIcon.setAttribute("alt", "Empty Star");
    dirStarText.textContent = "Star";
  }

  // dirMoreIcon.setAttribute("src", "icons/chevron-down");
  // dirMoreIcon.setAttribute("alt", "Downwards Chevron");

  dirStar.appendChild(dirStarIcon);
  dirStar.appendChild(dirStarText);
  dirMore.appendChild(dirMoreIcon);
  dirActionsWrapper.appendChild(dirStar);
  dirActionsWrapper.appendChild(dirMore);
  dirActions.appendChild(dirActionsWrapper);

  return dirActions;
}

function loadDirectories() {
  pageDirectories.replaceChildren()

  for (let dirIdx = 0; dirIdx < directories.length; dirIdx++) {
    const currentDir = directories[dirIdx];
    const dirContainer = document.createElement("div"),
          dirInfo = buildDirectoryInfo(currentDir),
          dirActions = buildDirectoryActions(currentDir);

    dirContainer.appendChild(dirInfo);
    dirContainer.appendChild(dirActions);
    pageDirectories.appendChild(dirContainer);
  }
}



//  ---  Page Initialization  ---

loadDirectories()