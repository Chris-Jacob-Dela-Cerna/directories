

//  ---  Variables  ---

const directories = [];



//  

function directory(name, about=null, tags=[], primaryLanguage=null, lastUpdated=null) {
  if (!new.target) throw Error("cannot create object without [new].");

  this.name = name;
  this.about = about;
  this.tags = tags;
  this.primaryLanguage = primaryLanguage;
  this.lastUpdated = lastUpdated;
  this.star = false;
}

console.log(new directory("bugtopia", "Terminal game — a turn-based bug battle game built in Python.", ["game", "python", "cli", "oop", "terminal-game"], "PYTHON", "Jun 28, 2026"));