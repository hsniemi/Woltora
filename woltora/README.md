# Woltora-web-sovellus

Tämä sovellus on osa Oulun ammattikorkeakoulun Web-ohjelmoinnin sovellusprojektia. 
Projektiryhmässä oli minun, Henna Niemen, lisäksi Riku Korkiasaari, Arttu Uusitalo ja Jin Seo.

Sovelluksen esittelyvideon voit katsoa tästä linkistä: (https://youtu.be/76BzzvhXmkE).
Sovellus on Heroku-pilvipalvelussa osoitteessa: (https://woltora-app.herokuapp.com/).

### Projektin tavoitteet
Tarkoituksena oli tehdä ruuantilaussovellus, jota käytetään nettiselaimen kautta. 
Käyttäjät voivat rekisteröityä palveluun ja tarkastella omia tilauksiaan sekä tilaushistoriaa. Asiakas voi tarkastella ravintoloita ja niiden tuotteita, siirtää tuotteita ostoskoriin ja lähettää tilauksen. Ravintolan omistaja voi lisätä palveluun ravintolan, sekä tuotteita. Sovellukseen saatiin pääasiassa toteutettua vaaditut ominaisuudet.

### Käytetyt teknologiat ja välineet
Käyttöliittymä toteutettiin käyttäen React-kirjastoa ja backend NodeJS:a ja Express-sovelluskehystä. Koodieditorina käytettiin Visual Studio Codea. Käyttäjien autentikointiin sovelluksessa käytetään JSON Web Tokenia. Palveluun ladattavat kuvat tallentuvat Cloudinary-pilvipalveluun (https://cloudinary.com/). Sovellukseen syötettävät tiedot tallentuvat PostgreSQL-tietokantaan.