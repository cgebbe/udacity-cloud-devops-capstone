
function run(event) {
    // return false to prevent form action, see https://stackoverflow.com/a/3350351/2135504
    event.preventDefault();

    // get form data, see https://stackoverflow.com/a/26892365/2135504
    const formdata = new FormData(document.querySelector("form"));
    const input_data = Object.fromEntries(formdata.entries());
    console.log(input_data);

    // call backend API, see https://stackoverflow.com/a/29823632/2135504
    (async () => {
        const rawResponse = await fetch('http://localhost:8000/swearword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sentence: input_data["sentence"] })
        });
        const response = await rawResponse.json();
        console.log(response);


        // show response
        if (response["contains_swearword"]) {
            out_text = "Whoa, language! Found words: " + response["found_swearwords"]
        } else {
            out_text = "You speak like an angel."
        }
        document.getElementById("output").innerHTML = out_text;
    })();


    return false;
}