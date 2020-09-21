var baseUrl = "https://games-world.herokuapp.com";
var gamesArray;
var currentGame;


document.getElementById("games-button").addEventListener("click", findGames);

function findGames() {
    fetch(baseUrl + "/games", { method: "GET" })
        .then(
            function (response) {
                return response.json();
            }
        ).then(
            function (jsonResp) {
                console.log(jsonResp);
                if (jsonResp.error) {
                    displayError("Sorry..." + jsonResp.error);
                } else {
                    gamesArray = jsonResp;
                    for (var i = 0; i < gamesArray.length; i++) {
                        displayGames(gamesArray[i]);
                    }
                }
            }
        ).catch(
            function (error) {
                console.log(error);
                displayError("Sorry! Something went wrong..." + error);
            }
        )
}

var title;
var description;
var image;
var gameId;

function displayGames(currentGame) {
    var games = document.getElementById("gamesDiv");

    title = document.createElement("p");
    title.innerText = "Title: " + currentGame.title;

    description = document.createElement("p");
    description.innerText = "Description : " + currentGame.description;
    description.style.fontSize = "x-small";

    image = document.createElement("img");
    image.setAttribute("src", currentGame.imageUrl)
    image.setAttribute("width", "200");

    gameId = document.createElement("p");
    gameId.innerText = "Game id: " + currentGame._id;
    gameId.style.fontSize = "x-small";

    games.appendChild(title);
    games.appendChild(image);
    games.appendChild(description);
    games.appendChild(gameId);
}


function displayError(error) {
    var errorDiv = document.getElementById("errorDiv");
    errorDiv.innerText = error;
}

//----------------------------------------------------------------------------------------------

//continuare temei get games --> add game si remove game



//1. Construire obiecte jocuri cu input de la utilizator

function Game(title, imageUrl, description) {
    this.title = title,
        this.imageUrl = imageUrl,
        this.description = description
}

Game.prototype.getIput = function () {
    this.title = document.getElementById("yourTitle").value;
    this.imageUrl = document.getElementById("yourImage").value;
    this.description = document.getElementById("yourDescription").value;
    return {
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description
    }
}
const yourNewGame = new Game();
//----------------------------------------------------------------------------------------------


//2. Construire  sugestii jocuri noi

const newGame0 = new Game("Grand Theft Auto V",
    "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
    "Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.");

const newGame1 = new Game("Mortal Kombat 11",
    "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_MortalKombat11_image1600w.jpg",
    "Mortal Kombat 11 is a fighting game developed by NetherRealm Studios and published by Warner Bros. Interactive Entertainment. Running on a heavily modified version of Unreal Engine 3, it is the eleventh main installment in the Mortal Kombat series and a sequel to 2015's Mortal Kombat X.")

const newGame2 = new Game("Marvel's Avengers 2020",
    "https://upload.wikimedia.org/wikipedia/en/c/c0/Avengers_2020_cover_art.png",
    "Marvel's Avengers is a third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay. The game can be played offline as a single-player experience or online with up to four people during certain aspects of the game.")

// pentru verificare  console.log
// function showSuggestedGames() {
//     console.log(newGame0, newGame1, newGame2);
// }
// showSuggestedGames();

//----------------------------------------------------------------------------------------------

//3.Randare joc nou de la utilizator in html

document.getElementById("addYourGameButton").addEventListener("click", showAndAdd);

//impartirea eventului de pe buton, pe afisare in html si add to server
function showAndAdd() {
    showYourObject();
    saveGameOnServer(yourNewGame);
}

Game.prototype.displayNewGames = function () {
    const newGames = document.getElementById("newGamesDiv");

    const newTitle = document.createElement("p");
    newTitle.innerText = "Title: " + this.title;

    const newDescription = document.createElement("p");
    newDescription.innerText = "Description : " + this.description;
    newDescription.style.fontSize = "x-small";

    const newImage = document.createElement("img");
    newImage.setAttribute("src", this.imageUrl)
    newImage.setAttribute("width", "200");

    newGames.appendChild(newTitle);
    newGames.appendChild(newImage);
    newGames.appendChild(newDescription);

}

