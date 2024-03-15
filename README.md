[![CodeFactor](https://www.codefactor.io/repository/github/jannik44/curseforge-mod-version-comparision/badge)](https://www.codefactor.io/repository/github/jannik44/curseforge-mod-version-comparision)
# curseforge-mod-version-comparision
A Programm to help choosing a minecraft version for your mods
Decide wich version you want with up to date version data from curseforge without using their API in a pretty table

![image](https://github.com/Jannik44/curseforge-mod-version-comparision/assets/76906033/ea6c83e5-5180-4dc6-800e-0f574d5b3a59)

## installation  

download the files from the repo to a local directory and install playwright via npm (see here for more information: https://playwright.dev/docs/intro)
inside the folder is a file called mods.txt, insert the curseforge mod names there, you can get those from the links, example:  
```https://www.curseforge.com/minecraft/mc-mods/ic2-classic/files```
here the mod name is "ic2-classic"  
after you have done that you can run the script from the folder by using  
```node cuseforge_mod_version_comparison.js```
it will visit the mod sites and pull the version data, after it finished you can open the output file "mods.html" in your browser  
  
if you have isses or want another feature feel free to open a github issue  
