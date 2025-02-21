
custom framework is een hele simpele framework die het mogelijk maakt om variabele tussen 2 html documenten te delen. Door een speciale tag te vullen met de webpagina waar je heen gaat.
## functies
### `goTo(url);`
vervang de inhoud van `<webpage>` met de content op `url`

### `makeCustomComponent(name, tag, url, version, custom_attributes);`
defineer een custom tag die kan worden gebruikt
name: de naam van de tag
tag: de tag van de tag
url: de locatie van de custom tag
version: de versie van de tag die kan worden opgeroepen in de tag javascript met `{{version}}`
custom_attributes: een lijst van custom attributes die kan worden gebruikt op de zelfde manier als `{{version}}` bijv `[data]` en dan in js `{{data}}` 
en dan in moet je in html data defineren `<mijnTag data="hoi"></mijnTag>`.

bijv.
`makeCustomComponent("menu balk", "menubar", "menubar","1.0",[items]`

`<menubar items="['over ons', 'contact', 'home']">`

menubar
|    menubar.js
|   menubar.html



note: er zijn wel meer fucties maar die worden eigelijk alleen gebruikt door custom framework zelf
## tags
### `<webpage>`
de `<webpage>` tag word gevult met de HTML die word gevonden als er op een link word geklikt of als een specefieken functie word aangeroepen

### `<weblink>`
de `<weblink>` tag is eigelijk gewoon een `<a>` tag met wat javascript. `<weblink>` vervangt de `href` van de tag met `javascript:goTo('"+herf+"')`

### `<trigger>`
de`<trigger>`tag bestaat omdat als javascript word ingeladen met `goTo();`word het niet uigevoerd en dat is niet handig dus je kan in `<trigger>` wat javascript zetten dat moet worden uigevoerd.


## begripen
### dynamicPage
een dynamicpage is een pagina op de website die wat js er bij heeft zitten en dus een eigen folder heeft je kan zone pagina openen en de js uitvoren door `goto(dynamicPage:foldernaam-bestantnaam` vervang hierbij foldernaam-bestantnaam met jouw foldernaam/bestantnaam dus bijv
`goTo(dynamicPage:home` opent home/home.html en voert home/home.js uit


dat is alles voor nu als je een vraag hebt maak gerust een probleem er voor aan op github