#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let num = Math.floor(Math.random() * 101);         //It will generate random integers from 0 to 100 (inclusive)
let lives = 5;                                     //Five lives are given to the player to guess the number

//Displaying the rules
console.log(chalk.underline("Rules of the game:"));
console.log(`1- You have only five lives(chances) to guess the number.
2- Each wrong answer will deduct one life.
3- You can take the hint but only on the cost of one life.
4- The option of hint will be available after the first turn.
5- The hint option can only be availed once during the game.
6- If you opt to play again, after the game is finished, number of lives will be restored.`);

//Asking the user whether to start the game or exit
console.log("");
let check = await inquirer.prompt([{
    type : "list",
    name : "startGame",
    message : "Press continue to start the game:",
    choices : ["Continue", "Exit"]
}])

//This variable will keep track about whether the hint is availed by the player or not
let checker_of_hint = true;

//If the player selects "Continue", game will start
if (check.startGame === "Continue")
{
    //The loop will iterate until the player wins the game or the player decided to exit after loosing the game
    while (true)
    {
        //For displaying remainging lives on the screen using a symbol of diamond
        var str = "";
        for (let i = 0; i < lives; i++)
        {
            str += "💎";
        }
        console.log(`\nRemaining Lives: ${str}`);
    
        //Prompting the player to enter the guessed number
        let guess = await inquirer.prompt([{
            type : "number",
            name : "guessNum",
            message : "Enter the guessed number (0-100): "
        }]);
    
        //The condition to check if the guessed number matches the randomly generated num
        if (guess.guessNum == num)
        {
            console.log(chalk.bgGreen("Congratulations! You have guessed the correct number!"));
            break;
        }
        else
        {
            lives--;
            if (lives != 0)
            {
                console.log(chalk.bgRed("Wrong Guess! Try Again!"));
                if (checker_of_hint == true)
                {
                    let hintChoice = await inquirer.prompt([{
                        type : "list",
                        name : "hint",
                        message : "Hint?",
                        choices : ["Yes", "No"]
                    }])
    
                    //For displaying hint for the player
                    if (hintChoice.hint === "Yes")
                    {
                        lives--;
                        let lowerBound = Math.floor((num / 10)) * 10;
                        let upperBound = lowerBound + 10;
                        console.log(`The number is in between ${lowerBound} and ${upperBound} (inclusive)`);
                        checker_of_hint = false;
                    }
                }
            }
        }
    
        if (lives == 0)
        {
            console.log(`\nRemaining Lives: ${lives}`);
            console.log(chalk.bgRed("Game Over!"));
    
            //To ask the player whether to play again or not
            let again = await inquirer.prompt([{
                type : "list",
                name : "choice",
                message : "\nPlay Again?",
                choices : ["Yes", "No"]
            }])
    
            if (again.choice === "No")
            {
                break;
            }
            else
            {
                lives = 5;  //If the player decides to play again, then the game will be set to initial conditions
                checker_of_hint = true;
            }
        }
    }    
}

