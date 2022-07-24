const getTotalTime = (e) => {
  e.preventDefault();
  const inputTime = $("#inputTime").val() * 1;
  const inputRest = $("#inputRest").val() * 1;
  const inputExercise = $("#inputExercise").val() * 1;
  const inputSet = $("#inputSet").val() * 1;
  const inputSetRest = $("#inputSetRest").val() * 1;

  const totalTime =
    (inputTime + inputRest) * inputExercise + inputSet * inputSetRest;

  const minutes = Math.floor(totalTime / 60);
  const seconds = (totalTime % 60).toString();
  const time = `${minutes}:${seconds.padStart(2, "0")}`;

  $(".total-time span").text(time);

  console.log("Testing Edit 2");
};

$(".btn").click((e) => getTotalTime(e));
