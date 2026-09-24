


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
  new Directory("quizpin", "Terminal quiz app — create, run, and manage CSV-based quizzes from the command line.", ["python", "cli", "csv", "terminal"])
];