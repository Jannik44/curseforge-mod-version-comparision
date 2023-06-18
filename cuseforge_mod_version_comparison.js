const { chromium } = require('@playwright/test');
const fs = require('fs');

let filename = 'mods.txt';
fs.access(filename, fs.constants.F_OK, (err) => {
  if (err) {
    // Datei existiert nicht, erstelle sie und schreibe "jei" hinein
    fs.writeFile(filename, 'jei', (err) => {
      if (err) {
        console.error('Fehler beim Schreiben der Datei:', err);
        return;
      }
      console.log('!!! -- file ', filename, ' not found, created it, please fill it with your mod ids from curseforge and run the program again -- !!!');
    });
  } else {
    // Datei existiert bereits
    console.log('File ', filename, ' found, starting browser now...');
  }
});

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    acceptDownloads: true,
  });
  await context.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0',
    'Accept-Language': 'de-DE,en;q=0.9'
  });
  const page = await context.newPage();

  // Lese die Datei 'mods.txt' und erhalte die Links
  const modids = fs.readFileSync('mods.txt', 'utf-8').split('\n');
  console.log('reading mods.txt...');
  let html_doc = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Mod version comparison list</title><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet'></head><body><style>.gr{color: green;}.re{color: red;}</style><div class='container m-2'><table class='table'><thead><tr><th scope='col'>ModId/ver</th>";
  let total_versions = [];
  let modid_versions = [];
  for (const modid of modids) {
    if (modid.trim() !== '') {
      console.log('current modid is', modid);
      var link = `https://www.curseforge.com/minecraft/mc-mods/${modid}/files`;
      await page.goto(link);
      console.log('retrieving data from', link)
      const html = await page.content();
      //fs.writeFileSync('example.html', html);
      // Auswählen des <ul>-Elements mit der Klasse "dropdown-list"
      const dropdownList = await page.$$eval('ul.dropdown-list', (elements) => {
        // Erstellen eines leeren Arrays zum Speichern der <li>-Elemente
        const listItems = [];
        // Iterieren über die <li>-Elemente
        for (let i = 1; i < elements[0].children.length; i++) {
          // Hinzufügen des <li>-Elements zum Array
          listItems.push(elements[0].children[i].textContent);
        }
        return listItems; // Rückgabe des Arrays mit den <li>-Elementen
      });

      modid_versions.push(dropdownList);

      for (var i = 0; i < dropdownList.length; i++) {
        let element = dropdownList[i];
        if (!total_versions.includes(element)) {
          total_versions.push(element);
        }
      }
    }
  }
  await browser.close();
  console.log('browser closed, generating html...');
  for (var i = 0; i < total_versions.length; i++) {
    html_doc = html_doc + "<th scope='col'>" + total_versions[i] + "</th>";
  }
  html_doc = html_doc + "</tr></thead><tbody>";
  var x = -1;
  for (var i = 0; i < modids.length -1; i++) {// wird für jede mod durchlaufen
    x++;
    html_doc = html_doc + "<tr><th scope='row'>" + modids[x] + "</th>";
    for (var j = 0; j < total_versions.length; j++) {
      if (modid_versions[x].includes(total_versions[j])){
        html_doc = `${html_doc}<td><svg xmlns='http://www.w3.org/2000/svg' height='25' fill='currentColor' class='bi bi-check-circle-fill gr' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/></svg></td>`;
      } else {
        html_doc = `${html_doc}<td><svg xmlns='http://www.w3.org/2000/svg' height='25' fill='currentColor' class='bi bi-x-circle-fill re' viewBox='0 0 16 16'><path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z'/></svg></td>`;
      }
    }
    html_doc = `${html_doc}</tr>`;
  }
  html_doc = `${html_doc}</table></div></body></html>`;
  filename = "mods.html";
  fs.writeFile(filename, html_doc, (err) => {
    if (err) {
      console.error('Fehler beim Schreiben der Datei:', err);
      return;
    }
    console.log('Datei erfolgreich geschrieben:', filename);
  });
  console.log("output filename is: ", filename);
  console.log("done.");
})();