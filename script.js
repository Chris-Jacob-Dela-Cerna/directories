

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

const directories = [
  new Directory("orion-sign-up", null, [], "HTML"),
  new Directory("orion-dashboard", null, [], "HTML"),
  new Directory("calculator", null, [], "JavaScript"),
  new Directory("etch-a-sketch", null, [], "CSS"),
  new Directory("landing-page", null, [], "CSS"),
  new Directory("bugtopia", "Terminal game — a turn-based bug battle game built in Python.", ["game", "python", "cli", "oop", "terminal-game"], "PYTHON"),
  new Directory("quizpin", "Terminal quiz app — create, run, and manage CSV-based quizzes from the command line.", ["python", "cli", "csv", "terminal"], "PYTHON")
];

const pageDirectories = document.getElementById("directories");

for (let i = 0; i < directories.length; i++) {
  const currentDir = directories[i];
  const dirContainer = document.createElement("div");

  const dirName = document.createElement("h3");
  dirName.textContent = currentDir.name;

  const dirAbout = document.createElement("p");
  dirAbout.textContent = currentDir.about;

  const dirTags = document.createElement("ul");
  const currentDirTags = currentDir.tags;
  for (let ii = 0; ii < currentDirTags.length; ii++) {
    const currentTag = currentDirTags[ii]
    const dirTagContainer = document.createElement("div");

    const dirTag = document.createElement("li");
    const dirTagText = document.createElement("p");
    dirTagText.textContent = currentTag;

    dirTag.appendChild(dirTagText);
    dirTagContainer.appendChild(dirTag);
    dirTags.appendChild(dirTagContainer);
  }

  const dirPrimaryLang = document.createElement("p");
  dirPrimaryLang.textContent = currentDir.primaryLanguage;

  dirContainer.appendChild(dirName);
  dirContainer.appendChild(dirAbout);
  dirContainer.appendChild(dirTags);
  dirContainer.appendChild(dirPrimaryLang);
  pageDirectories.appendChild(dirContainer);
}