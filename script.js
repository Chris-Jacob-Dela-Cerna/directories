

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

  dirInfo.classList.add("directory__info");
  dirName.classList.add("directory__name");
  dirAbout.classList.add("directory__about");
  dirTags.classList.add("directory__tags");
  dirPrimaryLanguage.classList.add("directory__primary-language");

  dirName.textContent = currentDir.name;
  dirAbout.textContent = currentDir.about;
  //  ---  Directory Tags  ---
  for (let dirTagIdx = 0; dirTagIdx < currentDir.tags.length; dirTagIdx++) {
    const currentTag = currentDir.tags[dirTagIdx];
    const dirTagWrapper = document.createElement("li"),
          dirTag = document.createElement("div"),
          dirTagText = document.createElement("p");

    dirTagWrapper.classList.add("directory__tag-wrapper");
    dirTag.classList.add("tag");
    dirTagText.classList.add("tag__text");

    dirTagText.textContent = currentTag;

    dirTag.appendChild(dirTagText);
    dirTagWrapper.appendChild(dirTag);
    dirTags.appendChild(dirTagWrapper);
  }
  dirPrimaryLanguage.textContent = currentDir.primaryLanguage;

  dirInfo.append(dirName, dirAbout, dirTags, dirPrimaryLanguage);
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
  const dirActionsContainer = document.createElement("div"),
        dirActions = document.createElement("div"),
        dirStar = document.createElement("div"),
        dirStarIcon = document.createElement("img"),
        dirStarText = document.createElement("p"),
        dirMore = document.createElement("div"),
        dirMoreIcon = document.createElement("img");

  dirActionsContainer.classList.add("directory__actions-container");
  dirActions.classList.add("directory__actions");
  dirStar.classList.add("star");
  dirStarIcon.classList.add("star__icon");
  dirStarText.classList.add("star__text");
  dirMore.classList.add("more");
  dirMoreIcon.classList.add("more__icon");

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
  pageDirectories.replaceChildren()

  for (let dirIdx = 0; dirIdx < directories.length; dirIdx++) {
    const currentDir = directories[dirIdx];
    const directory = document.createElement("div"),
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

    console.log(directory)

    pageDirectories.appendChild(directory);
  }

  document.querySelector("directory");
}



//  ---  Page Initialization  ---

loadDirectories();