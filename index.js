
function run(e) {
    // return false to prevent a form action, see https://stackoverflow.com/a/3350351/2135504
    e.preventDefault();

    // access data, see https://stackoverflow.com/a/26892365/2135504
    var formdata = new FormData(document.querySelector("form"));
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    //console.log("my log");
    //text = document.getElementById("mytext").innerText;
    document.getElementById("output").innerHTML = data["username"];
    return false;
}