function showYourObject() {
    consoleYourObject();
    yourNewGame.displayNewGames();
}

//console.log pentru verificare
function consoleYourObject() {
    const yourObject = yourNewGame.getIput();
    // console.log(yourObject)    --> pt verificare
}

//----------------------------------------------------------------------------------------------

//4 In caz de selectie --> randarea si a sugestiior in html  + salvarea lor pe server
document.getElementById("addSuggestedGameButton").addEventListener("click", checkDisplaySave);


function checkDisplaySave() {
    const checkers = document.getElementsByClassName("checkers");
    if (checkers[0].checked) {
        displaySuggested(newGame0);
        //console.log(newGame0);         pt verificare
        saveGameOnServer(newGame0);

    }
    if (checkers[1].checked) {
        displaySuggested(newGame1);
        //console.log(newGame1);        pt verificare
        saveGameOnServer(newGame1);
    }
    if (checkers[2].checked) {
        displaySuggested(newGame2);
        //console.log(newGame2)         pt verificare
        saveGameOnServer(newGame2);
    }
}

function displaySuggested(parameterGame) {
    const newGames = document.getElementById("newGamesDiv");

    const newTitle = document.createElement("p");
    newTitle.innerText = "Title: " + parameterGame.title;

    const newDescription = document.createElement("p");
    newDescription.innerText = "Description : " + parameterGame.description;
    newDescription.style.fontSize = "x-small";

    const newImage = document.createElement("img");
    newImage.setAttribute("src", parameterGame.imageUrl)
    newImage.setAttribute("width", "200");

    newGames.appendChild(newTitle);
    newGames.appendChild(newImage);
    newGames.appendChild(newDescription);
}

//----------------------------------------------------------------------------------------------

//5.Add to server --- prototype

function saveGameOnServer(newGame) {
    console.log(newGame);
    const promise = fetch(baseUrl + "/games", {
        method: 'POST',
        body: JSON.stringify(newGame)
    }).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (jsonResp) {
        console.log(jsonResp)
    }).catch(
        function (error) {
            console.log(error);
            displayError("Sorry! Something went wrong..." + error);
        }
    )
        ;
    return promise;
}

//----------------------------------------------------------------------------------------------

//6.Delete game...nu merge :(  

document.getElementById("deleteIdButton").addEventListener("click", deleteFromHtmlServer);
var idToDelete = document.getElementById("deleteId").value;

function deleteFromHtmlServer() {
    for (let i = 0; i < gamesArray.length; i++) {
        deleteFromHtml(gamesArray[i]);
    }
    //  deleteFromServer(idToDelete);
}

function deleteFromHtml(currentlyUsedGame) {
    if (idToDelete == currentlyUsedGame._id) {
        var gamesDeleteDiv = document.getElementById("gamesDiv");
        gamesDeleteDiv.removeChild(title);
        gamesDeleteDiv.removeChild(image);
        gamesDeleteDiv.removeChild(description);
        gamesDeleteDiv.removeChild(gameId);

        // gamesDeleteDiv.remove();
        // gamesDeleteDiv.parentNode.removeChild(title);
        // gamesDeleteDiv.parentNode.removeChild(image);
        // gamesDeleteDiv.parentNode.removeChild(description);
        // gamesDeleteDiv.parentNode.removeChild(gameId);
    }
}


function deleteFromServer(gameId) {
    fetch(baseUrl + "/games/:id" + gameId, {
        method: "DELETE"
    }).then(function (response) {
        return response.json();
    }).then(function (jsonResponse) {
        console.log("Deleted:", jsonResponse);
    }).catch(
        function (error) {
            console.log(error);
            displayError("Sorry! Something went wrong..." + error);
        }
    )
}