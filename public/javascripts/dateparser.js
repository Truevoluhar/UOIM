function dateparser(input) {
  let inputString = input.toString();
  let splitter = inputString.split(" ");
  console.log(splitter[0]);
  console.log(splitter);
  
  if (splitter[0] === "Mon") {
    splitter[0] = "Ponedeljek";
  } else if (splitter[0] === "Tue") {
    splitter[0] = "Torek";
  } else if (splitter[0] === "Wed") {
    splitter[0] === "Sreda";
  } else if (splitter[0] === "Thu") {
    splitter[0] === "Četrtek";
  } else if (splitter[0] === "Fri") {
    splitter[0] === "Petek";
  } else if (splitter[0] === "Sat") {
    splitter[0] === "Sobota";
  } else if (splitter[0] === "Sun") {
    splitter[0] === "Nedelja";
  }

  let danvtednu = splitter[0];
  console.log(splitter[0]);
}

module.exports = dateparser;