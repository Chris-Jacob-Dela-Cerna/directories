

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



//  ---  Mock-up Directories  ---

const directories = [
  new Directory("orion-sign-up", null, [], "HTML"),
  new Directory("orion-dashboard", null, [], "HTML"),
  new Directory("calculator", null, [], "JavaScript"),
  new Directory("etch-a-sketch", null, [], "CSS"),
  new Directory("landing-page", null, [], "CSS"),
  new Directory("bugtopia", "Terminal game — a turn-based bug battle game built in Python.", ["game", "python", "cli", "oop", "terminal-game"], "PYTHON"),
  new Directory("quizpin", "Terminal quiz app — create, run, and manage CSV-based quizzes from the command line.", ["python", "cli", "csv", "terminal"], "PYTHON")
];



//  ---  List of Directories  ---

function loadDirectories() {
  pageDirectories.replaceChildren()

  for (let i = 0; i < directories.length; i++) {
    const currentDir = directories[i],
          dirContainer = document.createElement("div");

    const dirName = document.createElement("h3"),
          dirAbout = document.createElement("p"),
          dirTags = document.createElement("ul"),
          dirPrimaryLanguage = document.createElement("p");

    dirName.textContent = currentDir.name;
    dirAbout.textContent = currentDir.about;
    //  ---  Directory Tags  ---
    for (let ii = 0; ii < currentDir.tags.length; ii++) {
      const currentTag = currentDir.tags[ii],
            dirTagContainer = document.createElement("div"),
            dirTag = document.createElement("li"),
            dirTagText = document.createElement("p");
      dirTagText.textContent = currentTag;

      dirTag.appendChild(dirTagText);
      dirTagContainer.appendChild(dirTag);
      dirTags.appendChild(dirTagContainer);
    }
    dirPrimaryLanguage.textContent = currentDir.primaryLanguage;

    dirContainer.appendChild(dirName);
    dirContainer.appendChild(dirAbout);
    dirContainer.appendChild(dirTags);
    dirContainer.appendChild(dirPrimaryLanguage);
    pageDirectories.appendChild(dirContainer);
  }
}



//  ---  Page Initialization  ---

loadDirectories()