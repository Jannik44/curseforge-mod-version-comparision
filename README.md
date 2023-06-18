# curseforge-mod-version-comparision
A Programm to help choosing a minecraft version for your mods
Decide wich version you want with up to date version data from cursoforge without using their API in a pretty table

![image](https://github.com/Jannik44/curseforge-mod-version-comparision/assets/76906033/ea6c83e5-5180-4dc6-800e-0f574d5b3a59)

##installation

nodejs needs to be installed checks its there with 
node -v

next, download the files, to a local directory
inside of the folder is a file called mods.txt, insert the curseforge mod names there, you can get those from the links, example:
https://www.curseforge.com/minecraft/mc-mods/ic2-classic/files
here the mod name is "ic2-classic"
after you have done that you can run the script from the folder by using
node cuseforge_mod_version_comparison.js
it will visit the mod sites and pull the version data, after it finished you can open the output file "mods.html" in your browser

if you have isses or want another feature feel free to open a github issue
