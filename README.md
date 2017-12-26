# Gnome + Chaucha

Un pequeño Widget para ver el precio de la Chaucha en tiempo real.

Por ahora funciona consultando el precio de compra y venta directamente desde el endpoint público de orionx.io:

    https://api.orionx.io/graphql?query={marketOrderBook(marketCode:"CHACLP",limit:1){buy{limitPrice}sell{limitPrice}}}

Si encuentro una mejor forma de consultar, después la actualizaré.

El código se basa en el tutorial sobre extensiones de Gnome de ![Samuel Masue](http://smasue.github.io/gnome-shell-tw).

Se aceptan donaciones a la billetera:
    cicLYFa1SNbwFB66iyACJTDErZnqrJC943

## Instalación
Para instalar se debe clonar el proyecto en la carpeta de las Extensiones de Gnome.
    cd ~/.local/share/gnome-shell/extensions/
    
