

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

function buildDirectoryInfo(dirIdx) {
  const currentDir = directories[dirIdx];

  const dirInfoWrapper = document.createElement("div"),
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
          dirTagContainer = document.createElement("div"),
          dirTagText = document.createElement("p");
    dirTagText.textContent = currentTag;

    dirTagContainer.appendChild(dirTagText);
    dirTag.appendChild(dirTagContainer);
    dirTags.appendChild(dirTag);
  }
  dirPrimaryLanguage.textContent = currentDir.primaryLanguage;

  dirInfoWrapper.appendChild(dirName);
  dirInfoWrapper.appendChild(dirAbout);
  dirInfoWrapper.appendChild(dirTags);
  dirInfoWrapper.appendChild(dirPrimaryLanguage);
  return dirInfoWrapper;
}

function loadDirectories() {
  pageDirectories.replaceChildren()

  for (let dirIdx = 0; dirIdx < directories.length; dirIdx++) {
    const dirInfo = buildDirectoryInfo(dirIdx);
    pageDirectories.appendChild(dirInfo);
  }
}



//  ---  Page Initialization  ---

loadDirectories()