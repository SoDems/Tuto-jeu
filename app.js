//But du jeu : trouver un nombre aléatoire entre 0 et 100 
//Système de vie
//Système de chaud froid
//Manipulation du DOM en JS

//On peut trouver le nombre aléatoire dans la console

//plan
    // - Mise en place 
    // - HTML
    // - CSS 
    // - Début de JS 
            // -Logique globale JS : ce qui se passe qd on charge la page web 
            // - Système chaud / froid
            // - Système de Vie 
            // - Bouton recommencer 

// 1) mise place
//     - vscode
//     - extension : color highlight
//                   ES Lint 

//après avoir fini le css : 
     // - Récupérer les éléments du DOM : récuperer le html pour utiliser en js
     // - intégrer ionicons 
     // - intégrer les dégradés

//Elements du DOM
const divVies = document.querySelector('.vies'); /*pour recupere une div de l'html*/
const message = document.getElementById('message'); /*pas besoin de rappeler l'id ds les parenthèses puisqu il est déja appelé*/
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];/*pour choisir l'element on choisit l'element body*/
const rebours = document.getElementById('rebours');
const choix = document.getElementsByClassName('choix');
const jeu = document.getElementsByClassName('jeu');
const niveau = document.getElementById('niveau');

// Modèles de coeur
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';


// Fond d'ecran dont on aura besoin bg=background
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';/* ne pas mettre l intitulé background-color et attention de bien mettre le poin virgule après les guillemets*/
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107A 100%, #FF1361 67%, #FFF800 100%)';
const bgLooser = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

let totalVies;


btn1.addEventListener ('click', (e) => {
    choix[0].style.display = "none";
    jeu[0].style.display = "block";
    totalVies = 7;
    play(totalVies);
})

    
btn2.addEventListener ('click', (e) => {
    choix[0].style.display = "none";
    jeu[0].style.display = "block";
    totalVies = 5;
    play(totalVies);
})
btn3.addEventListener ('click', (e) => {
    choix[0].style.display = "none";
    jeu[0].style.display = "block";
    totalVies = 3;
    play(totalVies);
})




   

//integrer la logique du jeu = initialiser ce qu'il se passe au chargement du jeu 
//Récuperation de la valeur du formulaire ce que l utilisateur va entrer pour jouer

// play :
const play = (totalVies) => {  //fonction fléchée = nouvelle synthaxe depuis es6 (c'est une norme, c’est un standard de langage de programmation, il definit: la synthaxe, les types de variable et autres   => lancer une fonction
   //comment generer un nombre aleatoire ?
   const randomNumber = Math.floor(Math.random(/*chiffre entre 0 et 1*/) *101) /*math.floor = pour avoir des nombres entiers à la valeur inférieur*/

   let vies = totalVies; 
   console.log(randomNumber); /*pour voir le chiffre choisi par la machine ds la console*/


   //actualiser à chaque essai - TOUTE LA LOGIQUE
   formulaire.addEventListener('submit' , (e) => {     /*qui va se déclencher à une certaine action, le (e) submit = des que le formulaire va etre envoyé, on va lui ordonner une fonction. le (e) represente l'element ou va se derouler l'evenement */
        e.preventDefault(); /*empeche l'envoie du formulaire sinon ça rafraichit la page et plus de jeu*/
        const valeurInput = parseInt(input.value); /*parseInt= conversion d'un string en nombre  /*recupère la valeur  de l'input (la ou la personne ecrit)*/

        if(valeurInput < 0  || valeurInput > 100) return; /* le jeu ne peut pas continuer ac ses valeurs*/

        if(valeurInput === randomNumber){/*valeur Input = le chiffre de l'utilisateur     randomNumber= le nombre que l'ordi a choisi*/
            body.style.backgroundImage = bgWin;
            message.textContent = `Bravo !! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";/*ce btn n'était pas afficher jusqu'à present puis qu on l'avait mis en caché*/
            // essayerBtn.setAttribute("disabled","");
            essayerBtn.style.display = "none";
            
        } 
        //Système chaud/froid   
        // fixer des fourchettes de valeurs
        // Verifier si on perdu
        if(valeurInput !== randomNumber){
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput -3){
         /*(randomNumber <= valeurInput + 2) && (randomNumber >= valeurInput - 2)*/
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brûlant !!! 🔥🔥🔥"; /*ctrl i*/
                
            }
            else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput -6){
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est chaud !!! 🔥";
            }
            else if(randomNumber < valeurInput + 11  && randomNumber > valeurInput -11){
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est tiède !!! 😐";  
            }
            else{
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est froid !!! ❄️"; 
            }
            
            vies--;    /*système de vies*/

            verifyLoose();  
        }
        actualiseCoeurs(vies);



   })
   const verifyLoose = () => {  /*verification de la fonction*/
            if(vies === 0){
                body.style.backgroundImage = bgLooser;
                body.style.color = '#990000';
                essayerBtn.setAttribute("disabled", "")/*pour desactiver le btn "essayer"   disabled=désactiver*/
                message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
                rejouerBtn.style.display = "block";
            }
   }
   const actualiseCoeurs = (vies) => { 
       divVies.innerHTML = "" /*on enlève tout le html qu il y a à l'intérieur pour repartir sur une bonne base car on va l'actualiser à chaque fois*/
       let tableauDeVies = []; /*initialiser à un tableau vide*/
       for(let i = 0; i < vies; i++){ /*for = tant que*/
           tableauDeVies.push(coeurPlein);
       }
       //[coeur, coeur, coeur, coeur] tableau qu on  aura sur le jeu
       for(let i = 0; i < totalVies - vies; i++){  /*nombre de coeur qu on a perdu*/
        tableauDeVies.push(coeurVide);
    }
    tableauDeVies.forEach/*pour chaque*/(coeur => {
        divVies.innerHTML += coeur;     /*+= rajouter aux autres*/
        rebours.textContent= `Trouve le bon nombre entre 0 et 100. Tu as ${vies} essais !`;
    })
/* générer le nombre de coeur en fonction de nombre de vies*/
   }
   
   actualiseCoeurs(vies);
   /*pour rejouer =  forcer le chargement de la page (recommencer)*/
    rejouerBtn.addEventListener('click', () => {
       message.style.display = 'none'  /*message enlevé*/
       document.location.reload(true); /* la page se rafraichit des qu on clique sur le btn, la page réapparait*/

   })

}









                  
