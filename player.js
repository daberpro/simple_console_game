import chalk from "./node_modules/chalk/source/index.js";
import readlineSync from "./node_modules/readline-sync/lib/readline-sync.js";

class Player{
  constructor(name,health,armor,weapon){
    console.clear();
    this.name = name;
    this.health = health;
    this.armor = armor;
    this.weapon = weapon;
  }

  info(){
    if(this.name === ""){
      this.name = "unknown"
    }
    console.log(chalk.bgYellow(`\n                ${this.name}                      `));
    console.log(chalk.blue(`\nnama player : ${chalk.yellow(this.name)}`));
    console.log(chalk.green(`nyawa player: ${chalk.yellow(this.health)}%`));
    console.log(chalk.red(`armor player: ${chalk.yellow(this.armor.name +' durability '+this.armor.durability)}%`));
    console.log(chalk.gray(`weapon      : ${chalk.yellow(this.weapon.name )} damage ${chalk.yellow(this.weapon.damage)}`));
  }

  getArmor(armor,durability){
    this.gettingAnArmor = armor;
    const Armor = readlineSync.questionInt(chalk.gray(`\n apakah anda ingin mengambil armor ${this.gettingAnArmor} dengan durability ${durability}
      \n jika iya silahkan anda masukan angka 1 untuk iya dan angka 2 untuk tidak :
      `));
    if(Armor === 1){
      console.log(chalk.yellow(`anda mengganti armor dengan ${armor}`));
      this.armor.name = this.gettingAnArmor;
      this.armor.durability = durability;
    }else{
      console.log(chalk.yellow(`anda meninggalkan armor ${this.gettingAnArmor}`));
    }
    this.info();
  }

  getAttack(){
    const damage = this.weapon.damage;
    return damage;
  }

  getCure(potion){
    console.log(chalk.yellow(`mendapatkan cure health di tambah ${potion}`));
    this.health += potion;
  }

  getDamage(getdamage){
    this.health -= getdamage;
    this.health += this.armor.durability;

    if(this.health>= 100){
      this.health = 100;
    }

    this.armor.durability -= getdamage;
    if(this.armor.durability <= 0){
      this.armor.durability = 0;
    }
    if(this.health <= 0){
      this.health = 0;
    }
  }

  getWeapon(weapon,durability){
    const Weapon = readlineSync.questionInt(`\n apakah anda ingin mengambil weapon ${weapon}\n
      dengan durability ${durability} jika iya silahkan anda masukan angka 1 untuk iya dan angka 2 untuk tidak :`);

    if(Weapon === 1){
      console.log(chalk.yellow(`anda mengganti weapon dengan ${weapon}`));
       this.weapon.name = weapon;
       this.weapon.damage = durability;
    }else{
      console.log(chalk.yellow(`anda meninggalkan armor ${weapon}`));
    }
  }

  input(){
    console.log(chalk.bgBlue("Silahkan pilih menu di bawah :"));
    console.log(chalk.yellow("1. serang enemy"));
    console.log(chalk.yellow("2. keluar dari game"));
    return readlineSync.question("masukan input : ");
  }
}

export default Player;
