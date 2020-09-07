import chalk from "./node_modules/chalk/source/index.js";
import readlineSync from "./node_modules/readline-sync/lib/readline-sync.js";

import Player from "./player.js"

const baju_enemy  = [
  {
    name: "baju besi",
    durability: 70,
  },
  {
    name: "baju kulit",
    durability: 20
  },
  {
    name: "baju emas",
    durability: 100
  }
];

const senjata_enemy=[
  {
    name: "kapak",
    damage:  30
  },
  {
    name: "shotgun",
    damage: 80
  },
  {
    name: "samurai",
    damage: 60
  }
];

const weapon_rand = senjata_enemy[Math.floor(Math.random() * senjata_enemy.length)];

console.clear();
const player_name = readlineSync.question("Masukan nama Anda :");
const enemy_name = readlineSync.question("Masukan nama enemy :");

const player1 = new Player(
  player_name,
  100,
  baju_enemy[Math.floor(Math.random()*baju_enemy.length)],
  senjata_enemy[Math.floor(Math.random() * senjata_enemy.length)]
);

const enemy = new Player(
  enemy_name,
  100,
  baju_enemy[Math.floor(Math.random()*baju_enemy.length)],
  senjata_enemy[Math.floor(Math.random() * senjata_enemy.length)]
);

//player1.info();
//player1.getArmor("baju besi",70);
//enemy.info();
let rounde = 0;

const ronde = ()=>{
  rounde++;
  console.log(chalk.yellow(`rounde ${rounde}`));
  if(rounde % 2 == 1){
      console.log(chalk.yellow(`${player1.name} menyerang ${enemy.name}`));
      enemy.getDamage(player1.getAttack());
      player1.info();
      enemy.info();
  }else{
      console.log(chalk.yellow(`${enemy.name} menyerang ${player1.name}`));
      player1.getDamage(enemy.getAttack());
      player1.info();
      enemy.info();
  }
  play();
};

const play = ()=>{
  if(rounde === 0){
     console.log(chalk.bgYellow("                                                               "));
     console.log(chalk.bgYellow("         selamat datang di simulasi pertarungan sederhana      "));
     console.log(chalk.bgYellow("                                                               \n"));
     console.log(chalk.yellow(`anda akan bertarun bersama ${enemy.name} yang telah di perogram silahkan pilih`));
     console.log(chalk.yellow("\n ================= info pemain ===================="));
     player1.info();
     enemy.info();
  }
  if(rounde === 2){
     player1.getWeapon(weapon_rand.name,weapon_rand.damage);
  }
  if(player1.health <= 40){
      console.log(chalk.bgGreen(`Apakah anda ingin melakukan Cure ?:`));
      let select = readlineSync.questionInt("dengan durability jika iya silahkan anda masukan angka 1 untuk iya dan angka 2 untuk tidak :`");
      if(select === 1){
        player1.getCure(20);
      }else if(select == 2){
        console.log(chalk.red("anda meninggalkan Cure"));
      }else{
        console.log(chalk.red("hm... -_ pilih yang benar"));
        select = readlineSync.questionInt("dengan durability jika iya silahkan anda masukan angka 1 untuk iya dan angka 2 untuk tidak :`");
      }
  }
  if(!(player1.health === 0 || enemy.health === 0)){
     console.log(chalk.yellow("\n ================= info ===================="));
      console.log(chalk.bgGreen(`Apakah anda ingin lanjut ?: `));
      console.log(chalk.yellow(`       silahkan pilih menu di bawah : `));
      console.log(chalk.yellow(`        1.lanjut `));
      console.log(chalk.yellow(`        2.menyerah `));
      let player_select = readlineSync.questionInt("silahkan masukan pilihan anda : ");

      if(player_select === 1){
        ronde();
      }else if(player_select === 2){
        player1.health = 0;
        console.log(chalk.bgYellow("         game over         "));
        if(player1.health < enemy.health){
            console.log(`permainan di menangkan oleh ${enemy.name}`);
        }
      }else{
        console.log(chalk.red("hm... -_ pilih yang benar"));
        player_select = readlineSync.questionInt("silahkan masukan pilihan anda : ");
      }

  }else{
    player1.health = 0;
    console.log(chalk.bgYellow("         game over         "));
    if(player1.health < enemy.health){
        console.log(`permainan di menangkan oleh ${enemy.name}`);
    }else{
        console.log(`permainan di menangkan oleh ${player1.name}`);
    }
  }
};

play();
